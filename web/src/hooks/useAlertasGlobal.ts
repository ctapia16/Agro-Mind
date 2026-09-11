import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Recomendacion } from "../types";

interface RecomendacionConParcela extends Recomendacion {
  parcela_nombre: string;
}

export function useAlertasGlobal() {
  const [alertas, setAlertas] = useState<RecomendacionConParcela[]>([]);
  const [cargando, setCargando] = useState(true);

  async function cargar() {
    const { data, error } = await supabase
      .from("recomendaciones")
      .select("*, parcelas(nombre)")
      .order("created_at", { ascending: false })
      .limit(100);

    if (!error && data) {
      setAlertas(
        data.map((a: any) => ({ ...a, parcela_nombre: a.parcelas?.nombre ?? "—" }))
      );
    }
    setCargando(false);
  }

  useEffect(() => {
    cargar();

    const canal = supabase
      .channel("alertas-globales")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "recomendaciones" },
        () => cargar()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, []);

  async function marcarAtendida(id: number) {
    await supabase.from("recomendaciones").update({ atendida: true }).eq("id", id);
  }

  return { alertas, cargando, marcarAtendida };
}
