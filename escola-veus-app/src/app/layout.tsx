import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { NavBar } from "@/components/escola/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Escola dos Veus — Cursos",
  description: "Ve o que estava invisivel. Cursos de autoconhecimento pela Vivianne dos Santos.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0D0D1A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="font-sans bg-escola-bg text-escola-creme">
        <AuthProvider>
          <main className="pb-nav min-h-dvh">
            {children}
          </main>
          <NavBar />
        </AuthProvider>
      </body>
    </html>
  );
}
