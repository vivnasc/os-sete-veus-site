"use client";

import Link from "next/link";
import { useLocalListeningData } from "@/hooks/useLocalListeningData";
import { ALL_ALBUMS, type AlbumTrack, type Album } from "@/data/albums";

function resolveTrack(
  trackNumber: number,
  albumSlug: string
): { track: AlbumTrack; album: Album } | null {
  const album = ALL_ALBUMS.find((a) => a.slug === albumSlug);
  if (!album) return null;
  const track = album.tracks.find((t) => t.number === trackNumber);
  if (!track) return null;
  return { track, album };
}

export default function RecentlyPlayedSection() {
  const { recents } = useLocalListeningData();

  if (recents.length === 0) return null;

  const resolved = recents
    .map((r) => resolveTrack(r.trackNumber, r.albumSlug))
    .filter(Boolean) as { track: AlbumTrack; album: Album }[];

  if (resolved.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-[#F5F0E6] mb-3">
        Ouvido recentemente
      </h2>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
        {resolved.slice(0, 12).map(({ track, album }) => (
          <Link
            key={`recent-${album.slug}-${track.number}`}
            href={`/album/${album.slug}`}
            className="shrink-0 flex items-center gap-3 px-3 py-2 bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-colors w-48"
          >
            <div
              className="h-10 w-10 shrink-0 rounded-md flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${album.color}, ${album.color}88)` }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-white/30">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#F5F0E6] truncate">{track.title}</p>
              <p className="text-[10px] text-[#666680] truncate">{album.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
