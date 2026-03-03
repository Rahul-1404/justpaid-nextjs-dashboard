import { fmt } from "@/lib/utils";
import { PLATFORM_COLORS } from "@/lib/utils";

interface Post { platform:string; title:string; post_type:string; views:number; likes:number; comments:number; }

export default function TopPostsTable({ posts }: { posts: Post[] }) {
  if (!posts?.length) return <div style={{ color:"#5A5A6A", textAlign:"center", padding:"2rem" }}>No data</div>;
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"0.82rem" }}>
        <thead>
          <tr style={{ borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            {["Platform","Title","Type","Views","Likes","Comments"].map(h => (
              <th key={h} style={{ padding:"0.6rem 0.8rem", textAlign:"left", color:"#5A5A6A", fontWeight:600, fontSize:"0.68rem", textTransform:"uppercase", letterSpacing:"0.8px" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map((p, i) => (
            <tr key={i} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
            >
              <td style={{ padding:"0.7rem 0.8rem" }}>
                <span style={{ color: PLATFORM_COLORS[p.platform]||"#6C5CE7", fontWeight:600, fontSize:"0.75rem" }}>{p.platform}</span>
              </td>
              <td style={{ padding:"0.7rem 0.8rem", color:"#E2E2EA", maxWidth:280, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.title}</td>
              <td style={{ padding:"0.7rem 0.8rem" }}>
                <span style={{ background:"rgba(108,92,231,0.12)", color:"#A29BFE", fontSize:"0.65rem", fontWeight:600, padding:"0.2rem 0.6rem", borderRadius:20 }}>{p.post_type}</span>
              </td>
              <td style={{ padding:"0.7rem 0.8rem", color:"#E2E2EA", fontWeight:600 }}>{fmt(p.views)}</td>
              <td style={{ padding:"0.7rem 0.8rem", color:"#00B894" }}>{fmt(p.likes)}</td>
              <td style={{ padding:"0.7rem 0.8rem", color:"#8A8A9A" }}>{fmt(p.comments)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
