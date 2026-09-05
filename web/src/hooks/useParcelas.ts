import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Parcela } from "../types";

export function useParcelas() {
  const [parcelas, setParcelas] = useState<Parcela[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    async function cargar() {
      const { data, error } = await supabase
        .from("parcelas")
        .select("*")
        .order("created_at", { ascending: true });

      if (!activo) return;
      if (!error && data) setParcelas(data as Parcela[]);
      setCargando(false);
    }

    cargar();

    const canal = supabase
      .channel("parcelas-cambios")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "parcelas" },
        () => cargar()
      )
      .subscribe();

    return () => {
      activo = false;
      supabase.removeChannel(canal);
    };
  }, []);

  return { parcelas, cargando };
}
