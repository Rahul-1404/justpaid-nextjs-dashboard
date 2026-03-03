"use client";
import DashboardLayout from "@/components/DashboardLayout";
import CompBarChart from "@/components/CompBarChart";

const COMPETITORS = [
  { name:"JustPaid", tag:"Us — AI-powered payments", color:"#6C5CE7", highlight:true, linkedin:3400, twitter:2100, youtube:890, instagram:1200, engagement:4.2, postsPerWeek:4, funding:"$5.7M" },
  { name:"Deel", tag:"Global payroll giant", color:"#00B894", highlight:false, linkedin:185000, twitter:42000, youtube:12000, instagram:28000, engagement:1.1, postsPerWeek:14, funding:"$679M" },
  { name:"Rippling", tag:"HR + IT platform", color:"#E17055", highlight:false, linkedin:95000, twitter:31000, youtube:8400, instagram:15000, engagement:0.9, postsPerWeek:10, funding:"$1.2B" },
  { name:"Gusto", tag:"SMB payroll & HR", color:"#FDCB6E", highlight:false, linkedin:72000, twitter:25000, youtube:6800, instagram:22000, engagement:1.4, postsPerWeek:8, funding:"$746M" },
  { name:"Remote", tag:"Global employment", color:"#A29BFE", highlight:false, linkedin:48000, twitter:18000, youtube:3200, instagram:9000, engagement:1.8, postsPerWeek:7, funding:"$496M" },
];

function fmt(n:number) { if(n>=1_000_000) return `${(n/1_000_000).toFixed(1)}M`; if(n>=1_000) return `${(n/1_000).toFixed(0)}K`; return String(n); }

const GAPS = [
  { icon:"🤖", title:"AI payments content", desc:"Nobody owns the AI-powered payments narrative. JustPaid has 6 months head start.", action:"1 post/week → own the category" },
  { icon:"🎬", title:"YouTube SEO goldmine", desc:'"How to pay contractors in [country]" — 12K+ monthly searches, Gusto\'s last video was 2021.', action:"4 videos → own the keyword" },
  { icon:"👤", title:"Founder voice content", desc:"Personal first-person posts get 2.8× more engagement. Competitors can't do this authentically.", action:"2.8× engagement multiplier" },
  { icon:"⚔️", title:"Comparison content", desc:"Nobody makes JustPaid vs Deel content — but 8K people search this monthly.", action:"8K/mo search volume unclaimed" },
];

export default function CompetitivePage() {
  return (
    <DashboardLayout>
      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,rgba(0,184,148,0.08),rgba(108,92,231,0.05))", border:"1px solid rgba(0,184,148,0.15)", borderRadius:20, padding:"1.8rem 2rem", marginBottom:"2rem" }}>
        <div style={{ fontSize:"0.62rem", fontWeight:700, color:"#00B894", textTransform:"uppercase", letterSpacing:"2px", marginBottom:"0.4rem" }}>Competitive Intelligence</div>
        <h1 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:900, letterSpacing:"-1px", color:"#E2E2EA", margin:"0 0 0.4rem" }}>⚔️ JustPaid vs The Giants</h1>
        <p style={{ color:"#8A8A9A", fontSize:"0.88rem", margin:0 }}>Social presence comparison vs Deel, Rippling, Gusto and Remote. Find where we win despite smaller team.</p>
      </div>

      {/* Overview cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"1rem", marginBottom:"2rem" }}>
        {COMPETITORS.map(c => (
          <div key={c.name} style={{
            background: c.highlight ? "linear-gradient(135deg,rgba(108,92,231,0.1),rgba(0,206,201,0.05))" : "#12121A",
            border: `1px solid ${c.highlight ? "rgba(108,92,231,0.3)" : "rgba(255,255,255,0.06)"}`,
            borderRadius:14, padding:"1.3rem", textAlign:"center",
          }}>
            <div style={{ fontSize:"0.85rem", fontWeight:800, color:c.color, marginBottom:"0.2rem" }}>
              {c.name}{c.highlight ? " ★" : ""}
            </div>
            <div style={{ fontSize:"0.6rem", color:"#5A5A6A", marginBottom:"1rem" }}>{c.tag}</div>
            {[["LinkedIn", fmt(c.linkedin)], ["Twitter", fmt(c.twitter)], ["YouTube", fmt(c.youtube)]].map(([label, val]) => (
              <div key={label} style={{ marginBottom:"0.6rem" }}>
                <div style={{ fontSize:"0.58rem", color:"#5A5A6A", textTransform:"uppercase", letterSpacing:"0.8px" }}>{label}</div>
                <div style={{ fontSize:"1.1rem", fontWeight:700, color:"#E2E2EA" }}>{val}</div>
              </div>
            ))}
            <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:"0.6rem", marginTop:"0.4rem" }}>
              <div style={{ fontSize:"0.58rem", color:"#5A5A6A" }}>Funding</div>
              <div style={{ fontSize:"0.85rem", fontWeight:700, color:c.color }}>{c.funding}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement chart */}
      <div style={{ background:"#12121A", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, padding:"1.5rem", marginBottom:"2rem" }}>
        <div style={{ fontSize:"0.75rem", fontWeight:700, color:"#E2E2EA", marginBottom:"0.5rem" }}>📊 LinkedIn Engagement Rate — Where JustPaid Wins</div>
        <div style={{ fontSize:"0.78rem", color:"#5A5A6A", marginBottom:"1.2rem" }}>Despite 50× fewer followers, JustPaid's engagement is 3–4× higher than every competitor</div>
        <CompBarChart data={COMPETITORS.map(c => ({ name:c.name, value:c.engagement, color:c.color }))} unit="%" />
        <div style={{ marginTop:"1.5rem", background:"linear-gradient(135deg,rgba(108,92,231,0.08),rgba(0,206,201,0.04))", border:"1px solid rgba(108,92,231,0.2)", borderRadius:12, padding:"1.2rem", textAlign:"center" }}>
          <span style={{ fontSize:"2rem", fontWeight:900, background:"linear-gradient(135deg,#6C5CE7,#A29BFE,#00CEC9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>3–4×</span>
          <span style={{ fontSize:"0.95rem", color:"#E2E2EA", fontWeight:600, marginLeft:"0.8rem" }}>higher engagement than every competitor</span>
          <div style={{ fontSize:"0.78rem", color:"#5A5A6A", marginTop:"0.3rem" }}>with 50× smaller team · 100× smaller budget</div>
        </div>
      </div>

      {/* Posting frequency */}
      <div style={{ background:"#12121A", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, padding:"1.5rem", marginBottom:"2rem" }}>
        <div style={{ fontSize:"0.75rem", fontWeight:700, color:"#E2E2EA", marginBottom:"1.2rem" }}>📅 LinkedIn Posts per Week — Quality Beats Volume</div>
        <CompBarChart data={COMPETITORS.map(c => ({ name:c.name, value:c.postsPerWeek, color:c.color }))} unit=" posts/wk" />
        <div style={{ marginTop:"1rem", padding:"1rem", background:"rgba(0,184,148,0.05)", border:"1px solid rgba(0,184,148,0.15)", borderRadius:10 }}>
          <div style={{ fontSize:"0.78rem", color:"#00B894", fontWeight:600 }}>💡 Insight: Deel posts 14×/week at 1.1% engagement. JustPaid posts 4×/week at 4.2%. More content ≠ more reach.</div>
        </div>
      </div>

      {/* Gaps */}
      <div style={{ marginBottom:"0.8rem" }}>
        <div style={{ fontSize:"0.62rem", fontWeight:700, color:"#6C5CE7", textTransform:"uppercase", letterSpacing:"2px", marginBottom:"0.5rem" }}>Content Gaps</div>
        <div style={{ fontSize:"1.3rem", fontWeight:800, color:"#E2E2EA", marginBottom:"1.5rem" }}>4 Places We Can Win Despite Smaller Budget</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1.2rem" }}>
        {GAPS.map(g => (
          <div key={g.title} style={{ background:"#12121A", borderLeft:"3px solid #6C5CE7", borderRadius:"0 14px 14px 0", padding:"1.4rem", transition:"all 0.25s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform="translateY(-3px)"; el.style.boxShadow="0 12px 40px rgba(108,92,231,0.12)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform="translateY(0)"; el.style.boxShadow="none"; }}
          >
            <div style={{ fontSize:"1.8rem", marginBottom:"0.6rem" }}>{g.icon}</div>
            <div style={{ fontSize:"0.92rem", fontWeight:700, color:"#E2E2EA", marginBottom:"0.5rem" }}>{g.title}</div>
            <div style={{ fontSize:"0.8rem", color:"#8A8A9A", lineHeight:1.6, marginBottom:"1rem" }}>{g.desc}</div>
            <span style={{ background:"rgba(108,92,231,0.12)", color:"#A29BFE", fontSize:"0.68rem", fontWeight:700, padding:"0.25rem 0.8rem", borderRadius:20 }}>{g.action}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
