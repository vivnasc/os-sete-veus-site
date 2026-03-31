"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_ALBUMS } from "@/data/albums";

type Release = {
  date: string;
  album1: string;
  album2: string | null;
  done1: boolean;
  done2: boolean;
};

const CALENDAR: Release[] = [
  // Terças e Sextas — 2 albums por semana
  { date: "2026-04-01", album1: "livro-filosofico", album2: null, done1: false, done2: false },
  { date: "2026-04-04", album1: "espelho-ilusao", album2: null, done1: false, done2: false },
  { date: "2026-04-08", album1: "espelho-medo", album2: null, done1: false, done2: false },
  { date: "2026-04-11", album1: "espelho-culpa", album2: null, done1: false, done2: false },
  { date: "2026-04-15", album1: "espelho-identidade", album2: null, done1: false, done2: false },
  { date: "2026-04-18", album1: "espelho-controlo", album2: null, done1: false, done2: false },
  { date: "2026-04-22", album1: "espelho-desejo", album2: null, done1: false, done2: false },
  { date: "2026-04-25", album1: "espelho-separacao", album2: null, done1: false, done2: false },
  { date: "2026-04-29", album1: "no-heranca", album2: null, done1: false, done2: false },
  { date: "2026-05-02", album1: "no-silencio", album2: null, done1: false, done2: false },
  { date: "2026-05-06", album1: "no-sacrificio", album2: null, done1: false, done2: false },
  { date: "2026-05-09", album1: "no-vergonha", album2: null, done1: false, done2: false },
  { date: "2026-05-13", album1: "no-solidao", album2: null, done1: false, done2: false },
  { date: "2026-05-16", album1: "no-vazio", album2: null, done1: false, done2: false },
  { date: "2026-05-20", album1: "no-pertenca", album2: null, done1: false, done2: false },
  { date: "2026-05-23", album1: "cosmic-viagem", album2: null, done1: false, done2: false },
  { date: "2026-05-27", album1: "cosmic-romance", album2: null, done1: false, done2: false },
  { date: "2026-05-30", album1: "romance-carta", album2: null, done1: false, done2: false },
  { date: "2026-06-03", album1: "romance-saudade", album2: null, done1: false, done2: false },
  { date: "2026-06-06", album1: "romance-fogo-lento", album2: null, done1: false, done2: false },
  { date: "2026-06-10", album1: "romance-ninho", album2: null, done1: false, done2: false },
  { date: "2026-06-13", album1: "cosmic-orbita", album2: null, done1: false, done2: false },
  { date: "2026-06-17", album1: "cosmic-poeira", album2: null, done1: false, done2: false },
  { date: "2026-06-20", album1: "cosmic-vasto", album2: null, done1: false, done2: false },
  { date: "2026-06-24", album1: "cosmic-sinal", album2: null, done1: false, done2: false },
  { date: "2026-06-27", album1: "cosmic-eter", album2: null, done1: false, done2: false },
  { date: "2026-07-01", album1: "travessia", album2: null, done1: false, done2: false },
  { date: "2026-07-04", album1: "humus", album2: null, done1: false, done2: false },
  { date: "2026-07-08", album1: "folego", album2: null, done1: false, done2: false },
  { date: "2026-07-11", album1: "demora", album2: null, done1: false, done2: false },
  { date: "2026-07-15", album1: "corpo-celeste", album2: null, done1: false, done2: false },
  { date: "2026-07-18", album1: "correnteza", album2: null, done1: false, done2: false },
  { date: "2026-07-22", album1: "o-que-resta", album2: null, done1: false, done2: false },
  { date: "2026-07-25", album1: "limiar", album2: null, done1: false, done2: false },
  { date: "2026-07-29", album1: "o-circulo", album2: null, done1: false, done2: false },
  { date: "2026-08-01", album1: "o-gesto", album2: null, done1: false, done2: false },
  { date: "2026-08-05", album1: "vida-sangue-aceso", album2: null, done1: false, done2: false },
  { date: "2026-08-08", album1: "vida-luz-crua", album2: null, done1: false, done2: false },
  { date: "2026-08-12", album1: "vida-pao-sal", album2: null, done1: false, done2: false },
  { date: "2026-08-15", album1: "vida-ancora", album2: null, done1: false, done2: false },
  { date: "2026-08-19", album1: "vida-raiz-muda", album2: null, done1: false, done2: false },
];

function getAlbumTitle(slug: string): string {
  return ALL_ALBUMS.find(a => a.slug === slug)?.title || slug;
}

function getAlbumColor(slug: string): string {
  return ALL_ALBUMS.find(a => a.slug === slug)?.color || "#C9A96E";
}

function getAlbumTrackCount(slug: string): number {
  return ALL_ALBUMS.find(a => a.slug === slug)?.tracks.length || 0;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const day = d.getDate();
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return `${day} ${months[d.getMonth()]}`;
}

function isThisWeek(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  return diff >= -7 * 86400000 && diff <= 7 * 86400000;
}

function isPast(iso: string): boolean {
  return new Date(iso) < new Date();
}

export default function CalendarPage() {
  const [doneState, setDoneState] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem("veus:release-calendar") || "{}");
    } catch { return {}; }
  });

  function toggleDone(key: string) {
    setDoneState(prev => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem("veus:release-calendar", JSON.stringify(next));
      return next;
    });
  }

  const totalAlbums = CALENDAR.reduce((s, r) => s + 1 + (r.album2 ? 1 : 0), 0);
  const doneCount = Object.values(doneState).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#0D0D1A] px-6 py-10">
      <div className="max-w-screen-md mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-[#F5F0E6]">Calendario de Lancamentos</h1>
            <p className="text-sm text-[#666680] mt-1">Terças e sextas — DistroKid</p>
          </div>
          <Link href="/admin/producao" className="text-xs text-[#666680] hover:text-[#a0a0b0]">Producao</Link>
        </div>

        {/* Progress */}
        <div className="mb-8 rounded-xl bg-white/[0.03] border border-white/5 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#a0a0b0]">{doneCount} / {totalAlbums} lancados</span>
            <span className="text-sm text-[#C9A96E]">{Math.round((doneCount / totalAlbums) * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/5">
            <div className="h-full rounded-full bg-[#C9A96E] transition-all" style={{ width: `${(doneCount / totalAlbums) * 100}%` }} />
          </div>
        </div>

        {/* Calendar */}
        <div className="space-y-3">
          {CALENDAR.map((release, i) => {
            const week = isThisWeek(release.date);
            const past = isPast(release.date);
            const key1 = `${release.date}-1`;
            const key2 = `${release.date}-2`;
            const done1 = doneState[key1] || false;
            const done2 = release.album2 ? (doneState[key2] || false) : true;

            return (
              <div
                key={i}
                className={`rounded-xl border p-4 transition-colors ${
                  week ? "border-[#C9A96E]/40 bg-[#C9A96E]/5" :
                  past && done1 && done2 ? "border-green-900/30 bg-green-950/10 opacity-60" :
                  past ? "border-red-900/30 bg-red-950/5" :
                  "border-white/5 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-sm font-medium ${week ? "text-[#C9A96E]" : "text-[#a0a0b0]"}`}>
                    {new Date(release.date).getDay() === 2 ? "Terça" : "Sexta"}
                  </span>
                  <span className="text-xs text-[#666680]">{formatDate(release.date)}</span>
                  {week && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9A96E]/20 text-[#C9A96E]">Esta semana</span>}
                </div>

                <div className="space-y-2">
                  {/* Album 1 */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleDone(key1)}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 min-h-[44px] min-w-[44px] ${
                        done1 ? "border-green-500 bg-green-500" : "border-white/20"
                      }`}
                    >
                      {done1 && <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4"><path d="M20 6L9 17l-5-5" /></svg>}
                    </button>
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: getAlbumColor(release.album1) }} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${done1 ? "text-[#666680] line-through" : "text-[#F5F0E6]"}`}>
                        {getAlbumTitle(release.album1)}
                      </p>
                      <p className="text-[10px] text-[#666680]">{getAlbumTrackCount(release.album1)} faixas</p>
                    </div>
                    <Link
                      href={`/admin/producao?album=${release.album1}`}
                      className="text-[10px] text-[#C9A96E] hover:underline shrink-0"
                    >
                      Producao
                    </Link>
                  </div>

                  {/* Album 2 */}
                  {release.album2 && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleDone(key2)}
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 min-h-[44px] min-w-[44px] ${
                          done2 ? "border-green-500 bg-green-500" : "border-white/20"
                        }`}
                      >
                        {done2 && <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4"><path d="M20 6L9 17l-5-5" /></svg>}
                      </button>
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: getAlbumColor(release.album2) }} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${done2 ? "text-[#666680] line-through" : "text-[#F5F0E6]"}`}>
                          {getAlbumTitle(release.album2)}
                        </p>
                        <p className="text-[10px] text-[#666680]">{getAlbumTrackCount(release.album2)} faixas</p>
                      </div>
                      <Link
                        href={`/admin/producao?album=${release.album2}`}
                        className="text-[10px] text-[#C9A96E] hover:underline shrink-0"
                      >
                        Producao
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
