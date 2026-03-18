"use client";

import { use } from "react";
import Link from "next/link";
import { ALL_ALBUMS as ALBUMS } from "@/data/albums";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import TrackRow from "@/components/music/TrackRow";

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const album = ALBUMS.find(a => a.slug === slug);
  const { currentTrack, currentAlbum, playAlbum } = useMusicPlayer();

  if (!album) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-[#a0a0b0] mb-4">Album nao encontrado.</p>
          <Link href="/musica" className="text-sm text-[#C9A96E] hover:underline">Voltar</Link>
        </div>
      </div>
    );
  }

  const totalDuration = album.tracks.reduce((acc, t) => acc + t.durationSeconds, 0);
  const totalMinutes = Math.ceil(totalDuration / 60);

  return (
    <div>
      {/* Album header with gradient */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: `linear-gradient(180deg, ${album.color} 0%, transparent 100%)` }}
        />
        <div className="relative px-6 pt-8 pb-6 max-w-screen-xl mx-auto">
          <Link
            href="/musica"
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-6"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Voltar
          </Link>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Album cover */}
            <div
              className="w-40 h-40 sm:w-52 sm:h-52 rounded-xl shadow-2xl shrink-0 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${album.color} 0%, ${album.color}66 100%)`,
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-14 w-14 text-white/20">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-white/40">Album</p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F0E6] mt-1 leading-tight">
                {album.title}
              </h1>
              <p className="text-sm text-white/50 mt-1">{album.subtitle}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-white/30">
                <span>{album.tracks.length} faixas</span>
                <span>~{totalMinutes} min</span>
                {album.veu && (
                  <span className="px-2 py-0.5 rounded-full border border-white/10">
                    Veu {album.veu}
                  </span>
                )}
              </div>

              <button
                onClick={() => playAlbum(album)}
                className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: album.color }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Ouvir album
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Track list */}
      <div className="max-w-screen-xl mx-auto px-6 py-4">
        <div className="space-y-0.5">
          {album.tracks.map(track => (
            <TrackRow
              key={track.number}
              track={track}
              album={album}
              isActive={currentTrack?.number === track.number && currentAlbum?.slug === album.slug}
            />
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 text-xs text-[#666680]">
          {album.tracks.length} faixas — {fmt(totalDuration)} total
        </div>
      </div>
    </div>
  );
}
