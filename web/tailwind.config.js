/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta "milpa nocturna": campo visto de madrugada, cuando se
        // suele revisar el riego antes de que salga el sol.
        campo: {
          950: "#161F14", // fondo principal
          900: "#1F2A1C", // superficies / sidebar
          800: "#28351F", // tarjetas
          700: "#3A4A2C", // bordes
          400: "#7C8A66", // texto secundario
          100: "#EDEFE3", // texto principal sobre fondo oscuro
        },
        hoja: {
          DEFAULT: "#8BAA4C", // saludable / normal
          dim: "#5F7639",
        },
        ocre: {
          DEFAULT: "#D98E3B", // advertencia
        },
        barro: {
          DEFAULT: "#C1502E", // crítico
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
        data: ["'IBM Plex Mono'", "monospace"],
      },
      keyframes: {
        dropFall: {
          "0%": { transform: "translateY(-12px)", opacity: "0" },
          "12%": { opacity: "0.9" },
          "85%": { opacity: "0.7" },
          "100%": { transform: "translateY(160px)", opacity: "0" },
        },
        sprinklerSway: {
          "0%, 100%": { transform: "rotate(-22deg)" },
          "50%": { transform: "rotate(22deg)" },
        },
        canopyDrift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(-1.5%, 1%, 0) scale(1.03)" },
        },
      },
      animation: {
        "drop-fall": "dropFall 1.3s linear infinite",
        "sprinkler-sway": "sprinklerSway 1.4s ease-in-out infinite",
        "canopy-drift": "canopyDrift 26s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
