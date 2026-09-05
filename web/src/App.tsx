import { useAuth } from "./hooks/useAuth";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  const { session, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="flex h-screen items-center justify-center bg-campo-950 text-campo-400">
        Cargando…
      </div>
    );
  }

  return session ? <Dashboard /> : <Login />;
}
