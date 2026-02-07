"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { generateWeekPlan, type WeekPlan, type ContentTemplate } from "@/lib/content-calendar";
import Link from "next/link";

// Admin email — only Vivianne can access
const ADMIN_EMAIL = "vivianne@seteecos.com";

type EmailSequence = {
  id: string;
  day: number;
  subject: string;
  preview: string;
  body: string;
};

type SubscriberStats = {
  total: number;
  thisWeek: number;
};

export default function PainelMarketing() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"calendario" | "emails" | "metricas">("calendario");
  const [weekOffset, setWeekOffset] = useState(0);
  const [weekPlan, setWeekPlan] = useState<WeekPlan | null>(null);
  const [emailSequences, setEmailSequences] = useState<EmailSequence[]>([]);
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadWeekPlan = useCallback(() => {
    const plan = generateWeekPlan(weekOffset);
    setWeekPlan(plan);
  }, [weekOffset]);

  const loadEmailSequences = useCallback(async () => {
    try {
      const res = await fetch("/api/email-sequence");
      const data = await res.json();
      if (data.sequences) setEmailSequences(data.sequences);
    } catch {
      // Fallback: sequences already available via API
    }
  }, []);

  useEffect(() => {
    loadWeekPlan();
  }, [loadWeekPlan]);

  useEffect(() => {
    if (activeTab === "emails") loadEmailSequences();
  }, [activeTab, loadEmailSequences]);

  // Auth guard
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

  async function copyToClipboard(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback for older browsers
    }
  }

  const typeColors: Record<string, string> = {
    reel: "bg-veu-1 text-white",
    "stories-poll": "bg-veu-3 text-white",
    "stories-testemunho": "bg-veu-2 text-white",
    carrossel: "bg-veu-4 text-white",
    broadcast: "bg-veu-5 text-white",
    "status-whatsapp": "bg-veu-6 text-white",
  };

  return (
    <section className="min-h-screen bg-cream px-6 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-sage">
              Painel de Marketing
            </p>
            <h1 className="mt-1 font-serif text-3xl text-brown-900">
              Automação Sete Ecos
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/painel/marca"
              className="rounded-lg bg-sage/10 px-4 py-2 font-sans text-[0.75rem] font-medium text-sage transition hover:bg-sage/20"
            >
              Brand Kit
            </Link>
            <Link
              href="/membro"
              className="font-sans text-sm text-brown-400 transition-colors hover:text-sage"
            >
              &larr; Voltar ao painel
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-2 border-b border-brown-100">
          {[
            { id: "calendario" as const, label: "Calendário de Conteúdo" },
            { id: "emails" as const, label: "Sequência de Emails" },
            { id: "metricas" as const, label: "Métricas & Funil" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-t-lg px-5 py-3 font-sans text-[0.75rem] uppercase tracking-[0.1em] transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-sage bg-white text-sage"
                  : "text-brown-400 hover:text-brown-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-8">
          {/* === CALENDÁRIO DE CONTEÚDO === */}
          {activeTab === "calendario" && weekPlan && (
            <div>
              {/* Week navigation */}
              <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm">
                <button
                  onClick={() => setWeekOffset((o) => o - 1)}
                  className="rounded-lg bg-cream px-4 py-2 font-sans text-sm text-brown-600 transition hover:bg-cream-dark"
                >
                  &larr; Semana anterior
                </button>
                <div className="text-center">
                  <p className="font-serif text-lg text-brown-900">
                    Semana {weekPlan.weekNumber}
                  </p>
                  <p className="font-sans text-xs text-brown-400">
                    {weekPlan.theme} — {weekPlan.startDate}
                  </p>
                  <p className="mt-1 font-sans text-xs text-sage">
                    ~{weekPlan.totalMinutes} min total (≈3h/semana)
                  </p>
                </div>
                <button
                  onClick={() => setWeekOffset((o) => o + 1)}
                  className="rounded-lg bg-cream px-4 py-2 font-sans text-sm text-brown-600 transition hover:bg-cream-dark"
                >
                  Próxima semana &rarr;
                </button>
              </div>

              {/* Daily templates */}
              <div className="mt-6 space-y-4">
                {weekPlan.templates.map((tmpl) => (
                  <div
                    key={tmpl.id}
                    className="overflow-hidden rounded-xl border border-brown-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    {/* Summary row */}
                    <button
                      onClick={() =>
                        setExpandedTemplate(expandedTemplate === tmpl.id ? null : tmpl.id)
                      }
                      className="flex w-full items-center gap-4 p-5 text-left"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage font-sans text-sm font-bold text-white">
                        {tmpl.day.toUpperCase()}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 font-sans text-[0.6rem] uppercase tracking-wider ${typeColors[tmpl.type] || "bg-brown-200 text-brown-700"}`}
                          >
                            {tmpl.typeLabel}
                          </span>
                          <span className="font-sans text-xs text-brown-400">{tmpl.duration}</span>
                          <span className="font-sans text-xs text-brown-300">
                            {tmpl.platform === "ambos" ? "IG + WA" : tmpl.platform === "instagram" ? "IG" : "WA"}
                          </span>
                        </div>
                        <p className="mt-1 font-serif text-base text-brown-800">
                          {tmpl.title}
                        </p>
                      </div>
                      <span className="text-brown-300">
                        {expandedTemplate === tmpl.id ? "▲" : "▼"}
                      </span>
                    </button>

                    {/* Expanded details */}
                    {expandedTemplate === tmpl.id && (
                      <div className="border-t border-brown-50 bg-cream-mid px-5 pb-5">
                        {tmpl.hook && (
                          <div className="mt-4">
                            <p className="font-sans text-[0.65rem] font-medium uppercase tracking-wider text-sage">
                              Gancho
                            </p>
                            <p className="mt-1 font-serif text-base italic text-brown-700">
                              &ldquo;{tmpl.hook}&rdquo;
                            </p>
                          </div>
                        )}

                        {tmpl.caption && (
                          <div className="mt-4">
                            <div className="flex items-center justify-between">
                              <p className="font-sans text-[0.65rem] font-medium uppercase tracking-wider text-sage">
                                Legenda / Texto
                              </p>
                              <button
                                onClick={() => copyToClipboard(tmpl.caption, `caption-${tmpl.id}`)}
                                className="rounded bg-sage/10 px-3 py-1 font-sans text-[0.65rem] text-sage transition hover:bg-sage/20"
                              >
                                {copiedId === `caption-${tmpl.id}` ? "Copiado!" : "Copiar"}
                              </button>
                            </div>
                            <p className="mt-1 whitespace-pre-wrap rounded-lg bg-white p-4 font-sans text-sm leading-relaxed text-brown-700">
                              {tmpl.caption}
                            </p>
                          </div>
                        )}

                        {tmpl.hashtags.length > 0 && (
                          <div className="mt-4">
                            <div className="flex items-center justify-between">
                              <p className="font-sans text-[0.65rem] font-medium uppercase tracking-wider text-sage">
                                Hashtags
                              </p>
                              <button
                                onClick={() =>
                                  copyToClipboard(tmpl.hashtags.join(" "), `hash-${tmpl.id}`)
                                }
                                className="rounded bg-sage/10 px-3 py-1 font-sans text-[0.65rem] text-sage transition hover:bg-sage/20"
                              >
                                {copiedId === `hash-${tmpl.id}` ? "Copiado!" : "Copiar"}
                              </button>
                            </div>
                            <p className="mt-1 font-sans text-xs text-brown-500">
                              {tmpl.hashtags.join("  ")}
                            </p>
                          </div>
                        )}

                        {tmpl.notes && (
                          <div className="mt-4 rounded-lg border-l-[3px] border-sage bg-white px-4 py-3">
                            <p className="font-sans text-[0.65rem] font-medium uppercase tracking-wider text-brown-400">
                              Notas
                            </p>
                            <p className="mt-1 font-sans text-sm text-brown-600">
                              {tmpl.notes}
                            </p>
                          </div>
                        )}

                        {tmpl.cta && (
                          <div className="mt-4">
                            <p className="font-sans text-[0.65rem] font-medium uppercase tracking-wider text-sage">
                              CTA
                            </p>
                            <p className="mt-1 font-sans text-sm font-medium text-sage">
                              {tmpl.cta}
                            </p>
                          </div>
                        )}

                        {/* Visual identity guide */}
                        {tmpl.visual && tmpl.visual.dimensions !== "N/A" && (
                          <div className="mt-4 rounded-lg border border-veu-7/20 bg-veu-7/5 px-4 py-3">
                            <p className="font-sans text-[0.65rem] font-medium uppercase tracking-wider text-veu-7">
                              Identidade Visual
                            </p>
                            <div className="mt-2 grid gap-2 sm:grid-cols-2">
                              <div>
                                <p className="font-sans text-[0.55rem] uppercase tracking-wider text-brown-400">Fundo</p>
                                <p className="font-sans text-xs text-brown-600">{tmpl.visual.background}</p>
                              </div>
                              <div>
                                <p className="font-sans text-[0.55rem] uppercase tracking-wider text-brown-400">Tipografia</p>
                                <p className="font-sans text-xs text-brown-600">{tmpl.visual.font}</p>
                              </div>
                              <div>
                                <p className="font-sans text-[0.55rem] uppercase tracking-wider text-brown-400">Dimensões</p>
                                <p className="font-sans text-xs text-brown-600">{tmpl.visual.dimensions}</p>
                              </div>
                              <div>
                                <p className="font-sans text-[0.55rem] uppercase tracking-wider text-brown-400">Layout</p>
                                <p className="font-sans text-xs text-brown-600">{tmpl.visual.layout}</p>
                              </div>
                            </div>
                            <Link
                              href="/painel/marca"
                              className="mt-2 inline-block font-sans text-[0.65rem] font-medium text-veu-7 transition hover:text-veu-7/80"
                            >
                              Ver Brand Kit completo &rarr;
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick stats */}
              <div className="mt-8 grid gap-4 sm:grid-cols-4">
                {[
                  { label: "Reels/semana", value: "2", color: "#c9b896" },
                  { label: "Stories/semana", value: "2", color: "#c08aaa" },
                  { label: "Carrosseis/semana", value: "1", color: "#8aaaca" },
                  { label: "Tempo total", value: "~3h", color: "#7a8c6e" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-white p-4 text-center shadow-sm"
                  >
                    <p className="font-serif text-2xl" style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                    <p className="font-sans text-[0.6rem] uppercase tracking-wider text-brown-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === SEQUÊNCIA DE EMAILS === */}
          {activeTab === "emails" && (
            <div>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h2 className="font-serif text-xl text-brown-900">
                  Sequência de Lead Nurturing
                </h2>
                <p className="mt-1 font-sans text-sm text-brown-500">
                  6 emails ao longo de 18 dias — do primeiro contacto à compra
                </p>
                <div className="mt-4 flex gap-2">
                  {emailSequences.map((seq, i) => (
                    <div
                      key={seq.id}
                      className="flex h-8 flex-1 items-center justify-center rounded-full bg-sage/20 font-sans text-[0.6rem] text-sage"
                    >
                      Dia {seq.day}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {emailSequences.map((seq, i) => (
                  <div
                    key={seq.id}
                    className="overflow-hidden rounded-xl border border-brown-100 bg-white shadow-sm"
                  >
                    <button
                      onClick={() =>
                        setExpandedTemplate(
                          expandedTemplate === `email-${seq.id}` ? null : `email-${seq.id}`
                        )
                      }
                      className="flex w-full items-center gap-4 p-5 text-left"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-veu-4 font-sans text-sm font-bold text-white">
                        D{seq.day}
                      </span>
                      <div className="flex-1">
                        <p className="font-serif text-base text-brown-800">{seq.subject}</p>
                        <p className="mt-0.5 font-sans text-xs text-brown-400">{seq.preview}</p>
                      </div>
                      <span className="text-brown-300">
                        {expandedTemplate === `email-${seq.id}` ? "▲" : "▼"}
                      </span>
                    </button>

                    {expandedTemplate === `email-${seq.id}` && (
                      <div className="border-t border-brown-50 bg-cream-mid px-5 pb-5">
                        <div className="mt-4 flex items-center justify-between">
                          <p className="font-sans text-[0.65rem] font-medium uppercase tracking-wider text-sage">
                            Corpo do email
                          </p>
                          <button
                            onClick={() =>
                              copyToClipboard(seq.body, `email-body-${seq.id}`)
                            }
                            className="rounded bg-sage/10 px-3 py-1 font-sans text-[0.65rem] text-sage transition hover:bg-sage/20"
                          >
                            {copiedId === `email-body-${seq.id}` ? "Copiado!" : "Copiar tudo"}
                          </button>
                        </div>
                        <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-white p-4 font-sans text-sm leading-relaxed text-brown-700">
                          {seq.body}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Sequence funnel visual */}
              <div className="mt-8 rounded-xl bg-gradient-to-r from-brown-800 to-brown-900 p-6">
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-brown-400">
                  Funil de conversão
                </p>
                <div className="mt-4 flex items-center gap-2">
                  {[
                    { label: "Subscrição", pct: "100%", color: "#7a8c6e" },
                    { label: "Abertura", pct: "45%", color: "#8aaaca" },
                    { label: "Clique", pct: "15%", color: "#c08aaa" },
                    { label: "Teste", pct: "8%", color: "#c9b896" },
                    { label: "Compra", pct: "3%", color: "#baaacc" },
                  ].map((stage, i) => (
                    <div key={stage.label} className="flex-1 text-center">
                      <div
                        className="mx-auto rounded-lg py-3"
                        style={{
                          backgroundColor: stage.color,
                          width: `${100 - i * 15}%`,
                          minWidth: "40px",
                        }}
                      >
                        <p className="font-sans text-xs font-bold text-white">{stage.pct}</p>
                      </div>
                      <p className="mt-2 font-sans text-[0.6rem] text-brown-400">{stage.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* === MÉTRICAS & FUNIL === */}
          {activeTab === "metricas" && (
            <div>
              {/* KPI cards */}
              <div className="grid gap-4 sm:grid-cols-4">
                {[
                  { label: "Subscritores", value: "—", delta: "+0 esta semana", color: "#7a8c6e" },
                  { label: "Testes feitos", value: "—", delta: "Taxa: —%", color: "#c08aaa" },
                  { label: "Compras", value: "—", delta: "Receita: —", color: "#c9b896" },
                  { label: "Referrals", value: "—", delta: "Partilhas: —", color: "#baaacc" },
                ].map((kpi) => (
                  <div key={kpi.label} className="rounded-xl bg-white p-5 shadow-sm">
                    <p className="font-sans text-[0.65rem] uppercase tracking-wider text-brown-400">
                      {kpi.label}
                    </p>
                    <p className="mt-2 font-serif text-3xl" style={{ color: kpi.color }}>
                      {kpi.value}
                    </p>
                    <p className="mt-1 font-sans text-xs text-brown-400">{kpi.delta}</p>
                  </div>
                ))}
              </div>

              {/* Marketing checklist */}
              <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="font-serif text-xl text-brown-900">
                  Checklist de Marketing Semanal
                </h2>
                <div className="mt-4 space-y-3">
                  {[
                    { task: "Publicar 2 Reels no Instagram", day: "Seg + Qua", time: "30 min cada" },
                    { task: "Publicar 2 Stories (poll + testemunho)", day: "Ter + Qui", time: "15 min cada" },
                    { task: "Publicar 1 Carrossel educativo", day: "Sexta", time: "30 min" },
                    { task: "Responder DMs e mensagens", day: "Sábado", time: "20 min" },
                    { task: "Planear conteúdo da semana", day: "Domingo", time: "30 min" },
                    { task: "Enviar broadcast WhatsApp (2x)", day: "Seg + Qua", time: "5 min cada" },
                    { task: "Actualizar Status WhatsApp (2x)", day: "Seg + Sex", time: "5 min cada" },
                  ].map((item, i) => (
                    <label key={i} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-brown-200 text-sage focus:ring-sage"
                      />
                      <div className="flex-1">
                        <p className="font-sans text-sm text-brown-700">{item.task}</p>
                        <p className="font-sans text-xs text-brown-400">
                          {item.day} — {item.time}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-4 rounded-lg bg-sage/10 px-4 py-3">
                  <p className="font-sans text-sm font-medium text-sage">
                    Total: ~3 horas/semana
                  </p>
                </div>
              </div>

              {/* UTM Links */}
              <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="font-serif text-xl text-brown-900">
                  Links com UTM para tracking
                </h2>
                <p className="mt-1 font-sans text-sm text-brown-500">
                  Usa estes links para medir de onde vêm os teus visitantes
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    {
                      label: "Instagram Bio",
                      url: "https://seteecos.com/recursos/teste?utm_source=instagram&utm_medium=bio&utm_campaign=sete-ecos",
                    },
                    {
                      label: "Instagram Reel",
                      url: "https://seteecos.com/recursos/teste?utm_source=instagram&utm_medium=reel&utm_campaign=sete-ecos",
                    },
                    {
                      label: "WhatsApp Broadcast",
                      url: "https://seteecos.com/recursos/teste?utm_source=whatsapp&utm_medium=broadcast&utm_campaign=sete-ecos",
                    },
                    {
                      label: "WhatsApp Status",
                      url: "https://seteecos.com/ecossistema?utm_source=whatsapp&utm_medium=status&utm_campaign=sete-ecos",
                    },
                  ].map((link) => (
                    <div key={link.label} className="flex items-center gap-3">
                      <span className="shrink-0 font-sans text-xs font-medium text-brown-600">
                        {link.label}:
                      </span>
                      <code className="flex-1 overflow-x-auto rounded bg-cream px-3 py-1.5 font-mono text-xs text-brown-500">
                        {link.url}
                      </code>
                      <button
                        onClick={() => copyToClipboard(link.url, `utm-${link.label}`)}
                        className="shrink-0 rounded bg-sage/10 px-3 py-1 font-sans text-[0.65rem] text-sage transition hover:bg-sage/20"
                      >
                        {copiedId === `utm-${link.label}` ? "Copiado!" : "Copiar"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
