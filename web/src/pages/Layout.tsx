import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Sidebar } from "../components/Sidebar";

export function Layout() {
  const { session, cerrarSesion } = useAuth();

  return (
    <div className="flex h-screen">
      <Sidebar correo={session?.user.email ?? ""} onCerrarSesion={cerrarSesion} />
      <main className="flex-1 overflow-y-auto px-6 py-8 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
