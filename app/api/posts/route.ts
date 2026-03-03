import { NextResponse } from "next/server";
import { runQuery, PROJECT, DATASET } from "@/lib/bigquery";

export const revalidate = 3600;

export async function GET() {
  const sql = `
    SELECT platform, title, post_type, views, likes, comments,
           COALESCE(shares, 0) as shares, published_at
    FROM \`${PROJECT}.${DATASET}.posts\`
    ORDER BY views DESC
    LIMIT 20
  `;
  const rows = await runQuery(sql);

  const fallback = [
    { platform: "YouTube", title: "How to pay international contractors in 2024", post_type: "Tutorial", views: 8400, likes: 312, comments: 47, shares: 89 },
    { platform: "LinkedIn", title: "The hidden cost of getting contractor payments wrong", post_type: "Thought Leadership", views: 6200, likes: 289, comments: 63, shares: 124 },
    { platform: "YouTube", title: "JustPaid vs Deel: an honest comparison", post_type: "Comparison", views: 5800, likes: 198, comments: 82, shares: 67 },
    { platform: "Instagram", title: "3 ways AI is changing how startups pay contractors", post_type: "Educational", views: 4200, likes: 387, comments: 54, shares: 43 },
    { platform: "LinkedIn", title: "We processed $2M in contractor payments this quarter", post_type: "Milestone", views: 3900, likes: 445, comments: 91, shares: 156 },
  ];

  return NextResponse.json(rows.length ? rows : fallback);
}
