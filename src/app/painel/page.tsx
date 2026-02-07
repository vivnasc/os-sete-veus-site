"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import { contentCalendar, getContentByFormat, type GeneratedContent, type ContentFormat, type Channel } from "@/lib/content-engine";
import { QuoteCardPreview, CarouselPreview, ReelPreview, EmailPreview, StoryPreview, CopyButton } from "@/components/ContentCards";
import { experiences } from "@/data/experiences";

const TABS = [
  { id: "studio", label: "Estudio de Conteudo" },
  { id: "calendar", label: "Calendario" },
  { id: "overview", label: "Visao Geral" },
] as const;

type Tab = (typeof TABS)[number]["id"];

const FORMAT_LABELS: Record<ContentFormat, string> = {
  "quote-card": "Quote Card",
  carousel: "Carrossel",
  "reel-script": "Reel Script",
  "story-prompt": "Story",
  email: "Email",
  thread: "Thread",
};

const CHANNEL_LABELS: Record<Channel, string> = {
  "instagram-feed": "Instagram Feed",
  "instagram-story": "Instagram Story",
  "instagram-reels": "Instagram Reels",
  email: "Email",
  whatsapp: "WhatsApp",
};

const DAY_ORDER = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];

export default function PainelPage() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("studio");
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState<ContentFormat | "all">("all");
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f4]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#7a8c6e] border-t-transparent" />
          <p className="mt-4 text-sm text-[#8a7b6b]">A carregar...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f4] px-6">
        <div className="max-w-sm rounded-2xl border border-[#e8e0d4] bg-white p-8 text-center shadow-sm">
          <h1 className="font-serif text-2xl text-[#4a3728]">Painel de Controlo</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#8a7b6b]">
            Este painel e privado. Faz login para aceder.
          </p>
          <Link
            href="/entrar"
            className="mt-6 inline-block rounded-lg bg-[#7a8c6e] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#6a7c5e]"
          >
            Entrar
          </Link>
        </div>
      </div>
    );
  }

  const currentWeek = contentCalendar[selectedWeek - 1];
  const weekContents = currentWeek?.contents ?? [];
  const filteredContents =
    selectedFormat === "all"
      ? weekContents
      : weekContents.filter((c) => c.format === selectedFormat);
  const sortedContents = [...filteredContents].sort(
    (a, b) => DAY_ORDER.indexOf(a.dayOfWeek) - DAY_ORDER.indexOf(b.dayOfWeek)
  );

  const totalContent = contentCalendar.reduce((sum, w) => sum + w.contents.length, 0);
  const quoteCards = getContentByFormat("quote-card").length;
  const carousels = getContentByFormat("carousel").length;
  const reels = getContentByFormat("reel-script").length;
  const emails = getContentByFormat("email").length;

  return (
    <div className="min-h-screen bg-[#faf8f4]">
      {/* Header */}
      <div className="border-b border-[#e8e0d4] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-2xl text-[#4a3728]">Painel de Marketing</h1>
              <p className="mt-1 text-sm text-[#8a7b6b]">
                {totalContent} conteudos gerados &middot; 12 semanas &middot; 5 canais
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden rounded-full bg-[#f5f0e8] px-3 py-1.5 text-xs text-[#8a7b6b] sm:block">
                {user.email}
              </span>
              <Link
                href="/membro"
                className="rounded-lg border border-[#e8e0d4] px-3 py-1.5 text-xs text-[#8a7b6b] transition-colors hover:bg-[#f5f0e8]"
              >
                Minha Area
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex gap-1 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#faf8f4] text-[#4a3728]"
                    : "text-[#8a7b6b] hover:text-[#4a3728]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {activeTab === "overview" && (
          <OverviewTab
            totalContent={totalContent}
            quoteCards={quoteCards}
            carousels={carousels}
            reels={reels}
            emails={emails}
          />
        )}
        {activeTab === "studio" && (
          <StudioTab
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
            selectedFormat={selectedFormat}
            setSelectedFormat={setSelectedFormat}
            currentWeek={currentWeek}
            sortedContents={sortedContents}
            expandedContent={expandedContent}
            setExpandedContent={setExpandedContent}
          />
        )}
        {activeTab === "calendar" && <CalendarTab />}
      </div>
    </div>
  );
}

/* ── OVERVIEW TAB ── */
function OverviewTab({ totalContent, quoteCards, carousels, reels, emails }: { totalContent: number; quoteCards: number; carousels: number; reels: number; emails: number }) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Total conteudos", value: totalContent, color: "#4a3728" },
          { label: "Quote Cards", value: quoteCards, color: "#c9b896" },
          { label: "Carrosseis", value: carousels, color: "#7a8c6e" },
          { label: "Reel Scripts", value: reels, color: "#b07a7a" },
          { label: "Emails", value: emails, color: "#8a7b9c" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-[#e8e0d4] bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-[#8a7b6b]">{s.label}</p>
            <p className="mt-2 text-3xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-serif text-xl text-[#4a3728]">Estado dos Veus</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.slice(0, 7).map((exp) => (
            <div key={exp.slug} className="flex items-center gap-3 rounded-xl border border-[#e8e0d4] bg-white p-4 shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: exp.color }}>{exp.number}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#4a3728]">{exp.title}</p>
                <p className="text-xs text-[#8a7b6b]">
                  {exp.status === "available" ? <span className="text-[#7a8c6e]">Disponivel</span> : <span>{exp.launchLabel}</span>}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-serif text-xl text-[#4a3728]">Links Rapidos</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Experiencias", href: "/experiencias", desc: "Pagina de vendas" },
            { label: "Quiz", href: "/recursos/teste", desc: "Qual veu te esconde?" },
            { label: "Painel de Marca", href: "/painel/marca", desc: "Identidade visual" },
            { label: "Ecossistema", href: "/ecossistema", desc: "Visao geral" },
            { label: "Membro", href: "/membro", desc: "Area do membro" },
            { label: "Espelho", href: "/membro/espelho", desc: "O Teu Espelho" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="rounded-xl border border-[#e8e0d4] bg-white p-4 shadow-sm transition-all hover:border-[#7a8c6e] hover:shadow-md">
              <p className="text-sm font-medium text-[#4a3728]">{l.label}</p>
              <p className="mt-1 text-xs text-[#8a7b6b]">{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── STUDIO TAB ── */
function StudioTab({ selectedWeek, setSelectedWeek, selectedFormat, setSelectedFormat, currentWeek, sortedContents, expandedContent, setExpandedContent }: {
  selectedWeek: number; setSelectedWeek: (w: number) => void;
  selectedFormat: ContentFormat | "all"; setSelectedFormat: (f: ContentFormat | "all") => void;
  currentWeek: (typeof contentCalendar)[number] | undefined;
  sortedContents: GeneratedContent[];
  expandedContent: string | null; setExpandedContent: (id: string | null) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Week selector */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-[#4a3728]">Semana:</span>
        <div className="flex flex-wrap gap-1.5">
          {contentCalendar.map((w) => (
            <button key={w.weekNumber} onClick={() => setSelectedWeek(w.weekNumber)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${selectedWeek === w.weekNumber ? "bg-[#7a8c6e] text-white" : "bg-white text-[#8a7b6b] hover:bg-[#f5f0e8]"}`}
            >{w.weekNumber}</button>
          ))}
        </div>
      </div>

      {currentWeek && (
        <div className="rounded-xl border border-[#e8e0d4] bg-white p-5">
          <h3 className="font-serif text-lg text-[#4a3728]">Semana {currentWeek.weekNumber}: {currentWeek.theme}</h3>
          <p className="mt-1 text-sm text-[#8a7b6b]">{currentWeek.dateRange} &middot; {currentWeek.contents.length} conteudos</p>
        </div>
      )}

      {/* Format filter */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setSelectedFormat("all")}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${selectedFormat === "all" ? "bg-[#4a3728] text-white" : "bg-white text-[#8a7b6b] hover:bg-[#f5f0e8]"}`}
        >Todos</button>
        {Object.entries(FORMAT_LABELS).map(([key, label]) => (
          <button key={key} onClick={() => setSelectedFormat(key as ContentFormat)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${selectedFormat === key ? "bg-[#4a3728] text-white" : "bg-white text-[#8a7b6b] hover:bg-[#f5f0e8]"}`}
          >{label}</button>
        ))}
      </div>

      {/* Content list */}
      <div className="space-y-4">
        {sortedContents.map((content) => (
          <ContentItem key={content.id} content={content}
            expanded={expandedContent === content.id}
            onToggle={() => setExpandedContent(expandedContent === content.id ? null : content.id)}
          />
        ))}
        {sortedContents.length === 0 && (
          <p className="py-8 text-center text-sm text-[#8a7b6b]">Nenhum conteudo para este filtro.</p>
        )}
      </div>
    </div>
  );
}

/* ── CONTENT ITEM ── */
const FORMAT_COLORS: Record<ContentFormat, string> = {
  "quote-card": "#c9b896",
  carousel: "#7a8c6e",
  "reel-script": "#b07a7a",
  "story-prompt": "#8a7b9c",
  email: "#6e8c7a",
  thread: "#b8956c",
};

function ContentItem({ content, expanded, onToggle }: { content: GeneratedContent; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e8e0d4] bg-white shadow-sm">
      <button onClick={onToggle} className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-[#faf8f4]">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ backgroundColor: FORMAT_COLORS[content.format] }}>
          {content.format === "quote-card" && "Q"}
          {content.format === "carousel" && "C"}
          {content.format === "reel-script" && "R"}
          {content.format === "story-prompt" && "S"}
          {content.format === "email" && "E"}
          {content.format === "thread" && "T"}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded px-1.5 py-0.5 text-[0.6rem] font-medium uppercase tracking-wider text-white" style={{ backgroundColor: FORMAT_COLORS[content.format] }}>{FORMAT_LABELS[content.format]}</span>
            <span className="text-[0.6rem] uppercase tracking-wider text-[#8a7b6b]">{CHANNEL_LABELS[content.channel]}</span>
            <span className="text-[0.6rem] capitalize text-[#b8956c]">{content.dayOfWeek}</span>
          </div>
          <p className="mt-1 truncate text-sm font-medium text-[#4a3728]">{content.title}</p>
        </div>
        <svg className={`h-4 w-4 shrink-0 text-[#8a7b6b] transition-transform ${expanded ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {expanded && (
        <div className="border-t border-[#e8e0d4] p-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Preview */}
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#8a7b6b]">Pre-visualizacao</p>
              {content.format === "quote-card" && <QuoteCardPreview quote={content.mainText} accentColor={content.accentColor} style={content.visualStyle} />}
              {content.format === "carousel" && content.slides && <CarouselPreview slides={content.slides} title={content.title} accentColor={content.accentColor} />}
              {content.format === "reel-script" && content.reelSteps && <ReelPreview steps={content.reelSteps} title={content.title} />}
              {content.format === "email" && content.emailSubject && content.emailBody && <EmailPreview subject={content.emailSubject} body={content.emailBody} accentColor={content.accentColor} />}
              {content.format === "story-prompt" && <StoryPreview question={content.mainText} options={content.storyOptions} accentColor={content.accentColor} />}
              {content.format === "thread" && (
                <div className="rounded-xl border border-[#e8e0d4] bg-[#faf8f4] p-5">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-[#4a3728]">{content.mainText}</p>
                </div>
              )}
            </div>

            {/* Copy section */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#8a7b6b]">Texto principal</p>
                  <CopyButton text={content.mainText} />
                </div>
                <div className="mt-2 rounded-lg bg-[#faf8f4] p-3">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-[#4a3728]">{content.mainText}</p>
                </div>
              </div>

              {content.caption && (
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wider text-[#8a7b6b]">Legenda + Hashtags</p>
                    <CopyButton text={content.caption + "\n\n" + content.hashtags.join(" ")} />
                  </div>
                  <div className="mt-2 rounded-lg bg-[#faf8f4] p-3">
                    <p className="whitespace-pre-line text-sm leading-relaxed text-[#4a3728]">{content.caption}</p>
                    <p className="mt-2 text-xs text-[#7a8c6e]">{content.hashtags.join(" ")}</p>
                  </div>
                </div>
              )}

              {content.slides && (
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wider text-[#8a7b6b]">Slides ({content.slides.length})</p>
                    <CopyButton text={content.slides.join("\n\n---\n\n")} label="Copiar todos" />
                  </div>
                  <div className="mt-2 space-y-2">
                    {content.slides.map((slide, i) => (
                      <div key={i} className="flex items-start gap-2 rounded-lg bg-[#faf8f4] p-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c9b896] text-[0.55rem] font-bold text-white">{i + 1}</span>
                        <p className="text-sm leading-relaxed text-[#4a3728]">{slide}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.reelSteps && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#8a7b6b]">Script do Reel</p>
                  <CopyButton text={content.reelSteps.map(s => `${s.second}: ${s.visual}${s.text ? ` — "${s.text}"` : ""}`).join("\n")} />
                  <div className="mt-2 space-y-2">
                    {content.reelSteps.map((step, i) => (
                      <div key={i} className="rounded-lg bg-[#faf8f4] p-3">
                        <p className="text-xs font-bold text-[#b07a7a]">{step.second}</p>
                        <p className="mt-1 text-sm text-[#4a3728]">{step.visual}</p>
                        {step.text && <p className="mt-1 text-xs italic text-[#8a7b6b]">Texto: &ldquo;{step.text}&rdquo;</p>}
                        {step.audio && <p className="mt-1 text-xs text-[#7a8c6e]">Audio: {step.audio}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── CALENDAR TAB ── */
function CalendarTab() {
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-xl text-[#4a3728]">Calendario de 12 Semanas</h2>
      <p className="text-sm text-[#8a7b6b]">Cada semana tem 7 publicacoes prontas para diferentes canais.</p>
      <div className="space-y-3">
        {contentCalendar.map((week) => (
          <div key={week.weekNumber} className="rounded-xl border border-[#e8e0d4] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7a8c6e] text-sm font-bold text-white">{week.weekNumber}</span>
                <div>
                  <h3 className="font-serif text-base text-[#4a3728]">{week.theme}</h3>
                  <p className="text-xs text-[#8a7b6b]">{week.dateRange}</p>
                </div>
              </div>
              <span className="rounded-full bg-[#f5f0e8] px-2.5 py-1 text-xs text-[#8a7b6b]">{week.contents.length} conteudos</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {week.contents
                .sort((a, b) => DAY_ORDER.indexOf(a.dayOfWeek) - DAY_ORDER.indexOf(b.dayOfWeek))
                .map((c) => (
                  <div key={c.id} className="flex items-center gap-1.5 rounded-lg border border-[#e8e0d4] bg-[#faf8f4] px-2.5 py-1.5">
                    <span className="text-[0.55rem] capitalize text-[#b8956c]">{c.dayOfWeek.slice(0, 3)}</span>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: FORMAT_COLORS[c.format] }} />
                    <span className="text-[0.55rem] text-[#8a7b6b]">{FORMAT_LABELS[c.format]}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
