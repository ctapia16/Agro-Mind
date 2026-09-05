export interface Parcela {
  id: string;
  usuario_id: string;
  nombre: string;
  superficie: number | null;
  ubicacion: string | null;
  cultivo: string | null;
  created_at: string;
}

export interface Lectura {
  id: number;
  sensor_id: string;
  parcela_id: string;
  timestamp: string;
  soil_moisture: number | null;
  temperature: number | null;
  humidity: number | null;
  nitrogen: number | null;
  phosphorus: number | null;
  potassium: number | null;
  wind_speed: number | null;
}

export interface Recomendacion {
  id: number;
  parcela_id: string;
  lectura_id: number | null;
  tipo: string;
  severidad: "info" | "advertencia" | "critica";
  mensaje: string;
  atendida: boolean;
  created_at: string;
}

export interface RiegoEstado {
  parcela_id: string;
  valvula_activa: boolean;
  activado_en: string | null;
  humedad_objetivo: number;
}
