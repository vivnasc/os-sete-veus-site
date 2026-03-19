import type { Metadata, Viewport } from "next";
import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import MiniPlayer from "@/components/music/MiniPlayer";
import FullPlayer from "@/components/music/FullPlayer";
import NoDownload from "@/components/music/NoDownload";
import RegisterSW from "@/components/RegisterSW";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Veus",
    template: "%s | Veus",
  },
  description: "Musica original do universo Sete Veus. Banda sonora para a tua transformacao.",
  metadataBase: new URL("https://veus.app"),
  manifest: "/manifest.json",
  icons: {
    icon: "/music_veus_faicon.png",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Veus",
  },
  openGraph: {
    title: "Veus",
    description: "Musica original do universo Sete Veus. Banda sonora para a tua transformacao.",
    siteName: "Veus",
    locale: "pt_PT",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D1A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <MusicPlayerProvider>
          <SubscriptionProvider>
            <div className="min-h-screen bg-[#0D0D1A] text-[#F5F0E6]">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#C9A96E] focus:text-[#0D0D1A] focus:rounded-lg"
              >
                Saltar para o conteudo
              </a>
              <div id="main-content" className="pb-24">
                {children}
              </div>
              <MiniPlayer />
              <FullPlayer />
              <NoDownload />
              <RegisterSW />
            </div>
          </SubscriptionProvider>
        </MusicPlayerProvider>
      </body>
    </html>
  );
}
