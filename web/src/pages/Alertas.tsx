import { useAlertasGlobal } from "../hooks/useAlertasGlobal";

const estiloPorSeveridad: Record<string, string> = {
  info: "border-white/10 bg-white/[0.06]",
  advertencia: "border-ocre/30 bg-ocre/10",
  critica: "border-barro/30 bg-barro/10",
};

const puntoPorSeveridad: Record<string, string> = {
  info: "bg-campo-400",
  advertencia: "bg-ocre",
  critica: "bg-barro",
};

export function Alertas() {
  const { alertas, cargando, marcarAtendida } = useAlertasGlobal();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-medium text-campo-100">Alertas</h1>
        <p className="text-sm text-campo-400">
          Historial de recomendaciones generadas por el motor de reglas.
        </p>
      </header>

      {cargando ? (
        <p className="text-sm text-campo-400">Cargando…</p>
      ) : alertas.length === 0 ? (
        <p className="text-sm text-campo-400">Todavía no hay alertas registradas.</p>
      ) : (
        <ul className="space-y-2">
          {alertas.map((a) => (
            <li
              key={a.id}
              className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-3 backdrop-blur-md ${estiloPorSeveridad[a.severidad]} ${a.atendida ? "opacity-50" : ""}`}
            >
              <div className="flex items-start gap-3">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${puntoPorSeveridad[a.severidad]}`} />
                <div>
                  <div className="text-sm text-campo-100">{a.mensaje}</div>
                  <div className="mt-0.5 text-xs text-campo-400">
                    {a.parcela_nombre} · {new Date(a.created_at).toLocaleString("es-MX")}
                  </div>
                </div>
              </div>
              {!a.atendida && (
                <button
                  onClick={() => marcarAtendida(a.id)}
                  className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-campo-100 hover:bg-white/10"
                >
                  Marcar atendida
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
