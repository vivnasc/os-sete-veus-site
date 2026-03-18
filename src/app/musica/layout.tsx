"use client";

import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";
import MiniPlayer from "@/components/music/MiniPlayer";
import FullPlayer from "@/components/music/FullPlayer";
import NoDownload from "@/components/music/NoDownload";

export default function MusicLayout({ children }: { children: React.ReactNode }) {
  return (
    <MusicPlayerProvider>
      <div className="pb-24">
        {children}
      </div>
      <MiniPlayer />
      <FullPlayer />
      <NoDownload />
    </MusicPlayerProvider>
  );
}
