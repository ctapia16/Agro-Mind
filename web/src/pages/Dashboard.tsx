import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useParcelas } from "../hooks/useParcelas";
import { useParcelaDetalle } from "../hooks/useParcelaDetalle";
import { Sidebar } from "../components/Sidebar";
import { Metrica } from "../components/Metrica";
import { AlertList } from "../components/AlertList";
import { RiegoControl } from "../components/RiegoControl";
import { HumedadChart } from "../components/HumedadChart";

function nivelHumedad(valor: number | null): "normal" | "advertencia" | "critica" {
  if (valor === null) return "normal";
  if (valor < 20) return "critica";
  if (valor < 30) return "advertencia";
  return "normal";
}

function nivelPotasio(valor: number | null): "normal" | "advertencia" | "critica" {
  if (valor === null) return "normal";
  if (valor < 10) return "advertencia";
  return "normal";
}

export function Dashboard() {
  const { cerrarSesion } = useAuth();
  const { parcelas } = useParcelas();
  const [seleccionadaId, setSeleccionadaId] = useState<string | null>(null);

  useEffect(() => {
    if (!seleccionadaId && parcelas.length > 0) {
      setSeleccionadaId(parcelas[0].id);
    }
  }, [parcelas, seleccionadaId]);

  const { lecturas, alertas, riego, ultimaLectura, alternarRiego } =
    useParcelaDetalle(seleccionadaId);

  const parcela = parcelas.find((p) => p.id === seleccionadaId) ?? null;

  return (
    <div className="flex h-screen">
      <Sidebar
        parcelas={parcelas}
        seleccionadaId={seleccionadaId}
        onSeleccionar={setSeleccionadaId}
        onCerrarSesion={cerrarSesion}
      />

      <main className="flex-1 overflow-y-auto px-10 py-8">
        {!parcela ? (
          <p className="text-campo-400">
            Selecciona o registra una parcela para ver sus datos.
          </p>
        ) : (
          <div className="mx-auto max-w-4xl space-y-8">
            <header>
              <p className="text-sm text-campo-400">
                {parcela.cultivo ?? "Cultivo sin definir"} · {parcela.ubicacion ?? "—"}
              </p>
              <div className="mt-1 flex items-end gap-4">
                <h2 className="font-display text-4xl font-medium tracking-tight text-campo-100">
                  {ultimaLectura?.soil_moisture !== null && ultimaLectura?.soil_moisture !== undefined
                    ? `${ultimaLectura.soil_moisture.toFixed(0)}%`
                    : "—"}
                </h2>
                <span className="mb-1.5 text-sm text-campo-400">
                  humedad del suelo en {parcela.nombre}
                </span>
              </div>
            </header>

            <section className="glass p-5">
              <HumedadChart lecturas={lecturas} />
            </section>

            <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Metrica
                etiqueta="Humedad del suelo"
                valor={ultimaLectura?.soil_moisture ?? null}
                unidad="%"
                nivel={nivelHumedad(ultimaLectura?.soil_moisture ?? null)}
              />
              <Metrica
                etiqueta="Temperatura"
                valor={ultimaLectura?.temperature ?? null}
                unidad="°C"
              />
              <Metrica
                etiqueta="Humedad ambiental"
                valor={ultimaLectura?.humidity ?? null}
                unidad="%"
              />
              <Metrica
                etiqueta="Nitrógeno"
                valor={ultimaLectura?.nitrogen ?? null}
                unidad="mg/kg"
              />
              <Metrica
                etiqueta="Fósforo"
                valor={ultimaLectura?.phosphorus ?? null}
                unidad="mg/kg"
              />
              <Metrica
                etiqueta="Potasio"
                valor={ultimaLectura?.potassium ?? null}
                unidad="mg/kg"
                nivel={nivelPotasio(ultimaLectura?.potassium ?? null)}
              />
            </section>

            <section>
              <RiegoControl riego={riego} onAlternar={alternarRiego} />
            </section>

            <section>
              <h3 className="mb-3 font-display text-lg text-campo-100">Alertas</h3>
              <AlertList alertas={alertas} />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
