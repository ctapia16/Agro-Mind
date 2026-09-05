# AgroMind Web

Dashboard en React + Vite + TypeScript + Tailwind CSS que consume el
proyecto de Supabase de AgroMind en tiempo real.

## 1. Instalar

```bash
cd agromind-web
npm install
```

## 2. Configurar

```bash
cp .env.example .env
```

Ya trae la URL y la publishable key del proyecto `agromind`.

## 3. Iniciar sesión

Este dashboard usa el mismo usuario de prueba que crea el simulador
(`simulador@agromind.test` por defecto, o el que hayas puesto en el `.env`
del simulador). Corre primero el simulador al menos una vez para que:
1. Se cree el usuario de prueba.
2. Se cree la parcela demo con su sensor.
3. Empiecen a llegar lecturas.

Luego:

```bash
npm run dev
```

Abre `http://localhost:5173` e inicia sesión con esas credenciales.

## Qué incluye

- **Login** con Supabase Auth.
- **Sidebar** con la lista de parcelas del usuario (Realtime: se actualiza
  sola si agregas una parcela desde el SQL editor o desde otra pantalla).
- **Dashboard por parcela**:
  - Humedad del suelo destacada (última lectura).
  - Gráfica de humedad de las últimas 24 lecturas.
  - Tarjetas de temperatura, humedad ambiental, N, P, K y viento, con
    color de advertencia/crítico cuando el valor sale de rango.
  - Control de la válvula de riego virtual (activar/apagar a mano, además
    de la automatización que ya hace el simulador).
  - Lista de alertas activas generadas por el motor de reglas.
- Todo se actualiza en vivo vía **Supabase Realtime** — no hace falta
  refrescar la página para ver nuevas lecturas o alertas.

## Identidad visual

Paleta "milpa nocturna" (verdes de campo + tonos tierra) con tipografía
Fraunces (títulos) + IBM Plex Sans (texto) + IBM Plex Mono (datos de
sensores), pensada para leerse cómodo en la madrugada al revisar el riego.

## Siguiente paso

- Formulario para crear/editar parcelas desde la UI (hoy solo se leen).
- Vista de historial completo de alertas atendidas.
- Cuando lleguen los sensores físicos: nada de esto debería cambiar, ya
  que el dashboard solo lee de Supabase, sin importar si el dato vino del
  simulador Python o de un ESP32 real.
