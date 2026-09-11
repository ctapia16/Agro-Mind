import { FOTOS } from "../lib/images";

export function HeroBanner() {
  return (
    <div className="glass relative overflow-hidden px-6 py-6 sm:px-8 sm:py-8">
      <img
        src={FOTOS.heroMaizAmanecer}
        alt="Campo de maíz al amanecer"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-campo-950/90 via-campo-950/60 to-transparent" />
      <div className="relative max-w-md">
        <p className="text-xs uppercase tracking-wider text-hoja">Tecnología de campo</p>
        <h2 className="mt-2 font-display text-2xl font-medium text-campo-100 sm:text-3xl">
          Un campo más productivo
        </h2>
        <p className="mt-2 text-sm text-campo-100/80">
          Datos de hoy, mejores cosechas mañana.
        </p>
      </div>
    </div>
  );
}
