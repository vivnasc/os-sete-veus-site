"use client";

import { useRouter } from "next/navigation";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { useDownloads } from "@/hooks/useDownloads";
import { useLibrary } from "@/hooks/useLibrary";
import type { Album, AlbumTrack } from "@/data/albums";

type Props = {
  track: AlbumTrack;
  album: Album;
  isActive: boolean;
};

function fmt(s: number) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function TrackRow({ track, album, isActive }: Props) {
  const { playTrack, isPlaying, togglePlay } = useMusicPlayer();
  const { saveTrack, removeTrack, getSaveState, isSaved } = useDownloads();
  const { isFavorite: isFav, toggleFavorite, userId } = useLibrary();
  const router = useRouter();
  const albumColor = album.color || "#C9A96E";
  const favorited = isFav(track.number, album.slug);
  const saveState = getSaveState(album.slug, track.number);
  const saved = isSaved(album.slug, track.number);

  function handleClick() {
    if (isActive) {
      togglePlay();
    } else {
      playTrack(track, album);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
        isActive ? "bg-white/5" : "hover:bg-white/5"
      }`}
    >
      {/* Track number or playing indicator */}
      <div className="w-8 text-center shrink-0">
        {isActive && isPlaying ? (
          <div className="flex items-end justify-center gap-0.5 h-4">
            <div className="w-0.5 bg-current animate-pulse" style={{ height: "60%", color: albumColor }} />
            <div className="w-0.5 bg-current animate-pulse" style={{ height: "100%", color: albumColor, animationDelay: "0.2s" }} />
            <div className="w-0.5 bg-current animate-pulse" style={{ height: "40%", color: albumColor, animationDelay: "0.4s" }} />
          </div>
        ) : (
          <span className={`text-sm tabular-nums ${isActive ? "font-semibold" : "text-[#666680]"}`}
            style={isActive ? { color: albumColor } : {}}
          >
            {track.number}
          </span>
        )}
      </div>

      {/* Track info */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm truncate ${isActive ? "font-semibold" : "text-[#F5F0E6]"}`}
          style={isActive ? { color: albumColor } : {}}
        >
          {track.title}
        </p>
        <p className="text-xs text-[#666680] truncate">{track.description}</p>
      </div>

      {/* Language badge */}
      <span className="text-[10px] px-1.5 py-0.5 rounded border border-white/10 text-[#666680] shrink-0">
        {track.lang}
      </span>

      {/* Favorite heart */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!userId) { router.push("/login"); return; }
          toggleFavorite(track.number, album.slug);
        }}
        className={`p-1.5 shrink-0 transition-colors ${favorited ? "text-red-400" : "text-[#666680] hover:text-[#a0a0b0]"}`}
        title={favorited ? "Remover dos favoritos" : "Favorito"}
      >
        <svg viewBox="0 0 24 24" fill={favorited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Save offline button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          saved ? removeTrack(album.slug, track.number) : saveTrack(track, album);
        }}
        disabled={saveState === "saving"}
        className={`p-1.5 shrink-0 transition-colors ${saved ? "text-green-400/60" : "text-[#666680] hover:text-[#a0a0b0]"} disabled:opacity-50`}
        title={saved ? "Remover do offline" : "Guardar offline"}
      >
        {saveState === "saving" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 animate-spin">
            <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
          </svg>
        ) : saved ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-green-400/60">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
        )}
      </button>

      {/* Duration */}
      <span className="text-xs text-[#666680] tabular-nums shrink-0 w-10 text-right">
        {fmt(track.durationSeconds)}
      </span>
    </button>
  );
}
