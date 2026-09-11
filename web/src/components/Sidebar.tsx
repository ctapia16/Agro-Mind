import { NavLink } from "react-router-dom";
import {
  Home,
  Sprout,
  Cpu,
  Droplets,
  Bell,
  FileBarChart,
  Settings,
  LogOut,
} from "lucide-react";

const ITEMS = [
  { to: "/", label: "Inicio", icon: Home, fin: true },
  { to: "/parcelas", label: "Parcelas", icon: Sprout },
  { to: "/sensores", label: "Sensores", icon: Cpu },
  { to: "/riego", label: "Riego", icon: Droplets },
  { to: "/alertas", label: "Alertas", icon: Bell },
  { to: "/reportes", label: "Reportes", icon: FileBarChart },
  { to: "/configuracion", label: "Configuración", icon: Settings },
];

interface Props {
  correo: string;
  onCerrarSesion: () => void;
}

export function Sidebar({ correo, onCerrarSesion }: Props) {
  return (
    <aside className="glass m-4 flex h-[calc(100vh-2rem)] w-60 shrink-0 flex-col rounded-2xl">
      <div className="px-6 pt-8 pb-6">
        <h1 className="font-display text-2xl font-medium tracking-tight text-campo-100">
          AgroMind
        </h1>
        <p className="mt-1 text-sm text-campo-400">Cultiva más inteligente</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {ITEMS.map(({ to, label, icon: Icono, fin }) => (
          <NavLink
            key={to}
            to={to}
            end={fin}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "border border-white/10 bg-white/10 text-campo-100"
                  : "text-campo-400 hover:bg-white/5 hover:text-campo-100"
              }`
            }
          >
            <Icono size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="mb-3 flex items-center gap-2 px-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-hoja/20 text-sm font-medium text-hoja">
            {correo.charAt(0).toUpperCase()}
          </span>
          <span className="truncate text-xs text-campo-400">{correo}</span>
        </div>
        <button
          onClick={onCerrarSesion}
          className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-sm text-campo-400 hover:bg-white/5 hover:text-campo-100"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
