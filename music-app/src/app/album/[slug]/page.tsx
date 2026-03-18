"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ALL_ALBUMS as ALBUMS } from "@/data/albums";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { getAlbumCover, getAlbumBadge } from "@/lib/album-covers";
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#a0a0b0] text-lg mb-4">Album nao encontrado.</p>
          <Link href="/" className="text-sm text-[#C9A96E] hover:underline">
            Voltar
          </Link>
        </div>
      </div>
    );
  }

  const totalDuration = album.tracks.reduce((acc, t) => acc + t.durationSeconds, 0);
  const totalMinutes = Math.ceil(totalDuration / 60);
  const albumColor = album.color;
  const cover = getAlbumCover(album);
  const badge = getAlbumBadge(album);

  return (
    <div className="min-h-screen">
      {/* Album header */}
      <div className="relative overflow-hidden">
        {/* Background image blur */}
        <div className="absolute inset-0">
          <Image
            src={cover}
            alt=""
            fill
            className="object-cover blur-[60px] scale-110 opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D1A]/50 via-[#0D0D1A]/80 to-[#0D0D1A]" />
        </div>

        <div className="relative px-6 pt-12 pb-8 max-w-screen-lg mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-[#666680] hover:text-[#a0a0b0] transition-colors mb-8"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Voltar
          </Link>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Album art */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-xl shadow-2xl shrink-0 overflow-hidden relative">
              <Image
                src={cover}
                alt={album.title}
                fill
                sizes="224px"
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{ backgroundColor: albumColor }}
              />
            </div>

            {/* Album info */}
            <div className="flex-1">
              <span className="text-xs uppercase tracking-widest text-[#666680]">
                Album
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0E6] mt-1 leading-tight">
                {album.title}
              </h1>
              <p className="text-sm text-[#C9A96E] mt-1">Loranne</p>
              <p className="text-[#a0a0b0] mt-2">{album.subtitle}</p>
              <div className="flex items-center gap-3 mt-4 text-xs text-[#666680]">
                <span>{album.tracks.length} faixas</span>
                <span>~{totalMinutes} min</span>
                {badge && (
                  <span className="px-2 py-0.5 rounded-full border border-white/10">
                    {badge}
                  </span>
                )}
              </div>

              {/* Play all + upload buttons */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => playAlbum(album)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-[#0D0D1A] transition-transform hover:scale-105"
                  style={{ backgroundColor: albumColor }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Ouvir album
                </button>
                <Link
                  href="/upload"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm text-[#a0a0b0] border border-white/10 hover:bg-white/5 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                  </svg>
                  Carregar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Track list */}
      <div className="max-w-screen-lg mx-auto px-6 py-6">
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

        {/* Album footer */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-[#666680]">
            {album.tracks.length} faixas — {fmt(totalDuration)} de duracao total
          </p>
          <p className="text-xs text-[#666680] mt-1">
            Véus
          </p>
        </div>
      </div>
    </div>
  );
}
