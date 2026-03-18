"use client";

import { useState } from "react";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import ShareModal from "./ShareModal";
import AudioVisualizer from "./AudioVisualizer";
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

  if (!showFullPlayer || !currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const albumColor = currentAlbum?.color || "#C9A96E";

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: `linear-gradient(180deg, ${albumColor}22 0%, #0D0D1A 40%)` }}>
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ backgroundColor: albumColor }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-safe-top py-4">
        <button
          onClick={() => setShowFullPlayer(false)}
          className="p-2 -ml-2 text-[#a0a0b0] hover:text-[#F5F0E6] transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[#a0a0b0]">A ouvir do álbum</p>
          <p className="text-sm font-medium text-[#F5F0E6] mt-0.5">{currentAlbum?.title}</p>
        </div>
        <div className="flex items-center gap-1">
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
          /* Album art + visualizer */
          <div className="w-full max-w-xs relative">
            {/* Audio visualizer behind the album art */}
            <div className="absolute inset-0 -m-16 flex items-center justify-center pointer-events-none">
              <div className="w-[350px] h-[350px] sm:w-[400px] sm:h-[400px]">
                <AudioVisualizer
                  color={albumColor}
                  isPlaying={isPlaying}
                  currentTime={currentTime}
                />
              </div>
            </div>
            <div
              className="relative aspect-square rounded-2xl shadow-2xl flex items-center justify-center"
              style={{ backgroundColor: albumColor }}
            >
              <div className="text-center px-6">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-16 w-16 text-white/30 mx-auto mb-4">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
                <p className="font-display text-sm text-white/50">{currentAlbum?.subtitle}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Track info + controls */}
      <div className="relative z-10 px-8 pb-safe-bottom pb-8">
        {/* Track name */}
        <div className="flex items-center justify-between mb-6">
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-xl font-semibold text-[#F5F0E6] truncate">
              {currentTrack.title}
            </h2>
            <p className="text-sm text-[#a0a0b0] truncate">{currentAlbum?.title}</p>
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
