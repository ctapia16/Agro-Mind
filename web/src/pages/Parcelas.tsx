import { useParcelas } from "../hooks/useParcelas";
import { ParcelaCard } from "../components/ParcelaCard";

export function Parcelas() {
  const { parcelas, cargando } = useParcelas();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-medium text-campo-100">Parcelas</h1>
        <p className="text-sm text-campo-400">Todas tus parcelas registradas.</p>
      </header>

      {cargando ? (
        <p className="text-sm text-campo-400">Cargando…</p>
      ) : parcelas.length === 0 ? (
        <p className="text-sm text-campo-400">
          Todavía no hay parcelas. Corre el simulador para crear la primera.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {parcelas.map((p, i) => (
            <ParcelaCard key={p.id} parcela={p} indice={i} />
          ))}
        </div>
      )}
    </div>
  );
}
