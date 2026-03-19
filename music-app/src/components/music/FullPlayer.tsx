"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { useMusicPlayer, formatTime } from "@/contexts/MusicPlayerContext";
import { getAlbumCover } from "@/lib/album-covers";
import ShareModal from "./ShareModal";
import QueuePanel from "./QueuePanel";
import SleepTimer from "./SleepTimer";

/**
 * Parse lyrics into timed lines.
 * Distributes lines evenly across the track duration for sync scrolling.
 */
function parseLyricLines(lyrics: string, duration: number): { text: string; time: number; isTag: boolean }[] {
  const rawLines = lyrics.split("\n");
  const result: { text: string; time: number; isTag: boolean }[] = [];
  const contentLines: number[] = []; // indices of non-tag, non-empty lines

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const isTag = line.startsWith("[");
    const isEmpty = !line.trim();
    result.push({ text: line, time: 0, isTag });
    if (!isTag && !isEmpty) {
      contentLines.push(i);
    }
  }

  // Distribute timings evenly across content lines
  if (contentLines.length > 0 && duration > 0) {
    const interval = duration / contentLines.length;
    for (let i = 0; i < contentLines.length; i++) {
      result[contentLines[i]].time = i * interval;
    }
    // Assign tag lines the time of their nearest following content line
    for (let i = 0; i < result.length; i++) {
      if (result[i].isTag || !result[i].text.trim()) {
        // Find next content line
        for (let j = i + 1; j < result.length; j++) {
          if (!result[j].isTag && result[j].text.trim()) {
            result[i].time = Math.max(0, result[j].time - 0.5);
            break;
          }
        }
      }
    }
  }

  return result;
}

function getCurrentLineIndex(lines: { time: number }[], currentTime: number): number {
  let idx = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].time <= currentTime) idx = i;
  }
  return idx;
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
  const [breathingMode, setBreathingMode] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"in" | "hold" | "out">("in");
  const lyricsRef = useRef<HTMLDivElement>(null);

  // Parsed lyrics with timing
  const lyricLines = useMemo(() => {
    if (!currentTrack?.lyrics) return [];
    return parseLyricLines(currentTrack.lyrics, duration || currentTrack.durationSeconds);
  }, [currentTrack?.lyrics, duration, currentTrack?.durationSeconds]);

  const currentLineIdx = getCurrentLineIndex(lyricLines, currentTime);

  // Auto-scroll lyrics to current line
  useEffect(() => {
    if (!showLyrics || !lyricsRef.current || lyricLines.length === 0) return;
    const container = lyricsRef.current;
    const lineEl = container.children[currentLineIdx] as HTMLElement | undefined;
    if (lineEl) {
      lineEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentLineIdx, showLyrics, lyricLines.length]);

  // Breathing mode cycle: 4s in, 4s hold, 6s out = 14s total
  useEffect(() => {
    if (!breathingMode || !isPlaying) return;
    const phases: { phase: "in" | "hold" | "out"; duration: number }[] = [
      { phase: "in", duration: 4000 },
      { phase: "hold", duration: 4000 },
      { phase: "out", duration: 6000 },
    ];
    let idx = 0;
    setBreathPhase(phases[0].phase);

    const advance = () => {
      idx = (idx + 1) % phases.length;
      setBreathPhase(phases[idx].phase);
    };

    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        advance();
        schedule();
      }, phases[idx].duration);
    };
    schedule();

    return () => clearTimeout(timer);
  }, [breathingMode, isPlaying]);

  // Pause reflection: show a random lyric line when paused
  const pauseReflection = useMemo(() => {
    if (isPlaying || !currentTrack?.lyrics) return null;
    const lines = currentTrack.lyrics.split("\n").filter(l => l.trim() && !l.startsWith("["));
    if (lines.length === 0) return null;
    // Use currentTime as seed for stability
    const idx = Math.floor(currentTime * 7) % lines.length;
    return lines[idx];
  }, [isPlaying, currentTrack?.lyrics, currentTime]);

  if (!showFullPlayer || !currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const albumColor = currentAlbum?.color || "#C9A96E";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: `linear-gradient(180deg, ${albumColor}22 0%, #0D0D1A 40%)` }}
      role="dialog"
      aria-label={`A ouvir: ${currentTrack.title}`}
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
          className="p-2 -ml-2 text-[#a0a0b0] hover:text-[#F5F0E6] transition-colors"
          aria-label="Minimizar player"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[#a0a0b0]">A ouvir do album</p>
          <p className="text-sm font-medium text-[#F5F0E6] mt-0.5">{currentAlbum?.title}</p>
        </div>
        <div className="flex items-center gap-1">
          {/* Breathing mode toggle */}
          <button
            onClick={() => setBreathingMode(!breathingMode)}
            className={`p-2 transition-colors ${breathingMode ? "text-[#C9A96E]" : "text-[#a0a0b0] hover:text-[#F5F0E6]"}`}
            aria-label={breathingMode ? "Desactivar modo respiracao" : "Activar modo respiracao"}
            title="Modo respiracao"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
          </button>
          {/* Sleep timer button */}
          <button
            onClick={() => setShowSleep(true)}
            className="p-2 text-[#a0a0b0] hover:text-[#F5F0E6] transition-colors"
            aria-label="Temporizador de sono"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </button>
          {/* Queue button */}
          <button
            onClick={() => setShowQueue(true)}
            className="p-2 text-[#a0a0b0] hover:text-[#F5F0E6] transition-colors"
            aria-label="Ver fila de reproducao"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M4 6h16M4 10h16M4 14h10M4 18h7" />
            </svg>
          </button>
          {/* Share button */}
          <button
            onClick={() => setShowShare(true)}
            className="p-2 -mr-2 text-[#a0a0b0] hover:text-[#F5F0E6] transition-colors"
            aria-label="Partilhar esta faixa"
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
          /* Synchronized lyrics view */
          <div ref={lyricsRef} className="w-full max-w-lg overflow-y-auto max-h-[50vh] scrollbar-none">
            <div className="space-y-3 text-center py-[20vh]">
              {lyricLines.map((line, i) => {
                if (!line.text.trim()) return null;
                const isCurrent = i === currentLineIdx;
                if (line.isTag) return (
                  <p key={i} className={`text-xs uppercase tracking-widest mt-6 first:mt-0 transition-colors duration-500 ${isCurrent ? "text-[#a0a0b0]" : "text-[#666680]"}`}>
                    {line.text.replace(/[\[\]]/g, "")}
                  </p>
                );
                return (
                  <p
                    key={i}
                    className={`font-display text-xl leading-relaxed transition-all duration-500 ${
                      isCurrent
                        ? "text-[#F5F0E6] scale-105 font-semibold"
                        : Math.abs(i - currentLineIdx) <= 2
                        ? "text-[#F5F0E6]/50"
                        : "text-[#F5F0E6]/20"
                    }`}
                  >
                    {line.text}
                  </p>
                );
              })}
            </div>
          </div>
        ) : breathingMode && isPlaying ? (
          /* Breathing mode visualization */
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <div
                className="w-48 h-48 rounded-full border-2 flex items-center justify-center transition-transform"
                style={{
                  borderColor: `${albumColor}50`,
                  transform: breathPhase === "in" ? "scale(1.2)" : breathPhase === "hold" ? "scale(1.2)" : "scale(0.85)",
                  transitionDuration: breathPhase === "in" ? "4s" : breathPhase === "hold" ? "0.5s" : "6s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                <div
                  className="w-28 h-28 rounded-full transition-opacity"
                  style={{
                    backgroundColor: `${albumColor}30`,
                    opacity: breathPhase === "hold" ? 1 : 0.5,
                    transitionDuration: "2s",
                  }}
                />
              </div>
            </div>
            <p className="font-display text-lg text-[#F5F0E6]/70 mt-8 transition-opacity duration-1000">
              {breathPhase === "in" && "Inspira..."}
              {breathPhase === "hold" && "Segura..."}
              {breathPhase === "out" && "Expira..."}
            </p>
          </div>
        ) : (
          /* Album art with pulsing glow */
          <div className="w-full max-w-xs relative">
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

            {/* Pause reflection — poetic line when paused */}
            {!isPlaying && pauseReflection && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl">
                <p className="font-display text-base text-[#F5F0E6]/80 text-center px-6 leading-relaxed italic">
                  {pauseReflection}
                </p>
              </div>
            )}
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
              aria-label={showLyrics ? "Esconder letras" : "Mostrar letras"}
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
            aria-label="Progresso da faixa"
            aria-valuemin={0}
            aria-valuemax={duration || 0}
            aria-valuenow={currentTime}
            aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`}
          />
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-[#666680] tabular-nums">{formatTime(currentTime)}</span>
            <span className="text-xs text-[#666680] tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main controls */}
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <button
            onClick={toggleShuffle}
            className={`p-2 transition-colors ${shuffle ? "text-white" : "text-[#666680] hover:text-[#a0a0b0]"}`}
            aria-label={shuffle ? "Desactivar aleatorio" : "Activar aleatorio"}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
          </button>

          <button onClick={previous} className="p-2 text-[#F5F0E6] hover:text-white transition-colors" aria-label="Faixa anterior">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          <button
            onClick={togglePlay}
            className="flex h-16 w-16 items-center justify-center rounded-full text-[#0D0D1A] transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: albumColor }}
            aria-label={isPlaying ? "Pausar" : "Reproduzir"}
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

          <button onClick={next} className="p-2 text-[#F5F0E6] hover:text-white transition-colors" aria-label="Proxima faixa">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>

          <button
            onClick={cycleRepeat}
            className={`p-2 relative transition-colors ${repeat !== "off" ? "text-white" : "text-[#666680] hover:text-[#a0a0b0]"}`}
            aria-label={`Repetir: ${repeat === "off" ? "desligado" : repeat === "all" ? "todas" : "uma"}`}
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
