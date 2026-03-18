"use client";

import { use } from "react";
import Link from "next/link";
import { ALL_ALBUMS } from "@/data/albums";
import type { Album, AlbumTrack } from "@/data/albums";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";

// Temas mapeiam para albums sem revelar os nomes dos produtos
// Cada tema agrupa albums por afinidade tematica
const TEMA_CONFIG: Record<string, {
  title: string;
  description: string;
  color: string;
  albumSlugs: string[];
}> = {
  "auto-amor": {
    title: "Auto-Amor",
    description: "Voltar a ti. Sem pedir desculpa por existires.",
    color: "#c9b896",
    albumSlugs: ["espelho-ilusao", "no-heranca", "curso-ouro-proprio", "curso-pele-nua"],
  },
  "auto-poder": {
    title: "Auto-Poder",
    description: "A forca que ja tens. So precisas de a reconhecer.",
    color: "#ef4444",
    albumSlugs: ["espelho-controlo", "no-solidao", "curso-brasa-viva", "curso-ouro-e-sombra"],
  },
  limites: {
    title: "Limites",
    description: "Dizer nao e um acto de amor. Comeca por ti.",
    color: "#D4A853",
    albumSlugs: ["curso-limite-sagrado", "espelho-culpa", "no-sacrificio", "curso-maos-cansadas"],
  },
  raizes: {
    title: "Raizes",
    description: "De onde vens. O que herdaste. O que escolhes levar.",
    color: "#b07a7a",
    albumSlugs: ["espelho-culpa", "no-sacrificio", "curso-sangue-e-seda", "curso-antes-do-ninho"],
  },
  corpo: {
    title: "O Corpo",
    description: "A paisagem que habitas. O mapa que te conta a verdade.",
    color: "#c08aaa",
    albumSlugs: ["espelho-desejo", "no-vazio", "curso-pele-nua", "curso-pao-e-silencio"],
  },
  recomecar: {
    title: "Recomecar",
    description: "Depois do fogo, a vida que nasce diferente.",
    color: "#4ade80",
    albumSlugs: ["espelho-separacao", "no-pertenca", "curso-depois-do-fogo", "curso-estacoes-partidas"],
  },
  silencio: {
    title: "O Silencio",
    description: "Tudo o que ficou por dizer. Tudo o que o corpo guardou.",
    color: "#8b9b8e",
    albumSlugs: ["espelho-medo", "no-silencio", "curso-voz-de-dentro", "curso-silencio-que-grita"],
  },
};

export default function TemaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const config = TEMA_CONFIG[slug];
  const { playTrack, currentTrack, currentAlbum, isPlaying, togglePlay } = useMusicPlayer();

  if (!config) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-[#a0a0b0] mb-4">Tema nao encontrado.</p>
          <Link href="/musica" className="text-sm text-[#C9A96E] hover:underline">Voltar</Link>
        </div>
      </div>
    );
  }

  // Get all tracks from matching albums
  const tracks: { track: AlbumTrack; album: Album }[] = [];
  for (const albumSlug of config.albumSlugs) {
    const album = ALL_ALBUMS.find(a => a.slug === albumSlug);
    if (album) {
      for (const track of album.tracks) {
        tracks.push({ track, album });
      }
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: `linear-gradient(180deg, ${config.color} 0%, transparent 100%)` }} />
        <div className="relative px-6 pt-8 pb-6">
          <Link href="/musica" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Voltar
          </Link>
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-xl flex items-center justify-center" style={{ backgroundColor: config.color }}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white/60">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Tema</p>
              <h1 className="font-display text-2xl font-bold text-[#F5F0E6]">{config.title}</h1>
              <p className="text-sm text-white/50 mt-0.5">{config.description}</p>
              <p className="text-xs text-white/30 mt-1">{tracks.length} faixas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Track list */}
      <div className="px-6 py-4 space-y-0.5">
        {tracks.map(({ track, album }, i) => {
          const isActive = currentTrack?.number === track.number && currentAlbum?.slug === album.slug;
          return (
            <button
              key={`${album.slug}-${track.number}`}
              onClick={() => isActive ? togglePlay() : playTrack(track, album)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${isActive ? "bg-white/5" : "hover:bg-white/5"}`}
            >
              <span className="w-8 text-center text-sm tabular-nums text-[#666680]" style={isActive ? { color: config.color } : {}}>
                {isActive && isPlaying ? (
                  <span className="flex items-end justify-center gap-0.5 h-4">
                    <span className="w-0.5 animate-pulse rounded-full" style={{ height: "60%", backgroundColor: config.color }} />
                    <span className="w-0.5 animate-pulse rounded-full" style={{ height: "100%", backgroundColor: config.color, animationDelay: "0.2s" }} />
                    <span className="w-0.5 animate-pulse rounded-full" style={{ height: "40%", backgroundColor: config.color, animationDelay: "0.4s" }} />
                  </span>
                ) : i + 1}
              </span>
              <div
                className="h-8 w-8 rounded shrink-0"
                style={{ background: `linear-gradient(135deg, ${album.color} 0%, ${album.color}66 100%)` }}
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${isActive ? "font-semibold" : "text-[#F5F0E6]"}`} style={isActive ? { color: config.color } : {}}>
                  {track.title}
                </p>
                <p className="text-xs text-[#666680] truncate">{track.description}</p>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded border border-white/10 text-[#666680]">{track.lang}</span>
              <span className="text-xs text-[#666680] tabular-nums">{Math.floor(track.durationSeconds / 60)}:{String(Math.floor(track.durationSeconds % 60)).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
