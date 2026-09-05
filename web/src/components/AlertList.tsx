import type { Recomendacion } from "../types";

const estiloPorSeveridad: Record<string, string> = {
  info: "border-campo-700 bg-campo-800",
  advertencia: "border-ocre/40 bg-ocre/10",
  critica: "border-barro/40 bg-barro/10",
};

const puntoPorSeveridad: Record<string, string> = {
  info: "bg-campo-400",
  advertencia: "bg-ocre",
  critica: "bg-barro",
};

export function AlertList({ alertas }: { alertas: Recomendacion[] }) {
  if (alertas.length === 0) {
    return (
      <p className="text-sm text-campo-400">
        Sin alertas pendientes. Todo dentro de rango.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {alertas.map((a) => (
        <li
          key={a.id}
          className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${estiloPorSeveridad[a.severidad]}`}
        >
          <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${puntoPorSeveridad[a.severidad]}`} />
          <span className="text-sm text-campo-100">{a.mensaje}</span>
        </li>
      ))}
    </ul>
  );
}
