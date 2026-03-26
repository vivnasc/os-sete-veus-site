"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { getAlbumCover, getTrackCoverUrl } from "@/lib/album-covers";
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
    queue,
    isPlaying,
    currentTime,
    duration,
    shuffle,
    infinite,
    repeat,
    showFullPlayer,
    togglePlay,
    next,
    previous,
    seek,
    toggleShuffle,
    toggleInfinite,
    cycleRepeat,
    setShowFullPlayer,
  } = useMusicPlayer();

  const [showShare, setShowShare] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [showSleep, setShowSleep] = useState(false);
  const [showLyricsView, setShowLyricsView] = useState(false);
  const [trackCover, setTrackCover] = useState<string | null>(null);
  const lyricsScrollRef = useRef<HTMLDivElement>(null);
  const { saveTrack, removeTrack, getSaveState, isSaved } = useDownloads();
  const { isFavorite, toggleFavorite, userId } = useLibrary();
  const router = useRouter();

  // ── Track-specific cover from Supabase ──
  useEffect(() => {
    if (!currentTrack || !currentAlbum) { setTrackCover(null); return; }
    const url = getTrackCoverUrl(currentAlbum.slug, currentTrack.number);
    if (!url) { setTrackCover(null); return; }
    // Probe if the cover exists (HEAD request)
    const img = new window.Image();
    img.onload = () => setTrackCover(url);
    img.onerror = () => setTrackCover(null);
    img.src = url;
  }, [currentTrack, currentAlbum]);

  // Reset lyrics view on track change
  useEffect(() => { setShowLyricsView(false); }, [currentTrack]);

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
  // Minimum movement in px before the swipe visual effect kicks in.
  // Without this dead-zone, any finger wobble during a button tap
  // applies a transform to the container, which makes the browser
  // cancel the pending click event → buttons "don't do anything".
  const SWIPE_THRESHOLD = 12;
  const touchStartY = useRef(0);
  const touchDeltaY = useRef(0);
  const isSwiping = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchDeltaY.current = 0;
    isSwiping.current = false;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaY.current = e.touches[0].clientY - touchStartY.current;

    // Only start the visual drag after the dead-zone threshold
    if (!isSwiping.current) {
      if (touchDeltaY.current > SWIPE_THRESHOLD) {
        isSwiping.current = true;
      } else {
        return; // still inside dead-zone, do nothing
      }
    }

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
    // Only close if user was actively swiping (not just tapping)
    if (isSwiping.current && touchDeltaY.current > 80) {
      setShowFullPlayer(false);
    }
    isSwiping.current = false;
  }, [setShowFullPlayer]);

  if (!showFullPlayer || !currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const albumColor = currentAlbum?.color || "#C9A96E";

  // Next track
  const currentIdx = queue.findIndex(t => t.number === currentTrack.number);
  const nextTrack = !shuffle && currentIdx >= 0 && currentIdx < queue.length - 1
    ? queue[currentIdx + 1]
    : null;

  const hasLyrics = !!currentTrack.lyrics;

  return (
    <>
    <div
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="fixed inset-0 z-50 flex flex-col overflow-hidden transition-[transform,opacity] duration-200 ease-out"
      style={{ background: `linear-gradient(180deg, ${albumColor}22 0%, #0D0D1A 40%)` }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px] pointer-events-none"
        style={{ backgroundColor: albumColor }}
      />

      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between px-5 py-3 shrink-0">
        <button
          onClick={() => setShowFullPlayer(false)}
          className="p-3 -ml-3 text-[#a0a0b0] hover:text-[#F5F0E6] transition-colors active:bg-white/5 rounded-xl"
          aria-label="Fechar player"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="text-center min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-[#666680]">A ouvir do album</p>
          <p className="text-xs font-medium text-[#a0a0b0] truncate">{currentAlbum?.title}</p>
        </div>
        <div className="flex items-center gap-0.5">
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
                className={`p-2 transition-colors ${saved ? "text-green-400" : "text-[#666680] hover:text-[#a0a0b0]"} disabled:opacity-50`}
                title={saved ? "Remover do offline" : "Guardar offline"}
              >
                {state === "saving" ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 animate-spin">
                    <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
                  </svg>
                ) : saved ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                )}
              </button>
            );
          })()}
          <button
            onClick={() => setShowSleep(true)}
            className="p-2 text-[#666680] hover:text-[#a0a0b0] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </button>
          <button
            onClick={() => setShowQueue(true)}
            className="p-2 text-[#666680] hover:text-[#a0a0b0] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M4 6h16M4 10h16M4 14h10M4 18h7" />
            </svg>
          </button>
          <button
            onClick={() => setShowShare(true)}
            className="p-2 -mr-2 text-[#666680] hover:text-[#a0a0b0] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable content: art + info + lyrics */}
      <div className="relative z-10 flex-1 overflow-y-auto scrollbar-none px-6">
        <div className="max-w-md mx-auto pt-2 pb-4">

          {/* ── LYRICS FULL VIEW (Apple Music style) ── */}
          {showLyricsView && hasLyrics ? (
            <div ref={lyricsScrollRef} className="pb-8">
              <button
                onClick={() => setShowLyricsView(false)}
                className="mb-6 flex items-center gap-1.5 text-xs text-[#666680] hover:text-[#a0a0b0] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Voltar
              </button>
              {/* Small cover + title */}
              <div className="flex items-center gap-3 mb-8">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={trackCover || (currentAlbum ? getAlbumCover(currentAlbum) : "/poses/loranne-hero.png")}
                    alt={currentTrack.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#F5F0E6] truncate">{currentTrack.title}</p>
                  <p className="text-xs text-[#666680] truncate">{currentAlbum?.title}</p>
                </div>
              </div>
              {/* Lyrics — large, centered, poetic */}
              <div className="space-y-3 px-2">
                {currentTrack.lyrics!.split("\n").map((line, i) => {
                  const isTag = line.startsWith("[");
                  if (isTag) return (
                    <p key={i} className="text-[10px] uppercase tracking-[0.2em] mt-8 first:mt-0" style={{ color: albumColor }}>
                      {line.replace(/[\[\]]/g, "")}
                    </p>
                  );
                  if (!line.trim()) return <div key={i} className="h-3" />;
                  return (
                    <p key={i} className="text-lg leading-relaxed text-[#F5F0E6]/90 font-display">
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* ── NORMAL VIEW: art + info ── */}
              {/* Album/track art */}
              <div className="relative mx-auto w-48 sm:w-56">
                {isPlaying && (
                  <div className="absolute inset-0 -m-4 flex items-center justify-center pointer-events-none">
                    <div
                      className="w-full h-full rounded-2xl opacity-30 blur-[25px] animate-pulse"
                      style={{ backgroundColor: albumColor }}
                    />
                  </div>
                )}
                <div className="relative aspect-square rounded-xl shadow-2xl overflow-hidden">
                  {currentAlbum && (
                    <Image
                      src={trackCover || getAlbumCover(currentAlbum)}
                      alt={currentTrack.title}
                      fill
                      sizes="224px"
                      className="object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Track name + favorite + next */}
              <div className="mt-5">
                <div className="flex items-center justify-center gap-2">
                  <h2 className="font-display text-lg font-semibold text-[#F5F0E6]">
                    {currentTrack.title}
                  </h2>
                  {/* Favorite heart */}
                  <button
                    onClick={() => {
                      if (!userId) { router.push("/login"); return; }
                      if (currentAlbum) toggleFavorite(currentTrack.number, currentAlbum.slug);
                    }}
                    className="p-1 shrink-0 transition-colors"
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
                <p className="text-sm text-[#a0a0b0] mt-0.5 text-center">{currentAlbum?.title}</p>
                {nextTrack && (
                  <p className="text-xs text-[#666680] mt-1 text-center">
                    A seguir: {nextTrack.title}
                  </p>
                )}
              </div>

              {/* Lyrics preview + "Ver letra" button */}
              {hasLyrics && (
                <button
                  onClick={() => setShowLyricsView(true)}
                  className="mt-6 w-full rounded-xl bg-white/5 hover:bg-white/[0.08] transition-colors p-5 text-left group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] uppercase tracking-widest text-[#666680]">Letra</p>
                    <span className="text-[10px] uppercase tracking-widest text-[#666680] group-hover:text-[#a0a0b0] transition-colors">
                      Ver completa
                    </span>
                  </div>
                  <div className="space-y-1.5 max-h-24 overflow-hidden relative">
                    {currentTrack.lyrics!.split("\n").slice(0, 8).map((line, i) => {
                      const isTag = line.startsWith("[");
                      if (isTag) return null;
                      if (!line.trim()) return null;
                      return (
                        <p key={i} className="text-sm leading-relaxed text-[#F5F0E6]/60 truncate">
                          {line}
                        </p>
                      );
                    })}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0D0D1A]/80 to-transparent" />
                  </div>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Fixed bottom: progress + controls */}
      <div className="relative z-10 shrink-0 px-6 pb-6 pt-2 bg-gradient-to-t from-[#0D0D1A] via-[#0D0D1A] to-transparent">
        <div className="max-w-md mx-auto">
          {/* Progress bar */}
          <div className="mb-3">
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
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-[#666680] tabular-nums">{fmt(currentTime)}</span>
              <span className="text-[10px] text-[#666680] tabular-nums">{fmt(duration)}</span>
            </div>
          </div>

          {/* Main controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={toggleShuffle}
              className={`p-2 transition-colors ${shuffle ? "text-white" : "text-[#666680] hover:text-[#a0a0b0]"}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
            </button>

            <button onClick={previous} className="p-2 text-[#F5F0E6] hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            <button
              onClick={togglePlay}
              className="flex h-14 w-14 items-center justify-center rounded-full text-[#0D0D1A] transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: albumColor }}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button onClick={next} className="p-2 text-[#F5F0E6] hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
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

          {/* Infinite mode toggle */}
          <div className="flex justify-center mt-2">
            <button
              onClick={toggleInfinite}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] transition-colors ${
                infinite
                  ? "bg-white/10 text-white"
                  : "text-[#666680] hover:text-[#a0a0b0]"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
              </svg>
              {infinite ? "Infinito" : "Infinito"}
            </button>
          </div>
        </div>
      </div>

    </div>

    {/* Modals — rendered outside the overflow-hidden container so they're
        never clipped when the swipe handler applies a transform */}
    {showShare && currentTrack && currentAlbum && (
      <ShareModal
        track={currentTrack}
        album={currentAlbum}
        onClose={() => setShowShare(false)}
      />
    )}
    <QueuePanel isOpen={showQueue} onClose={() => setShowQueue(false)} />
    <SleepTimer isOpen={showSleep} onClose={() => setShowSleep(false)} />
    </>
  );
}
