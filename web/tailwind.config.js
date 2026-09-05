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
    },
  },
  plugins: [],
};
