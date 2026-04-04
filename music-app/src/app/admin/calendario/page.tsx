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
    { type: "reel", label: "Reel — O Convite", albumSlug: "livro-filosofico", trackNumber: 1, caption: '"Ha uma porta que nao se ve\nno centro exacto do teu peito"\n\nO Convite — Loranne\nOs Sete Temas do Despertar\nmusic.seteveus.space\n\n#loranne #veus #oconvite #ouve' },
  ]},
  { date: "2026-04-02", actions: [
    { type: "carrossel", label: "Carrossel — Os Sete Temas do Despertar", albumSlug: "livro-filosofico", caption: "Os Sete Temas do Despertar.\n9 faixas. O primeiro album.\n\n1. O Convite\n2. The Impermanence of You\n3. A Cadeira Vazia\n4. The Whirlwind\n5. A Plenitude que Ja Esta\n6. The Fertile Dark\n7. O Horizonte\n8. The Reunion\n9. O Reflexo Final\n\nCada faixa e uma camada.\nTira uma e ve o que aparece por baixo.\n\nmusic.seteveus.space\n\n#loranne #veus #despertar #ouve" },
  ]},
  { date: "2026-04-03", actions: [
    { type: "story", label: "Story — verso de A Cadeira Vazia", albumSlug: "livro-filosofico", trackNumber: 3 },
  ]},
  { date: "2026-04-04", actions: [
    { type: "reel", label: "Reel — The Fertile Dark", albumSlug: "livro-filosofico", trackNumber: 6, caption: '"Let the emptiness be full\nof all the things you cannot name\nThe fertile dark will hold your roots\nuntil you bloom without the shame"\n\nThe Fertile Dark — Loranne\nmusic.seteveus.space\n\n#loranne #veus #thefertiledark #bloom' },
  ]},
  { date: "2026-04-05", actions: [
    { type: "story", label: "Story — Pre-encomenda disponivel", albumSlug: "livro-filosofico" },
  ]},
  { date: "2026-04-06", actions: [
    { type: "post", label: "Post — sobre o album", albumSlug: "livro-filosofico", caption: "Escrevi estas cancoes no escuro.\nNao no escuro dramatico.\nNo escuro de uma terca-feira as tres da manha, com o cha frio e o corpo a dizer coisas que a boca nao sabia dizer.\n\n9 faixas.\nAlgumas em portugues. Outras em ingles.\nTodas no mesmo sitio — esse lugar entre o peito e a garganta onde as coisas ficam presas.\n\nSe ouvires e sentires um arrepio estranho, nao e a musica.\nEs tu a reconheceres-te.\n\nmusic.seteveus.space\n\n#loranne #veus #despertar #sentir" },
  ]},

  // ── SEMANA 2: Viagem + Espelho da Ilusao + Romance ──
  { date: "2026-04-07", actions: [
    { type: "reel", label: "Reel — Viagem (cosmic)", albumSlug: "cosmic-viagem", trackNumber: 3, caption: '"Fui agua antes de ser sangue\nFui pedra antes de ser osso\nFui silencio antes de ser nome\nFui vastidao antes de ser pouco"\n\nViagem — Loranne\nmusic.seteveus.space\n\n#loranne #veus #viagem #corpo #vastidao' },
  ]},
  { date: "2026-04-08", actions: [
    { type: "post", label: "Post — Loranne em todo o lado", albumSlug: "livro-filosofico", caption: "Ja esta em todo o lado.\nSpotify. Apple Music. Amazon. YouTube Music. Deezer.\n50+ plataformas.\n\nPoe os phones.\nFecha os olhos.\nDa-lhe 9 minutos.\n\nSe nao sentires nada, nao e para ti.\nMas se sentires — ouve outra vez.\n\nmusic.seteveus.space\n\n#loranne #veus #spotify #applemusic #ouve" },
    { type: "story", label: "Story — screenshot do Spotify", albumSlug: "livro-filosofico" },
  ]},
  { date: "2026-04-09", actions: [
    { type: "reel", label: "Reel — Proximidade (romance)", albumSlug: "cosmic-romance", trackNumber: 1, caption: '"Tenho medo desta proximidade\nNao porque doi\nMas porque nao doi\nE eu nao sei o que fazer\nCom uma coisa que nao magoa"\n\nProximidade — Loranne\nmusic.seteveus.space\n\n#loranne #veus #proximidade #amor #medo' },
  ]},
  { date: "2026-04-10", actions: [
    { type: "carrossel", label: "Carrossel — Viagem", albumSlug: "cosmic-viagem", caption: "Viagem.\nO album que pergunta: onde e que acabas tu e comeca o universo?\n\n\"Home is not a place\nHome is a frequency I recognise\nWhen the noise stops\nAnd the body softens\"\n\n10 faixas entre o corpo e o cosmos.\nmusic.seteveus.space\n\n#loranne #veus #viagem #cosmic #ouve" },
  ]},
  { date: "2026-04-11", actions: [
    { type: "reel", label: "Reel — Despertar", albumSlug: "espelho-ilusao", trackNumber: 1, caption: '"Algo treme ca por dentro\nAlgo quer nascer\nComo a flor que parte o cimento\nSo pra poder viver"\n\nDespertar — Loranne\nmusic.seteveus.space\n\n#loranne #veus #despertar #acordar' },
  ]},
  { date: "2026-04-12", actions: [
    { type: "story", label: "Story — Poll: qual album queres ouvir?", albumSlug: "livro-filosofico" },
  ]},
  { date: "2026-04-13", actions: [
    { type: "reel", label: "Reel — Stardust (domingo)", albumSlug: "cosmic-viagem", trackNumber: 6, caption: '"Stardust\nBorrowing a body\npretending it\'s mine"\n\nStardust — Loranne\nViagem\nmusic.seteveus.space\n\n#loranne #veus #stardust #cosmic #domingo' },
  ]},

  // ── SEMANA 3: Travessia + Luto + Romance + Espelhos ──
  { date: "2026-04-14", actions: [
    { type: "reel", label: "Reel — Linhagem (travessia)", albumSlug: "travessia", trackNumber: 6, caption: '"Eu sou a boca que elas nao tiveram\neu sou o passo que elas nao puderam dar\neu sou a filha de todas as que sobreviveram\ne a forca delas nao me deixa recuar"\n\nLinhagem — Loranne\nTravessia\nmusic.seteveus.space\n\n#loranne #veus #linhagem #travessia #forca' },
  ]},
  { date: "2026-04-15", actions: [
    { type: "post", label: "Post — sobre amor", albumSlug: "cosmic-romance", caption: "\"Touch me again\nLike I\'m a page\nYou want to memorise\nBefore the light goes out\"\n\nHa cancoes que escrevi de madrugada com o telefone na mao.\nNao para ninguem ouvir.\nPara nao esquecer como me senti.\n\nAlgumas viraram faixas.\nEsta e uma delas.\n\nmusic.seteveus.space\n\n#loranne #veus #romance #amor #ouve" },
  ]},
  { date: "2026-04-16", actions: [
    { type: "reel", label: "Reel — O mundo nao parou (luto)", albumSlug: "espiritual-luto", trackNumber: 1, caption: '"O mundo nao parou\ne essa e a parte mais cruel"\n\nLuto — Loranne\nmusic.seteveus.space\n\n#loranne #veus #luto #perda #sentir' },
    { type: "story", label: "Story — verso de Emboscada", albumSlug: "espiritual-luto", trackNumber: 4 },
  ]},
  { date: "2026-04-17", actions: [
    { type: "carrossel", label: "Carrossel — Romance", albumSlug: "cosmic-romance", caption: "Romance.\nO album sobre amar sem desaparecer.\n\n\"A coisa mais intima que fiz\nNao foi tirar a roupa\nFoi deixar alguem ver a cara\nQue eu faco quando estou sozinha\"\n\n10 faixas. Para ouvir a dois. Ou sozinha a pensar em alguem.\n\nmusic.seteveus.space\n\n#loranne #veus #romance #intimidade #ouve" },
  ]},
  { date: "2026-04-18", actions: [
    { type: "reel", label: "Reel — I plan my life in pencil", albumSlug: "cosmic-orbita", trackNumber: 2, caption: '"I plan my life in pencil\nBut something writes in ink"\n\nOrbita — Loranne\nmusic.seteveus.space\n\n#loranne #veus #orbita #vida #controlo' },
  ]},
  { date: "2026-04-19", actions: [
    { type: "story", label: "Story — Inspira a Loranne", albumSlug: "cosmic-viagem" },
  ]},
  { date: "2026-04-20", actions: [
    { type: "reel", label: "Reel — Esvaziar (domingo)", albumSlug: "demora", trackNumber: 3, caption: '"Esvaziei tudo\ne fiquei cheia\npela primeira vez"\n\nDemora — Loranne\nmusic.seteveus.space\n\n#loranne #veus #demora #vazio #calma #domingo' },
  ]},

  // ── SEMANA 4: Luto + Culpa + No + Humus + fecho ──
  { date: "2026-04-21", actions: [
    { type: "reel", label: "Reel — A Mae Que Viu", albumSlug: "no-heranca", trackNumber: 1, caption: '"A mae que viu guardou a chuva inteira\nCoseu o ceu para nao te molhar\nPorque dizer era partir-te em dois pedacos\nE eu preferi calar a te partir ao luar"\n\nA Mae Que Viu — Loranne\nmusic.seteveus.space\n\n#loranne #veus #mae #silencio #heranca' },
  ]},
  { date: "2026-04-22", actions: [
    { type: "post", label: "Post — sobre perda", albumSlug: "espiritual-luto", caption: "\"The dead don\'t leave\nthey just change address\nThey move from the room\nto the chest\"\n\nHa cancoes que doem a escrever.\nEsta doeu.\nMas a dor nao e o problema.\nA dor e a prova de que amaste.\n\nSe perdeste alguem, ouve isto.\nNao vai ajudar. Mas vais sentir-te menos sozinha.\n\nmusic.seteveus.space\n\n#loranne #veus #luto #saudade #perda #ouve" },
  ]},
  { date: "2026-04-23", actions: [
    { type: "reel", label: "Reel — Se me apagares, acendo", albumSlug: "humus", trackNumber: 9, caption: '"Se me apagares, acendo\nSe me enterrares\nbrilho no escuro"\n\nHumus — Loranne\nmusic.seteveus.space\n\n#loranne #veus #humus #forca #renascer' },
    { type: "story", label: "Story — behind the scenes (producao)", albumSlug: "travessia" },
  ]},
  { date: "2026-04-24", actions: [
    { type: "carrossel", label: "Carrossel — Travessia", albumSlug: "travessia", caption: "Travessia.\nO album sobre cruzar o que dói e chegar ao outro lado.\n\n\"Nao ha altar mais limpo\ndo que um pulmao cansado\nNao ha oracao mais honesta\ndo que um corpo deitado\"\n\n11 faixas. Raiva, linhagem, recomecos, primavera.\nO album mais cru que escrevi.\n\nmusic.seteveus.space\n\n#loranne #veus #travessia #cruzar #ouve" },
  ]},
  { date: "2026-04-25", actions: [
    { type: "reel", label: "Reel — Permission (culpa)", albumSlug: "espelho-culpa", trackNumber: 5, caption: '"But the birds don\'t earn the morning\nAnd the river doesn\'t pay for rain\nThe wildflower grows without permission\nAnd still the sun comes back again"\n\nPermission — Loranne\nmusic.seteveus.space\n\n#loranne #veus #permission #culpa #liberdade' },
  ]},
  { date: "2026-04-26", actions: [
    { type: "story", label: "Story — Playlist fim de semana", albumSlug: "cosmic-viagem" },
  ]},
  { date: "2026-04-27", actions: [
    { type: "reel", label: "Reel — Love is a weather system (domingo)", albumSlug: "cosmic-romance", trackNumber: 8, caption: '"Love is not a decision\nIt\'s a weather system\nIt arrives\nYou get wet"\n\nWeather — Loranne\nRomance\nmusic.seteveus.space\n\n#loranne #veus #romance #amor #domingo' },
  ]},
  { date: "2026-04-28", actions: [
    { type: "post", label: "Post — Pergunta ao publico", albumSlug: "cosmic-eter", caption: "\"Quase\nA palavra mais pesada\nQuase\nA distancia mais sagrada\nEntre o que sou e o que seria\nSe o medo nao mandasse\"\n\nQual e o teu quase?\n\nO que quase disseste. O que quase fizeste. O sitio onde quase foste.\n\nEscreve nos comentarios. Uma palavra basta.\n\nmusic.seteveus.space\n\n#loranne #veus #quase #pergunta #ouve" },
  ]},
  { date: "2026-04-29", actions: [
    { type: "reel", label: "Reel — Carta nunca enviada", albumSlug: "romance-carta", trackNumber: 3, caption: '"No chuveiro sou poeta e sou valente\nDigo tudo o que a gente\nNao consegue cara a cara\nCom a boca seca e o medo"\n\nCarta — Loranne\nmusic.seteveus.space\n\n#loranne #veus #carta #palavras #coragem' },
  ]},
  { date: "2026-04-30", actions: [
    { type: "post", label: "Post — Balanco de Abril", albumSlug: "livro-filosofico", caption: "Abril em numeros:\n38 cancoes. 5 albuns. 2 linguas. 0 regras.\n\nCantei sobre despertar, sobre cosmos, sobre amor.\nSobre luto, sobre raiva, sobre maes que calam por amor.\nSobre cartas que nunca mandei e chuveiros onde sou valente.\n\nObrigada a quem ouviu no escuro.\nA quem partilhou sem eu pedir.\nA quem me mandou mensagem a dizer \"como e que sabes?\"\n\nNao sei. Sinto. E depois canto.\n\nMaio traz mais.\n\nmusic.seteveus.space\n\n#loranne #veus #abril #obrigada #maio" },
    { type: "story", label: "Story — Maio vem ai (teaser)", albumSlug: "travessia" },
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
