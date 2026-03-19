"use client";

import { useMusicPlayer, formatTime as fmt } from "@/contexts/MusicPlayerContext";
import type { Album, AlbumTrack } from "@/data/albums";

type Props = {
  track: AlbumTrack;
  album: Album;
  isActive: boolean;
};

export default function TrackRow({ track, album, isActive }: Props) {
  const { playTrack, isPlaying, togglePlay } = useMusicPlayer();
  const albumColor = album.color || "#C9A96E";

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

      {/* Duration */}
      <span className="text-xs text-[#666680] tabular-nums shrink-0 w-10 text-right">
        {fmt(track.durationSeconds)}
      </span>
    </button>
  );
}
