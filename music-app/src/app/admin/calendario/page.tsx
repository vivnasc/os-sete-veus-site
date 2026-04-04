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
    { type: "reel", label: "Reel — O Convite", albumSlug: "livro-filosofico", trackNumber: 1, caption: '"Há uma porta que não se vê\nno centro exacto do teu peito"\n\nO Convite — Loranne\nOs Sete Temas do Despertar\nmusic.seteveus.space\n\n#loranne #veus #despertar #oconvite #sentir #ouveoqueninguémdiz' },
  ]},
  { date: "2026-04-02", actions: [
    { type: "carrossel", label: "Carrossel — Os Sete Temas do Despertar", albumSlug: "livro-filosofico" },
  ]},
  { date: "2026-04-03", actions: [
    { type: "story", label: "Story — verso de A Cadeira Vazia", albumSlug: "livro-filosofico", trackNumber: 3 },
  ]},
  { date: "2026-04-04", actions: [
    { type: "reel", label: "Reel — The Fertile Dark", albumSlug: "livro-filosofico", trackNumber: 6, caption: '"Let the emptiness be full\nof all the things you cannot name\nThe fertile dark will hold your roots\nuntil you bloom without the shame"\n\nThe Fertile Dark — Loranne\nmusic.seteveus.space\n\n#loranne #veus #thefertiledark #despertar #emptiness #bloom' },
  ]},
  { date: "2026-04-05", actions: [
    { type: "story", label: "Story — Pre-encomenda disponivel", albumSlug: "livro-filosofico" },
  ]},
  { date: "2026-04-06", actions: [
    { type: "post", label: "Post — sobre o album", albumSlug: "livro-filosofico", caption: "Ha coisas que toda a gente sente e quase ninguem diz.\n\nO aperto na garganta quando queres falar e nao consegues.\nA exaustao que nao passa com ferias.\nO espelho que te mostra alguem que nao reconheces.\n\nEste album nasceu desse silencio.\n\n9 faixas. Cada uma e uma camada.\nO Convite abre a porta.\nA Cadeira Vazia senta-te com o que foi.\nThe Fertile Dark mostra que o vazio nao e castigo.\nO Reflexo Final devolve-te a ti.\n\nNao e musica para agradar.\nE musica para quem precisa de se ouvir.\n\nmusic.seteveus.space\n\n#loranne #veus #despertar #sentir #autoconhecimento #ouveoqueninguémdiz" },
  ]},

  // ── SEMANA 2: Album no ar + Espelho da Ilusao ──
  { date: "2026-04-07", actions: [
    { type: "reel", label: "Reel — O Horizonte", albumSlug: "livro-filosofico", trackNumber: 7, caption: '"Nao ha destino, nao ha fim\nA consciencia nao tem margem\nEs o oceano, nao a costa\nes o voo — nao a aterragem"\n\nO Horizonte — Loranne\nmusic.seteveus.space\n\n#loranne #veus #ohorizonte #consciência #caminho' },
  ]},
  { date: "2026-04-08", actions: [
    { type: "post", label: "Post — Album no Spotify e Apple Music", albumSlug: "livro-filosofico", caption: "Os Sete Temas do Despertar ja esta no Spotify, Apple Music, e em 50+ plataformas.\n\nNao e um album de respostas.\nE um album de perguntas que ninguem te fez.\n\nO que resta quando largas o que pensavas ser?\nO que vive debaixo do cansaco?\nO que acontece quando paras de fugir do vazio?\n\n9 faixas. Portugues e ingles.\nA voz que diz o que o corpo ja sabe.\n\nmusic.seteveus.space\n\n#loranne #veus #spotify #applemusic #despertar" },
    { type: "story", label: "Story — screenshot do Spotify", albumSlug: "livro-filosofico" },
  ]},
  { date: "2026-04-09", actions: [
    { type: "story", label: "Story — O que dizem os ouvintes", albumSlug: "livro-filosofico" },
  ]},
  { date: "2026-04-10", actions: [
    { type: "reel", label: "Reel — O Reflexo Final", albumSlug: "livro-filosofico", trackNumber: 9, caption: '"Olha devagar, sem pressa\nO reflexo ja nao mente\nEs tu — sempre foste tu\no principio e o presente"\n\nO Reflexo Final — Loranne\nmusic.seteveus.space\n\n#loranne #veus #oreflexofinal #reflexo #verdade' },
  ]},
  { date: "2026-04-11", actions: [
    { type: "carrossel", label: "Carrossel — O Espelho da Ilusao", albumSlug: "espelho-ilusao" },
    { type: "reel", label: "Reel — Despertar (Espelho da Ilusao)", albumSlug: "espelho-ilusao", trackNumber: 1, caption: '"Algo treme ca por dentro\nAlgo quer nascer\nComo a flor que parte o cimento\nSo pra poder viver"\n\nDespertar — Loranne\nO Espelho da Ilusao\nmusic.seteveus.space\n\n#loranne #veus #espelhodailusao #despertar #acordar' },
  ]},
  { date: "2026-04-12", actions: [
    { type: "story", label: "Story — Poll: qual faixa te tocou mais?", albumSlug: "livro-filosofico" },
  ]},
  { date: "2026-04-13", actions: [
    { type: "reel", label: "Reel — Honestidade Quieta (domingo calmo)", albumSlug: "espelho-ilusao", trackNumber: 6, caption: '"Nao preciso de ser mais\nNao preciso de mudar\nSo preciso deste instante\nQuieto como o fundo do mar"\n\nHonestidade Quieta — Loranne\nmusic.seteveus.space\n\n#loranne #veus #honestidade #silencio #calma #domingo' },
  ]},

  // ── SEMANA 3: Espelhos ──
  { date: "2026-04-14", actions: [
    { type: "reel", label: "Reel — O Veu Cai", albumSlug: "espelho-ilusao", trackNumber: 7, caption: '"O veu cai e eu danco na luz\nO veu cai e nao doi\nO veu cai e debaixo do medo\nSo havia eu, so havia eu"\n\nO Veu Cai — Loranne\nmusic.seteveus.space\n\n#loranne #veus #oveucai #transformação #liberdade' },
  ]},
  { date: "2026-04-15", actions: [
    { type: "post", label: "Post — O que e um veu?", albumSlug: "espelho-ilusao", caption: "O que e um veu?\n\nNao e mentira. Nao e fraqueza.\nE o que se coloca entre ti e o que ja sabes.\n\nA ilusao de que nao es suficiente.\nO medo de que a verdade doa.\nA culpa que se disfarca de cuidado.\n\nHa 7 veus.\nA Loranne canta cada um deles.\n\nO primeiro — o da ilusao — e sobre o momento em que percebes que a vida que vives nao e tua. Que vestiste uma pele emprestada. Que a flor que es ficou debaixo do cimento.\n\nCada veu cai quando olhas.\nNao quando lutas — quando paras.\n\nmusic.seteveus.space\n\n#loranne #veus #espelhos #autoconhecimento #ilusao #despertar" },
  ]},
  { date: "2026-04-16", actions: [
    { type: "story", label: "Story — preview Espelho do Medo", albumSlug: "espelho-medo" },
  ]},
  { date: "2026-04-17", actions: [
    { type: "reel", label: "Reel — Quem Me Ensinou a Ter Medo", albumSlug: "espelho-medo", trackNumber: 1, caption: '"Quem me ensinou a ter tanto medo\nDe cair, de errar, de sangrar\nQuem me embrulhou em tanto segredo\nQue esqueci como e respirar"\n\nQuem Me Ensinou — Loranne\nO Espelho do Medo\nmusic.seteveus.space\n\n#loranne #veus #espelhodomedo #medo #coragem' },
  ]},
  { date: "2026-04-18", actions: [
    { type: "carrossel", label: "Carrossel — O Espelho do Medo", albumSlug: "espelho-medo" },
  ]},
  { date: "2026-04-19", actions: [
    { type: "story", label: "Story — Inspira a Loranne", albumSlug: "espelho-ilusao" },
  ]},
  { date: "2026-04-20", actions: [
    { type: "reel", label: "Reel — The Fabric Falls (domingo)", albumSlug: "espelho-ilusao", trackNumber: 2, caption: '"There\'s a thread that\'s coming loose tonight\nA sleeve that\'s slipping off my shoulder bone\nI\'m standing in a strange and tender light\nAnd for the first time I can feel my own"\n\nThe Fabric Falls — Loranne\nmusic.seteveus.space\n\n#loranne #veus #thefabricfalls #tender #awakening' },
  ]},

  // ── SEMANA 4: Expansao — Culpa + No da Heranca ──
  { date: "2026-04-21", actions: [
    { type: "reel", label: "Reel — A Mae Que Viu (No da Heranca)", albumSlug: "no-heranca", trackNumber: 1, caption: '"A mae que viu guardou a chuva inteira\nCoseu o ceu para nao te molhar\nPorque dizer era partir-te em dois pedacos\nE eu preferi calar a te partir ao luar"\n\nA Mae Que Viu — Loranne\nO No da Heranca\nmusic.seteveus.space\n\n#loranne #veus #nodaheranca #mae #silencio #heranca' },
  ]},
  { date: "2026-04-22", actions: [
    { type: "post", label: "Post — O que e um No?", albumSlug: "no-heranca", caption: "Primeiro vem o Espelho — o que vejo quando olho para mim.\nDepois vem o No — o que se passa entre mim e quem eu amo.\n\nO No da Heranca e sobre maes e filhas.\nSobre o silencio que se herda como se fosse sangue.\nSobre a mulher que viu tudo e calou por amor.\nSobre a filha que cresceu a pensar que a mae nao sabia.\n\nDuas mulheres. Uma cozinha. Anos de coisas por dizer.\n\nHa um fio de seda e nevoeiro entre elas.\nDesatar nao e destruir.\nE dar espaco ao que sempre esteve la.\n\nmusic.seteveus.space\n\n#loranne #veus #nodaheranca #maeefilha #silencio #heranca #desatar" },
  ]},
  { date: "2026-04-23", actions: [
    { type: "story", label: "Story — behind the scenes (producao)", albumSlug: "espelho-culpa" },
  ]},
  { date: "2026-04-24", actions: [
    { type: "reel", label: "Reel — O Medo Vestiu-se de Elegancia", albumSlug: "espelho-medo", trackNumber: 3, caption: '"O medo vestiu-se de elegancia\nPos gravata e disse espera mais um pouco\nE eu esperei, com tanta graca\nQue ninguem reparou que eu estava louca\nDe vontade de correr"\n\nElegancia — Loranne\nO Espelho do Medo\nmusic.seteveus.space\n\n#loranne #veus #elegancia #medo #procrastinação #saltar' },
  ]},
  { date: "2026-04-25", actions: [
    { type: "carrossel", label: "Carrossel — O Espelho da Culpa", albumSlug: "espelho-culpa" },
  ]},
  { date: "2026-04-26", actions: [
    { type: "story", label: "Story — Playlist fim de semana", albumSlug: "espelho-ilusao" },
  ]},
  { date: "2026-04-27", actions: [
    { type: "reel", label: "Reel — Desatar (No da Heranca, domingo)", albumSlug: "no-heranca", trackNumber: 5, caption: '"Desatar nao e destruir o que era nosso\nDesatar e dar ao fio espaco e ar\nO no que nos unia era o mesmo no\nQue nos impedia de nos encontrar"\n\nDesatar — Loranne\nO No da Heranca\nmusic.seteveus.space\n\n#loranne #veus #desatar #heranca #liberdade #domingo' },
  ]},
  { date: "2026-04-28", actions: [
    { type: "post", label: "Post — Pergunta ao publico", albumSlug: "espelho-culpa", caption: "Ha uma voz que mora entre os ossos.\nQue acorda antes de ti de manha.\nQue diz levanta-te, nao descansas.\nQue diz que a tua paz e uma mentira.\n\nConheces essa voz?\n\nDe quem e? Da tua mae? De um professor? De um deus que te ensinaram a temer?\n\nO Espelho da Culpa e sobre isso.\nSobre a voz que nao e tua mas que repetes ha tanto tempo que ja parece tua.\n\nE se a deixasses falar — e simplesmente nao obedecesses?\n\nmusic.seteveus.space\n\n#loranne #veus #espelhodaculpa #culpa #voz #silencio #pergunta" },
  ]},
  { date: "2026-04-29", actions: [
    { type: "reel", label: "Reel — A Roda (Espelho da Ilusao)", albumSlug: "espelho-ilusao", trackNumber: 3, caption: '"Roda, roda, roda sem parar\nQuem e esta mulher que vive no meu lugar\nRoda, roda, roda sem sentir\nHa alguem ca dentro a pedir pra sair"\n\nA Roda — Loranne\nO Espelho da Ilusao\nmusic.seteveus.space\n\n#loranne #veus #aroda #rotina #acordar #sair' },
  ]},
  { date: "2026-04-30", actions: [
    { type: "post", label: "Post — Balanco de Abril + teaser Maio", albumSlug: "livro-filosofico", caption: "Abril foi o mes em que a Loranne chegou ao mundo.\n\nOs Sete Temas do Despertar.\nO Espelho da Ilusao.\nO Espelho do Medo.\nO Espelho da Culpa.\nO No da Heranca.\n\n5 albuns. Dezenas de faixas.\nCada uma escrita para quem precisa de se ver.\n\nMaio traz mais.\nMais espelhos. Mais nos. Mais veus por cair.\n\nObrigada a quem ouviu.\nObrigada a quem sentiu.\n\nmusic.seteveus.space\n\n#loranne #veus #abril #despertar #obrigada #maio" },
    { type: "story", label: "Story — Maio vem ai (teaser)", albumSlug: "espelho-culpa" },
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
