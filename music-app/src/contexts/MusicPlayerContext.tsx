"use client";

import { createContext, useContext, useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import type { Album, AlbumTrack } from "@/data/albums";
import { getCachedAudioUrl } from "@/hooks/useDownloads";

export function formatTime(s: number): string {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/**
 * Build the streaming proxy URL for a track.
 * Always routes through the proxy — even if audioUrl is null in the data,
 * the file may exist in Supabase Storage (uploaded via /upload).
 * The proxy returns 404 if the file doesn't exist, which the player handles gracefully.
 */
function proxyUrl(track: AlbumTrack, album: Album): string {
  // If already a proxy URL, keep it
  if (track.audioUrl?.startsWith("/api/music/stream")) return track.audioUrl;
  // Always route through proxy — the file may exist even if audioUrl is null
  return `/api/music/stream?album=${encodeURIComponent(album.slug)}&track=${track.number}`;
}

/**
 * Resolve the best audio source for a track:
 * 1. If cached offline in IndexedDB → use blob URL (instant, works offline)
 * 2. Otherwise → use streaming proxy
 */
async function resolveAudioSrc(track: AlbumTrack, album: Album): Promise<string> {
  try {
    const cached = await getCachedAudioUrl(album.slug, track.number);
    if (cached) return cached;
  } catch {
    // IndexedDB unavailable, fall through
  }
  return proxyUrl(track, album);
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

/**
 * Helper: set audio source (resolving cache first) and play.
 * Revokes any previous blob URL to prevent memory leaks.
 */
async function setSourceAndPlay(
  audio: HTMLAudioElement,
  track: AlbumTrack,
  album: Album,
  prevBlobRef: React.MutableRefObject<string | null>
) {
  // Clean up previous blob URL if any
  if (prevBlobRef.current) {
    URL.revokeObjectURL(prevBlobRef.current);
    prevBlobRef.current = null;
  }

  const src = await resolveAudioSrc(track, album);

  // Track blob URLs for cleanup
  if (src.startsWith("blob:")) {
    prevBlobRef.current = src;
  }

  audio.src = src;
  audio.play().catch(() => {});
}

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);
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
    const audio = audioRef.current;

    const onTime = () => setState(s => ({ ...s, currentTime: audio.currentTime }));
    const onMeta = () => setState(s => ({ ...s, duration: audio.duration }));
    const onEnded = () => handleEnded();
    const onPlay = () => setState(s => ({ ...s, isPlaying: true }));
    const onPause = () => setState(s => ({ ...s, isPlaying: false }));
    const onError = () => {
      // Audio file not found or failed to load — stop playback gracefully
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
        const audio = audioRef.current;
        if (audio) {
          setSourceAndPlay(audio, nextTrack, album, blobUrlRef);
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

  const playTrack = useCallback((track: AlbumTrack, album: Album, trackList?: AlbumTrack[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const queue = trackList || album.tracks;
    setSourceAndPlay(audio, track, album, blobUrlRef);

    setState(s => ({
      ...s,
      currentTrack: track,
      currentAlbum: album,
      queue,
      queueAlbum: album,
      isPlaying: true,
      showFullPlayer: true,
    }));
  }, []);

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

    // If more than 3 seconds in, restart current track
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
        setSourceAndPlay(audio, prevTrack, album, blobUrlRef);
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
