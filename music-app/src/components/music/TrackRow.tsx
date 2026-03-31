"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { useSubscriptionGate } from "@/contexts/SubscriptionContext";
import { useDownloads } from "@/hooks/useDownloads";
import { useLibrary } from "@/hooks/useLibrary";
import ShareModal from "./ShareModal";
import AddToPlaylistModal from "./AddToPlaylistModal";
import type { Album, AlbumTrack } from "@/data/albums";
import { getTrackCoverUrl, getAlbumCover } from "@/lib/album-covers";

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
  const { playTrack, isPlaying, togglePlay, addToQueue } = useMusicPlayer();
  const { canPlay, isTrackFree, requestPlay } = useSubscriptionGate();
  const { saveTrack, removeTrack, getSaveState, isSaved } = useDownloads();
  const { isFavorite: isFav, toggleFavorite, userId } = useLibrary();
  const router = useRouter();
  const albumColor = album.color || "#C9A96E";
  const locked = !canPlay(track.number);
  const favorited = isFav(track.number, album.slug);
  const saveState = getSaveState(album.slug, track.number);
  const saved = isSaved(album.slug, track.number);

  const [menuOpen, setMenuOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  function handleClick() {
    if (locked) {
      requestPlay(track.number, track.title, albumColor);
      return;
    }
    if (isActive) {
      togglePlay();
    } else {
      playTrack(track, album);
    }
  }

  return (
    <>
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
          ) : locked ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="#666680" strokeWidth="2" className="h-3.5 w-3.5 mx-auto">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          ) : (
            <span className={`text-sm tabular-nums ${isActive ? "font-semibold" : "text-[#666680]"}`}
              style={isActive ? { color: albumColor } : {}}
            >
              {track.number}
            </span>
          )}
        </div>

        {/* Track cover thumbnail */}
        <div className="h-10 w-10 shrink-0 rounded-md overflow-hidden relative bg-white/5">
          <img
            src={getTrackCoverUrl(album.slug, track.number)}
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = getAlbumCover(album); }}
          />
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
            if (locked) { requestPlay(track.number, track.title, albumColor); return; }
            saved ? removeTrack(album.slug, track.number) : saveTrack(track, album);
          }}
          disabled={saveState === "saving" || locked}
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

        {/* Share button — visible, primary action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShareOpen(true);
          }}
          className="p-1.5 shrink-0 text-[#666680] hover:text-[#a0a0b0] transition-colors"
          title="Partilhar"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
          </svg>
        </button>

        {/* 3-dots menu */}
        <div className="relative shrink-0" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="p-1.5 text-[#666680] hover:text-[#a0a0b0] transition-colors"
            title="Mais opcoes"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 bottom-full mb-1 w-48 py-1 rounded-xl bg-[#1A1A2E] border border-white/10 shadow-xl z-40">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  addToQueue([track], album);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#F5F0E6] hover:bg-white/5 transition-colors text-left"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-[#a0a0b0]">
                  <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tocar a seguir
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  setShareOpen(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#F5F0E6] hover:bg-white/5 transition-colors text-left"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-[#a0a0b0]">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
                </svg>
                Partilhar
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  if (!userId) { router.push("/login"); return; }
                  toggleFavorite(track.number, album.slug);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#F5F0E6] hover:bg-white/5 transition-colors text-left"
              >
                <svg viewBox="0 0 24 24" fill={favorited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className={`h-4 w-4 ${favorited ? "text-red-400" : "text-[#a0a0b0]"}`}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {favorited ? "Remover favorito" : "Adicionar favorito"}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  setPlaylistOpen(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#F5F0E6] hover:bg-white/5 transition-colors text-left"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-[#a0a0b0]">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Adicionar a playlist
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  router.push(`/album/${album.slug}`);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#F5F0E6] hover:bg-white/5 transition-colors text-left"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-[#a0a0b0]">
                  <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                </svg>
                Ver album
              </button>
            </div>
          )}
        </div>

        {/* Duration */}
        <span className="text-xs text-[#666680] tabular-nums shrink-0 w-10 text-right">
          {fmt(track.durationSeconds)}
        </span>
      </button>

      {/* Share modal */}
      {shareOpen && (
        <ShareModal track={track} album={album} onClose={() => setShareOpen(false)} />
      )}

      {/* Add to playlist modal */}
      {playlistOpen && (
        <AddToPlaylistModal
          trackNumber={track.number}
          albumSlug={album.slug}
          onClose={() => setPlaylistOpen(false)}
        />
      )}
    </>
  );
}
