"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";

const TOOLTIP_STYLE = {
  background: "#1A1D29", border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10, fontSize: 12, color: "#E2E2EA",
};

export default function CompBarChart({ data, unit }: { data:{name:string;value:number;color:string}[]; unit:string }) {
  const sorted = [...data].sort((a,b) => b.value - a.value);
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={sorted}>
        <XAxis dataKey="name" tick={{ fill:"#8A8A9A", fontSize:11 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill:"#5A5A6A", fontSize:10 }} tickLine={false} axisLine={false} tickFormatter={v => `${v}${unit.trim()}`} />
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v:number) => [`${v}${unit}`, ""]} />
        <Bar dataKey="value" radius={[6,6,0,0]}>
          {sorted.map(entry => <Cell key={entry.name} fill={entry.color} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
