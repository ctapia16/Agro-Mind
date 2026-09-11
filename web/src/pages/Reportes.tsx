import { FileBarChart } from "lucide-react";

export function Reportes() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-medium text-campo-100">Reportes</h1>
        <p className="text-sm text-campo-400">Resúmenes históricos y exportables.</p>
      </header>

      <div className="glass flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-campo-400">
          <FileBarChart size={22} />
        </span>
        <p className="text-campo-100">Todavía no está construida esta sección.</p>
        <p className="max-w-sm text-sm text-campo-400">
          Aquí irán reportes de humedad, riego y alertas por rango de fechas, una vez
          que el MVP tenga más historial de datos acumulado.
        </p>
      </div>
    </div>
  );
}
