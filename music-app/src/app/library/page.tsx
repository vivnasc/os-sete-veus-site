"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_ALBUMS } from "@/data/albums";
import type { Album, AlbumTrack } from "@/data/albums";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { useLibrary } from "@/hooks/useLibrary";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function resolveTrack(trackNumber: number, albumSlug: string) {
  const album = ALL_ALBUMS.find(a => a.slug === albumSlug);
  if (!album) return null;
  const track = album.tracks.find(t => t.number === trackNumber);
  if (!track) return null;
  return { track, album };
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "agora";
  if (mins < 60) return `ha ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `ha ${hours}h`;
  const days = Math.floor(hours / 24);
  return `ha ${days}d`;
}

function fmt(s: number) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

type Tab = "favoritos" | "recentes";

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("favoritos");
  const { favorites, recents } = useLibrary();
  const { playTrack, currentTrack, currentAlbum, isPlaying, togglePlay } = useMusicPlayer();

  function handleTrackClick(track: AlbumTrack, album: Album) {
    if (currentTrack?.number === track.number && currentAlbum?.slug === album.slug) {
      togglePlay();
    } else {
      playTrack(track, album);
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D1A] text-[#F5F0E6]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#0D0D1A]/95 backdrop-blur-sm px-4 pt-4 pb-0">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/"
            className="shrink-0 p-1.5 -ml-1.5 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Voltar"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#a0a0b0]"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold">A tua biblioteca</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("favoritos")}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "favoritos"
                ? "text-[#F5F0E6] border-[#C9A96E]"
                : "text-[#666680] border-transparent hover:text-[#a0a0b0]"
            }`}
          >
            Favoritos
          </button>
          <button
            onClick={() => setActiveTab("recentes")}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "recentes"
                ? "text-[#F5F0E6] border-[#C9A96E]"
                : "text-[#666680] border-transparent hover:text-[#a0a0b0]"
            }`}
          >
            Recentes
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pb-32">
        {activeTab === "favoritos" ? (
          favorites.length === 0 ? (
            /* Empty state: Favoritos */
            <div className="flex flex-col items-center justify-center pt-24 text-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#333350] mb-4"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <p className="text-[#F5F0E6] font-medium mb-1">Ainda sem favoritos</p>
              <p className="text-sm text-[#666680]">Toca no coracao ao ouvir uma faixa</p>
            </div>
          ) : (
            /* Favoritos list */
            <div className="pt-4 space-y-0.5">
              {favorites
                .slice()
                .reverse()
                .map(fav => {
                  const resolved = resolveTrack(fav.trackNumber, fav.albumSlug);
                  if (!resolved) return null;
                  const { track, album } = resolved;
                  const isActive =
                    currentTrack?.number === track.number &&
                    currentAlbum?.slug === album.slug;

                  return (
                    <button
                      key={`${fav.albumSlug}-${fav.trackNumber}`}
                      onClick={() => handleTrackClick(track, album)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                        isActive
                          ? "bg-white/10"
                          : "hover:bg-white/5"
                      }`}
                    >
                      {/* Heart icon (filled, red) */}
                      <div className="shrink-0">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="#e74c3c"
                          stroke="#e74c3c"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </div>

                      {/* Track info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${
                            isActive ? "text-[#C9A96E]" : "text-[#F5F0E6]"
                          }`}
                        >
                          {track.title}
                        </p>
                        <p className="text-xs text-[#666680] truncate">
                          {album.title}
                        </p>
                      </div>

                      {/* Language badge */}
                      <span className="shrink-0 text-[10px] font-medium text-[#666680] bg-white/5 px-1.5 py-0.5 rounded">
                        {track.lang}
                      </span>

                      {/* Duration */}
                      <span className="shrink-0 text-xs text-[#666680] tabular-nums w-10 text-right">
                        {fmt(track.durationSeconds)}
                      </span>
                    </button>
                  );
                })}
            </div>
          )
        ) : recents.length === 0 ? (
          /* Empty state: Recentes */
          <div className="flex flex-col items-center justify-center pt-24 text-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#333350] mb-4"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <p className="text-[#F5F0E6] font-medium mb-1">Ainda sem historico</p>
            <p className="text-sm text-[#666680]">As faixas que ouves aparecem aqui</p>
          </div>
        ) : (
          /* Recentes list */
          <div className="pt-4 space-y-0.5">
            {recents.map(rec => {
              const resolved = resolveTrack(rec.trackNumber, rec.albumSlug);
              if (!resolved) return null;
              const { track, album } = resolved;
              const isActive =
                currentTrack?.number === track.number &&
                currentAlbum?.slug === album.slug;

              return (
                <button
                  key={`${rec.albumSlug}-${rec.trackNumber}-${rec.playedAt}`}
                  onClick={() => handleTrackClick(track, album)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                    isActive
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                  }`}
                >
                  {/* Clock icon */}
                  <div className="shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#666680"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>

                  {/* Track info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium truncate ${
                        isActive ? "text-[#C9A96E]" : "text-[#F5F0E6]"
                      }`}
                    >
                      {track.title}
                    </p>
                    <p className="text-xs text-[#666680] truncate">
                      {album.title}
                    </p>
                  </div>

                  {/* Language badge */}
                  <span className="shrink-0 text-[10px] font-medium text-[#666680] bg-white/5 px-1.5 py-0.5 rounded">
                    {track.lang}
                  </span>

                  {/* Relative time */}
                  <span className="shrink-0 text-xs text-[#666680] tabular-nums w-16 text-right">
                    {timeAgo(rec.playedAt)}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
