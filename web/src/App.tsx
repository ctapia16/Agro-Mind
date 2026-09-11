import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Login } from "./pages/Login";
import { Layout } from "./pages/Layout";
import { Inicio } from "./pages/Inicio";
import { Parcelas } from "./pages/Parcelas";
import { ParcelaDetalle } from "./pages/ParcelaDetalle";
import { Sensores } from "./pages/Sensores";
import { Riego } from "./pages/Riego";
import { Alertas } from "./pages/Alertas";
import { Reportes } from "./pages/Reportes";
import { Configuracion } from "./pages/Configuracion";
import { BackgroundCanopy } from "./components/BackgroundCanopy";

export default function App() {
  const { session, cargando } = useAuth();

  return (
    <>
      <BackgroundCanopy />

      {cargando ? (
        <div className="flex h-screen items-center justify-center text-campo-400">
          Cargando…
        </div>
      ) : !session ? (
        <Login />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Inicio />} />
              <Route path="/parcelas" element={<Parcelas />} />
              <Route path="/parcelas/:id" element={<ParcelaDetalle />} />
              <Route path="/sensores" element={<Sensores />} />
              <Route path="/riego" element={<Riego />} />
              <Route path="/alertas" element={<Alertas />} />
              <Route path="/reportes" element={<Reportes />} />
              <Route path="/configuracion" element={<Configuracion />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
