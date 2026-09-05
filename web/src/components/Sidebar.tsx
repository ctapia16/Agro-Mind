import type { Parcela } from "../types";

interface Props {
  parcelas: Parcela[];
  seleccionadaId: string | null;
  onSeleccionar: (id: string) => void;
  onCerrarSesion: () => void;
}

export function Sidebar({ parcelas, seleccionadaId, onSeleccionar, onCerrarSesion }: Props) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-campo-700 bg-campo-900">
      <div className="px-6 pt-8 pb-6">
        <h1 className="font-display text-2xl font-medium tracking-tight text-campo-100">
          AgroMind
        </h1>
        <p className="mt-1 text-sm text-campo-400">Tus parcelas</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {parcelas.length === 0 && (
          <p className="px-3 py-2 text-sm text-campo-400">
            Todavía no hay parcelas registradas.
          </p>
        )}
        {parcelas.map((p) => {
          const activa = p.id === seleccionadaId;
          return (
            <button
              key={p.id}
              onClick={() => onSeleccionar(p.id)}
              className={`w-full rounded-md px-3 py-2.5 text-left transition-colors ${
                activa
                  ? "bg-campo-800 text-campo-100"
                  : "text-campo-400 hover:bg-campo-800/60 hover:text-campo-100"
              }`}
            >
              <div className="font-medium">{p.nombre}</div>
              <div className="text-xs text-campo-400">
                {p.cultivo ?? "Sin cultivo"} · {p.superficie ? `${p.superficie} ha` : "—"}
              </div>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-campo-700 px-6 py-4">
        <button
          onClick={onCerrarSesion}
          className="text-sm text-campo-400 hover:text-campo-100"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
