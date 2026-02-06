import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Os Sete Véus — Histórias para quem está pronta para se escolher",
    template: "%s | Os Sete Véus",
  },
  description:
    "Sete histórias que te devolvem a ti mesma. Sem pressa. Sem fórmulas. Apenas verdade. Uma colecção de ficção psicológica por Vivianne dos Santos.",
  metadataBase: new URL("https://seteecos.com"),
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Os Sete Véus — Histórias para quem está pronta para se escolher",
    description:
      "Sete histórias que te devolvem a ti mesma. Sem pressa. Sem fórmulas. Apenas verdade.",
    siteName: "Os Sete Véus",
    locale: "pt_PT",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Os Sete Véus — Histórias para quem está pronta para se escolher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Os Sete Véus — Histórias para quem está pronta para se escolher",
    description:
      "Sete histórias que te devolvem a ti mesma. Sem pressa. Sem fórmulas. Apenas verdade.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
