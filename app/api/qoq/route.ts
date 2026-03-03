import { NextResponse } from "next/server";
import { runQuery, PROJECT, DATASET } from "@/lib/bigquery";

function quarterBounds(y: number, q: number): [string, string] {
  const starts = ["01-01","04-01","07-01","10-01"];
  const ends = ["03-31","06-30","09-30","12-31"];
  return [`${y}-${starts[q-1]}`, `${y}-${ends[q-1]}`];
}

function currentAndPrev(): [[number,number],[number,number]] {
  const now = new Date();
  const q = Math.floor(now.getMonth() / 3) + 1;
  const y = now.getFullYear();
  if (q === 1) return [[y, 1], [y-1, 4]];
  return [[y, q], [y, q-1]];
}

export const revalidate = 3600;

export async function GET() {
  const [[cy, cq], [py, pq]] = currentAndPrev();
  const [cs, ce] = quarterBounds(cy, cq);
  const [ps, pe] = quarterBounds(py, pq);

  const query = (start: string, end: string) => `
    SELECT platform, title, post_type, views, likes, comments, COALESCE(shares,0) as shares, published_at
    FROM \`${PROJECT}.${DATASET}.posts\`
    WHERE DATE(published_at) BETWEEN '${start}' AND '${end}'
  `;

  const [curr, prev] = await Promise.all([runQuery(query(cs, ce)), runQuery(query(ps, pe))]);

  const stats = (rows: Record<string,unknown>[]) => {
    if (!rows.length) return { total_posts:0, total_views:0, total_likes:0, avg_views:0, engagement_rate:0 };
    const tv = rows.reduce((s,r) => s + Number(r.views||0), 0);
    const tl = rows.reduce((s,r) => s + Number(r.likes||0), 0);
    const tc = rows.reduce((s,r) => s + Number(r.comments||0), 0);
    return {
      total_posts: rows.length, total_views: tv, total_likes: tl,
      avg_views: Math.round(tv / rows.length),
      engagement_rate: tv ? +((tl + tc) / tv * 100).toFixed(2) : 0,
    };
  };

  return NextResponse.json({
    current: { label: `Q${cq} ${cy}`, stats: stats(curr as Record<string,unknown>[]), posts: curr.slice(0,5) },
    previous: { label: `Q${pq} ${py}`, stats: stats(prev as Record<string,unknown>[]), posts: prev.slice(0,5) },
  });
}
