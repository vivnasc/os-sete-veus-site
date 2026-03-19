"use client";

import { createContext, useContext, useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import type { Album, AlbumTrack } from "@/data/albums";
import { getAlbumCover } from "@/lib/album-covers";

/**
 * Build the streaming proxy URL for a track.
 * Always routes through the proxy — even if audioUrl is null in the data,
 * the file may exist in Supabase Storage (uploaded via /upload).
 * The proxy returns 404 if the file doesn't exist, which the player handles gracefully.
 */
function proxyUrl(track: AlbumTrack, album: Album): string {
  if (track.audioUrl?.startsWith("/api/music/stream")) return track.audioUrl;
  return `/api/music/stream?album=${encodeURIComponent(album.slug)}&track=${track.number}`;
}

export function formatTime(s: number): string {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

type RepeatMode = "off" | "all" | "one";

type MusicPlayerState = {
  currentTrack: AlbumTrack | null;
  currentAlbum: Album | null;
  queue: AlbumTrack[];
  queueAlbum: Album | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  shuffle: boolean;
  repeat: RepeatMode;
  showFullPlayer: boolean;
  showLyrics: boolean;
};

type MusicPlayerActions = {
  playTrack: (track: AlbumTrack, album: Album, trackList?: AlbumTrack[]) => void;
  playAlbum: (album: Album, startIndex?: number) => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  setShowFullPlayer: (v: boolean) => void;
  setShowLyrics: (v: boolean) => void;
};

const MusicPlayerContext = createContext<(MusicPlayerState & MusicPlayerActions) | null>(null);

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) throw new Error("useMusicPlayer must be used within MusicPlayerProvider");
  return ctx;
}

const CROSSFADE_DURATION = 3; // seconds

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const crossfadeAudioRef = useRef<HTMLAudioElement | null>(null);
  const crossfadeTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const [state, setState] = useState<MusicPlayerState>({
    currentTrack: null,
    currentAlbum: null,
    queue: [],
    queueAlbum: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    shuffle: false,
    repeat: "off",
    showFullPlayer: false,
    showLyrics: false,
  });

  // Ensure audio element exists
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "metadata";
    }
    if (!crossfadeAudioRef.current) {
      crossfadeAudioRef.current = new Audio();
      crossfadeAudioRef.current.preload = "metadata";
    }
    const audio = audioRef.current;

    const onTime = () => setState(s => ({ ...s, currentTime: audio.currentTime }));
    const onMeta = () => setState(s => ({ ...s, duration: audio.duration }));
    const onEnded = () => handleEnded();
    const onPlay = () => setState(s => ({ ...s, isPlaying: true }));
    const onPause = () => setState(s => ({ ...s, isPlaying: false }));
    const onError = () => {
      setState(s => ({ ...s, isPlaying: false }));
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // MediaSession API — lock screen / notification controls
  useEffect(() => {
    if (!("mediaSession" in navigator)) return;

    const track = state.currentTrack;
    const album = state.currentAlbum;
    if (!track || !album) return;

    const coverUrl = typeof window !== "undefined"
      ? `${window.location.origin}${getAlbumCover(album)}`
      : "";

    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: "Loranne",
      album: album.title,
      artwork: coverUrl ? [
        { src: coverUrl, sizes: "512x512", type: "image/png" },
      ] : [],
    });

    navigator.mediaSession.setActionHandler("play", () => togglePlay());
    navigator.mediaSession.setActionHandler("pause", () => togglePlay());
    navigator.mediaSession.setActionHandler("previoustrack", () => previous());
    navigator.mediaSession.setActionHandler("nexttrack", () => next());
    navigator.mediaSession.setActionHandler("seekto", (details) => {
      if (details.seekTime != null) seek(details.seekTime);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentTrack, state.currentAlbum]);

  // Update MediaSession playback state
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = state.isPlaying ? "playing" : "paused";
    }
  }, [state.isPlaying]);

  // Update MediaSession position state
  useEffect(() => {
    if ("mediaSession" in navigator && state.duration > 0) {
      try {
        navigator.mediaSession.setPositionState({
          duration: state.duration,
          playbackRate: 1,
          position: Math.min(state.currentTime, state.duration),
        });
      } catch {
        // Some browsers don't support setPositionState
      }
    }
  }, [state.currentTime, state.duration]);

  function startCrossfade(nextSrc: string) {
    const main = audioRef.current;
    const fade = crossfadeAudioRef.current;
    if (!main || !fade) return;

    // Clear any existing crossfade
    if (crossfadeTimerRef.current) clearInterval(crossfadeTimerRef.current);

    fade.src = nextSrc;
    fade.volume = 0;
    fade.play().catch(() => {});

    const startVolume = main.volume;
    const steps = CROSSFADE_DURATION * 20; // 50ms intervals
    let step = 0;

    crossfadeTimerRef.current = setInterval(() => {
      step++;
      const progress = step / steps;
      main.volume = Math.max(0, startVolume * (1 - progress));
      fade.volume = Math.min(startVolume, startVolume * progress);

      if (step >= steps) {
        clearInterval(crossfadeTimerRef.current);
        crossfadeTimerRef.current = undefined;
        main.pause();
        main.src = fade.src;
        main.currentTime = fade.currentTime;
        main.volume = startVolume;
        main.play().catch(() => {});
        fade.pause();
        fade.src = "";
      }
    }, 50);
  }

  const handleEnded = useCallback(() => {
    setState(prev => {
      if (prev.repeat === "one") {
        const audio = audioRef.current;
        if (audio) {
          audio.currentTime = 0;
          audio.play().catch(() => {});
        }
        return prev;
      }

      const currentIdx = prev.queue.findIndex(t => t.number === prev.currentTrack?.number);
      let nextIdx: number;

      if (prev.shuffle) {
        const available = prev.queue.filter((_, i) => i !== currentIdx);
        if (available.length === 0) return { ...prev, isPlaying: false };
        const randomTrack = available[Math.floor(Math.random() * available.length)];
        nextIdx = prev.queue.indexOf(randomTrack);
      } else {
        nextIdx = currentIdx + 1;
      }

      if (nextIdx >= prev.queue.length) {
        if (prev.repeat === "all") {
          nextIdx = 0;
        } else {
          return { ...prev, isPlaying: false };
        }
      }

      const nextTrack = prev.queue[nextIdx];
      const album = prev.queueAlbum;
      if (nextTrack && album) {
        const src = proxyUrl(nextTrack, album);
        const audio = audioRef.current;
        if (audio) {
          audio.src = src;
          audio.play().catch(() => {});
        }
      }

      return {
        ...prev,
        currentTrack: nextTrack,
        currentAlbum: prev.queueAlbum,
        isPlaying: !!(nextTrack && album),
      };
    });
  }, []);

  // Crossfade: start fading when near end of track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !state.isPlaying || !state.duration) return;

    const remaining = state.duration - state.currentTime;
    if (remaining <= CROSSFADE_DURATION && remaining > CROSSFADE_DURATION - 0.5 && state.repeat !== "one") {
      // Find next track
      const currentIdx = state.queue.findIndex(t => t.number === state.currentTrack?.number);
      let nextIdx: number;

      if (state.shuffle) {
        const available = state.queue.filter((_, i) => i !== currentIdx);
        if (available.length === 0) return;
        nextIdx = state.queue.indexOf(available[Math.floor(Math.random() * available.length)]);
      } else {
        nextIdx = currentIdx + 1;
        if (nextIdx >= state.queue.length && state.repeat === "all") nextIdx = 0;
      }

      if (nextIdx < state.queue.length && state.queueAlbum) {
        const nextTrack = state.queue[nextIdx];
        const src = proxyUrl(nextTrack, state.queueAlbum);
        if (!crossfadeTimerRef.current) {
          startCrossfade(src);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentTime]);

  const playTrack = useCallback((track: AlbumTrack, album: Album, trackList?: AlbumTrack[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    // Cancel any active crossfade
    if (crossfadeTimerRef.current) {
      clearInterval(crossfadeTimerRef.current);
      crossfadeTimerRef.current = undefined;
      if (crossfadeAudioRef.current) {
        crossfadeAudioRef.current.pause();
        crossfadeAudioRef.current.src = "";
      }
    }

    const queue = trackList || album.tracks;
    const src = proxyUrl(track, album);
    audio.src = src;
    audio.volume = state.volume;
    audio.play().catch(() => {});

    setState(s => ({
      ...s,
      currentTrack: track,
      currentAlbum: album,
      queue,
      queueAlbum: album,
      isPlaying: true,
      showFullPlayer: true,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.volume]);

  const playAlbum = useCallback((album: Album, startIndex = 0) => {
    const track = album.tracks[startIndex];
    if (!track) return;
    playTrack(track, album, album.tracks);
  }, [playTrack]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !state.currentTrack) return;
    if (state.isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [state.isPlaying, state.currentTrack]);

  const next = useCallback(() => {
    handleEnded();
  }, [handleEnded]);

  const previous = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    setState(prev => {
      const currentIdx = prev.queue.findIndex(t => t.number === prev.currentTrack?.number);
      const prevIdx = currentIdx - 1;
      if (prevIdx < 0) {
        audio.currentTime = 0;
        return prev;
      }

      const prevTrack = prev.queue[prevIdx];
      const album = prev.queueAlbum;
      if (prevTrack && album) {
        const src = proxyUrl(prevTrack, album);
        audio.src = src;
        audio.play().catch(() => {});
      }

      return {
        ...prev,
        currentTrack: prevTrack,
        currentAlbum: prev.queueAlbum,
        isPlaying: !!(prevTrack && album),
      };
    });
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio) audio.currentTime = time;
  }, []);

  const setVolume = useCallback((v: number) => {
    const audio = audioRef.current;
    if (audio) audio.volume = v;
    setState(s => ({ ...s, volume: v }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setState(s => ({ ...s, shuffle: !s.shuffle }));
  }, []);

  const cycleRepeat = useCallback(() => {
    setState(s => ({
      ...s,
      repeat: s.repeat === "off" ? "all" : s.repeat === "all" ? "one" : "off",
    }));
  }, []);

  const setShowFullPlayer = useCallback((v: boolean) => {
    setState(s => ({ ...s, showFullPlayer: v }));
  }, []);

  const setShowLyrics = useCallback((v: boolean) => {
    setState(s => ({ ...s, showLyrics: v }));
  }, []);

  return (
    <MusicPlayerContext.Provider
      value={{
        ...state,
        playTrack,
        playAlbum,
        togglePlay,
        next,
        previous,
        seek,
        setVolume,
        toggleShuffle,
        cycleRepeat,
        setShowFullPlayer,
        setShowLyrics,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}
