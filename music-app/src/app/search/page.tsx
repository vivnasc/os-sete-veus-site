"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { ALL_ALBUMS } from "@/data/albums";
import type { Album, AlbumTrack } from "@/data/albums";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import TrackRow from "@/components/music/TrackRow";
import AlbumCard from "@/components/music/AlbumCard";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function normalize(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

type TrackWithAlbum = { track: AlbumTrack; album: Album };
type LyricMatch = TrackWithAlbum & { matchedLine: string };

type SearchResults = {
  albums: Album[];
  tracks: TrackWithAlbum[];
  lyrics: LyricMatch[];
};

function searchAll(query: string): SearchResults {
  const q = normalize(query.trim());
  if (!q) return { albums: [], tracks: [], lyrics: [] };

  const albumMatches: Album[] = [];
  const trackMatches: TrackWithAlbum[] = [];
  const lyricMatches: LyricMatch[] = [];
  const trackMatchIds = new Set<string>();

  for (const album of ALL_ALBUMS) {
    const titleNorm = normalize(album.title);
    const subtitleNorm = normalize(album.subtitle);

    if (titleNorm.includes(q) || subtitleNorm.includes(q)) {
      albumMatches.push(album);
    }

    for (const track of album.tracks) {
      const trackId = `${album.slug}/${track.number}`;
      const titleMatch = normalize(track.title).includes(q);
      const descMatch = normalize(track.description).includes(q);

      if (titleMatch || descMatch) {
        if (!trackMatchIds.has(trackId)) {
          trackMatchIds.add(trackId);
          trackMatches.push({ track, album });
        }
      }

      if (track.lyrics) {
        const lines = track.lyrics.split("\n");
        for (const line of lines) {
          if (normalize(line).includes(q)) {
            if (!trackMatchIds.has(trackId + "/lyric")) {
              trackMatchIds.add(trackId + "/lyric");
              lyricMatches.push({ track, album, matchedLine: line.trim() });
            }
            break;
          }
        }
      }
    }
  }

  return { albums: albumMatches, tracks: trackMatches, lyrics: lyricMatches };
}

// ─────────────────────────────────────────────
// Mood / Genre pills data
// ─────────────────────────────────────────────

const MOODS = [
  { label: "Whisper", slug: "whisper" },
  { label: "Steady", slug: "steady" },
  { label: "Pulse", slug: "pulse" },
  { label: "Anthem", slug: "anthem" },
  { label: "Raw", slug: "raw" },
];

const GENRES = [
  { label: "Organic", slug: "organic" },
  { label: "Marrabenta", slug: "marrabenta" },
  { label: "House", slug: "house" },
  { label: "Gospel", slug: "gospel" },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { currentTrack, currentAlbum } = useMusicPlayer();

  // Debounce
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 150);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]);

  const results = useMemo(() => searchAll(debouncedQuery), [debouncedQuery]);
  const hasQuery = debouncedQuery.trim().length > 0;
  const hasResults =
    results.albums.length > 0 ||
    results.tracks.length > 0 ||
    results.lyrics.length > 0;

  return (
    <div className="min-h-screen bg-[#0D0D1A] text-[#F5F0E6]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#0D0D1A]/95 backdrop-blur-sm px-4 pt-4 pb-3">
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
          <h1 className="text-lg font-semibold">Pesquisar</h1>
        </div>

        {/* Search input */}
        <div className="relative">
          {/* Magnifying glass icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#666680]"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Procurar faixas, albums, letras..."
            autoFocus
            className="w-full bg-white/5 rounded-xl px-5 py-3 pl-11 text-[#F5F0E6] placeholder-[#666680] outline-none focus:ring-1 focus:ring-white/10 transition-shadow"
          />

          {/* Clear button */}
          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Limpar pesquisa"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#a0a0b0]"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pb-32">
        {!hasQuery ? (
          /* ── Empty state: suggestions ── */
          <div className="pt-6 space-y-8">
            {/* Mood pills */}
            <section>
              <h2 className="text-sm font-semibold text-[#a0a0b0] uppercase tracking-wider mb-3">
                Explorar por energia
              </h2>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m.slug}
                    className="px-4 py-2 rounded-full bg-white/5 text-sm text-[#F5F0E6] hover:bg-white/10 transition-colors capitalize"
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Genre pills */}
            <section>
              <h2 className="text-sm font-semibold text-[#a0a0b0] uppercase tracking-wider mb-3">
                Generos
              </h2>
              <div className="flex flex-wrap gap-2">
                {GENRES.map((g) => (
                  <button
                    key={g.slug}
                    className="px-4 py-2 rounded-full bg-white/5 text-sm text-[#F5F0E6] hover:bg-white/10 transition-colors capitalize"
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : !hasResults ? (
          /* ── No results ── */
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
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="text-[#F5F0E6] font-medium mb-1">Sem resultados</p>
            <p className="text-sm text-[#666680]">Tenta outra palavra</p>
          </div>
        ) : (
          /* ── Results ── */
          <div className="pt-4 space-y-8">
            {/* Albums */}
            {results.albums.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-[#a0a0b0] uppercase tracking-wider mb-3">
                  Albums{" "}
                  <span className="text-[#666680] normal-case font-normal">
                    ({results.albums.length})
                  </span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {results.albums.map((album) => (
                    <AlbumCard key={album.slug} album={album} />
                  ))}
                </div>
              </section>
            )}

            {/* Tracks */}
            {results.tracks.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-[#a0a0b0] uppercase tracking-wider mb-3">
                  Faixas{" "}
                  <span className="text-[#666680] normal-case font-normal">
                    ({results.tracks.length})
                  </span>
                </h2>
                <div className="space-y-0.5">
                  {results.tracks.map(({ track, album }) => (
                    <TrackRow
                      key={`${album.slug}-${track.number}`}
                      track={track}
                      album={album}
                      isActive={
                        currentTrack?.number === track.number &&
                        currentAlbum?.slug === album.slug
                      }
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Lyrics */}
            {results.lyrics.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-[#a0a0b0] uppercase tracking-wider mb-3">
                  Letras{" "}
                  <span className="text-[#666680] normal-case font-normal">
                    ({results.lyrics.length})
                  </span>
                </h2>
                <div className="space-y-1">
                  {results.lyrics.map(({ track, album, matchedLine }) => (
                    <div key={`lyric-${album.slug}-${track.number}`}>
                      <TrackRow
                        track={track}
                        album={album}
                        isActive={
                          currentTrack?.number === track.number &&
                          currentAlbum?.slug === album.slug
                        }
                      />
                      <p className="pl-12 pr-4 -mt-1 mb-2 text-xs text-[#666680] italic truncate">
                        &ldquo;{matchedLine}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
