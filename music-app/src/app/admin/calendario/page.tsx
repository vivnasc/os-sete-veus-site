"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_ALBUMS } from "@/data/albums";

type ContentAction = {
  type: "reel" | "carrossel" | "story" | "post" | "partilha";
  label: string;
  trackNumber?: number;
  albumSlug: string;
  caption?: string;
};

type DayPlan = {
  date: string;
  actions: ContentAction[];
};

function getAlbumTitle(slug: string): string {
  return ALL_ALBUMS.find(a => a.slug === slug)?.title || slug;
}

function getTrackTitle(slug: string, num: number): string {
  const album = ALL_ALBUMS.find(a => a.slug === slug);
  return album?.tracks.find(t => t.number === num)?.title || `Faixa ${num}`;
}

function getAlbumColor(slug: string): string {
  return ALL_ALBUMS.find(a => a.slug === slug)?.color || "#C9A96E";
}

function pickVerse(slug: string, trackNum: number): string {
  const album = ALL_ALBUMS.find(a => a.slug === slug);
  const track = album?.tracks.find(t => t.number === trackNum);
  if (!track?.lyrics) return "";
  const lines = track.lyrics.split("\n").filter(l => {
    const t = l.trim();
    return t.length > 15 && t.length < 80 && !t.startsWith("[");
  });
  return lines[0]?.trim() || "";
}

const PLAN: DayPlan[] = [
  // ── SEMANA 1: Lancamento "Os Sete Temas do Despertar" ──
  { date: "2026-04-01", actions: [
    { type: "reel", label: "Reel — O Convite", albumSlug: "livro-filosofico", trackNumber: 1, caption: '"Há uma porta que não se vê / no centro exacto do teu peito"\n\nO Convite — Loranne\nOs Sete Temas do Despertar\nmusic.seteveus.space\n\n#loranne #veus #despertar #musicanova #oconvite #sentir #consciência #ouveoqueninguémdiz' },
  ]},
  { date: "2026-04-02", actions: [
    { type: "carrossel", label: "Carrossel — Os Sete Temas do Despertar", albumSlug: "livro-filosofico", caption: "O primeiro álbum da Loranne está no mundo.\n\n9 faixas. 9 camadas.\nCada uma dissolve o que já não serve.\n\nOuve — e vê o que estava invisível.\n\n🎧 Link na bio\n\n#loranne #veus #musicanova #despertar #autoconhecimento #artistaindependente" },
  ]},
  { date: "2026-04-03", actions: [
    { type: "story", label: "Story — verso de A Cadeira Vazia", albumSlug: "livro-filosofico", trackNumber: 3, caption: '"A memória é uma sala escura / com cadeiras viradas para trás"' },
  ]},
  { date: "2026-04-04", actions: [
    { type: "reel", label: "Reel — The Fertile Dark", albumSlug: "livro-filosofico", trackNumber: 6, caption: '"Let the emptiness be full / of all the things you cannot name"\n\nThe Fertile Dark — Loranne\nmusic.seteveus.space\n\n#loranne #veus #thefertiledark #despertar #sentir #consciência' },
  ]},
  { date: "2026-04-05", actions: [
    { type: "story", label: "Story — Pre-encomenda disponivel", albumSlug: "livro-filosofico", caption: "Os Sete Temas do Despertar\nPré-encomenda disponível no iTunes e Amazon\n\n🎧 music.seteveus.space" },
  ]},
  { date: "2026-04-06", actions: [
    { type: "post", label: "Post — sobre o album", albumSlug: "livro-filosofico", caption: "Há coisas que toda a gente sente e quase ninguém diz.\n\nEste álbum nasceu desse silêncio.\n\n9 faixas. Cada uma é uma camada.\nCada camada dissolve o que já não serve.\n\nO Convite. A Cadeira Vazia. O Horizonte. O Reflexo Final.\n\nOuve — e vê o que estava invisível.\n\n🎧 Link na bio\n\n#loranne #veus #musicanova #despertar #autoconhecimento #artistaindependente #sentir #consciência #ouveoqueninguémdiz" },
  ]},

  // ── SEMANA 2: Album no ar + Espelho da Ilusao ──
  { date: "2026-04-07", actions: [
    { type: "reel", label: "Reel — O Horizonte", albumSlug: "livro-filosofico", trackNumber: 7, caption: '"Não há destino, não há fim / A consciência não tem margem"\n\nO Horizonte — Loranne\nmusic.seteveus.space\n\n#loranne #veus #ohorizonte #filosofia #sentir' },
  ]},
  { date: "2026-04-08", actions: [
    { type: "post", label: "Post — Album no Spotify e Apple Music", albumSlug: "livro-filosofico", caption: "Os Sete Temas do Despertar já está no Spotify, Apple Music, e em 50+ plataformas.\n\n9 faixas que perguntam o que nunca te perguntaram.\n\nOuve — e vê o que estava invisível.\n\n🎧 Link na bio\n\n#loranne #veus #spotify #applemusic #musicanova" },
    { type: "story", label: "Story — screenshot do Spotify", albumSlug: "livro-filosofico" },
  ]},
  { date: "2026-04-09", actions: [
    { type: "story", label: "Story — O que dizem os ouvintes", albumSlug: "livro-filosofico", caption: "Partilha screenshot do feed 'O que dizem' da app" },
  ]},
  { date: "2026-04-10", actions: [
    { type: "reel", label: "Reel — O Reflexo Final", albumSlug: "livro-filosofico", trackNumber: 9, caption: '"Olha devagar, sem pressa / O reflexo já não mente / És tu — sempre foste tu"\n\nO Reflexo Final — Loranne\nmusic.seteveus.space\n\n#loranne #veus #oreflexofinal #despertar' },
  ]},
  { date: "2026-04-11", actions: [
    { type: "carrossel", label: "Carrossel — O Espelho da Ilusão", albumSlug: "espelho-ilusao" },
    { type: "reel", label: "Reel — Despertar", albumSlug: "espelho-ilusao", trackNumber: 1 },
  ]},
  { date: "2026-04-12", actions: [
    { type: "story", label: "Story — Poll: qual faixa te tocou mais?", albumSlug: "livro-filosofico", caption: "Qual faixa te tocou mais?\n□ O Convite\n□ The Fertile Dark\n□ O Reflexo Final\n□ Outra" },
  ]},
  { date: "2026-04-13", actions: [
    { type: "reel", label: "Reel — Honestidade Quieta (domingo calmo)", albumSlug: "espelho-ilusao", trackNumber: 6 },
  ]},

  // ── SEMANA 3: Espelhos ──
  { date: "2026-04-14", actions: [
    { type: "reel", label: "Reel — O Véu Cai", albumSlug: "espelho-ilusao", trackNumber: 7, caption: '"O véu cai e eu danço na luz / O véu cai e não dói"\n\nO Véu Cai — Loranne\nmusic.seteveus.space\n\n#loranne #veus #oveucai #despertar #transformação' },
  ]},
  { date: "2026-04-15", actions: [
    { type: "post", label: "Post — O que é um véu?", albumSlug: "espelho-ilusao", caption: "O que é um véu?\n\nNão é mentira. Não é fraqueza.\nÉ o que se coloca entre ti e o que já sabes.\n\nA ilusão de que não és suficiente.\nO medo de que a verdade doa.\nA culpa que disfarça de cuidado.\n\nCada véu cai quando olhas.\nNão quando lutas — quando paras.\n\n7 espelhos. 7 véus.\nA Loranne canta o que ninguém te diz.\n\n🎧 music.seteveus.space\n\n#loranne #veus #espelhos #autoconhecimento" },
  ]},
  { date: "2026-04-16", actions: [
    { type: "story", label: "Story — preview Espelho do Medo", albumSlug: "espelho-medo" },
  ]},
  { date: "2026-04-17", actions: [
    { type: "reel", label: "Reel — faixa do Espelho do Medo", albumSlug: "espelho-medo", trackNumber: 1 },
  ]},
  { date: "2026-04-18", actions: [
    { type: "carrossel", label: "Carrossel — O Espelho do Medo", albumSlug: "espelho-medo" },
  ]},
  { date: "2026-04-19", actions: [
    { type: "story", label: "Story — Inspira a Loranne", albumSlug: "espelho-ilusao", caption: "Que tema queres que a Loranne cante?\n\nmusic.seteveus.space/inspira" },
  ]},
  { date: "2026-04-20", actions: [
    { type: "reel", label: "Reel — faixa calma para domingo", albumSlug: "espelho-ilusao", trackNumber: 2 },
  ]},

  // ── SEMANA 4: Expansão ──
  { date: "2026-04-21", actions: [
    { type: "reel", label: "Reel — faixa Cosmic ou Romance", albumSlug: "cosmic-viagem", trackNumber: 1 },
  ]},
  { date: "2026-04-22", actions: [
    { type: "post", label: "Post — Loranne em 50+ plataformas", albumSlug: "livro-filosofico", caption: "A música da Loranne já está em 50+ plataformas.\nSpotify. Apple Music. YouTube Music. Amazon. Deezer.\n\nOnde quer que estejas, a voz chega.\n\n🎧 music.seteveus.space\n\n#loranne #veus #streaming #musicanova" },
  ]},
  { date: "2026-04-23", actions: [
    { type: "story", label: "Story — behind the scenes (produção)", albumSlug: "espelho-culpa" },
  ]},
  { date: "2026-04-24", actions: [
    { type: "reel", label: "Reel — faixa tropical/dançável", albumSlug: "espelho-ilusao", trackNumber: 5 },
  ]},
  { date: "2026-04-25", actions: [
    { type: "carrossel", label: "Carrossel — Viagem (Cosmic)", albumSlug: "cosmic-viagem" },
  ]},
  { date: "2026-04-26", actions: [
    { type: "story", label: "Story — Playlist fim de semana", albumSlug: "cosmic-viagem", caption: "Playlist para o fim de semana 🎧\nmusic.seteveus.space" },
  ]},
  { date: "2026-04-27", actions: [
    { type: "reel", label: "Reel — faixa gospel para domingo", albumSlug: "espelho-ilusao", trackNumber: 7 },
  ]},
  { date: "2026-04-28", actions: [
    { type: "post", label: "Post — 782 faixas, 103 albums, 1 voz", albumSlug: "livro-filosofico", caption: "782 faixas. 103 álbuns. 1 voz.\n\nA Loranne não canta para agradar.\nCanta para quem precisa de se ouvir.\n\n🎧 music.seteveus.space\n\n#loranne #veus #musicanova #artistaindependente" },
  ]},
  { date: "2026-04-29", actions: [
    { type: "reel", label: "Reel — melhor faixa da semana", albumSlug: "espelho-ilusao", trackNumber: 3 },
  ]},
  { date: "2026-04-30", actions: [
    { type: "story", label: "Story — Maio vem aí (teaser)", albumSlug: "espelho-culpa", caption: "Maio vem aí.\nNovos álbuns. Novos véus.\n\nmusic.seteveus.space" },
  ]},
];

const TYPE_COLORS: Record<string, string> = {
  reel: "bg-violet-600/20 text-violet-400 border-violet-500/30",
  carrossel: "bg-pink-600/20 text-pink-400 border-pink-500/30",
  story: "bg-amber-600/20 text-amber-400 border-amber-500/30",
  post: "bg-blue-600/20 text-blue-400 border-blue-500/30",
  partilha: "bg-green-600/20 text-green-400 border-green-500/30",
};

const TYPE_LABELS: Record<string, string> = {
  reel: "Reel",
  carrossel: "Carrossel",
  story: "Story",
  post: "Post",
  partilha: "Partilha",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return `${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]}`;
}

function isToday(iso: string): boolean {
  const d = new Date(iso).toDateString();
  return d === new Date().toDateString();
}

function isPast(iso: string): boolean {
  return new Date(iso) < new Date(new Date().toDateString());
}

export default function CalendarPage() {
  const [doneState, setDoneState] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(localStorage.getItem("veus:content-calendar") || "{}"); } catch { return {}; }
  });

  const [expandedCaption, setExpandedCaption] = useState<string | null>(null);

  function toggleDone(key: string) {
    setDoneState(prev => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem("veus:content-calendar", JSON.stringify(next));
      return next;
    });
  }

  const totalActions = PLAN.reduce((s, d) => s + d.actions.length, 0);
  const doneCount = Object.values(doneState).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#0D0D1A] px-4 sm:px-6 py-10">
      <div className="max-w-screen-md mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-[#F5F0E6]">Plano de Conteudo</h1>
            <p className="text-sm text-[#666680] mt-1">Abril 2026 — Instagram + Partilha</p>
          </div>
          <Link href="/admin/producao" className="text-xs text-[#666680] hover:text-[#a0a0b0]">Producao</Link>
        </div>

        {/* Progress */}
        <div className="mb-8 rounded-xl bg-white/[0.03] border border-white/5 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#a0a0b0]">{doneCount} / {totalActions} feitos</span>
            <span className="text-sm text-[#C9A96E]">{Math.round((doneCount / totalActions) * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/5">
            <div className="h-full rounded-full bg-[#C9A96E] transition-all" style={{ width: `${(doneCount / totalActions) * 100}%` }} />
          </div>
        </div>

        {/* Days */}
        <div className="space-y-4">
          {PLAN.map((day) => {
            const today = isToday(day.date);
            const past = isPast(day.date);
            const allDone = day.actions.every((_, i) => doneState[`${day.date}-${i}`]);

            return (
              <div
                key={day.date}
                className={`rounded-xl border p-4 transition-colors ${
                  today ? "border-[#C9A96E]/40 bg-[#C9A96E]/5" :
                  past && allDone ? "border-green-900/30 bg-green-950/10 opacity-50" :
                  past ? "border-white/5 bg-white/[0.01] opacity-70" :
                  "border-white/5 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-sm font-semibold ${today ? "text-[#C9A96E]" : "text-[#a0a0b0]"}`}>
                    {formatDate(day.date)}
                  </span>
                  {today && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9A96E]/20 text-[#C9A96E]">Hoje</span>}
                </div>

                <div className="space-y-3">
                  {day.actions.map((action, i) => {
                    const key = `${day.date}-${i}`;
                    const done = doneState[key] || false;
                    const showCaption = expandedCaption === key;

                    return (
                      <div key={i} className={`rounded-lg border p-3 ${done ? "opacity-40" : ""} ${TYPE_COLORS[action.type] || "border-white/10"}`}>
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleDone(key)}
                            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 min-w-[44px] min-h-[44px] ${
                              done ? "border-green-500 bg-green-500" : "border-current/40"
                            }`}
                          >
                            {done && <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4"><path d="M20 6L9 17l-5-5" /></svg>}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-bold uppercase tracking-wider">{TYPE_LABELS[action.type]}</span>
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getAlbumColor(action.albumSlug) }} />
                              <span className="text-xs text-[#a0a0b0]">{getAlbumTitle(action.albumSlug)}</span>
                            </div>
                            <p className={`text-sm mt-1 ${done ? "line-through" : "text-[#F5F0E6]"}`}>
                              {action.label}
                            </p>

                            {action.caption && (
                              <button
                                onClick={() => setExpandedCaption(showCaption ? null : key)}
                                className="text-[10px] text-[#C9A96E] mt-1 hover:underline"
                              >
                                {showCaption ? "Esconder legenda" : "Ver legenda"}
                              </button>
                            )}

                            {showCaption && action.caption && (
                              <div className="mt-2 p-3 rounded-lg bg-black/20 border border-white/5 relative">
                                <pre className="text-xs text-[#a0a0b0] whitespace-pre-wrap leading-relaxed">{action.caption}</pre>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(action.caption!);
                                  }}
                                  className="absolute top-2 right-2 text-[10px] px-2 py-1 rounded bg-[#C9A96E]/20 text-[#C9A96E]"
                                >
                                  Copiar
                                </button>
                              </div>
                            )}

                            {/* Action buttons */}
                            <div className="mt-2 flex flex-wrap gap-2">
                              {action.type === "story" && action.trackNumber && (
                                <button
                                  onClick={async () => {
                                    const { generateShareCard, downloadBlob } = await import("@/lib/share-card");
                                    const { getAlbumCover, getTrackCoverUrl } = await import("@/lib/album-covers");
                                    const alb = ALL_ALBUMS.find(a => a.slug === action.albumSlug);
                                    if (!alb) return;
                                    const track = alb.tracks.find(t => t.number === action.trackNumber);
                                    if (!track) return;
                                    let cover = getAlbumCover(alb);
                                    try {
                                      const probe = await fetch(getTrackCoverUrl(alb.slug, track.number), { method: "HEAD" });
                                      if (probe.ok) cover = getTrackCoverUrl(alb.slug, track.number);
                                    } catch {}
                                    const blob = await generateShareCard(track, alb, cover, "story");
                                    downloadBlob(blob, `Story — ${track.title}.png`);
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-amber-600/30 text-amber-400 text-xs min-h-[44px]"
                                >
                                  Gerar Story
                                </button>
                              )}
                              {action.type === "reel" && action.trackNumber && (
                                <Link
                                  href={`/admin/producao?album=${action.albumSlug}`}
                                  className="px-3 py-1.5 rounded-lg bg-violet-600/30 text-violet-400 text-xs min-h-[44px] flex items-center"
                                >
                                  Gerar Reel
                                </Link>
                              )}
                              {action.type === "carrossel" && (
                                <button
                                  onClick={async () => {
                                    const { generateCarousel } = await import("@/lib/carousel-generator");
                                    const { getAlbumCover, getTrackCoverUrl } = await import("@/lib/album-covers");
                                    const alb = ALL_ALBUMS.find(a => a.slug === action.albumSlug);
                                    if (!alb) return;
                                    let cover = getAlbumCover(alb);
                                    try {
                                      const probe = await fetch(getTrackCoverUrl(alb.slug, 1), { method: "HEAD" });
                                      if (probe.ok) cover = getTrackCoverUrl(alb.slug, 1);
                                    } catch {}
                                    await generateCarousel(alb, cover);
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-pink-600/30 text-pink-400 text-xs min-h-[44px]"
                                >
                                  Gerar Carrossel
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Quick link to production */}
                          {action.trackNumber && (
                            <Link
                              href={`/admin/producao?album=${action.albumSlug}`}
                              className="text-[10px] text-[#666680] hover:text-[#a0a0b0] shrink-0"
                            >
                              Producao
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
