import { Droplets } from "lucide-react";
import { useRiegoGlobal } from "../hooks/useRiegoGlobal";
import { LluviaRiego } from "../components/LluviaRiego";

export function Riego() {
  const { riegos, cargando, alternar } = useRiegoGlobal();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-medium text-campo-100">Riego</h1>
        <p className="text-sm text-campo-400">
          Válvulas virtuales de todas tus parcelas. El simulador también puede activarlas
          automáticamente cuando la humedad baja del umbral.
        </p>
      </header>

      {cargando ? (
        <p className="text-sm text-campo-400">Cargando…</p>
      ) : riegos.length === 0 ? (
        <p className="text-sm text-campo-400">Todavía no hay parcelas con riego configurado.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {riegos.map((r) => (
            <div key={r.parcela_id} className="glass relative overflow-hidden px-5 py-4">
              {r.valvula_activa && <LluviaRiego />}
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 origin-top items-center justify-center rounded-full border ${
                      r.valvula_activa
                        ? "animate-sprinkler-sway border-sky-200/30 bg-sky-200/10 text-sky-200"
                        : "border-campo-700 bg-campo-800/60 text-campo-400"
                    }`}
                  >
                    <Droplets size={18} />
                  </span>
                  <div>
                    <div className="font-medium text-campo-100">{r.parcela_nombre}</div>
                    <div className={`font-data text-sm ${r.valvula_activa ? "text-hoja" : "text-campo-400"}`}>
                      {r.valvula_activa ? "Regando…" : "Apagada"} · objetivo {r.humedad_objetivo}%
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => alternar(r.parcela_id, r.valvula_activa)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors ${
                    r.valvula_activa
                      ? "border border-white/10 bg-white/5 text-campo-100 hover:bg-white/10"
                      : "bg-hoja text-campo-950 hover:bg-hoja/90"
                  }`}
                >
                  {r.valvula_activa ? "Apagar" : "Activar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
