/**
 * Efecto visual de riego: gotas cayendo dentro de la tarjeta y un
 * aspersor que se mece, para que se "sienta" de inmediato que la
 * válvula está activa, sin necesidad de leer texto.
 */
const GOTAS = Array.from({ length: 12 }, (_, i) => i);

export function LluviaRiego() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      {GOTAS.map((i) => (
        <span
          key={i}
          className="absolute top-0 h-4 w-px animate-drop-fall rounded-full bg-gradient-to-b from-sky-200/0 via-sky-200/80 to-sky-200/0"
          style={{
            left: `${6 + i * 8}%`,
            animationDelay: `${(i % 5) * 0.22}s`,
            animationDuration: `${1.1 + (i % 4) * 0.2}s`,
          }}
        />
      ))}
      {/* tierra húmeda: brillo tenue que aparece en la base de la tarjeta */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-hoja/25 to-transparent" />
    </div>
  );
}
