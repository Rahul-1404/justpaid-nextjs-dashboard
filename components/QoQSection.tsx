import { fmt } from "@/lib/utils";

interface QoQData {
  current: { label:string; stats:{total_posts:number;total_views:number;total_likes:number;avg_views:number;engagement_rate:number}; posts:{title:string;views:number;platform:string}[] };
  previous: { label:string; stats:{total_posts:number;total_views:number;total_likes:number;avg_views:number;engagement_rate:number}; posts:{title:string;views:number;platform:string}[] };
}

export default function QoQSection({ data }: { data: QoQData }) {
  const { current, previous } = data;
  const metrics = [
    { label:"Posts", curr: current.stats.total_posts, prev: previous.stats.total_posts, format: (v:number) => String(v) },
    { label:"Total Views", curr: current.stats.total_views, prev: previous.stats.total_views, format: fmt },
    { label:"Total Likes", curr: current.stats.total_likes, prev: previous.stats.total_likes, format: fmt },
    { label:"Avg Views/Post", curr: current.stats.avg_views, prev: previous.stats.avg_views, format: fmt },
    { label:"Engagement", curr: current.stats.engagement_rate, prev: previous.stats.engagement_rate, format: (v:number) => `${v}%` },
  ];

  return (
    <div style={{ background:"#12121A", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, padding:"1.5rem" }}>
      <div style={{ fontSize:"0.75rem", fontWeight:700, color:"#E2E2EA", marginBottom:"1.2rem" }}>
        📊 Quarter-over-Quarter: <span style={{ color:"#6C5CE7" }}>{current.label}</span> vs <span style={{ color:"#5A5A6A" }}>{previous.label}</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"1rem" }}>
        {metrics.map(({ label, curr, prev, format }) => {
          const diff = curr - prev;
          const pct = prev > 0 ? ((diff/prev)*100).toFixed(1) : "0";
          const up = diff >= 0;
          return (
            <div key={label} style={{ textAlign:"center", background:"rgba(255,255,255,0.02)", borderRadius:12, padding:"1rem" }}>
              <div style={{ fontSize:"0.6rem", color:"#5A5A6A", textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:"0.4rem" }}>{label}</div>
              <div style={{ fontSize:"1.4rem", fontWeight:800, color:"#E2E2EA" }}>{format(curr)}</div>
              <div style={{ fontSize:"0.7rem", fontWeight:600, color: up ? "#00B894":"#E17055", marginTop:"0.3rem" }}>
                {up ? "↑" : "↓"} {Math.abs(Number(pct))}%
              </div>
              <div style={{ fontSize:"0.6rem", color:"#3A3A4A", marginTop:"0.2rem" }}>{previous.label}: {format(prev)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
