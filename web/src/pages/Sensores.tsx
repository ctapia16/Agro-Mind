import { Cpu } from "lucide-react";
import { useSensoresGlobal } from "../hooks/useSensoresGlobal";

const colorEstado: Record<string, string> = {
  Activo: "text-hoja",
  Inactivo: "text-campo-400",
  Mantenimiento: "text-ocre",
};

export function Sensores() {
  const { sensores, cargando } = useSensoresGlobal();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-medium text-campo-100">Sensores</h1>
        <p className="text-sm text-campo-400">Todos los sensores registrados en tus parcelas.</p>
      </header>

      {cargando ? (
        <p className="text-sm text-campo-400">Cargando…</p>
      ) : sensores.length === 0 ? (
        <p className="text-sm text-campo-400">Todavía no hay sensores registrados.</p>
      ) : (
        <div className="glass divide-y divide-white/10">
          {sensores.map((s) => (
            <div key={s.sensor_id} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-campo-100">
                  <Cpu size={17} />
                </span>
                <div>
                  <div className="font-medium text-campo-100">{s.sensor_id}</div>
                  <div className="text-xs text-campo-400">
                    {s.tipo} · {s.parcela_nombre}
                  </div>
                </div>
              </div>
              <span className={`text-sm font-medium ${colorEstado[s.estado] ?? "text-campo-400"}`}>
                {s.estado}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
