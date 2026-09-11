interface Props {
  etiqueta: string;
  valor: number | null;
  unidad: string;
  nivel?: "normal" | "advertencia" | "critica";
}

const colorPorNivel: Record<string, string> = {
  normal: "text-hoja",
  advertencia: "text-ocre",
  critica: "text-barro",
};

export function Metrica({ etiqueta, valor, unidad, nivel = "normal" }: Props) {
  return (
    <div className="glass px-5 py-4">
      <div className="text-sm text-campo-400">{etiqueta}</div>
      <div className={`mt-1 font-data text-2xl ${colorPorNivel[nivel]}`}>
        {valor !== null ? valor.toFixed(1) : "—"}
        <span className="ml-1 text-base text-campo-400">{unidad}</span>
      </div>
    </div>
  );
}
