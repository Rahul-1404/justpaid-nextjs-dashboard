interface KpiCardProps {
  platform: string;
  icon: string;
  color: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  sub: string;
  subValue: string;
}

export default function KpiCard({ platform, icon, color, value, delta, deltaPositive, sub, subValue }: KpiCardProps) {
  return (
    <div style={{
      background: "#12121A", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 16, padding: "1.6rem", textAlign: "center",
      transition: "all 0.25s", cursor: "default",
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = color + "44";
      el.style.boxShadow = `0 0 30px ${color}18`;
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = "rgba(255,255,255,0.06)";
      el.style.boxShadow = "none";
    }}
    >
      <div style={{ fontSize: "2.2rem", marginBottom: "0.8rem" }}>{icon}</div>
      <div style={{ fontSize: "0.62rem", fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.6rem" }}>{platform}</div>
      <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#E2E2EA", letterSpacing: "-1px" }}>{value}</div>
      <div style={{ marginTop: "0.4rem" }}>
        <span style={{
          background: deltaPositive ? "rgba(0,184,148,0.12)" : "rgba(225,112,85,0.12)",
          color: deltaPositive ? "#00B894" : "#E17055",
          fontSize: "0.75rem", fontWeight: 700, padding: "0.25rem 0.7rem", borderRadius: "20px",
        }}>
          {deltaPositive ? "↑" : "↓"} {delta}
        </span>
      </div>
      <div style={{ marginTop: "1.2rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: "0.6rem", color: "#5A5A6A", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.2rem" }}>{sub}</div>
        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#E2E2EA" }}>{subValue}</div>
      </div>
    </div>
  );
}
