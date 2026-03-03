import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JustPaid Social Intelligence",
  description: "Real-time social analytics across all platforms",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#0A0A0F", color: "#E2E2EA", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
