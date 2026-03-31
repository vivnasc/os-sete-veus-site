"use client";

import { useState, useEffect, useRef } from "react";
import { ALL_ALBUMS } from "@/data/albums";

/**
 * Simulated live reviews — ghost users sharing quick reactions about tracks.
 * Shows a rolling feed of natural, short reactions.
 * Mixes real published tracks with believable listener names.
 */

// 60 ghost users — Mozambican, Portuguese, Brazilian, universal names
const GHOST_USERS = [
  "Amina", "Beatriz", "Celia", "Diana M.", "Elena", "Fatima", "Graça",
  "Helena S.", "Inês", "Joana", "Karina", "Lina", "Marta", "Nadia",
  "Olivia", "Paula", "Rita", "Sara", "Teresa", "Vera",
  "Ana L.", "Bianca", "Clara", "Dulce", "Eva", "Flora", "Gabi",
  "Ines R.", "Julia", "Katia", "Lucia", "Monica", "Nelia", "Olga",
  "Pilar", "Raquel", "Sofia", "Tania", "Ursula", "Valentina",
  "Adriana", "Carla", "Dina", "Elsa", "Fernanda", "Gloria",
  "Irene", "Jessica", "Liliana", "Marcia", "Nair", "Patricia",
  "Rosa", "Sandra", "Telma", "Vanessa", "Zara", "Leila", "Miriam", "Yara",
];

// Reaction templates — {track} and {album} will be replaced
const REACTIONS = [
  "esta a ouvir {track} e nao consegue parar",
  "{track} tocou-me. sem palavras.",
  "a ouvir {track} pela terceira vez hoje",
  "isto e exactamente o que precisava de ouvir",
  "{track} — quem me dera ter ouvido isto ha anos",
  "a chorar com {track} e nao me arrependo",
  "partilhei {track} com a minha irma",
  "esta faixa descreve o que eu sinto",
  "{track} no repeat. o dia inteiro.",
  "nunca pensei que uma musica me fizesse sentir assim",
  "o album {album} e uma viagem",
  "obrigada Loranne. so obrigada.",
  "{track} — a minha faixa preferida de sempre",
  "a ouvir isto a caminho do trabalho e a sentir tudo",
  "alguem mais a chorar com {track}?",
  "enviei {track} ao meu ex. sem legenda.",
  "esta musica e um abraco",
  "{track} para quem precisa de se sentir vista",
  "a minha filha perguntou porque estou a chorar. culpa da Loranne.",
  "nao sabia que precisava disto ate ouvir",
  "{track} — como se alguem tivesse lido o meu diario",
  "3 da manha. {track}. e eu.",
  "isto devia ser prescrito por medicos",
  "a ouvir {album} inteiro de olhos fechados",
  "partilhei nos stories. toda a gente precisa disto.",
  "{track} fez-me ligar a minha mae",
  "repito: esta musica e terapia",
  "nao e musica. e um espelho.",
  "{track} no maximo volume. vizinhos que perdoem.",
  "ha coisas que so a musica diz",
  "a Loranne sabe coisas que eu nunca contei a ninguem",
  "{track} e a banda sonora da minha cura",
];

type Review = {
  id: number;
  user: string;
  text: string;
  timeAgo: string;
};

function getPublishedTracks(): { title: string; album: string }[] {
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

function generateReview(id: number, tracks: { title: string; album: string }[]): Review {
  const seed = id * 7919 + 31;
  const userIdx = seed % GHOST_USERS.length;
  const reactionIdx = (seed * 13) % REACTIONS.length;
  const trackIdx = (seed * 17) % tracks.length;

  const track = tracks[trackIdx];
  const text = REACTIONS[reactionIdx]
    .replace("{track}", track.title)
    .replace("{album}", track.album);

  const minutes = (seed % 45) + 1;
  const timeAgo = minutes < 60 ? `${minutes}min` : `${Math.floor(minutes / 60)}h`;

  return { id, user: GHOST_USERS[userIdx], text, timeAgo };
}

export default function LiveReviewsFeed() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [visible, setVisible] = useState(5);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const tracks = getPublishedTracks();
    if (tracks.length === 0) return;

    // Generate initial batch based on current time
    const baseSeed = Math.floor(Date.now() / 60000); // changes every minute
    const initial = Array.from({ length: 8 }, (_, i) => generateReview(baseSeed + i, tracks));
    setReviews(initial);

    // Add a new review every 12 seconds
    let counter = initial.length;
    intervalRef.current = setInterval(() => {
      counter++;
      const newReview = generateReview(baseSeed + counter, tracks);
      setReviews(prev => [newReview, ...prev].slice(0, 20));
    }, 12000);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="px-6 py-6">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-xs text-[#666680] uppercase tracking-wider">A ouvir agora</p>
        </div>

        <div className="space-y-2">
          {reviews.slice(0, visible).map((r) => (
            <div
              key={r.id}
              className="flex items-start gap-3 py-2 animate-in fade-in slide-in-from-top-2 duration-500"
            >
              {/* Avatar placeholder */}
              <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <span className="text-[10px] text-[#a0a0b0]">{r.user[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#F5F0E6]">
                  <span className="text-[#C9A96E] font-medium">{r.user}</span>{" "}
                  <span className="text-[#a0a0b0]">{r.text}</span>
                </p>
              </div>
              <span className="text-[10px] text-[#666680] shrink-0">{r.timeAgo}</span>
            </div>
          ))}
        </div>

        {visible < reviews.length && (
          <button
            onClick={() => setVisible(v => v + 5)}
            className="mt-3 text-xs text-[#666680] hover:text-[#a0a0b0] transition-colors"
          >
            Ver mais
          </button>
        )}
      </div>
    </section>
  );
}
