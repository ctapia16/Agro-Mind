import type { LucideIcon } from "lucide-react";

interface Props {
  icono: LucideIcon;
  valor: number | string;
  etiqueta: string;
  acento?: "hoja" | "ocre" | "barro" | "cielo";
}

const colorPorAcento: Record<string, string> = {
  hoja: "bg-hoja/15 text-hoja",
  ocre: "bg-ocre/15 text-ocre",
  barro: "bg-barro/15 text-barro",
  cielo: "bg-sky-200/15 text-sky-200",
};

export function StatTile({ icono: Icono, valor, etiqueta, acento = "hoja" }: Props) {
  return (
    <div className="glass flex items-center gap-3 px-4 py-3.5">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colorPorAcento[acento]}`}>
        <Icono size={20} />
      </span>
      <div>
        <div className="font-data text-xl leading-none text-campo-100">{valor}</div>
        <div className="mt-1 text-xs text-campo-400">{etiqueta}</div>
      </div>
    </div>
  );
}
