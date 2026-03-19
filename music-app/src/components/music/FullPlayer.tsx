"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { getAlbumCover } from "@/lib/album-covers";
import { useDownloads } from "@/hooks/useDownloads";
import { useLibrary } from "@/hooks/useLibrary";
import ShareModal from "./ShareModal";
import QueuePanel from "./QueuePanel";
import SleepTimer from "./SleepTimer";

function fmt(s: number) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function FullPlayer() {
  const {
    currentTrack,
    currentAlbum,
    isPlaying,
    currentTime,
    duration,
    shuffle,
    repeat,
    showFullPlayer,
    showLyrics,
    togglePlay,
    next,
    previous,
    seek,
    toggleShuffle,
    cycleRepeat,
    setShowFullPlayer,
    setShowLyrics,
  } = useMusicPlayer();

  const [showShare, setShowShare] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [showSleep, setShowSleep] = useState(false);
  const { saveTrack, removeTrack, getSaveState, isSaved } = useDownloads();
  const { isFavorite, toggleFavorite, userId } = useLibrary();
  const router = useRouter();

  // ── Browser back button support ──
  // Push a history entry when the full player opens so that pressing
  // the hardware/software back button closes the player instead of
  // navigating away from the page.
  const didPushState = useRef(false);

  useEffect(() => {
    if (showFullPlayer && currentTrack) {
      if (!didPushState.current) {
        window.history.pushState({ veusPlayer: true }, "");
        didPushState.current = true;
      }

      function onPopState() {
        setShowFullPlayer(false);
      }
      window.addEventListener("popstate", onPopState);
      return () => window.removeEventListener("popstate", onPopState);
    } else {
      // If player closed programmatically (not via back), pop the extra entry
      if (didPushState.current) {
        didPushState.current = false;
        // Only go back if we pushed the entry (check state)
        if (window.history.state?.veusPlayer) {
          window.history.back();
        }
      }
    }
  }, [showFullPlayer, currentTrack, setShowFullPlayer]);

  // ── Swipe down to close ──
  const touchStartY = useRef(0);
  const touchDeltaY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchDeltaY.current = 0;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaY.current = e.touches[0].clientY - touchStartY.current;
    // Apply visual drag effect
    if (touchDeltaY.current > 0 && containerRef.current) {
      const translate = Math.min(touchDeltaY.current * 0.5, 200);
      containerRef.current.style.transform = `translateY(${translate}px)`;
      containerRef.current.style.opacity = `${1 - translate / 400}`;
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = "";
      containerRef.current.style.opacity = "";
    }
    // If swiped down more than 80px, close the player
    if (touchDeltaY.current > 80) {
      setShowFullPlayer(false);
    }
  }, [setShowFullPlayer]);

  if (!showFullPlayer || !currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const albumColor = currentAlbum?.color || "#C9A96E";

  return (
    <div
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="fixed inset-0 z-50 flex flex-col transition-[transform,opacity] duration-200 ease-out"
      style={{ background: `linear-gradient(180deg, ${albumColor}22 0%, #0D0D1A 40%)` }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ backgroundColor: albumColor }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-safe-top py-4">
        <button
          onClick={() => setShowFullPlayer(false)}
          className="p-3 -ml-3 text-[#a0a0b0] hover:text-[#F5F0E6] transition-colors active:bg-white/5 rounded-xl"
          aria-label="Fechar player"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[#a0a0b0]">A ouvir do álbum</p>
          <p className="text-sm font-medium text-[#F5F0E6] mt-0.5">{currentAlbum?.title}</p>
        </div>
        <div className="flex items-center gap-1">
          {/* Save offline button */}
          {currentAlbum && (() => {
            const state = getSaveState(currentAlbum.slug, currentTrack.number);
            const saved = isSaved(currentAlbum.slug, currentTrack.number);
            return (
              <button
                onClick={() => saved
                  ? removeTrack(currentAlbum!.slug, currentTrack.number)
                  : saveTrack(currentTrack, currentAlbum!)
                }
                disabled={state === "saving"}
                className={`p-2 transition-colors ${saved ? "text-green-400" : "text-[#a0a0b0] hover:text-[#F5F0E6]"} disabled:opacity-50`}
                title={saved ? "Remover do offline" : "Guardar offline"}
              >
                {state === "saving" ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 animate-spin">
                    <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
                  </svg>
                ) : saved ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                )}
              </button>
            );
          })()}
          {/* Sleep timer button */}
          <button
            onClick={() => setShowSleep(true)}
            className="p-2 text-[#a0a0b0] hover:text-[#F5F0E6] transition-colors"
            title="Sleep timer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </button>
          {/* Queue button */}
          <button
            onClick={() => setShowQueue(true)}
            className="p-2 text-[#a0a0b0] hover:text-[#F5F0E6] transition-colors"
            title="Fila"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M4 6h16M4 10h16M4 14h10M4 18h7" />
            </svg>
          </button>
          {/* Share button */}
          <button
            onClick={() => setShowShare(true)}
            className="p-2 -mr-2 text-[#a0a0b0] hover:text-[#F5F0E6] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 overflow-hidden">
        {showLyrics ? (
          /* Lyrics view */
          <div className="w-full max-w-lg overflow-y-auto max-h-[50vh] scrollbar-none">
            <div className="space-y-4 text-center">
              {currentTrack.lyrics ? (
                currentTrack.lyrics.split("\n").map((line, i) => {
                  const isTag = line.startsWith("[");
                  if (isTag) return (
                    <p key={i} className="text-xs uppercase tracking-widest text-[#666680] mt-6 first:mt-0">{line.replace(/[\[\]]/g, "")}</p>
                  );
                  if (!line.trim()) return null;
                  return (
                    <p key={i} className="font-display text-xl leading-relaxed text-[#F5F0E6]/90">
                      {line}
                    </p>
                  );
                })
              ) : (
                <p className="text-[#a0a0b0] font-display text-lg">Letra não disponível.</p>
              )}
            </div>
          </div>
        ) : (
          /* Album art with pulsing glow */
          <div className="w-full max-w-xs relative">
            {/* Pulsing glow ring behind album art */}
            {isPlaying && (
              <div className="absolute inset-0 -m-6 flex items-center justify-center pointer-events-none">
                <div
                  className="w-full h-full rounded-3xl opacity-30 blur-[30px] animate-pulse"
                  style={{ backgroundColor: albumColor }}
                />
              </div>
            )}
            <div className="relative aspect-square rounded-2xl shadow-2xl overflow-hidden">
              {currentAlbum && (
                <Image
                  src={getAlbumCover(currentAlbum)}
                  alt={currentAlbum.title}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              )}
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{ backgroundColor: albumColor }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Track info + controls */}
      <div className="relative z-10 px-8 pb-safe-bottom pb-8">
        {/* Track name */}
        <div className="flex items-center justify-between mb-6">
          <div className="min-w-0 flex-1 flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-xl font-semibold text-[#F5F0E6] truncate">
                {currentTrack.title}
              </h2>
              <p className="text-sm text-[#a0a0b0] truncate">{currentAlbum?.title}</p>
            </div>
            {/* Favorite heart */}
            <button
              onClick={() => {
                if (!userId) { router.push("/login"); return; }
                if (currentAlbum) toggleFavorite(currentTrack.number, currentAlbum.slug);
              }}
              className="p-2 shrink-0 transition-colors"
              title={isFavorite(currentTrack.number, currentAlbum?.slug || "") ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              {isFavorite(currentTrack.number, currentAlbum?.slug || "") ? (
                <svg viewBox="0 0 24 24" fill="#e74c3c" stroke="#e74c3c" strokeWidth="2" className="h-5 w-5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="#a0a0b0" strokeWidth="2" className="h-5 w-5 hover:stroke-[#F5F0E6]">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-[#a0a0b0]">
              {currentTrack.lang}
            </span>
            <button
              onClick={() => setShowLyrics(!showLyrics)}
              className={`p-2 rounded-full transition-colors ${showLyrics ? "text-white bg-white/10" : "text-[#a0a0b0] hover:text-[#F5F0E6]"}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="M4 6h16M4 10h16M4 14h10M4 18h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={e => seek(Number(e.target.value))}
            className="w-full h-1 appearance-none rounded-full cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${albumColor} ${progress}%, rgba(255,255,255,0.1) ${progress}%)`,
            }}
          />
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-[#666680] tabular-nums">{fmt(currentTime)}</span>
            <span className="text-xs text-[#666680] tabular-nums">{fmt(duration)}</span>
          </div>
        </div>

        {/* Main controls */}
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <button
            onClick={toggleShuffle}
            className={`p-2 transition-colors ${shuffle ? "text-white" : "text-[#666680] hover:text-[#a0a0b0]"}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
          </button>

          <button onClick={previous} className="p-2 text-[#F5F0E6] hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          <button
            onClick={togglePlay}
            className="flex h-16 w-16 items-center justify-center rounded-full text-[#0D0D1A] transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: albumColor }}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button onClick={next} className="p-2 text-[#F5F0E6] hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>

          <button
            onClick={cycleRepeat}
            className={`p-2 relative transition-colors ${repeat !== "off" ? "text-white" : "text-[#666680] hover:text-[#a0a0b0]"}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
            </svg>
            {repeat === "one" && (
              <span className="absolute -top-0.5 -right-0.5 text-[8px] font-bold">1</span>
            )}
          </button>
        </div>
      </div>

      {/* Modals */}
      {showShare && currentTrack && currentAlbum && (
        <ShareModal
          track={currentTrack}
          album={currentAlbum}
          onClose={() => setShowShare(false)}
        />
      )}
      <QueuePanel isOpen={showQueue} onClose={() => setShowQueue(false)} />
      <SleepTimer isOpen={showSleep} onClose={() => setShowSleep(false)} />
    </div>
  );
}
