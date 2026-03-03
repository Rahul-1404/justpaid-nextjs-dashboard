import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A0F" }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, padding: "2rem 2.5rem", maxWidth: "calc(100vw - 220px)" }}>
        {children}
      </main>
    </div>
  );
}
