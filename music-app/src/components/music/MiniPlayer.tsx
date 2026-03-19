"use client";

import Image from "next/image";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { getAlbumCover } from "@/lib/album-covers";

function fmt(s: number) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function MiniPlayer() {
  const {
    currentTrack,
    currentAlbum,
    queue,
    isPlaying,
    currentTime,
    duration,
    shuffle,
    togglePlay,
    next,
    previous,
    setShowFullPlayer,
  } = useMusicPlayer();

  if (!currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const albumColor = currentAlbum?.color || "#C9A96E";

  // Find next track in queue
  const currentIdx = queue.findIndex(t => t.number === currentTrack.number);
  const nextTrack = !shuffle && currentIdx >= 0 && currentIdx < queue.length - 1
    ? queue[currentIdx + 1]
    : null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {/* Progress bar */}
      <div className="h-0.5 bg-white/10">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${progress}%`, backgroundColor: albumColor }}
        />
      </div>

      <div className="bg-[#1A1A2E]/95 backdrop-blur-xl border-t border-white/5">
        <div className="mx-auto max-w-screen-lg px-4 py-3 flex items-center gap-3">
          {/* Album art thumbnail */}
          <button
            onClick={() => setShowFullPlayer(true)}
            className="h-11 w-11 shrink-0 rounded-lg shadow-lg overflow-hidden relative"
          >
            {currentAlbum ? (
              <Image
                src={getAlbumCover(currentAlbum)}
                alt={currentAlbum.title}
                fill
                sizes="44px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: albumColor }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white/60">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
            )}
          </button>

          {/* Track info + next track */}
          <button
            onClick={() => setShowFullPlayer(true)}
            className="flex-1 min-w-0 text-left"
          >
            <p className="text-sm font-medium text-[#F5F0E6] truncate">
              {currentTrack.title}
            </p>
            {nextTrack ? (
              <p className="text-xs text-[#666680] truncate">
                A seguir: {nextTrack.title}
              </p>
            ) : (
              <p className="text-xs text-[#a0a0b0] truncate">
                {currentAlbum?.title || "Sete Veus"}
              </p>
            )}
          </button>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button onClick={previous} className="p-1.5 text-[#a0a0b0] hover:text-[#F5F0E6] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>
            <button
              onClick={togglePlay}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#0D0D1A] transition-transform hover:scale-105"
              style={{ backgroundColor: albumColor }}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button onClick={next} className="p-1.5 text-[#a0a0b0] hover:text-[#F5F0E6] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          {/* Time */}
          <span className="hidden sm:block text-xs text-[#666680] tabular-nums w-20 text-right">
            {fmt(currentTime)} / {fmt(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
