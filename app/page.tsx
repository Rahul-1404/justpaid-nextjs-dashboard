export const dynamic = "force-dynamic";
import DashboardLayout from "@/components/DashboardLayout";
import KpiCard from "@/components/KpiCard";
import GrowthChart from "@/components/GrowthChart";
import EngagementChart from "@/components/EngagementChart";
import TopPostsTable from "@/components/TopPostsTable";
import QoQSection from "@/components/QoQSection";
import { PLATFORM_COLORS, PLATFORM_ICONS, fmt } from "@/lib/utils";

async function getMetrics() {
  try {
    const base = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
    const res = await fetch(`${base}/api/metrics`, { next: { revalidate: 3600 } });
    return res.json();
  } catch { return []; }
}
async function getGrowth() {
  try {
    const base = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
    const res = await fetch(`${base}/api/growth`, { next: { revalidate: 3600 } });
    return res.json();
  } catch { return []; }
}
async function getPosts() {
  try {
    const base = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
    const res = await fetch(`${base}/api/posts`, { next: { revalidate: 3600 } });
    return res.json();
  } catch { return []; }
}
async function getQoQ() {
  try {
    const base = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
    const res = await fetch(`${base}/api/qoq`, { next: { revalidate: 3600 } });
    return res.json();
  } catch { return null; }
}

const PLATFORM_ORDER = ["YouTube", "Instagram", "LinkedIn", "Twitter"];

export default async function Home() {
  const [metrics, growth, posts, qoq] = await Promise.all([getMetrics(), getGrowth(), getPosts(), getQoQ()]);
  const now = new Date().toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric" });

  return (
    <DashboardLayout>
      {/* Hero header */}
      <div style={{
        background: "linear-gradient(135deg,rgba(108,92,231,0.12) 0%,rgba(0,206,201,0.06) 100%)",
        border: "1px solid rgba(108,92,231,0.18)", borderRadius: 20,
        padding: "1.8rem 2rem", marginBottom: "2rem",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem",
      }}>
        <div>
          <div style={{ fontSize: "0.62rem", fontWeight: 700, color: "#6C5CE7", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "0.4rem" }}>
            JustPaid · Marketing Intelligence
          </div>
          <h1 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, letterSpacing: "-1px", color: "#E2E2EA", margin: 0 }}>
            Social Media{" "}
            <span style={{ background: "linear-gradient(135deg,#6C5CE7,#A29BFE,#00CEC9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Command Center
            </span>
          </h1>
          <p style={{ color: "#8A8A9A", fontSize: "0.85rem", marginTop: "0.3rem" }}>
            Real-time performance across YouTube · Instagram · LinkedIn · X
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.68rem", color: "#5A5A6A" }}>Last updated</div>
          <div style={{ fontSize: "0.85rem", color: "#E2E2EA", fontWeight: 600, marginTop: "0.2rem" }}>{now}</div>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.6rem", justifyContent: "flex-end" }}>
            <span style={{ background: "rgba(0,184,148,0.15)", color: "#00B894", fontSize: "0.62rem", fontWeight: 700, padding: "0.2rem 0.7rem", borderRadius: "20px" }}>● LIVE</span>
            <span style={{ background: "rgba(108,92,231,0.12)", color: "#A29BFE", fontSize: "0.62rem", fontWeight: 700, padding: "0.2rem 0.7rem", borderRadius: "20px" }}>BigQuery</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.2rem", marginBottom: "2rem" }}>
        {PLATFORM_ORDER.map(platform => {
          const m = metrics.find((r: {platform:string}) => r.platform === platform) || {};
          const followers = Number(m.followers || 0);
          const change = Number(m.follower_change || 0);
          const engagement = Number(m.engagement_rate || 0);
          const pct = followers > 0 ? Math.abs(((change / (followers - change)) * 100)).toFixed(0) : "0";
          return (
            <KpiCard key={platform}
              platform={platform}
              icon={PLATFORM_ICONS[platform]}
              color={PLATFORM_COLORS[platform]}
              value={fmt(followers)}
              delta={`+${pct}% QoQ`}
              deltaPositive={change >= 0}
              sub="Engagement"
              subValue={`${engagement.toFixed(1)}%`}
            />
          );
        })}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ background: "#12121A", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "1.5rem" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#E2E2EA", marginBottom: "1rem" }}>📈 Follower Growth</div>
          <GrowthChart data={growth} />
        </div>
        <div style={{ background: "#12121A", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "1.5rem" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#E2E2EA", marginBottom: "1rem" }}>💥 Engagement Rate</div>
          <EngagementChart data={metrics} />
        </div>
      </div>

      {/* Top posts */}
      <div style={{ background: "#12121A", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#E2E2EA", marginBottom: "1rem" }}>🏆 Top Performing Content</div>
        <TopPostsTable posts={posts} />
      </div>

      {/* QoQ */}
      {qoq && <QoQSection data={qoq} />}
    </DashboardLayout>
  );
}
