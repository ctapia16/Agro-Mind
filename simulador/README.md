# Simulador de sensores — AgroMind

Genera lecturas realistas (humedad, temperatura, humedad ambiental, N, P, K,
viento) y las inserta directamente en el proyecto de Supabase de AgroMind,
igual que se definió en el plan: **Python → Supabase**, sin backend intermedio.

## 1. Instalar dependencias

```bash
cd agromind-simulator
python -m venv venv
source venv/bin/activate   # en Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 2. Configurar

```bash
cp .env.example .env
```

El `.env.example` ya trae la URL y la publishable key del proyecto
`agromind`. Solo revisa/edita:

- `TEST_USER_EMAIL` / `TEST_USER_PASSWORD`: credenciales del usuario de
  prueba que "dueño" de la parcela simulada. El script lo crea automáticamente
  la primera vez que corre.
- `INTERVALO_SEGUNDOS`: cada cuántos segundos reales se genera una nueva
  lectura (cada lectura simula que pasó 1 hora en la parcela).

### ⚠️ Importante: confirmación de email

Por defecto, Supabase Auth pide confirmar el correo antes de dejar iniciar
sesión. Como este es un usuario de prueba sin bandeja de entrada real, ve a:

**Supabase Dashboard → Authentication → Providers → Email**
y desactiva **"Confirm email"** (solo para este proyecto de desarrollo).

Si no lo desactivas, el `sign_up` funcionará pero el `sign_in` posterior
fallará hasta confirmar el correo manualmente.

## 3. Ejecutar

```bash
python simulator.py            # corre en loop, Ctrl+C para detener
python simulator.py --once     # genera una sola lectura y termina (para probar)
```

La primera vez, el script:
1. Crea (o inicia sesión con) el usuario de prueba.
2. Crea la parcela demo si no existe.
3. Registra el sensor `SENSOR-001`.
4. Empieza a generar e insertar lecturas.

## Qué simula

- **Humedad del suelo**: baja gradualmente durante el "día" simulado
  (más rápido si hace más calor) y sube si el riego está activo.
- **Temperatura / humedad ambiental**: siguen una curva diaria realista
  (mínimo de madrugada, máximo a media tarde).
- **N, P, K**: drift lento con ruido; el potasio decae con el tiempo hasta
  que el riego/fertilización lo "resetea" (puedes ajustar esto en el código).
- **Viento**: variación aleatoria alrededor de 8 km/h.
- **Riego automático**: si la humedad cae debajo de 30%, el script activa la
  válvula virtual (tabla `riego_estado`) y la apaga cuando llega a 40%,
  igual que en la Etapa 6 del plan.
- **Alertas**: motor de reglas simple (humedad baja, potasio bajo, y
  combinación crítica de humedad baja + temperatura alta), que inserta
  filas en `recomendaciones`.

## Siguiente paso

Con esto ya puedes construir el dashboard web (React + Vite + Tailwind) y
consultar `lecturas`, `recomendaciones` y `riego_estado` en tiempo real
usando Supabase Realtime.
