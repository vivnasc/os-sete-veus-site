import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import Chatbot from "@/components/Chatbot";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sete Ecos — Plataforma de Autoconhecimento | Os Sete Véus",
    template: "%s | Sete Ecos",
  },
  description:
    "Plataforma de autoconhecimento com leitura integrada, diário de reflexão, práticas guiadas e recursos gratuitos. Sete histórias que te devolvem a ti mesma. Por Vivianne dos Santos.",
  keywords: [
    "autoconhecimento",
    "desenvolvimento pessoal",
    "ficção psicológica",
    "leitura integrada",
    "diário de reflexão",
    "Vivianne dos Santos",
    "Os Sete Véus",
    "Sete Ecos",
    "plataforma de leitura",
    "crescimento pessoal",
    "meditação guiada",
    "Moçambique",
  ],
  metadataBase: new URL("https://seteveus.space"),
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Sete Ecos — Plataforma de Autoconhecimento",
    description:
      "Leitura integrada, diário de reflexão, práticas guiadas e recursos gratuitos. Mais do que livros — um ecossistema de regresso a ti.",
    siteName: "Sete Ecos",
    locale: "pt_PT",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sete Ecos — Plataforma de Autoconhecimento com Leitura Integrada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sete Ecos — Plataforma de Autoconhecimento",
    description:
      "Leitura integrada, diário de reflexão, práticas guiadas e recursos gratuitos. Mais do que livros — um ecossistema de regresso a ti.",
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
        <link
          href="https://fonts.cdnfonts.com/css/opendyslexic"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Sete Ecos",
              alternateName: "Os Sete Véus",
              url: "https://seteveus.space",
              description:
                "Plataforma de autoconhecimento com leitura integrada, diário de reflexão, práticas guiadas e recursos gratuitos. Sete histórias que te devolvem a ti mesma.",
              author: {
                "@type": "Person",
                name: "Vivianne dos Santos",
                nationality: "Mozambican",
                jobTitle: "Escritora e Economista",
              },
              publisher: {
                "@type": "Organization",
                name: "Sete Ecos",
                logo: {
                  "@type": "ImageObject",
                  url: "https://seteveus.space/images/logo-espiral.png.jpeg",
                },
              },
              potentialAction: [
                {
                  "@type": "ReadAction",
                  target: "https://seteveus.space/ecossistema",
                },
                {
                  "@type": "SearchAction",
                  target: "https://seteveus.space/recursos",
                },
              ],
              offers: {
                "@type": "Offer",
                price: "23",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: "https://seteveus.space/livro-fisico",
              },
            }),
          }}
        />
        <AuthProvider>
          <ServiceWorkerRegistration />
          <Header />
          <main>{children}</main>
          <Footer />
          <AccessibilityPanel />
          <Chatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
