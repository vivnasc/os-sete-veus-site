"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { getAlbumCover, getTrackCoverUrl } from "@/lib/album-covers";
import { useDownloads } from "@/hooks/useDownloads";
import { useLibrary } from "@/hooks/useLibrary";
import ShareModal from "./ShareModal";
import SleepTimer from "./SleepTimer";

function fmt(s: number) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

type ViewTab = "cover" | "lyrics" | "queue";

export default function FullPlayer() {
  const {
    currentTrack,
    currentAlbum,
    queue,
    queueAlbum,
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
    playTrack,
  } = useMusicPlayer();

  const [showShare, setShowShare] = useState(false);
  const [showSleep, setShowSleep] = useState(false);
  const [activeTab, setActiveTab] = useState<ViewTab>("cover");
  const [trackCover, setTrackCover] = useState<string | null>(null);
  const { saveTrack, removeTrack, getSaveState, isSaved } = useDownloads();
  const { isFavorite, toggleFavorite, userId } = useLibrary();
  const router = useRouter();

  // ── Track-specific cover ──
  useEffect(() => {
    if (!currentTrack || !currentAlbum) { setTrackCover(null); return; }
    const url = getTrackCoverUrl(currentAlbum.slug, currentTrack.number);
    if (!url) { setTrackCover(null); return; }
    const img = new window.Image();
    img.onload = () => setTrackCover(url);
    img.onerror = () => setTrackCover(null);
    img.src = url;
  }, [currentTrack, currentAlbum]);

  // Reset to cover view on track change
  useEffect(() => { setActiveTab("cover"); }, [currentTrack]);

  // ── Browser back button ──
  const didPushState = useRef(false);
  useEffect(() => {
    if (showFullPlayer && currentTrack) {
      if (!didPushState.current) {
        window.history.pushState({ veusPlayer: true }, "");
        didPushState.current = true;
      }
      function onPopState() { setShowFullPlayer(false); }
      window.addEventListener("popstate", onPopState);
      return () => window.removeEventListener("popstate", onPopState);
    } else {
      if (didPushState.current) {
        didPushState.current = false;
        if (window.history.state?.veusPlayer) window.history.back();
      }
    }
  }, [showFullPlayer, currentTrack, setShowFullPlayer]);

  // ── Swipe down to close ──
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
    if (!isSwiping.current) {
      if (touchDeltaY.current > SWIPE_THRESHOLD) isSwiping.current = true;
      else return;
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
    if (isSwiping.current && touchDeltaY.current > 80) setShowFullPlayer(false);
    isSwiping.current = false;
  }, [setShowFullPlayer]);

  if (!showFullPlayer || !currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const albumColor = currentAlbum?.color || "#C9A96E";
  const coverSrc = trackCover || (currentAlbum ? getAlbumCover(currentAlbum) : "/poses/loranne-hero.png");
  const hasLyrics = !!currentTrack.lyrics;

  // Queue
  const currentIdx = queue.findIndex(t => t.number === currentTrack.number);
  const upcomingTracks = currentIdx >= 0 ? queue.slice(currentIdx + 1) : [];
  const nextTrack = upcomingTracks[0] || null;

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

      {/* ── HEADER ── */}
      <div className="relative z-10 flex items-center justify-between px-5 py-3 shrink-0">
        <button
          onClick={() => setShowFullPlayer(false)}
          className="p-3 -ml-3 text-[#a0a0b0] hover:text-[#F5F0E6] transition-colors active:bg-white/5 rounded-xl"
          aria-label="Fechar player"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="text-center min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-[#666680]">A ouvir do album</p>
          <p className="text-xs font-medium text-[#a0a0b0] truncate">{currentAlbum?.title}</p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setShowSleep(true)} className="p-2 text-[#666680] hover:text-[#a0a0b0]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </button>
          <button onClick={() => setShowShare(true)} className="p-2 text-[#666680] hover:text-[#a0a0b0]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div className="relative z-10 flex-1 overflow-y-auto scrollbar-none">
        <div className="max-w-md mx-auto px-6 pt-2 pb-4">

          {/* ═══ COVER VIEW ═══ */}
          {activeTab === "cover" && (
            <>
              {/* Big cover art */}
              <div className="relative mx-auto" style={{ width: "min(80vw, 320px)" }}>
                {isPlaying && (
                  <div className="absolute inset-0 -m-6 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full rounded-2xl opacity-30 blur-[30px] animate-pulse" style={{ backgroundColor: albumColor }} />
                  </div>
                )}
                <div className="relative aspect-square rounded-2xl shadow-2xl overflow-hidden">
                  <img
                    src={coverSrc}
                    alt={currentTrack.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      setTrackCover(null);
                      if (currentAlbum) (e.target as HTMLImageElement).src = getAlbumCover(currentAlbum);
                    }}
                  />
                </div>
              </div>

              {/* Track name + favorite */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <h2 className="font-display text-xl font-semibold text-[#F5F0E6]">{currentTrack.title}</h2>
                  <button
                    onClick={() => {
                      if (!userId) { router.push("/login"); return; }
                      if (currentAlbum) toggleFavorite(currentTrack.number, currentAlbum.slug);
                    }}
                    className="p-1 shrink-0"
                  >
                    <svg viewBox="0 0 24 24"
                      fill={isFavorite(currentTrack.number, currentAlbum?.slug || "") ? "#e74c3c" : "none"}
                      stroke={isFavorite(currentTrack.number, currentAlbum?.slug || "") ? "#e74c3c" : "#a0a0b0"}
                      strokeWidth="2" className="h-5 w-5"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-[#a0a0b0] mt-0.5">{currentAlbum?.title}</p>
                {nextTrack && <p className="text-xs text-[#666680] mt-1">A seguir: {nextTrack.title}</p>}
              </div>

              {/* Save offline */}
              {currentAlbum && (() => {
                const state = getSaveState(currentAlbum.slug, currentTrack.number);
                const saved = isSaved(currentAlbum.slug, currentTrack.number);
                return (
                  <div className="flex justify-center mt-3">
                    <button
                      onClick={() => saved ? removeTrack(currentAlbum!.slug, currentTrack.number) : saveTrack(currentTrack, currentAlbum!)}
                      disabled={state === "saving"}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] transition-colors ${
                        saved ? "bg-green-900/20 text-green-400" : "text-[#666680] hover:text-[#a0a0b0]"
                      } disabled:opacity-50`}
                    >
                      {state === "saving" ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 animate-spin">
                          <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                          {saved
                            ? <path d="M20 6L9 17l-5-5" />
                            : <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                          }
                        </svg>
                      )}
                      {saved ? "Guardado offline" : "Guardar offline"}
                    </button>
                  </div>
                );
              })()}
            </>
          )}

          {/* ═══ LYRICS VIEW ═══ */}
          {activeTab === "lyrics" && hasLyrics && (
            <div className="pb-8">
              {/* Mini cover + title */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <img src={coverSrc} alt={currentTrack.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#F5F0E6] truncate">{currentTrack.title}</p>
                  <p className="text-xs text-[#666680] truncate">{currentAlbum?.title}</p>
                </div>
              </div>
              {/* Lyrics */}
              <div className="space-y-3 px-1">
                {currentTrack.lyrics!.split("\n").map((line: string, i: number) => {
                  if (line.startsWith("[")) return (
                    <p key={i} className="text-[10px] uppercase tracking-[0.2em] mt-8 first:mt-0" style={{ color: albumColor }}>
                      {line.replace(/[\[\]]/g, "")}
                    </p>
                  );
                  if (!line.trim()) return <div key={i} className="h-3" />;
                  return <p key={i} className="text-lg leading-relaxed text-[#F5F0E6]/90 font-display">{line}</p>;
                })}
              </div>
            </div>
          )}
          {activeTab === "lyrics" && !hasLyrics && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#666680" strokeWidth="1.5" className="h-12 w-12 mb-4">
                <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
              </svg>
              <p className="text-sm text-[#666680]">Sem letra disponivel</p>
            </div>
          )}

          {/* ═══ QUEUE VIEW ═══ */}
          {activeTab === "queue" && (
            <div className="pb-8">
              {/* Now playing */}
              <p className="text-[10px] uppercase tracking-widest text-[#666680] mb-3">A tocar agora</p>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-6">
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                  <img src={coverSrc} alt={currentTrack.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: albumColor }}>{currentTrack.title}</p>
                  <p className="text-xs text-[#666680] truncate">{currentAlbum?.title}</p>
                </div>
                {isPlaying && (
                  <div className="flex items-end gap-0.5 h-4 shrink-0">
                    <div className="w-0.5 animate-pulse" style={{ height: "60%", backgroundColor: albumColor }} />
                    <div className="w-0.5 animate-pulse" style={{ height: "100%", backgroundColor: albumColor, animationDelay: "0.2s" }} />
                    <div className="w-0.5 animate-pulse" style={{ height: "40%", backgroundColor: albumColor, animationDelay: "0.4s" }} />
                  </div>
                )}
              </div>

              {/* Up next */}
              {upcomingTracks.length > 0 ? (
                <>
                  <p className="text-[10px] uppercase tracking-widest text-[#666680] mb-3">A seguir</p>
                  <div className="space-y-1">
                    {upcomingTracks.map((track, i) => (
                      <button
                        key={`${track.number}-${i}`}
                        onClick={() => {
                          const album = currentAlbum || queueAlbum;
                          if (album) playTrack(track, album, queue);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                      >
                        <span className="text-xs text-[#666680] w-5 text-center shrink-0">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#F5F0E6] truncate">{track.title}</p>
                          <p className="text-xs text-[#666680] truncate">{track.description}</p>
                        </div>
                        <span className="text-xs text-[#666680] tabular-nums shrink-0">{fmt(track.durationSeconds)}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-sm text-[#666680]">
                    {infinite ? "Modo infinito — a proxima faixa sera escolhida automaticamente" : "Fim da fila"}
                  </p>
                </div>
              )}

              {/* Queue info badges */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <span className="text-[10px] text-[#666680]">{queue.length} faixa{queue.length !== 1 ? "s" : ""}</span>
                {shuffle && <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white">Aleatorio</span>}
                {infinite && <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white">Infinito</span>}
                {repeat !== "off" && <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white">Repetir{repeat === "one" ? " 1" : ""}</span>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── TAB BAR (Apple Music style) ── */}
      <div className="relative z-10 shrink-0 flex justify-center gap-1 px-6 pt-2">
        <button
          onClick={() => setActiveTab("cover")}
          className={`px-4 py-1.5 rounded-full text-[11px] font-medium transition-colors ${
            activeTab === "cover" ? "bg-white/10 text-white" : "text-[#666680] hover:text-[#a0a0b0]"
          }`}
        >
          Capa
        </button>
        <button
          onClick={() => setActiveTab("lyrics")}
          className={`px-4 py-1.5 rounded-full text-[11px] font-medium transition-colors ${
            activeTab === "lyrics" ? "bg-white/10 text-white" : "text-[#666680] hover:text-[#a0a0b0]"
          }`}
        >
          Letra
        </button>
        <button
          onClick={() => setActiveTab("queue")}
          className={`px-4 py-1.5 rounded-full text-[11px] font-medium transition-colors ${
            activeTab === "queue" ? "bg-white/10 text-white" : "text-[#666680] hover:text-[#a0a0b0]"
          }`}
        >
          Fila
        </button>
      </div>

      {/* ── FIXED BOTTOM: progress + controls ── */}
      <div className="relative z-10 shrink-0 px-6 pb-6 pt-3 bg-gradient-to-t from-[#0D0D1A] via-[#0D0D1A]/95 to-transparent">
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
              style={{ background: `linear-gradient(to right, ${albumColor} ${progress}%, rgba(255,255,255,0.1) ${progress}%)` }}
            />
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-[#666680] tabular-nums">{fmt(currentTime)}</span>
              <span className="text-[10px] text-[#666680] tabular-nums">{fmt(duration)}</span>
            </div>
          </div>

          {/* Main controls */}
          <div className="flex items-center justify-between">
            <button onClick={toggleShuffle} className={`p-2 transition-colors ${shuffle ? "text-white" : "text-[#666680] hover:text-[#a0a0b0]"}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
            </button>
            <button onClick={previous} className="p-2 text-[#F5F0E6] hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
            </button>
            <button
              onClick={togglePlay}
              className="flex h-16 w-16 items-center justify-center rounded-full text-[#0D0D1A] transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: albumColor }}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
            <button onClick={next} className="p-2 text-[#F5F0E6] hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
            </button>
            <button onClick={cycleRepeat} className={`p-2 relative transition-colors ${repeat !== "off" ? "text-white" : "text-[#666680] hover:text-[#a0a0b0]"}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
              </svg>
              {repeat === "one" && <span className="absolute -top-0.5 -right-0.5 text-[8px] font-bold">1</span>}
            </button>
          </div>

          {/* Infinite + Share */}
          <div className="flex justify-center items-center gap-4 mt-2">
            <button
              onClick={toggleInfinite}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] transition-colors ${infinite ? "bg-white/10 text-white" : "text-[#666680] hover:text-[#a0a0b0]"}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
              </svg>
              Infinito
            </button>
            <button
              onClick={() => setShowShare(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] text-[#666680] hover:text-[#a0a0b0] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
              </svg>
              Partilhar
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Modals */}
    {showShare && currentTrack && currentAlbum && (
      <ShareModal track={currentTrack} album={currentAlbum} onClose={() => setShowShare(false)} />
    )}
    <SleepTimer isOpen={showSleep} onClose={() => setShowSleep(false)} />
    </>
  );
}
