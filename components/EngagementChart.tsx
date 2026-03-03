"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { PLATFORM_COLORS } from "@/lib/utils";

const TOOLTIP_STYLE = {
  background: "#1A1D29", border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10, fontSize: 12, color: "#E2E2EA",
};

export default function EngagementChart({ data }: { data: {platform:string; engagement_rate:number}[] }) {
  const sorted = [...(data||[])].sort((a,b) => Number(b.engagement_rate) - Number(a.engagement_rate));
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={sorted} layout="vertical">
        <XAxis type="number" tick={{ fill:"#5A5A6A", fontSize:10 }} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
        <YAxis type="category" dataKey="platform" tick={{ fill:"#8A8A9A", fontSize:11 }} tickLine={false} axisLine={false} width={70} />
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v:number) => [`${v}%`, "Engagement"]} />
        <Bar dataKey="engagement_rate" radius={[0,6,6,0]}>
          {sorted.map((entry) => (
            <Cell key={entry.platform} fill={PLATFORM_COLORS[entry.platform] || "#6C5CE7"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
