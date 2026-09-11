import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export interface SensorConParcela {
  sensor_id: string;
  tipo: string;
  estado: string;
  fecha_instalacion: string;
  parcela_id: string;
  parcela_nombre: string;
}

export function useSensoresGlobal() {
  const [sensores, setSensores] = useState<SensorConParcela[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    async function cargar() {
      const { data, error } = await supabase
        .from("sensores")
        .select("sensor_id, tipo, estado, fecha_instalacion, parcela_id, parcelas(nombre)")
        .order("fecha_instalacion", { ascending: false });

      if (!activo) return;
      if (!error && data) {
        setSensores(
          data.map((s: any) => ({
            sensor_id: s.sensor_id,
            tipo: s.tipo,
            estado: s.estado,
            fecha_instalacion: s.fecha_instalacion,
            parcela_id: s.parcela_id,
            parcela_nombre: s.parcelas?.nombre ?? "—",
          }))
        );
      }
      setCargando(false);
    }

    cargar();
    return () => {
      activo = false;
    };
  }, []);

  return { sensores, cargando };
}
