"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ALL_ALBUMS, type Album } from "@/data/albums";
import { getAlbumCover, getTrackCoverUrl } from "@/lib/album-covers";

/**
 * Shows recently published ALBUMS (not individual tracks).
 * Groups published tracks by album and shows unique albums.
 */
export default function NovidadesSection() {
  const [albums, setAlbums] = useState<{ album: Album; trackCount: number }[]>([]);

  useEffect(() => {
    fetch("/api/published-tracks")
      .then((r) => r.json())
      .then((data) => {
        const counts = new Map<string, number>();
        for (const key of (data.tracks || []) as string[]) {
          const match = key.match(/^(.+)-t(\d+)$/);
          if (!match) continue;
          const slug = match[1];
          counts.set(slug, (counts.get(slug) || 0) + 1);
        }
        const items: { album: Album; trackCount: number }[] = [];
        for (const [slug, count] of counts) {
          const album = ALL_ALBUMS.find(a => a.slug === slug);
          if (album) items.push({ album, trackCount: count });
        }
        setAlbums(items.reverse().slice(0, 8));
      })
      .catch(() => {});
  }, []);

  if (albums.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-[#F5F0E6] mb-4">
        Novidades
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {albums.map(({ album, trackCount }) => (
          <Link
            key={`nov-${album.slug}`}
            href={`/album/${album.slug}`}
            className="group"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg mb-2">
              <img
                src={getTrackCoverUrl(album.slug, 1)}
                alt={album.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => { (e.target as HTMLImageElement).src = getAlbumCover(album); }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2">
                <span className="text-[10px] text-white/70 bg-black/30 px-1.5 py-0.5 rounded">
                  {trackCount} faixa{trackCount !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5 ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-sm font-semibold text-[#F5F0E6] truncate">{album.title}</p>
            <p className="text-xs text-[#666680] truncate">{album.subtitle}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
