import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Lectura } from "../types";

export function HumedadChart({ lecturas }: { lecturas: Lectura[] }) {
  const datos = [...lecturas]
    .reverse()
    .map((l) => ({
      hora: new Date(l.timestamp).toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      humedad: l.soil_moisture,
    }));

  if (datos.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-campo-400">
        Todavía no hay lecturas para graficar.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={datos} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="humedadFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8BAA4C" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#8BAA4C" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="hora"
          stroke="#7C8A66"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#7C8A66"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
          width={32}
        />
        <Tooltip
          contentStyle={{
            background: "rgba(22, 31, 20, 0.85)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 12,
            fontSize: 13,
          }}
          labelStyle={{ color: "#EDEFE3" }}
        />
        <Area
          type="monotone"
          dataKey="humedad"
          stroke="#8BAA4C"
          strokeWidth={2}
          fill="url(#humedadFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
