import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Lectura, Recomendacion, RiegoEstado } from "../types";

export function useParcelaDetalle(parcelaId: string | null) {
  const [lecturas, setLecturas] = useState<Lectura[]>([]);
  const [alertas, setAlertas] = useState<Recomendacion[]>([]);
  const [riego, setRiego] = useState<RiegoEstado | null>(null);

  useEffect(() => {
    if (!parcelaId) return;
    let activo = true;

    async function cargarTodo() {
      const [lecturasRes, alertasRes, riegoRes] = await Promise.all([
        supabase
          .from("lecturas")
          .select("*")
          .eq("parcela_id", parcelaId)
          .order("timestamp", { ascending: false })
          .limit(24),
        supabase
          .from("recomendaciones")
          .select("*")
          .eq("parcela_id", parcelaId)
          .eq("atendida", false)
          .order("created_at", { ascending: false }),
        supabase.from("riego_estado").select("*").eq("parcela_id", parcelaId).single(),
      ]);

      if (!activo) return;
      if (lecturasRes.data) setLecturas(lecturasRes.data as Lectura[]);
      if (alertasRes.data) setAlertas(alertasRes.data as Recomendacion[]);
      if (riegoRes.data) setRiego(riegoRes.data as RiegoEstado);
    }

    cargarTodo();

    const canal = supabase
      .channel(`parcela-${parcelaId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "lecturas", filter: `parcela_id=eq.${parcelaId}` },
        () => cargarTodo()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "recomendaciones", filter: `parcela_id=eq.${parcelaId}` },
        () => cargarTodo()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "riego_estado", filter: `parcela_id=eq.${parcelaId}` },
        () => cargarTodo()
      )
      .subscribe();

    return () => {
      activo = false;
      supabase.removeChannel(canal);
    };
  }, [parcelaId]);

  async function alternarRiego() {
    if (!parcelaId || !riego) return;
    await supabase
      .from("riego_estado")
      .update({ valvula_activa: !riego.valvula_activa })
      .eq("parcela_id", parcelaId);
  }

  const ultimaLectura = lecturas[0] ?? null;

  return { lecturas, alertas, riego, ultimaLectura, alternarRiego };
}
