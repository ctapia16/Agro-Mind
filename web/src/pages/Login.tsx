import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export function Login() {
  const { iniciarSesion } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function manejarEnvio(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    try {
      await iniciarSesion(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-campo-950 px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-medium tracking-tight text-campo-100">
          AgroMind
        </h1>
        <p className="mt-2 text-sm text-campo-400">
          Monitoreo inteligente para tus parcelas.
        </p>

        <form onSubmit={manejarEnvio} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm text-campo-400" htmlFor="email">
              Correo
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-campo-700 bg-campo-800 px-3 py-2 text-campo-100 outline-none focus:border-hoja"
            />
          </div>
          <div>
            <label className="block text-sm text-campo-400" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-campo-700 bg-campo-800 px-3 py-2 text-campo-100 outline-none focus:border-hoja"
            />
          </div>

          {error && <p className="text-sm text-barro">{error}</p>}

          <button
            type="submit"
            disabled={enviando}
            className="w-full rounded-md bg-hoja px-4 py-2 font-medium text-campo-950 transition-colors hover:bg-hoja/90 disabled:opacity-60"
          >
            {enviando ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
