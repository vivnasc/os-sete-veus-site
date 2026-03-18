"use client";

import Link from "next/link";
import type { ResolvedTrack } from "@/data/curated-lists";

type Props = {
  track: ResolvedTrack;
  index: number;
  listSlug: string;
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function ListTrackRow({ track, index }: Props) {
  return (
    <Link
      href={`/album/${track.albumSlug}`}
      className="flex items-center gap-4 py-3 px-2 hover:bg-white/5 rounded-lg transition-colors group"
    >
      {/* Number */}
      <span className="w-6 text-right text-xs text-[#666680] tabular-nums flex-shrink-0">
        {index + 1}
      </span>

      {/* Color dot */}
      <div
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: track.albumColor }}
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#F5F0E6] truncate">{track.title}</p>
        <p className="text-xs text-[#666680] truncate">{track.albumTitle}</p>
      </div>

      {/* Duration */}
      <span className="text-xs text-[#666680] tabular-nums flex-shrink-0">
        {formatTime(track.durationSeconds)}
      </span>
    </Link>
  );
}
