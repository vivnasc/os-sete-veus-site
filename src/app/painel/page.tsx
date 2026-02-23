"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { experiences } from "@/data/experiences";
import { allMarketing } from "@/data/marketing";
import type { VeilMarketing, SocialPost, MarketingQuote } from "@/data/marketing";
import { allWeeks } from "@/data/content-calendar-weeks";
import type { ContentSlot } from "@/data/content-calendar-weeks";
import Link from "next/link";

type Tab = "overview" | "calendar" | "content" | "launch";

export default function PainelPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [selectedVeil, setSelectedVeil] = useState<string | null>(null);

  if (authLoading) {
    return (
      <section className="bg-cream px-6 py-32 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
      </section>
    );
  }

  if (!user) {
    router.push("/entrar");
    return null;
  }

  const AUTHOR_EMAILS = ["viv.saraiva@gmail.com", "vivianne.saraiva@outlook.com"];
  if (!AUTHOR_EMAILS.includes(user.email || "")) {
    router.push("/membro");
    return null;
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Visão Geral" },
    { key: "calendar", label: "Calendário" },
    { key: "content", label: "Conteúdo" },
    { key: "launch", label: "Lançamentos" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-brown-100 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-brown-900">Painel de Controlo</h1>
            <p className="mt-1 font-sans text-xs text-brown-500">
              Os Sete Véus — Monetização &amp; Marketing
            </p>
          </div>
          <Link
            href="/"
            className="font-sans text-xs text-brown-500 hover:text-brown-900"
          >
            ← Voltar ao site
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-brown-100 bg-white">
        <div className="mx-auto flex max-w-6xl gap-1 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 font-sans text-[0.7rem] uppercase tracking-[0.12em] transition-colors ${
                activeTab === tab.key
                  ? "border-b-2 border-sage text-sage"
                  : "text-brown-500 hover:text-brown-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "calendar" && <CalendarTab />}
        {activeTab === "content" && (
          <ContentTab
            selectedVeil={selectedVeil}
            onSelectVeil={setSelectedVeil}
          />
        )}
        {activeTab === "launch" && <LaunchTab />}
      </div>
    </div>
  );
}

// ─── OVERVIEW TAB ────────────────────────────────────────────────────────────

function OverviewTab() {
  return (
    <div className="space-y-8">
      {/* Status flags */}
      <div>
        <h2 className="mb-4 font-serif text-lg text-brown-900">
          Estado das Experiências
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp) => {
            const marketing = allMarketing.find((m) => m.slug === exp.slug);
            const quotesCount = marketing?.quotes.length || 0;
            const postsCount = marketing?.socialPosts.length || 0;
            const emailsCount = marketing?.emailSequence.length || 0;

            return (
              <div
                key={exp.slug}
                className="rounded-xl border border-brown-100 bg-white p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg font-serif text-sm font-bold text-white"
                      style={{ backgroundColor: exp.color }}
                    >
                      {exp.number}
                    </span>
                    <div>
                      <h3 className="font-serif text-sm text-brown-900">
                        {exp.title}
                      </h3>
                      <p className="font-sans text-[0.6rem] text-brown-500">
                        {exp.subtitle}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={exp.status} />
                </div>

                {/* Flags */}
                <div className="mt-4 space-y-2">
                  <FlagRow
                    label="Narrativa escrita"
                    done={exp.slug === "veu-da-ilusao" || exp.slug === "veu-do-medo"}
                  />
                  <FlagRow
                    label="Integrada no reader"
                    done={exp.slug === "veu-da-ilusao"}
                  />
                  <FlagRow
                    label="Práticas de áudio"
                    done={exp.slug === "veu-da-ilusao"}
                    partial={exp.slug === "veu-da-ilusao"}
                  />
                  <FlagRow
                    label="Conteúdo marketing"
                    done={quotesCount >= 4}
                    partial={quotesCount >= 2 && quotesCount < 4}
                  />
                </div>

                {/* Stats */}
                <div className="mt-4 flex gap-4 border-t border-brown-100 pt-3">
                  <MiniStat value={quotesCount} label="quotes" />
                  <MiniStat value={postsCount} label="posts" />
                  <MiniStat value={emailsCount} label="emails" />
                </div>

                {/* Launch date */}
                <div className="mt-3">
                  {exp.launchLabel ? (
                    <p className="font-sans text-[0.6rem] text-brown-500">
                      Lançamento: {exp.launchLabel}
                    </p>
                  ) : (
                    <p className="font-sans text-[0.6rem] text-sage">
                      Disponível
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Revenue overview */}
      <div>
        <h2 className="mb-4 font-serif text-lg text-brown-900">
          Projecção de Receita
        </h2>
        <div className="grid gap-4 sm:grid-cols-4">
          <MetricCard
            label="Experiência individual"
            value="$29"
            sub="1.850 MT / R$119 / €27"
          />
          <MetricCard
            label="Pack de 3"
            value="$69"
            sub="Poupa 21%"
          />
          <MetricCard
            label="Jornada completa"
            value="$149"
            sub="Poupa 27%"
          />
          <MetricCard
            label="Total 7 véus (individual)"
            value="$203"
            sub="vs $149 bundle"
          />
        </div>
      </div>

      {/* Quick links */}
      <div>
        <h2 className="mb-4 font-serif text-lg text-brown-900">Links Rápidos</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/painel/marketing", label: "Marketing Engine" },
            { href: "/experiencias", label: "Página de Vendas" },
            { href: "/recursos/teste", label: "Quiz" },
            { href: "/membro/leitura", label: "Reader" },
            { href: "/membro/conclusao", label: "Cerimónia" },
            { href: "/membro/jornada-completa", label: "Jornada 7/7" },
            { href: "/membro/espelho", label: "Espelho" },
            { href: "/recursos", label: "Recursos Gratuitos" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-brown-100 bg-white px-4 py-2 font-sans text-xs text-brown-600 transition-colors hover:border-sage/50 hover:text-sage"
            >
              {link.label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CALENDAR TAB ────────────────────────────────────────────────────────────

function CalendarTab() {
  const months = [
    { name: "Fevereiro 2026", events: ["Ilusão: promoção contínua", "Medo: teaser + waitlist"] },
    { name: "Março 2026", events: ["Medo: LANÇAMENTO (dia 1)", "Culpa: teaser", "Ilusão: 1 quote/semana"] },
    { name: "Abril 2026", events: ["Culpa: LANÇAMENTO (dia 1)", "Identidade: teaser", "Medo: testemunhos"] },
    { name: "Maio 2026", events: ["Identidade: LANÇAMENTO (dia 1)", "Controlo: teaser", "Pack de 3 promoção especial"] },
    { name: "Junho 2026", events: ["Controlo: LANÇAMENTO (dia 1)", "Desejo: teaser", "Promoção Jornada Completa"] },
    { name: "Julho 2026", events: ["Desejo: LANÇAMENTO (dia 1)", "Separação: teaser"] },
    { name: "Agosto 2026", events: ["Separação: LANÇAMENTO (dia 1)", "7/7 celebração", "Promoção Jornada Completa"] },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-lg text-brown-900">
        Calendário de Lançamentos 2026
      </h2>
      <div className="space-y-3">
        {months.map((month) => (
          <div
            key={month.name}
            className="rounded-xl border border-brown-100 bg-white p-5"
          >
            <h3 className="font-serif text-base text-brown-900">{month.name}</h3>
            <ul className="mt-3 space-y-1.5">
              {month.events.map((event, i) => {
                const isLaunch = event.includes("LANÇAMENTO");
                return (
                  <li key={i} className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        isLaunch ? "bg-sage" : "bg-brown-600"
                      }`}
                    />
                    <span
                      className={`font-sans text-sm ${
                        isLaunch
                          ? "font-medium text-sage"
                          : "text-brown-400"
                      }`}
                    >
                      {event}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CONTENT TAB (Calendário diário + Biblioteca) ───────────────────────────

function ContentTab({
  selectedVeil,
  onSelectVeil,
}: {
  selectedVeil: string | null;
  onSelectVeil: (slug: string | null) => void;
}) {
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);

  const week = allWeeks[activeWeek];
  const day = week.days[activeDay];

  async function copyText(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const marketing = selectedVeil
    ? allMarketing.find((m) => m.slug === selectedVeil)
    : null;

  return (
    <div className="space-y-8">
      {/* ── Day-by-day Calendar ─────────────────────────────────── */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg text-brown-900">
              Calendário de Conteúdos
            </h2>
            <p className="mt-1 font-sans text-xs text-brown-500">
              Segue o plano dia a dia. Cada dia diz-te exactamente o que publicar e onde.
            </p>
          </div>
        </div>

        {/* Week selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allWeeks.map((w, i) => (
            <button
              key={i}
              onClick={() => { setActiveWeek(i); setActiveDay(0); }}
              className={`shrink-0 rounded-lg px-4 py-2 font-sans text-xs transition-all ${
                activeWeek === i
                  ? "bg-brown-900 text-cream"
                  : "bg-brown-50 text-brown-500 hover:text-brown-700"
              }`}
            >
              S{w.weekNumber}: {w.title}
            </button>
          ))}
        </div>

        {/* Day selector */}
        <div className="mt-2 flex gap-1 overflow-x-auto pb-2">
          {week.days.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`shrink-0 rounded-lg px-3 py-2 text-center transition-all ${
                activeDay === i
                  ? "bg-gold/20 text-gold-dark"
                  : "text-brown-400 hover:text-brown-600"
              }`}
            >
              <span className="block font-sans text-[0.6rem] font-medium uppercase tracking-wider">
                {d.dayShort}
              </span>
              <span className="mt-0.5 block font-sans text-[0.5rem] text-brown-400">
                {d.theme}
              </span>
            </button>
          ))}
        </div>

        {/* Day content */}
        <div className="mt-6">
          <div className="mb-4">
            <h3 className="font-serif text-lg text-brown-900">{day.day}</h3>
            <p className="mt-0.5 font-sans text-sm text-brown-500">{day.theme}</p>
          </div>

          <div className="space-y-6">
            {day.slots.map((slot, si) => (
              <ContentSlotCard key={si} slot={slot} index={si} copiedId={copiedId} onCopy={copyText} />
            ))}
          </div>
        </div>

        {/* Screenshots tip */}
        <div className="mt-8 rounded-xl border border-brown-100 bg-white p-5">
          <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-brown-500">
            Dica: prints reais da plataforma
          </p>
          <p className="mt-2 font-sans text-xs text-brown-400">
            Para carrosseis com prints reais, abre estas páginas no telemóvel e faz screenshot:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { label: "Dashboard", href: "/membro" },
              { label: "Leitor", href: "/membro/leitura" },
              { label: "Capítulo", href: "/membro/leitura/1" },
              { label: "Comunidade", href: "/comunidade" },
              { label: "Quiz", href: "/recursos/teste" },
              { label: "Recursos", href: "/recursos" },
              { label: "Nós", href: "/membro/nos" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                className="rounded-full border border-brown-200 bg-cream px-3 py-1.5 font-sans text-[0.6rem] text-brown-600 transition-colors hover:bg-cream-dark"
              >
                {link.label} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider: Library toggle ─────────────────────────────── */}
      <div className="border-t border-brown-100 pt-6">
        <button
          onClick={() => setShowLibrary(!showLibrary)}
          className="flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-wider text-brown-500 hover:text-brown-700"
        >
          <svg
            className={`h-3 w-3 transition-transform ${showLibrary ? "rotate-90" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          Biblioteca de Conteúdo por Véu (quotes, posts, emails)
        </button>

        {showLibrary && (
          <div className="mt-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {experiences.map((exp) => (
                <button
                  key={exp.slug}
                  onClick={() =>
                    onSelectVeil(selectedVeil === exp.slug ? null : exp.slug)
                  }
                  className={`rounded-lg px-4 py-2 font-sans text-xs transition-all ${
                    selectedVeil === exp.slug
                      ? "text-white"
                      : "border border-brown-100 text-brown-400 hover:text-brown-200"
                  }`}
                  style={
                    selectedVeil === exp.slug
                      ? { backgroundColor: exp.color }
                      : undefined
                  }
                >
                  {exp.number}. {exp.title.replace("O Véu ", "")}
                </button>
              ))}
            </div>

            {marketing ? (
              <VeilContentPanel marketing={marketing} />
            ) : (
              <div className="rounded-xl border border-brown-800/20 bg-white px-8 py-8 text-center">
                <p className="font-serif text-sm text-brown-400">
                  Selecciona um véu para ver quotes, posts e emails
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ContentSlotCard({
  slot,
  index: si,
  copiedId,
  onCopy,
}: {
  slot: ContentSlot;
  index: number;
  copiedId: string | null;
  onCopy: (id: string, text: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-brown-100 bg-white p-5">
      {/* Slot header */}
      <div className="flex items-center gap-3">
        <span className={`rounded-full px-3 py-1 font-sans text-[0.55rem] font-medium uppercase tracking-wider ${
          slot.platform === "instagram"
            ? "bg-pink-50 text-pink-600"
            : slot.platform === "whatsapp"
              ? "bg-[#25D366]/10 text-[#25D366]"
              : "bg-brown-100 text-brown-600"
        }`}>
          {slot.platform === "instagram" ? "Instagram" : slot.platform === "whatsapp" ? "WhatsApp" : "Instagram + WhatsApp"}
        </span>
        <span className="font-sans text-[0.65rem] text-brown-500">{slot.type}</span>
      </div>

      {/* Visual card */}
      {slot.visual && (
        <div className="mt-4 flex flex-col items-start gap-5 sm:flex-row">
          <div
            className={`relative flex shrink-0 flex-col justify-between overflow-hidden rounded-xl shadow-lg ${
              slot.visual.format === "square" ? "aspect-square w-56" : "aspect-[9/16] w-40"
            }`}
            style={{ backgroundColor: slot.visual.bg, color: slot.visual.text }}
          >
            <div className="px-4 pt-4">
              {slot.visual.highlight && (
                <span
                  className="mb-2 inline-block rounded-full px-2.5 py-0.5 font-sans text-[0.5rem] uppercase tracking-[0.12em]"
                  style={{ backgroundColor: slot.visual.accent + "25", color: slot.visual.accent }}
                >
                  {slot.visual.highlight}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-center px-4">
              {slot.visual.title && (
                <h3 className="whitespace-pre-line font-serif text-sm leading-tight">{slot.visual.title}</h3>
              )}
              {slot.visual.body && (
                <p className="mt-2 whitespace-pre-line font-sans text-[0.6rem] leading-relaxed opacity-80">{slot.visual.body}</p>
              )}
            </div>
            <div className="px-4 pb-3">
              {slot.visual.footer && (
                <div className="flex items-center justify-between">
                  <p className="font-sans text-[0.4rem] uppercase tracking-[0.1em]" style={{ color: slot.visual.accent }}>
                    {slot.visual.footer}
                  </p>
                  <span className="font-serif text-xs opacity-30" style={{ color: slot.visual.accent }}>~</span>
                </div>
              )}
            </div>
          </div>

          {/* Caption + copy */}
          <div className="flex-1">
            {slot.caption && (
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-brown-500">Legenda</p>
                  <button
                    onClick={() => onCopy(`caption-${si}`, slot.caption!)}
                    className="rounded-md bg-cream px-3 py-1 font-sans text-[0.55rem] text-brown-600 hover:bg-cream-dark"
                  >
                    {copiedId === `caption-${si}` ? "Copiada!" : "Copiar"}
                  </button>
                </div>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-[0.7rem] leading-relaxed text-brown-600">{slot.caption}</pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Broadcast message */}
      {slot.broadcast && (
        <div className="mt-4 rounded-lg bg-[#25D366]/5 p-4">
          <div className="flex items-center justify-between">
            <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-[#25D366]">Mensagem WhatsApp</p>
            <button
              onClick={() => onCopy(`broadcast-${si}`, slot.broadcast!)}
              className="rounded-md bg-white px-3 py-1 font-sans text-[0.55rem] text-brown-600 hover:bg-cream"
            >
              {copiedId === `broadcast-${si}` ? "Copiada!" : "Copiar"}
            </button>
          </div>
          <pre className="mt-2 whitespace-pre-wrap font-sans text-[0.7rem] leading-relaxed text-brown-600">{slot.broadcast}</pre>
        </div>
      )}

      {/* Notes */}
      {slot.notes && (
        <div className="mt-3 rounded-lg bg-cream p-4">
          <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-brown-500">Notas</p>
          <p className="mt-2 whitespace-pre-line font-sans text-[0.7rem] leading-relaxed text-brown-600">{slot.notes}</p>
        </div>
      )}
    </div>
  );
}

function VeilContentPanel({ marketing }: { marketing: VeilMarketing }) {
  const [section, setSection] = useState<"quotes" | "social" | "email">("quotes");
  const exp = experiences.find((e) => e.slug === marketing.slug);

  return (
    <div className="space-y-4">
      {/* Sub-tabs */}
      <div className="flex gap-2">
        {[
          { key: "quotes" as const, label: `Quotes (${marketing.quotes.length})` },
          { key: "social" as const, label: `Social (${marketing.socialPosts.length})` },
          { key: "email" as const, label: `Email (${marketing.emailSequence.length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSection(tab.key)}
            className={`rounded-lg px-4 py-2 font-sans text-xs transition-all ${
              section === tab.key
                ? "bg-cream-dark text-brown-900"
                : "text-brown-500 hover:text-brown-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Quotes */}
      {section === "quotes" && (
        <div className="space-y-3">
          {marketing.quotes.map((quote, i) => (
            <QuoteCard key={i} quote={quote} color={exp?.color || "#c9b896"} />
          ))}
        </div>
      )}

      {/* Social posts */}
      {section === "social" && (
        <div className="space-y-3">
          {marketing.socialPosts.map((post, i) => (
            <SocialPostCard key={i} post={post} color={exp?.color || "#c9b896"} />
          ))}
        </div>
      )}

      {/* Email sequence */}
      {section === "email" && (
        <div className="space-y-3">
          {marketing.emailSequence.map((email, i) => (
            <div
              key={i}
              className="rounded-xl border border-brown-100 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream-dark font-sans text-xs font-bold text-brown-600">
                    D{email.day >= 0 ? "+" : ""}
                    {email.day}
                  </span>
                  <div>
                    <p className="font-sans text-sm font-medium text-brown-900">
                      {email.subject}
                    </p>
                    <p className="font-sans text-xs text-brown-500">
                      {email.preview}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 font-sans text-[0.55rem] uppercase tracking-wider ${
                    email.type === "launch"
                      ? "bg-sage/20 text-sage"
                      : email.type === "nurture"
                        ? "bg-[#c9b896]/20 text-[#c9b896]"
                        : email.type === "post-purchase"
                          ? "bg-[#baaacc]/20 text-[#baaacc]"
                          : "bg-cream-dark text-brown-400"
                  }`}
                >
                  {email.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── LAUNCH TAB ──────────────────────────────────────────────────────────────

function LaunchTab() {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-lg text-brown-900">
        Planos de Lançamento
      </h2>
      {allMarketing.map((marketing) => {
        const exp = experiences.find((e) => e.slug === marketing.slug);
        if (!exp) return null;

        return (
          <div
            key={marketing.slug}
            className="rounded-xl border border-brown-100 bg-white p-5"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-lg font-serif text-sm font-bold text-white"
                style={{ backgroundColor: exp.color }}
              >
                {exp.number}
              </span>
              <div>
                <h3 className="font-serif text-base text-brown-900">
                  {exp.title}
                </h3>
                <p className="font-sans text-xs text-brown-500">
                  {exp.status === "available"
                    ? "Disponível"
                    : `Lançamento: ${exp.launchLabel}`}
                </p>
              </div>
              <div className="ml-auto">
                <StatusBadge status={exp.status} />
              </div>
            </div>

            <ol className="mt-4 space-y-2 border-l-2 border-brown-100 pl-4">
              {marketing.launchPlan.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.55rem] font-bold"
                    style={{
                      backgroundColor: exp.color + "20",
                      color: exp.color,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="font-sans text-sm text-brown-600">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}

// ─── REUSABLE COMPONENTS ─────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles = {
    available: "bg-sage/20 text-sage",
    coming_soon: "bg-[#c9b896]/20 text-[#c9b896]",
    waitlist: "bg-[#baaacc]/20 text-[#baaacc]",
  };
  const labels = {
    available: "Disponível",
    coming_soon: "Em breve",
    waitlist: "Waitlist",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 font-sans text-[0.55rem] uppercase tracking-wider ${
        styles[status as keyof typeof styles] || styles.coming_soon
      }`}
    >
      {labels[status as keyof typeof labels] || status}
    </span>
  );
}

function FlagRow({
  label,
  done,
  partial,
}: {
  label: string;
  done: boolean;
  partial?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-4 w-4 items-center justify-center rounded ${
          done
            ? "bg-sage text-white"
            : partial
              ? "bg-[#c9b896] text-white"
              : "border border-brown-700 bg-transparent"
        }`}
      >
        {done && (
          <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
        {!done && partial && (
          <span className="text-[0.5rem]">½</span>
        )}
      </span>
      <span className={`font-sans text-xs ${done ? "text-brown-600" : "text-brown-600"}`}>
        {label}
      </span>
    </div>
  );
}

function MiniStat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <span className="font-sans text-sm font-bold text-brown-900">{value}</span>
      <span className="ml-1 font-sans text-[0.55rem] text-brown-500">{label}</span>
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-brown-100 bg-white p-5">
      <p className="font-sans text-[0.6rem] uppercase tracking-wider text-brown-500">
        {label}
      </p>
      <p className="mt-1 font-sans text-2xl font-bold text-brown-900">{value}</p>
      <p className="mt-1 font-sans text-[0.6rem] text-brown-500">{sub}</p>
    </div>
  );
}

function QuoteCard({ quote, color }: { quote: MarketingQuote; color: string }) {
  const [copied, setCopied] = useState(false);

  async function copyQuote() {
    await navigator.clipboard.writeText(`"${quote.text}"\n\n— ${quote.source}\nseteveus.space`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-brown-100 bg-white p-5">
      <p className="font-serif text-base italic leading-relaxed text-brown-900">
        &ldquo;{quote.text}&rdquo;
      </p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="font-sans text-[0.6rem] text-brown-500">
            {quote.source}
          </p>
          <div className="flex gap-1">
            {quote.formats.map((f) => (
              <span
                key={f}
                className="rounded px-1.5 py-0.5 font-sans text-[0.5rem] uppercase"
                style={{ backgroundColor: color + "20", color }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={copyQuote}
          className="font-sans text-[0.6rem] text-brown-500 hover:text-sage"
        >
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
    </div>
  );
}

function SocialPostCard({ post, color }: { post: SocialPost; color: string }) {
  const [copied, setCopied] = useState(false);

  async function copyPost() {
    const hashtagStr = post.hashtags.join(" ");
    await navigator.clipboard.writeText(`${post.content}\n\n${hashtagStr}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-brown-100 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="rounded px-2 py-0.5 font-sans text-[0.55rem] uppercase"
            style={{ backgroundColor: color + "20", color }}
          >
            {post.format}
          </span>
          <span className="font-sans text-[0.55rem] text-brown-500">
            Semana {post.scheduledWeek > 0 ? `+${post.scheduledWeek}` : post.scheduledWeek}
          </span>
        </div>
        <button
          onClick={copyPost}
          className="font-sans text-[0.6rem] text-brown-500 hover:text-sage"
        >
          {copied ? "Copiado!" : "Copiar post"}
        </button>
      </div>
      <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-brown-600">
        {post.content}
      </pre>
      <div className="mt-3 flex flex-wrap gap-1">
        {post.hashtags.slice(0, 5).map((tag) => (
          <span
            key={tag}
            className="font-sans text-[0.55rem] text-brown-600"
          >
            {tag}
          </span>
        ))}
        {post.hashtags.length > 5 && (
          <span className="font-sans text-[0.55rem] text-brown-700">
            +{post.hashtags.length - 5}
          </span>
        )}
      </div>
    </div>
  );
}
