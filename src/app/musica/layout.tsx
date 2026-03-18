import type { Metadata } from "next";
import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";
import MiniPlayer from "@/components/music/MiniPlayer";
import FullPlayer from "@/components/music/FullPlayer";

export const metadata: Metadata = {
  title: {
    default: "Sete Ecos Music",
    template: "%s | Sete Ecos Music",
  },
  description: "Musica original do universo Sete Veus. Streaming, letras e partilha.",
};

export default function MusicLayout({ children }: { children: React.ReactNode }) {
  return (
    <MusicPlayerProvider>
      <div className="min-h-screen bg-[#0D0D1A] text-[#F5F0E6]">
        <div className="pb-24">
          {children}
        </div>
        <MiniPlayer />
        <FullPlayer />
      </div>
    </MusicPlayerProvider>
  );
}
