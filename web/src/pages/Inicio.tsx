import { Sprout, Cpu, Droplets, Bell } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useParcelas } from "../hooks/useParcelas";
import { useResumenGlobal } from "../hooks/useResumenGlobal";
import { useAlertasGlobal } from "../hooks/useAlertasGlobal";
import { TopBar } from "../components/TopBar";
import { HeroBanner } from "../components/HeroBanner";
import { StatTile } from "../components/StatTile";
import { ParcelaCard } from "../components/ParcelaCard";
import { AlertList } from "../components/AlertList";

function nombreDesdeCorreo(correo: string | undefined): string {
  if (!correo) return "";
  const usuario = correo.split("@")[0].replace(/[._-]/g, " ");
  return usuario.charAt(0).toUpperCase() + usuario.slice(1);
}

export function Inicio() {
  const { session } = useAuth();
  const { parcelas } = useParcelas();
  const resumen = useResumenGlobal();
  const { alertas } = useAlertasGlobal();

  const alertasRecientes = alertas.filter((a) => !a.atendida).slice(0, 4);

  return (
    <div className="space-y-6">
      <TopBar
        nombre={nombreDesdeCorreo(session?.user.email)}
        alertasActivas={resumen?.alertasActivas ?? 0}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile icono={Sprout} valor={resumen?.totalParcelas ?? "—"} etiqueta="Parcelas" acento="hoja" />
        <StatTile icono={Cpu} valor={resumen?.totalSensores ?? "—"} etiqueta="Sensores" acento="cielo" />
        <StatTile icono={Droplets} valor={resumen?.riegosUltimas24h ?? "—"} etiqueta="Riegos (24h)" acento="cielo" />
        <StatTile icono={Bell} valor={resumen?.alertasActivas ?? "—"} etiqueta="Alertas" acento={resumen && resumen.alertasActivas > 0 ? "barro" : "hoja"} />
      </div>

      <HeroBanner />

      <section>
        <h3 className="mb-3 font-display text-lg text-campo-100">Tus parcelas</h3>
        {parcelas.length === 0 ? (
          <p className="text-sm text-campo-400">
            Todavía no hay parcelas. Corre el simulador para crear la primera.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {parcelas.map((p, i) => (
              <ParcelaCard key={p.id} parcela={p} indice={i} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h3 className="mb-3 font-display text-lg text-campo-100">Alertas recientes</h3>
        <AlertList alertas={alertasRecientes} />
      </section>
    </div>
  );
}
