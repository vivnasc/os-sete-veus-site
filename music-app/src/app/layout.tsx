import type { Metadata } from "next";
import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";
import MiniPlayer from "@/components/music/MiniPlayer";
import FullPlayer from "@/components/music/FullPlayer";
import NoDownload from "@/components/music/NoDownload";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sete Ecos Music",
    template: "%s | Sete Ecos Music",
  },
  description: "Musica original do universo Sete Veus. Streaming, letras e partilha.",
  metadataBase: new URL("https://music.seteveus.space"),
  openGraph: {
    title: "Sete Ecos Music",
    description: "Musica original do universo Sete Veus. 35 albums, 200+ faixas.",
    siteName: "Sete Ecos Music",
    locale: "pt_PT",
    type: "website",
  },
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
          <div className="min-h-screen bg-[#0D0D1A] text-[#F5F0E6]">
            <div className="pb-24">
              {children}
            </div>
            <MiniPlayer />
            <FullPlayer />
            <NoDownload />
          </div>
        </MusicPlayerProvider>
      </body>
    </html>
  );
}
