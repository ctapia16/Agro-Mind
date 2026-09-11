import { useAuth } from "../hooks/useAuth";

export function Configuracion() {
  const { session, cerrarSesion } = useAuth();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-medium text-campo-100">Configuración</h1>
        <p className="text-sm text-campo-400">Datos de tu cuenta.</p>
      </header>

      <div className="glass max-w-md px-6 py-5">
        <div className="text-sm text-campo-400">Correo</div>
        <div className="mt-1 text-campo-100">{session?.user.email}</div>

        <div className="mt-4 text-sm text-campo-400">ID de usuario</div>
        <div className="mt-1 break-all font-data text-xs text-campo-400">{session?.user.id}</div>

        <button
          onClick={cerrarSesion}
          className="mt-6 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-campo-100 hover:bg-white/10"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
