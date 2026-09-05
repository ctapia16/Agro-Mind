"""
Simulador de sensores AgroMind
--------------------------------
Genera lecturas realistas (humedad, temperatura, humedad ambiental,
N, P, K, viento) y las inserta directamente en Supabase, tal como
se decidió en el plan: Python -> Supabase, sin backend intermedio.

Uso:
    python simulator.py           # corre en loop infinito
    python simulator.py --once    # genera una sola lectura y termina
"""

import os
import sys
import time
import math
import random
from datetime import datetime, timezone

from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_KEY"]
TEST_USER_EMAIL = os.environ["TEST_USER_EMAIL"]
TEST_USER_PASSWORD = os.environ["TEST_USER_PASSWORD"]

PARCELA_NOMBRE = os.environ.get("PARCELA_DEMO_NOMBRE", "Parcela Demo")
PARCELA_CULTIVO = os.environ.get("PARCELA_DEMO_CULTIVO", "Maíz")
PARCELA_SUPERFICIE = float(os.environ.get("PARCELA_DEMO_SUPERFICIE", "5.2"))
PARCELA_UBICACION = os.environ.get("PARCELA_DEMO_UBICACION", "Colima")

INTERVALO = int(os.environ.get("INTERVALO_SEGUNDOS", "10"))
SENSOR_ID = "SENSOR-001"

# Umbrales para el motor de alertas (Etapa 4 del plan, versión basada en reglas)
UMBRAL_HUMEDAD_BAJA = 30
UMBRAL_HUMEDAD_CRITICA = 20
UMBRAL_POTASIO_BAJO = 10
UMBRAL_TEMP_ALTA = 32
HUMEDAD_OBJETIVO_RIEGO = 40


def get_client() -> Client:
    return create_client(SUPABASE_URL, SUPABASE_KEY)


def ensure_test_user(client: Client) -> str:
    """Inicia sesión con el usuario de prueba; lo crea si no existe."""
    try:
        res = client.auth.sign_in_with_password(
            {"email": TEST_USER_EMAIL, "password": TEST_USER_PASSWORD}
        )
        print(f"[auth] Sesión iniciada como {TEST_USER_EMAIL}")
        return res.user.id
    except Exception:
        print(f"[auth] Usuario no existe, creando cuenta de prueba...")
        res = client.auth.sign_up(
            {"email": TEST_USER_EMAIL, "password": TEST_USER_PASSWORD}
        )
        if res.user is None:
            raise RuntimeError(
                "No se pudo crear el usuario de prueba. Si tu proyecto tiene "
                "confirmación de email obligatoria, desactívala en "
                "Authentication > Providers > Email para este entorno de pruebas."
            )
        print(f"[auth] Usuario de prueba creado: {TEST_USER_EMAIL}")
        return res.user.id


def ensure_demo_parcela(client: Client, usuario_id: str) -> str:
    existing = (
        client.table("parcelas")
        .select("id")
        .eq("usuario_id", usuario_id)
        .eq("nombre", PARCELA_NOMBRE)
        .execute()
    )
    if existing.data:
        return existing.data[0]["id"]

    created = (
        client.table("parcelas")
        .insert(
            {
                "usuario_id": usuario_id,
                "nombre": PARCELA_NOMBRE,
                "superficie": PARCELA_SUPERFICIE,
                "cultivo": PARCELA_CULTIVO,
                "ubicacion": PARCELA_UBICACION,
            }
        )
        .execute()
    )
    parcela_id = created.data[0]["id"]
    print(f"[setup] Parcela demo creada: {PARCELA_NOMBRE} ({parcela_id})")

    client.table("riego_estado").insert(
        {"parcela_id": parcela_id, "humedad_objetivo": HUMEDAD_OBJETIVO_RIEGO}
    ).execute()

    return parcela_id


def ensure_sensor(client: Client, parcela_id: str) -> None:
    existing = (
        client.table("sensores").select("sensor_id").eq("sensor_id", SENSOR_ID).execute()
    )
    if existing.data:
        return
    client.table("sensores").insert(
        {"sensor_id": SENSOR_ID, "parcela_id": parcela_id, "tipo": "Multiparámetro"}
    ).execute()
    print(f"[setup] Sensor {SENSOR_ID} registrado")


class EstadoSimulacion:
    """Mantiene el 'reloj' simulado y el último valor de humedad,
    para que la curva evolucione de forma realista en vez de ser
    completamente aleatoria en cada lectura."""

    def __init__(self):
        self.hora_simulada = 8.0  # empieza a las 8:00 am
        self.humedad = 70.0
        self.potasio = 25.0

    def avanzar(self, horas: float = 1.0):
        self.hora_simulada = (self.hora_simulada + horas) % 24


def generar_lectura(estado: EstadoSimulacion, riego_activo: bool) -> dict:
    hora = estado.hora_simulada

    # Temperatura: curva senoidal, mínimo ~18°C de madrugada, máximo ~33°C a las 14h
    temperatura = 25 + 8 * math.sin((hora - 8) / 24 * 2 * math.pi) + random.uniform(-0.5, 0.5)

    # Humedad ambiental: inversa a la temperatura, aprox.
    humedad_ambiental = max(30, min(90, 90 - (temperatura - 18) * 2 + random.uniform(-2, 2)))

    # Humedad del suelo: baja gradualmente durante el día por evapotranspiración,
    # sube si el riego está activo.
    if riego_activo:
        estado.humedad = min(95, estado.humedad + random.uniform(3, 5))
    else:
        # tasa de secado mayor cuando hace más calor
        tasa_secado = 0.5 + max(0, (temperatura - 25)) * 0.15
        estado.humedad = max(5, estado.humedad - tasa_secado - random.uniform(0, 0.5))

    # Nutrientes: drift lento + pequeño ruido; ocasionalmente el potasio baja (evento simulado)
    estado.potasio = max(2, estado.potasio - random.uniform(0, 0.15))
    nitrogeno = 20 + random.uniform(-3, 3)
    fosforo = 15 + random.uniform(-2, 2)

    viento = max(0, random.gauss(8, 4))

    return {
        "soil_moisture": round(estado.humedad, 1),
        "temperature": round(temperatura, 1),
        "humidity": round(humedad_ambiental, 1),
        "nitrogen": round(nitrogeno, 1),
        "phosphorus": round(fosforo, 1),
        "potassium": round(estado.potasio, 1),
        "wind_speed": round(viento, 1),
    }


def evaluar_alertas(lectura: dict) -> list[dict]:
    """Motor de recomendaciones basado en reglas (Etapa 4 del plan)."""
    alertas = []
    humedad = lectura["soil_moisture"]
    temperatura = lectura["temperature"]
    potasio = lectura["potassium"]

    if humedad < UMBRAL_HUMEDAD_CRITICA and temperatura > UMBRAL_TEMP_ALTA:
        alertas.append(
            {
                "tipo": "humedad_temperatura_critica",
                "severidad": "critica",
                "mensaje": (
                    f"Humedad muy baja ({humedad}%) combinada con temperatura alta "
                    f"({temperatura}°C). Prioridad alta de revisión de riego."
                ),
            }
        )
    elif humedad < UMBRAL_HUMEDAD_BAJA:
        alertas.append(
            {
                "tipo": "humedad_baja",
                "severidad": "advertencia",
                "mensaje": f"Humedad del suelo baja ({humedad}%). Se recomienda revisar riego.",
            }
        )

    if potasio < UMBRAL_POTASIO_BAJO:
        alertas.append(
            {
                "tipo": "potasio_bajo",
                "severidad": "advertencia",
                "mensaje": f"Posible deficiencia de potasio ({potasio} mg/kg). Revisar fertilización.",
            }
        )

    return alertas


def gestionar_riego(client: Client, parcela_id: str, humedad_actual: float) -> bool:
    """Lee el estado de la válvula virtual y decide si sigue activa.
    Devuelve True si el riego está activo para esta lectura."""
    estado = (
        client.table("riego_estado").select("*").eq("parcela_id", parcela_id).execute()
    )
    if not estado.data:
        return False

    fila = estado.data[0]
    activa = fila["valvula_activa"]
    objetivo = fila["humedad_objetivo"]

    if activa and humedad_actual >= objetivo:
        client.table("riego_estado").update({"valvula_activa": False}).eq(
            "parcela_id", parcela_id
        ).execute()
        client.table("riego_eventos").insert(
            {
                "parcela_id": parcela_id,
                "accion": "desactivado",
                "humedad_en_momento": humedad_actual,
            }
        ).execute()
        print(f"[riego] 🔴 Humedad objetivo alcanzada ({humedad_actual}%). Válvula apagada.")
        return False

    return activa


def activar_riego_si_necesario(client: Client, parcela_id: str, humedad_actual: float):
    """Activa automáticamente la válvula si la humedad cae por debajo del umbral bajo
    y el riego no está ya activo. Simula la recomendación siendo aceptada."""
    estado = (
        client.table("riego_estado").select("*").eq("parcela_id", parcela_id).execute()
    )
    if not estado.data or estado.data[0]["valvula_activa"]:
        return
    if humedad_actual < UMBRAL_HUMEDAD_BAJA:
        client.table("riego_estado").update(
            {"valvula_activa": True, "activado_en": datetime.now(timezone.utc).isoformat()}
        ).eq("parcela_id", parcela_id).execute()
        client.table("riego_eventos").insert(
            {
                "parcela_id": parcela_id,
                "accion": "activado",
                "humedad_en_momento": humedad_actual,
            }
        ).execute()
        print(f"[riego] 🟢 Humedad baja ({humedad_actual}%). Válvula activada.")


def ciclo(client: Client, parcela_id: str, estado: EstadoSimulacion):
    riego_activo = gestionar_riego(client, parcela_id, estado.humedad)
    lectura = generar_lectura(estado, riego_activo)

    insertada = (
        client.table("lecturas")
        .insert(
            {
                "sensor_id": SENSOR_ID,
                "parcela_id": parcela_id,
                **lectura,
            }
        )
        .execute()
    )
    lectura_id = insertada.data[0]["id"]

    print(
        f"[{estado.hora_simulada:5.1f}h] humedad={lectura['soil_moisture']}% "
        f"temp={lectura['temperature']}°C  K={lectura['potassium']}mg/kg  "
        f"riego={'ON' if riego_activo else 'off'}"
    )

    for alerta in evaluar_alertas(lectura):
        client.table("recomendaciones").insert(
            {"parcela_id": parcela_id, "lectura_id": lectura_id, **alerta}
        ).execute()
        print(f"    ⚠️ [{alerta['severidad']}] {alerta['mensaje']}")

    if not riego_activo:
        activar_riego_si_necesario(client, parcela_id, lectura["soil_moisture"])

    estado.avanzar(horas=1.0)


def main():
    una_vez = "--once" in sys.argv

    client = get_client()
    usuario_id = ensure_test_user(client)
    parcela_id = ensure_demo_parcela(client, usuario_id)
    ensure_sensor(client, parcela_id)

    estado = EstadoSimulacion()

    print(f"\nSimulador AgroMind corriendo para parcela '{PARCELA_NOMBRE}' ({parcela_id})")
    print(f"Insertando una lectura cada {INTERVALO}s. Ctrl+C para detener.\n")

    if una_vez:
        ciclo(client, parcela_id, estado)
        return

    while True:
        try:
            ciclo(client, parcela_id, estado)
            time.sleep(INTERVALO)
        except KeyboardInterrupt:
            print("\nSimulador detenido.")
            break


if __name__ == "__main__":
    main()
