"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ALL_ALBUMS, type AlbumTrack, type Album } from "@/data/albums";
import { getAlbumCover, getTrackCoverUrl } from "@/lib/album-covers";

export default function NovidadesSection() {
  const [novidades, setNovidades] = useState<{ track: AlbumTrack; album: Album }[]>([]);

  useEffect(() => {
    fetch("/api/published-tracks")
      .then((r) => r.json())
      .then((data) => {
        const items: { track: AlbumTrack; album: Album }[] = [];
        for (const key of (data.tracks || []) as string[]) {
          const match = key.match(/^(.+)-t(\d+)$/);
          if (!match) continue;
          const [, albumSlug, trackNum] = match;
          const album = ALL_ALBUMS.find((a) => a.slug === albumSlug);
          if (!album) continue;
          const track = album.tracks.find((t) => t.number === Number(trackNum));
          if (!track) continue;
          items.push({ track, album });
        }
        setNovidades(items.slice(-8).reverse());
      })
      .catch(() => {});
  }, []);

  if (novidades.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-[#F5F0E6] mb-4">
        Novidades
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {novidades.map(({ track, album }) => (
          <Link
            key={`nov-${album.slug}-${track.number}`}
            href={`/album/${album.slug}`}
            className="group text-left p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] transition-all block"
          >
            <div
              className="aspect-square rounded-lg mb-3 relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${album.color} 0%, ${album.color}66 100%)` }}
            >
              <img
                src={getTrackCoverUrl(album.slug, track.number)}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { const img = e.target as HTMLImageElement; img.onerror = null; img.src = getAlbumCover(album); }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white/0 group-hover:text-white/80 transition-colors drop-shadow-lg">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <p className="text-sm font-medium text-[#F5F0E6] truncate">
              {track.title}
            </p>
            <p className="text-xs text-[#666680] truncate mt-0.5">{album.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
