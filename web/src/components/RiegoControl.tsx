import { Droplets } from "lucide-react";
import type { RiegoEstado } from "../types";
import { LluviaRiego } from "./LluviaRiego";

interface Props {
  riego: RiegoEstado | null;
  onAlternar: () => void;
}

export function RiegoControl({ riego, onAlternar }: Props) {
  const activa = riego?.valvula_activa ?? false;

  return (
    <div className="glass relative overflow-hidden px-5 py-4">
      {activa && <LluviaRiego />}

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 origin-top items-center justify-center rounded-full border ${
              activa
                ? "animate-sprinkler-sway border-sky-200/30 bg-sky-200/10 text-sky-200"
                : "border-campo-700 bg-campo-800/60 text-campo-400"
            }`}
          >
            <Droplets size={18} />
          </span>
          <div>
            <div className="text-sm text-campo-400">Válvula de riego</div>
            <div className={`font-data text-lg ${activa ? "text-hoja" : "text-campo-100"}`}>
              {activa ? "Regando…" : "Apagada"}
            </div>
            {riego && (
              <div className="mt-0.5 text-xs text-campo-400">
                Objetivo: {riego.humedad_objetivo}% de humedad
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onAlternar}
          className={`rounded-lg px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors ${
            activa
              ? "border border-white/10 bg-white/5 text-campo-100 hover:bg-white/10"
              : "bg-hoja text-campo-950 hover:bg-hoja/90"
          }`}
        >
          {activa ? "Apagar riego" : "Activar riego"}
        </button>
      </div>
    </div>
  );
}
