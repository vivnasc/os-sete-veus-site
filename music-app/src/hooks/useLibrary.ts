"use client";

import { useState, useEffect, useCallback } from "react";
import type { AlbumTrack, Album } from "@/data/albums";

type FavoriteItem = {
  trackNumber: number;
  albumSlug: string;
  addedAt: string; // ISO date
};

type RecentItem = {
  trackNumber: number;
  albumSlug: string;
  playedAt: string; // ISO date
};

export function useLibrary() {
  // State
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [recents, setRecents] = useState<RecentItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const favs = localStorage.getItem("veus-favorites");
      if (favs) setFavorites(JSON.parse(favs));
      const recs = localStorage.getItem("veus-recents");
      if (recs) setRecents(JSON.parse(recs));
    } catch {}
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("veus-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("veus-recents", JSON.stringify(recents));
  }, [recents]);

  const isFavorite = useCallback((trackNumber: number, albumSlug: string) => {
    return favorites.some(f => f.trackNumber === trackNumber && f.albumSlug === albumSlug);
  }, [favorites]);

  const toggleFavorite = useCallback((trackNumber: number, albumSlug: string) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.trackNumber === trackNumber && f.albumSlug === albumSlug);
      if (exists) {
        return prev.filter(f => !(f.trackNumber === trackNumber && f.albumSlug === albumSlug));
      }
      return [...prev, { trackNumber, albumSlug, addedAt: new Date().toISOString() }];
    });
  }, []);

  const addToRecents = useCallback((trackNumber: number, albumSlug: string) => {
    setRecents(prev => {
      const filtered = prev.filter(r => !(r.trackNumber === trackNumber && r.albumSlug === albumSlug));
      return [{ trackNumber, albumSlug, playedAt: new Date().toISOString() }, ...filtered].slice(0, 50);
    });
  }, []);

  return { favorites, recents, isFavorite, toggleFavorite, addToRecents };
}
