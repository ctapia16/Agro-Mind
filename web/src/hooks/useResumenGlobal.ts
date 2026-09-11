import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export interface ResumenGlobal {
  totalParcelas: number;
  totalSensores: number;
  riegosUltimas24h: number;
  alertasActivas: number;
}

export function useResumenGlobal() {
  const [resumen, setResumen] = useState<ResumenGlobal | null>(null);

  useEffect(() => {
    let activo = true;

    async function cargar() {
      const hace24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      const [parcelas, sensores, riegos, alertas] = await Promise.all([
        supabase.from("parcelas").select("id", { count: "exact", head: true }),
        supabase.from("sensores").select("sensor_id", { count: "exact", head: true }),
        supabase
          .from("riego_eventos")
          .select("id", { count: "exact", head: true })
          .gte("created_at", hace24h),
        supabase
          .from("recomendaciones")
          .select("id", { count: "exact", head: true })
          .eq("atendida", false),
      ]);

      if (!activo) return;
      setResumen({
        totalParcelas: parcelas.count ?? 0,
        totalSensores: sensores.count ?? 0,
        riegosUltimas24h: riegos.count ?? 0,
        alertasActivas: alertas.count ?? 0,
      });
    }

    cargar();
    return () => {
      activo = false;
    };
  }, []);

  return resumen;
}
