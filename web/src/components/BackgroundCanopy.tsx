/**
 * Fondo fijo de toda la app: follaje ilustrado (SVG propio, no una foto de
 * stock) con manchas de luz cálida simulando el sol filtrándose entre las
 * hojas al amanecer — la hora en la que se suele revisar el riego.
 */
export function BackgroundCanopy() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-campo-950">
      {/* Manchas de luz cálida */}
      <div className="absolute -left-24 top-[-10%] h-[480px] w-[480px] rounded-full bg-ocre/20 blur-[110px]" />
      <div className="absolute right-[-8%] top-[20%] h-[360px] w-[360px] rounded-full bg-hoja/15 blur-[100px]" />

      {/* Follaje ilustrado */}
      <svg
        className="absolute inset-0 h-full w-full animate-canopy-drift opacity-70"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="hojaBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <linearGradient id="hojaGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3A4A2C" />
            <stop offset="100%" stopColor="#1F2A1C" />
          </linearGradient>
        </defs>

        <g filter="url(#hojaBlur)" fill="url(#hojaGrad)">
          <ellipse cx="120" cy="60" rx="220" ry="90" transform="rotate(-25 120 60)" />
          <ellipse cx="380" cy="-40" rx="260" ry="100" transform="rotate(18 380 -40)" />
          <ellipse cx="1260" cy="40" rx="240" ry="110" transform="rotate(-15 1260 40)" />
          <ellipse cx="1440" cy="220" rx="200" ry="260" transform="rotate(8 1440 220)" />
          <ellipse cx="60" cy="760" rx="260" ry="140" transform="rotate(12 60 760)" />
          <ellipse cx="1380" cy="820" rx="240" ry="150" transform="rotate(-10 1380 820)" />
        </g>

        <g fill="#28351F" opacity="0.55">
          <path d="M0 40 C 140 -10, 260 10, 340 70 C 260 90, 120 110, 0 90 Z" />
          <path d="M1440 60 C 1300 0, 1180 20, 1100 80 C 1200 110, 1340 120, 1440 100 Z" />
          <path d="M0 900 C 160 800, 300 820, 380 880 L 0 900 Z" />
          <path d="M1440 900 C 1280 800, 1140 830, 1060 890 L 1440 900 Z" />
        </g>

        {/* venas de las hojas, muy tenues */}
        <g stroke="#7C8A66" strokeOpacity="0.25" strokeWidth="1.5" fill="none">
          <path d="M40 30 Q 200 10 320 60" />
          <path d="M1180 30 Q 1300 10 1420 70" />
          <path d="M20 850 Q 160 810 340 870" />
          <path d="M1100 860 Q 1240 810 1420 880" />
        </g>
      </svg>

      {/* Viñeta para que el contenido central mantenga contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-campo-950/40 via-transparent to-campo-950/60" />
    </div>
  );
}
