# 🌱 AgroMind

> **La inteligencia también se cultiva.**

AgroMind es una plataforma de agricultura inteligente que integra **IoT, sensores, conectividad LoRa e Inteligencia Artificial** para transformar los datos obtenidos del campo en información útil para la toma de decisiones agrícolas.

Este repositorio contiene el prototipo de AgroMind, incluyendo la **Landing Page**, el **Dashboard Web** y el **Simulador de Sensores**.

---

## 📁 Estructura del proyecto

```text
Agro-Mind/
│
├── landing/              # Landing Page de AgroMind
│   ├── images/
│   ├── video/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   ├── package.json
│   └── server.js
│
├── web/                  # Dashboard web de AgroMind
│   ├── src/
│   ├── package.json
│   └── ...
│
├── simulador/            # Simulador de sensores agrícolas
│   ├── simulador.py
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
│
├── .gitignore
└── README.md
🚀 Instalación
1. Requisitos

Antes de comenzar, asegúrate de tener instalado:

Git
Node.js
npm
Python 3.10 o superior

Puedes comprobar las versiones desde Git Bash:

git --version
node --version
npm --version
python --version
📥 2. Clonar el repositorio

Abre Git Bash y ejecuta:

git clone https://github.com/ctapia16/Agro-Mind.git

Después entra al proyecto:

cd Agro-Mind
🌐 3. Ejecutar la Landing Page

La Landing Page se encuentra dentro de la carpeta:

landing/

Desde la carpeta principal ejecuta:

cd landing

Instala las dependencias:

npm install

Después inicia el servidor:

npm run dev

La Landing Page estará disponible en:

http://localhost:3003

Para detener el servidor:

Ctrl + C
📊 4. Ejecutar el Dashboard

Primero regresa a la carpeta principal:

cd ..

Entra al Dashboard:

cd web

Instala las dependencias:

npm install

Ejecuta el proyecto:

npm run dev

Vite mostrará en la terminal la dirección donde está disponible el Dashboard.

Normalmente será:

http://localhost:5173

La URL puede cambiar si el puerto ya está ocupado. Utiliza la dirección que aparezca en la terminal.

🧪 5. Ejecutar el Simulador

El simulador permite generar datos simulados de sensores agrícolas para probar el funcionamiento de AgroMind sin necesidad de utilizar sensores físicos.

Desde la carpeta principal:

cd ..
cd simulador
Crear el entorno virtual

En Windows / Git Bash:

python -m venv venv

Activa el entorno virtual:

source venv/Scripts/activate

Si se activó correctamente, aparecerá:

(venv)

al inicio de la terminal.

Instalar dependencias
pip install -r requirements.txt
Configurar variables de entorno

Crea el archivo .env utilizando como referencia:

.env.example

Puedes copiarlo con:

cp .env.example .env

Después configura dentro de .env las variables necesarias.

⚠️ IMPORTANTE: No compartas ni subas el archivo .env si contiene API Keys, contraseñas o credenciales.

Ejecutar el simulador
python simulador.py
🔄 Arquitectura de AgroMind

El funcionamiento general del sistema se plantea de la siguiente manera:

┌─────────────────────┐
│       SENSOR        │
│                     │
│  Humedad            │
│  Temperatura        │
│  Nutrientes         │
└──────────┬──────────┘
           │
           │ LoRa
           ▼
┌─────────────────────┐
│       GATEWAY       │
│                     │
│  Recibe los datos   │
└──────────┬──────────┘
           │
           │ Internet
           ▼
┌─────────────────────┐
│      AGROMIND       │
│                     │
│  Procesamiento      │
│  Base de datos      │
│  Inteligencia AI    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   DASHBOARD / APP   │
│                     │
│  Alertas            │
│  Recomendaciones    │
│  Datos del campo    │
└─────────────────────┘
🌱 ¿Qué hace AgroMind?

AgroMind busca convertir los datos obtenidos directamente del campo en recomendaciones útiles para el agricultor.

Por ejemplo:

Sensor
   ↓
Humedad: 28.8%
   ↓
AgroMind analiza el dato
   ↓
Detecta humedad baja
   ↓
Genera alerta
   ↓
"Se recomienda revisar el riego."

También puede detectar posibles deficiencias:

Sensor
   ↓
Potasio: Bajo
   ↓
AgroMind analiza los datos
   ↓
Detecta posible déficit
   ↓
Genera recomendación
   ↓
"Se recomienda evaluar la aplicación de fertilizante."
🛠️ Tecnologías
Frontend
HTML
CSS
JavaScript
React
Vite
Backend / Servicios
Node.js
Python
Inteligencia Artificial
Machine Learning
Redes Neuronales
Análisis de datos agrícolas
IoT
Sensores agrícolas
LoRa
Gateway IoT
Cloud / Base de datos
Supabase
Vercel
🌾 Objetivos

AgroMind busca ayudar al agricultor a:

🌱 Monitorear sus cultivos.
💧 Detectar problemas de humedad.
🌡️ Supervisar condiciones del suelo.
🧪 Identificar posibles deficiencias de nutrientes.
🚨 Recibir alertas.
🤖 Obtener recomendaciones mediante IA.
📊 Visualizar información del campo.
📈 Tomar decisiones basadas en datos.
🔧 Desarrollo

Para obtener los últimos cambios del repositorio:

git pull origin main

Después de realizar cambios:

git add .

Crear un commit:

git commit -m "Descripción de los cambios"

Subir los cambios:

git push origin main
🌿 Trabajar con ramas

Para crear una nueva rama:

git switch -c nombre-de-la-rama

Ejemplo:

git switch -c nueva-landing

Después de realizar cambios:

git add .
git commit -m "Actualiza landing"
git push -u origin nueva-landing
⚠️ Notas importantes
Node.js

Si npm install genera errores, verifica que Node.js y npm estén instalados:

node --version
npm --version
Python

Si el simulador no inicia, asegúrate de que el entorno virtual esté activado:

source venv/Scripts/activate

Deberías ver:

(venv)

al inicio de la terminal.

Variables de entorno

No subas archivos .env al repositorio.

Las API Keys, contraseñas y demás credenciales deben mantenerse privadas.

📌 Estado del proyecto

AgroMind se encuentra actualmente en etapa de prototipo.

El proyecto permite demostrar el flujo conceptual:

Sensores
   ↓
LoRa
   ↓
Gateway
   ↓
AgroMind
   ↓
Inteligencia Artificial
   ↓
Alertas / Recomendaciones
   ↓
Usuario

Algunas partes del sistema utilizan datos simulados para demostrar el funcionamiento antes de realizar la integración completa con hardware físico.

🚀 AgroMind
La inteligencia también se cultiva.

IoT + IA + Agricultura

Sensor → Datos → Inteligencia → Decisión
👨‍💻 Proyecto

AgroMind
Proyecto académico de tecnología aplicada a la agricultura inteligente.

Repositorio:
https://github.com/ctapia16/Agro-Mind


### Ahora en GitHub 👇

Después de pegarlo:

1. Dale clic a **“Commit changes…”** arriba a la derecha.
2. En el mensaje puedes poner:
   `Agrega README del proyecto`
3. Selecciona **Commit directly to the main branch**.
4. Dale **Commit changes**.

Y listo, capi. 🔥

Cuando tu amigo abra el repositorio va a ver el README bonito y podrá seguir exactamente:

```bash
git clone https://github.com/ctapia16/Agro-Mind.git
cd Agro-Mind
cd landing
npm install
npm run dev

y tendrá la landing corriendo en localhost:3003.
