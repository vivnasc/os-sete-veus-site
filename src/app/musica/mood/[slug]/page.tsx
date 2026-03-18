"use client";

import { use } from "react";
import Link from "next/link";
import { ALL_ALBUMS } from "@/data/albums";
import type { AlbumTrack, Album } from "@/data/albums";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";

const MOOD_META: Record<string, { title: string; description: string; color: string }> = {
  whisper: { title: "Sussurro", description: "Para fechar os olhos. Silencio que fala.", color: "#6366f1" },
  steady: { title: "Constante", description: "Ritmo que acompanha. Fundo para viver.", color: "#22c55e" },
  pulse: { title: "Pulso", description: "Energia que move. O corpo acorda.", color: "#f97316" },
  anthem: { title: "Hino", description: "Para cantar alto. Forca que transborda.", color: "#ef4444" },
  raw: { title: "Cru", description: "Sem filtro. A verdade nua.", color: "#a855f7" },
};

function getAllTracksByEnergy(energy: string) {
  return ALL_ALBUMS.flatMap(album =>
    album.tracks
      .filter(t => t.energy === energy)
      .map(track => ({ track, album }))
  );
}

export default function MoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const meta = MOOD_META[slug];
  const { playTrack, currentTrack, currentAlbum, isPlaying, togglePlay } = useMusicPlayer();

  if (!meta) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-[#a0a0b0] mb-4">Mood nao encontrado.</p>
          <Link href="/musica" className="text-sm text-[#C9A96E] hover:underline">Voltar</Link>
        </div>
      </div>
    );
  }

  const tracks = getAllTracksByEnergy(slug);

  return (
    <div>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: `linear-gradient(180deg, ${meta.color} 0%, transparent 100%)` }} />
        <div className="relative px-6 pt-8 pb-6">
          <Link href="/musica" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Voltar
          </Link>
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-xl flex items-center justify-center" style={{ backgroundColor: meta.color }}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white/60">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Mood</p>
              <h1 className="font-display text-2xl font-bold text-[#F5F0E6]">{meta.title}</h1>
              <p className="text-sm text-white/50 mt-0.5">{meta.description}</p>
              <p className="text-xs text-white/30 mt-1">{tracks.length} faixas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Track list */}
      <div className="px-6 py-4 space-y-0.5">
        {tracks.map(({ track, album }, i) => {
          const isActive = currentTrack?.number === track.number && currentAlbum?.slug === album.slug;
          return (
            <button
              key={`${album.slug}-${track.number}`}
              onClick={() => isActive ? togglePlay() : playTrack(track, album)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${isActive ? "bg-white/5" : "hover:bg-white/5"}`}
            >
              <span className="w-8 text-center text-sm tabular-nums text-[#666680]" style={isActive ? { color: meta.color } : {}}>
                {isActive && isPlaying ? (
                  <span className="flex items-end justify-center gap-0.5 h-4">
                    <span className="w-0.5 animate-pulse rounded-full" style={{ height: "60%", backgroundColor: meta.color }} />
                    <span className="w-0.5 animate-pulse rounded-full" style={{ height: "100%", backgroundColor: meta.color, animationDelay: "0.2s" }} />
                    <span className="w-0.5 animate-pulse rounded-full" style={{ height: "40%", backgroundColor: meta.color, animationDelay: "0.4s" }} />
                  </span>
                ) : i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${isActive ? "font-semibold" : "text-[#F5F0E6]"}`} style={isActive ? { color: meta.color } : {}}>
                  {track.title}
                </p>
                <p className="text-xs text-[#666680] truncate">{album.title}</p>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded border border-white/10 text-[#666680]">{track.lang}</span>
              <span className="text-xs text-[#666680] tabular-nums">{Math.floor(track.durationSeconds / 60)}:{String(Math.floor(track.durationSeconds % 60)).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
