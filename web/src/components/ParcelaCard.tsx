import { Link } from "react-router-dom";
import { FOTOS } from "../lib/images";
import type { Parcela } from "../types";

const FOTOS_POR_INDICE = [FOTOS.maizAtardecer, FOTOS.invernadero, FOTOS.maizCultivo];

interface Props {
  parcela: Parcela;
  indice: number;
  humedad?: number | null;
}

export function ParcelaCard({ parcela, indice, humedad }: Props) {
  const foto = FOTOS_POR_INDICE[indice % FOTOS_POR_INDICE.length];

  return (
    <Link
      to={`/parcelas/${parcela.id}`}
      className="glass group block overflow-hidden transition-transform hover:-translate-y-0.5"
    >
      <div className="relative h-28 w-full overflow-hidden">
        <img
          src={foto}
          alt={parcela.cultivo ?? parcela.nombre}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-campo-950/80 to-transparent" />
        {humedad !== null && humedad !== undefined && (
          <span className="absolute right-2 top-2 rounded-full bg-campo-950/70 px-2 py-0.5 font-data text-xs text-hoja backdrop-blur-sm">
            {humedad.toFixed(0)}%
          </span>
        )}
      </div>
      <div className="px-4 py-3">
        <div className="font-medium text-campo-100">{parcela.nombre}</div>
        <div className="text-xs text-campo-400">
          {parcela.cultivo ?? "Sin cultivo"} · {parcela.superficie ? `${parcela.superficie} ha` : "—"}
        </div>
      </div>
    </Link>
  );
}
