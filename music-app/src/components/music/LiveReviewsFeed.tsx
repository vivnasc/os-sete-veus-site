"use client";

import { useState, useEffect, useRef } from "react";
import { ALL_ALBUMS } from "@/data/albums";
import { supabase } from "@/lib/supabase";

/**
 * Social proof feed — mix of ghost reactions + real user comments.
 * Ghost names show only first letter (A***, B***, etc.)
 * Real users can type a reaction that appears in the feed.
 */

const GHOST_NAMES = [
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

function maskName(name: string): string {
  if (name.length <= 1) return name;
  return name[0] + "***";
}

const TEMPLATES = [
  "a ouvir {track}",
  "{track} em repeat",
  "que descoberta, {track}",
  "{track}. sim.",
  "mais uma vez {track}",
  "enviei {track} a uma amiga",
  "partilhei {track} nos stories",
  "{track} para a playlist do carro",
  "adicionei {album} todo a minha lista",
  "{track} ficou na cabeca o dia todo",
  "acordei com {track} na cabeca",
  "bom para ouvir a caminhar",
  "perfeita para o fim do dia",
  "boa para o caminho de casa",
  "como e que so descobri agora?",
  "alguem me recomendou e nao me arrependo",
  "vi nos stories de alguem e vim ouvir",
  "primeira vez a ouvir Loranne. gostei.",
  "a voz nesta e diferente",
  "o inicio de {track} e tao bom",
  "o refrão fica",
  "gosto da producao desta",
  "a ouvir {album} enquanto trabalho",
  "{album} inteiro sem saltar",
  "voltei ao {album}",
  "obrigada Loranne",
  "{track} para quem precisa de se sentir vista",
  "nao e musica. e um espelho.",
];

type Review = { id: string; user: string; text: string; timeAgo: string; isReal?: boolean };

function getTracks(): { title: string; album: string }[] {
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

function generateGhostReview(id: number, tracks: { title: string; album: string }[]): Review {
  const r1 = seededRandom(id);
  const r2 = seededRandom(id + 1000);
  const r3 = seededRandom(id + 2000);
  const r4 = seededRandom(id + 3000);

  const name = GHOST_NAMES[Math.floor(r1 * GHOST_NAMES.length)];
  const track = tracks[Math.floor(r2 * tracks.length)];
  const template = TEMPLATES[Math.floor(r3 * TEMPLATES.length)];

  const text = template.replace("{track}", track.title).replace("{album}", track.album);
  const minutes = Math.floor(r4 * 55) + 2;
  const timeAgo = minutes < 60 ? `${minutes}min` : `${Math.floor(minutes / 60)}h`;

  return { id: `g-${id}`, user: maskName(name), text, timeAgo };
}

export default function LiveReviewsFeed() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [myComment, setMyComment] = useState("");
  const [sending, setSending] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Get user name
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) {
        setUserName(data.user.email.split("@")[0]);
      }
    });
  }, []);

  useEffect(() => {
    const tracks = getTracks();
    if (tracks.length < 5) return;

    const hourSeed = Math.floor(Date.now() / 3600000);
    const initial = Array.from({ length: 6 }, (_, i) => generateGhostReview(hourSeed * 100 + i, tracks));
    setReviews(initial);

    let counter = initial.length;
    intervalRef.current = setInterval(() => {
      counter++;
      const tracks = getTracks();
      const newReview = generateGhostReview(hourSeed * 100 + counter, tracks);
      setReviews(prev => [newReview, ...prev].slice(0, 15));
    }, 20000);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  async function submitComment() {
    if (!myComment.trim() || sending) return;
    setSending(true);

    const displayName = userName ? maskName(userName) : "A***";
    const newReview: Review = {
      id: `real-${Date.now()}`,
      user: displayName,
      text: myComment.trim(),
      timeAgo: "agora",
      isReal: true,
    };

    setReviews(prev => [newReview, ...prev].slice(0, 15));
    setMyComment("");
    setSending(false);
  }

  if (reviews.length === 0) return null;

  return (
    <section className="px-6 py-4">
      <div className="max-w-screen-lg mx-auto">
        <p className="text-[10px] text-[#666680] uppercase tracking-wider mb-3">O que dizem</p>

        {/* User input */}
        <form
          onSubmit={(e) => { e.preventDefault(); submitComment(); }}
          className="flex gap-2 mb-4"
        >
          <input
            type="text"
            value={myComment}
            onChange={e => setMyComment(e.target.value)}
            placeholder="O que estas a sentir?"
            maxLength={120}
            className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-[#F5F0E6] placeholder-[#666680] focus:outline-none focus:border-[#C9A96E]/50"
          />
          <button
            type="submit"
            disabled={!myComment.trim() || sending}
            className="px-3 py-2 rounded-lg bg-[#C9A96E]/20 text-xs text-[#C9A96E] hover:bg-[#C9A96E]/30 transition-colors disabled:opacity-30"
          >
            Enviar
          </button>
        </form>

        <div className="space-y-1.5">
          {reviews.map((r) => (
            <div
              key={r.id}
              className={`flex items-baseline gap-2 py-1 ${r.isReal ? "bg-white/[0.02] rounded-lg px-2 -mx-2" : ""}`}
            >
              <span className="text-xs text-[#C9A96E] shrink-0">{r.user}</span>
              <span className="text-xs text-[#a0a0b0] flex-1">{r.text}</span>
              <span className="text-[9px] text-[#666680] shrink-0">{r.timeAgo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
