import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export interface RiegoConParcela {
  parcela_id: string;
  parcela_nombre: string;
  valvula_activa: boolean;
  humedad_objetivo: number;
  activado_en: string | null;
}

export function useRiegoGlobal() {
  const [riegos, setRiegos] = useState<RiegoConParcela[]>([]);
  const [cargando, setCargando] = useState(true);

  async function cargar() {
    const { data, error } = await supabase
      .from("riego_estado")
      .select("*, parcelas(nombre)")
      .order("parcela_id");

    if (!error && data) {
      setRiegos(
        data.map((r: any) => ({
          parcela_id: r.parcela_id,
          parcela_nombre: r.parcelas?.nombre ?? "—",
          valvula_activa: r.valvula_activa,
          humedad_objetivo: r.humedad_objetivo,
          activado_en: r.activado_en,
        }))
      );
    }
    setCargando(false);
  }

  useEffect(() => {
    cargar();

    const canal = supabase
      .channel("riego-global")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "riego_estado" },
        () => cargar()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, []);

  async function alternar(parcelaId: string, activaActual: boolean) {
    await supabase
      .from("riego_estado")
      .update({ valvula_activa: !activaActual })
      .eq("parcela_id", parcelaId);
  }

  return { riegos, cargando, alternar };
}
