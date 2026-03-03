"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PLATFORM_COLORS } from "@/lib/utils";
import { useMemo } from "react";

const TOOLTIP_STYLE = {
  background: "#1A1D29", border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10, fontSize: 12, color: "#E2E2EA",
};

export default function GrowthChart({ data }: { data: {platform:string; date:{value:string}|string; followers:number}[] }) {
  const chartData = useMemo(() => {
    if (!data?.length) return [];
    const byDate: Record<string, Record<string,number>> = {};
    data.forEach(r => {
      const d = typeof r.date === "object" ? r.date.value : String(r.date);
      if (!byDate[d]) byDate[d] = {};
      byDate[d][r.platform] = Number(r.followers);
    });
    return Object.entries(byDate).sort(([a],[b]) => a.localeCompare(b)).map(([date, vals]) => ({ date: date.slice(5), ...vals }));
  }, [data]);

  const platforms = ["YouTube","Instagram","LinkedIn","Twitter"];

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={chartData}>
        <XAxis dataKey="date" tick={{ fill:"#5A5A6A", fontSize:10 }} tickLine={false} axisLine={false} interval={14} />
        <YAxis tick={{ fill:"#5A5A6A", fontSize:10 }} tickLine={false} axisLine={false} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(1)}K` : v} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Legend wrapperStyle={{ fontSize:11, color:"#8A8A9A" }} />
        {platforms.map(p => (
          <Line key={p} type="monotone" dataKey={p} stroke={PLATFORM_COLORS[p]}
            strokeWidth={2} dot={false} activeDot={{ r:4 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
