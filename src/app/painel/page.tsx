"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { experiences } from "@/data/experiences";
import { allMarketing } from "@/data/marketing";
import type { VeilMarketing, SocialPost, MarketingQuote } from "@/data/marketing";
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
            sub="Poupa 18%"
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
    { name: "Março 2026", events: ["Medo: LANÇAMENTO (dia 1)", "Medo: conteúdo pós-lançamento", "Ilusão: 1 quote/semana"] },
    { name: "Abril 2026", events: ["Culpa: teaser + waitlist (dia 1)", "Culpa: LANÇAMENTO (dia 15)", "Medo: testemunhos"] },
    { name: "Maio 2026", events: ["Culpa: conteúdo pós-lançamento", "Identidade: teaser início"] },
    { name: "Junho 2026", events: ["Identidade: LANÇAMENTO (dia 1)", "Pack de 3 promoção especial"] },
    { name: "Julho 2026", events: ["Identidade: conteúdo pós-lançamento", "Controlo: teaser"] },
    { name: "Agosto 2026", events: ["Controlo: LANÇAMENTO (dia 1)", "Promoção Jornada Completa"] },
    { name: "Setembro 2026", events: ["Controlo: conteúdo pós-lançamento", "Desejo: teaser"] },
    { name: "Outubro 2026", events: ["Desejo: LANÇAMENTO (dia 1)", "Promoção Pack de 3 outono"] },
    { name: "Novembro 2026", events: ["Desejo: conteúdo pós-lançamento", "Separação: teaser final"] },
    { name: "Dezembro 2026", events: ["Separação: LANÇAMENTO (dia 1)", "Promoção Jornada Completa Natal", "7/7 celebração anual"] },
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

// ─── CONTENT TAB ─────────────────────────────────────────────────────────────

function ContentTab({
  selectedVeil,
  onSelectVeil,
}: {
  selectedVeil: string | null;
  onSelectVeil: (slug: string | null) => void;
}) {
  const marketing = selectedVeil
    ? allMarketing.find((m) => m.slug === selectedVeil)
    : null;

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-lg text-brown-900">
        Biblioteca de Conteúdo de Marketing
      </h2>

      {/* Veil selector */}
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

      {/* Content for selected veil */}
      {marketing ? (
        <VeilContentPanel marketing={marketing} />
      ) : (
        <div className="rounded-xl border border-brown-800/20 bg-white px-8 py-12 text-center">
          <p className="font-serif text-base text-brown-400">
            Selecciona um véu para ver o conteúdo de marketing
          </p>
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
    await navigator.clipboard.writeText(`"${quote.text}"\n\n— ${quote.source}\nseteecos.com`);
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
