import { Bell, Search } from "lucide-react";

function saludoSegunHora(): string {
  const hora = new Date().getHours();
  if (hora < 12) return "Buenos días";
  if (hora < 19) return "Buenas tardes";
  return "Buenas noches";
}

interface Props {
  nombre: string;
  alertasActivas: number;
}

export function TopBar({ nombre, alertasActivas }: Props) {
  const fecha = new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-medium text-campo-100">
          {saludoSegunHora()}, {nombre}
        </h1>
        <p className="text-sm capitalize text-campo-400">{fecha}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="glass hidden items-center gap-2 px-3 py-2 sm:flex">
          <Search size={16} className="text-campo-400" />
          <input
            type="text"
            placeholder="Buscar parcela…"
            className="w-40 bg-transparent text-sm text-campo-100 placeholder:text-campo-400 focus:outline-none"
          />
        </div>
        <button className="glass relative flex h-10 w-10 items-center justify-center text-campo-100">
          <Bell size={18} />
          {alertasActivas > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-barro text-[10px] font-medium text-campo-100">
              {alertasActivas > 9 ? "9+" : alertasActivas}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
