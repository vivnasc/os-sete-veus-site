"use client";

import { useState, useEffect, useRef } from "react";
import { ALL_ALBUMS } from "@/data/albums";

/**
 * Social proof feed — subtle, believable reactions from listeners.
 * Designed to feel natural, never exaggerated.
 */

const NAMES = [
  "Amina", "Beatriz", "Celia", "Diana", "Elena", "Fatima", "Graça",
  "Helena", "Inês", "Joana", "Karina", "Lina", "Marta", "Nadia",
  "Paula", "Rita", "Sara", "Teresa", "Vera", "Ana",
  "Bianca", "Clara", "Dulce", "Flora", "Gabi", "Julia", "Katia",
  "Lucia", "Monica", "Nelia", "Pilar", "Raquel", "Sofia", "Tania",
  "Valentina", "Adriana", "Carla", "Elsa", "Fernanda", "Irene",
  "Jessica", "Liliana", "Marcia", "Patricia", "Sandra", "Vanessa",
  "Zara", "Leila", "Miriam", "Yara", "Dina", "Rosa", "Telma",
  "Nair", "Olga", "Eva", "Ursula", "Gloria", "Francisca", "Ivone",
];

// Short, casual, believable reactions — as people actually talk
const TEMPLATES = [
  // Simple, short
  "a ouvir {track}",
  "{track} em repeat",
  "que descoberta, {track}",
  "{track}. sim.",
  "mais uma vez {track}",
  // Casual sharing
  "enviei {track} a uma amiga",
  "partilhei {track} nos stories",
  "{track} para a playlist do carro",
  "adicionei {album} todo a minha lista",
  // Mild reactions (not crying, not dramatic)
  "{track} ficou na cabeca o dia todo",
  "acordei com {track} na cabeca",
  "bom para ouvir a caminhar",
  "perfeita para o fim do dia",
  "boa para o caminho de casa",
  // Discovery
  "como e que so descobri agora?",
  "alguem me recomendou e nao me arrependo",
  "vi nos stories de alguem e vim ouvir",
  "primeira vez a ouvir Loranne. gostei.",
  // Specific but subtle
  "a voz nesta e diferente",
  "o inicio de {track} e tao bom",
  "o refrão fica",
  "gosto da producao desta",
  "bonita a capa de {track}",
  // Album references
  "a ouvir {album} enquanto trabalho",
  "{album} inteiro sem saltar",
  "voltei ao {album}",
];


type Review = { id: number; user: string; text: string; timeAgo: string };

function getTracksWithAudio(): { title: string; album: string }[] {
  const tracks: { title: string; album: string }[] = [];
  for (const album of ALL_ALBUMS) {
    for (const track of album.tracks) {
      if (track.audioUrl || track.lyrics) {
        tracks.push({ title: track.title, album: album.title });
      }
    }
  }
  return tracks;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function generateReview(id: number, tracks: { title: string; album: string; lang: string }[]): Review {
  const r1 = seededRandom(id);
  const r2 = seededRandom(id + 1000);
  const r3 = seededRandom(id + 2000);
  const r4 = seededRandom(id + 3000);

  const user = NAMES[Math.floor(r1 * NAMES.length)];
  const track = tracks[Math.floor(r2 * tracks.length)];
  const template = TEMPLATES[Math.floor(r3 * TEMPLATES.length)];

  const text = template
    .replace("{track}", track.title)
    .replace("{album}", track.album);

  // Stagger times naturally — not all "1min ago"
  const minutes = Math.floor(r4 * 55) + 2;
  const timeAgo = minutes < 60 ? `${minutes}min` : `${Math.floor(minutes / 60)}h`;

  return { id, user, text, timeAgo };
}

export default function LiveReviewsFeed() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const tracks = getTracksWithAudio();
    if (tracks.length < 5) return;

    // Seed based on current hour — changes every hour, feels fresh
    const hourSeed = Math.floor(Date.now() / 3600000);
    const initial = Array.from({ length: 6 }, (_, i) => generateReview(hourSeed * 100 + i, tracks));
    setReviews(initial);

    // New review every 20 seconds — calmer pace
    let counter = initial.length;
    intervalRef.current = setInterval(() => {
      counter++;
      const newReview = generateReview(hourSeed * 100 + counter, tracks);
      setReviews(prev => [newReview, ...prev].slice(0, 12));
    }, 20000);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="px-6 py-4">
      <div className="max-w-screen-lg mx-auto">
        <p className="text-[10px] text-[#666680] uppercase tracking-wider mb-3">O que dizem</p>

        <div className="space-y-1.5">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="flex items-baseline gap-2 py-1"
            >
              <span className="text-xs text-[#C9A96E]">{r.user}</span>
              <span className="text-xs text-[#a0a0b0] flex-1">{r.text}</span>
              <span className="text-[9px] text-[#666680] shrink-0">{r.timeAgo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
