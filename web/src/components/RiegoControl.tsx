import type { RiegoEstado } from "../types";

interface Props {
  riego: RiegoEstado | null;
  onAlternar: () => void;
}

export function RiegoControl({ riego, onAlternar }: Props) {
  const activa = riego?.valvula_activa ?? false;

  return (
    <div className="flex items-center justify-between rounded-lg border border-campo-700 bg-campo-800 px-5 py-4">
      <div>
        <div className="text-sm text-campo-400">Válvula de riego</div>
        <div className={`font-data text-lg ${activa ? "text-hoja" : "text-campo-100"}`}>
          {activa ? "Activa" : "Apagada"}
        </div>
        {riego && (
          <div className="mt-0.5 text-xs text-campo-400">
            Objetivo: {riego.humedad_objetivo}% de humedad
          </div>
        )}
      </div>
      <button
        onClick={onAlternar}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          activa
            ? "bg-campo-700 text-campo-100 hover:bg-campo-700/70"
            : "bg-hoja text-campo-950 hover:bg-hoja/90"
        }`}
      >
        {activa ? "Apagar riego" : "Activar riego"}
      </button>
    </div>
  );
}
