export function fmt(n: number | null | undefined): string {
  if (!n) return "0";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(Math.round(n));
}

export function timeAgo(ts: number): string {
  const diff = Date.now() / 1000 - ts;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export const PLATFORM_COLORS: Record<string, string> = {
  YouTube: "#FF4444",
  Instagram: "#E4405F",
  LinkedIn: "#0A66C2",
  Twitter: "#1DA1F2",
};

export const PLATFORM_ICONS: Record<string, string> = {
  YouTube: "▶️",
  Instagram: "📸",
  LinkedIn: "💼",
  Twitter: "𝕏",
};
