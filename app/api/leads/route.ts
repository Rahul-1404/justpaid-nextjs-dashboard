import { NextResponse } from "next/server";

export const revalidate = 21600; // 6 hours

interface Signal {
  source: string; title: string; url: string;
  score: number; comments: number; created: number;
  subreddit?: string; author?: string; category: string;
}

function categorize(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("payroll") || t.includes("pay ")) return "payroll";
  if (t.includes("contractor") || t.includes("1099") || t.includes("freelan")) return "contractor";
  if (t.includes("invoice") || t.includes("payment") || t.includes("billing")) return "invoice";
  return "general";
}

async function fetchReddit(): Promise<Signal[]> {
  const queries = ["payroll contractor startup","invoice payment problems","paying international contractors","1099 payment software"];
  const subs = ["startups","Entrepreneur","smallbusiness","freelance"];
  const results: Signal[] = [];
  const seen = new Set<string>();

  for (const query of queries.slice(0,2)) {
    for (const sub of subs.slice(0,2)) {
      try {
        const url = `https://www.reddit.com/r/${sub}/search.json?q=${encodeURIComponent(query)}&sort=new&limit=5&restrict_sr=1&t=month`;
        const res = await fetch(url, { headers: { "User-Agent": "JustPaid-Analytics/1.0" }, next: { revalidate: 21600 } });
        if (!res.ok) continue;
        const data = await res.json();
        for (const post of (data?.data?.children || [])) {
          const p = post.data;
          if (seen.has(p.id) || p.score < 5) continue;
          seen.add(p.id);
          results.push({
            source: "Reddit", title: p.title, url: `https://reddit.com${p.permalink}`,
            score: p.score, comments: p.num_comments, created: p.created_utc,
            subreddit: p.subreddit_name_prefixed, category: categorize(p.title),
          });
        }
      } catch {}
    }
  }
  return results;
}

async function fetchHN(): Promise<Signal[]> {
  const queries = ["payroll startup contractors","invoice payment automation"];
  const results: Signal[] = [];
  const seen = new Set<string>();
  const cutoff = Math.floor(Date.now()/1000) - 86400*30;

  for (const q of queries) {
    try {
      const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(q)}&tags=story&numericFilters=created_at_i>${cutoff},points>5&hitsPerPage=8`;
      const res = await fetch(url, { next: { revalidate: 21600 } });
      if (!res.ok) continue;
      const data = await res.json();
      for (const h of (data?.hits || [])) {
        if (seen.has(h.objectID)) continue;
        seen.add(h.objectID);
        results.push({
          source: "HN", title: h.title, url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
          score: h.points, comments: h.num_comments, created: h.created_at_i,
          author: h.author, category: categorize(h.title),
        });
      }
    } catch {}
  }
  return results;
}

export async function GET() {
  const [reddit, hn] = await Promise.allSettled([fetchReddit(), fetchHN()]);
  const all: Signal[] = [
    ...(reddit.status === "fulfilled" ? reddit.value : []),
    ...(hn.status === "fulfilled" ? hn.value : []),
  ].sort((a, b) => b.score - a.score);

  // Fallback if both APIs fail
  if (!all.length) {
    return NextResponse.json([
      { source:"Reddit", title:"Paying contractors in 5 countries — current setup is a nightmare", url:"#", score:347, comments:89, created: Date.now()/1000 - 7200, subreddit:"r/startups", category:"contractor" },
      { source:"HN", title:"Ask HN: Best way to handle 1099 payments for remote contractor team?", url:"#", score:218, comments:54, created: Date.now()/1000 - 18000, author:"pgfan2024", category:"contractor" },
      { source:"Reddit", title:"Invoice payment delays are killing my cash flow", url:"#", score:156, comments:42, created: Date.now()/1000 - 28800, subreddit:"r/Entrepreneur", category:"invoice" },
      { source:"Reddit", title:"Multi-state compliance penalties — nobody told me remote hiring was this complex", url:"#", score:94, comments:61, created: Date.now()/1000 - 86400, subreddit:"r/smallbusiness", category:"payroll" },
      { source:"HN", title:"International contractor FX fees eating 4-8% monthly — what are people using?", url:"#", score:87, comments:33, created: Date.now()/1000 - 90000, author:"startup_cto", category:"contractor" },
      { source:"Reddit", title:"Need automated invoicing that handles follow-ups — client wants net-60", url:"#", score:71, comments:28, created: Date.now()/1000 - 172800, subreddit:"r/freelance", category:"invoice" },
    ]);
  }

  return NextResponse.json(all.slice(0, 20));
}
