"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  allWeeks,
  professionalCarousels,
  reelScripts,
  productionGuide,
} from "@/data/content-calendar-weeks";
import type { ContentSlot, CarouselSlide } from "@/data/content-calendar-weeks";

type MainTab = "calendario" | "carrosseis" | "reels" | "producao";

// ─── CAROUSEL SLIDE PREVIEW ──────────────────────────────────────────────────

function SlidePreview({ slide, index }: { slide: CarouselSlide; index: number }) {
  return (
    <div
      className="relative flex aspect-square w-44 shrink-0 flex-col justify-between overflow-hidden rounded-xl shadow-md"
      style={{ backgroundColor: slide.bg, color: slide.text }}
    >
      <div className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-black/20 font-sans text-[0.5rem] font-bold text-white">
        {index + 1}
      </div>
      <div className="flex flex-1 flex-col justify-center px-4">
        {slide.title && (
          <h4 className="whitespace-pre-line font-serif text-[0.7rem] leading-tight">{slide.title}</h4>
        )}
        {slide.body && (
          <p className="mt-2 whitespace-pre-line font-sans text-[0.5rem] leading-relaxed opacity-80">{slide.body}</p>
        )}
      </div>
      {slide.footer && (
        <div className="px-4 pb-3">
          <p className="font-sans text-[0.4rem] uppercase tracking-wider" style={{ color: slide.accent }}>
            {slide.footer}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── SLOT RENDERER (calendar day content) ────────────────────────────────────

function SlotCard({ slot, index, copiedId, onCopy }: {
  slot: ContentSlot;
  index: number;
  copiedId: string | null;
  onCopy: (id: string, text: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-brown-100 bg-white p-6">
      {/* Platform badge + type */}
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

      {/* Visual preview */}
      {slot.visual && (
        <div className="mt-5 flex flex-col items-start gap-6 sm:flex-row">
          <div
            className={`relative flex shrink-0 flex-col justify-between overflow-hidden rounded-xl shadow-lg ${
              slot.visual.format === "square" ? "aspect-square w-64" : "aspect-[9/16] w-48"
            }`}
            style={{ backgroundColor: slot.visual.bg, color: slot.visual.text }}
          >
            <div className="px-5 pt-5">
              {slot.visual.highlight && (
                <span
                  className="mb-2 inline-block rounded-full px-2.5 py-0.5 font-sans text-[0.5rem] uppercase tracking-[0.12em]"
                  style={{ backgroundColor: slot.visual.accent + "25", color: slot.visual.accent }}
                >
                  {slot.visual.highlight}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-center px-5">
              {slot.visual.title && (
                <h3 className="whitespace-pre-line font-serif text-base leading-tight">{slot.visual.title}</h3>
              )}
              {slot.visual.body && (
                <p className="mt-3 whitespace-pre-line font-sans text-[0.65rem] leading-relaxed opacity-80">{slot.visual.body}</p>
              )}
            </div>
            <div className="px-5 pb-4">
              {slot.visual.footer && (
                <div className="flex items-center justify-between">
                  <p className="font-sans text-[0.45rem] uppercase tracking-[0.1em]" style={{ color: slot.visual.accent }}>
                    {slot.visual.footer}
                  </p>
                  <span className="font-serif text-sm opacity-30" style={{ color: slot.visual.accent }}>~</span>
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
                    onClick={() => onCopy(`caption-${index}`, slot.caption!)}
                    className="rounded-md bg-cream px-3 py-1 font-sans text-[0.55rem] text-brown-600 hover:bg-cream-dark"
                  >
                    {copiedId === `caption-${index}` ? "Copiada!" : "Copiar"}
                  </button>
                </div>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-[0.75rem] leading-relaxed text-brown-600">{slot.caption}</pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Broadcast */}
      {slot.broadcast && (
        <div className="mt-5 rounded-lg bg-[#25D366]/5 p-4">
          <div className="flex items-center justify-between">
            <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-[#25D366]">Mensagem WhatsApp</p>
            <button
              onClick={() => onCopy(`broadcast-${index}`, slot.broadcast!)}
              className="rounded-md bg-white px-3 py-1 font-sans text-[0.55rem] text-brown-600 hover:bg-cream"
            >
              {copiedId === `broadcast-${index}` ? "Copiada!" : "Copiar"}
            </button>
          </div>
          <pre className="mt-2 whitespace-pre-wrap font-sans text-[0.75rem] leading-relaxed text-brown-600">{slot.broadcast}</pre>
        </div>
      )}

      {/* Notes */}
      {slot.notes && (
        <div className="mt-4 rounded-lg bg-cream p-4">
          <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-brown-500">Notas</p>
          <p className="mt-2 whitespace-pre-line font-sans text-[0.75rem] leading-relaxed text-brown-600">{slot.notes}</p>
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function MarketingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mainTab, setMainTab] = useState<MainTab>("calendario");
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedCarousel, setExpandedCarousel] = useState<string | null>(null);
  const [expandedReel, setExpandedReel] = useState<number | null>(null);

  if (loading) {
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

  const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];
  if (!AUTHOR_EMAILS.includes(user.email || "")) {
    router.push("/membro");
    return null;
  }

  const week = allWeeks[activeWeek];
  const day = week?.days[activeDay];

  async function copyText(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const mainTabs: { key: MainTab; label: string; count?: number }[] = [
    { key: "calendario", label: "Calendario", count: allWeeks.length },
    { key: "carrosseis", label: "Carrosseis", count: professionalCarousels.length },
    { key: "reels", label: "Scripts Reels", count: reelScripts.length },
    { key: "producao", label: "Guia Producao" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-brown-100 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-brown-900">Producao de Marketing</h1>
            <p className="mt-1 font-sans text-xs text-brown-500">
              Calendario + carrosseis + reels + guia de producao. Tudo pronto para publicar.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/painel/marketing/gerador"
              className="rounded-lg bg-sage px-4 py-2 font-sans text-xs font-medium text-white transition-colors hover:bg-sage-dark"
            >
              Gerador de Conteudo
            </Link>
            <Link href="/painel" className="font-sans text-xs text-brown-500 hover:text-brown-900">
              &larr; Painel
            </Link>
          </div>
        </div>
      </div>

      {/* Main tabs */}
      <div className="border-b border-brown-100 bg-white px-6">
        <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto">
          {mainTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setMainTab(tab.key)}
              className={`shrink-0 px-5 py-3 font-sans text-[0.7rem] uppercase tracking-[0.12em] transition-colors ${
                mainTab === tab.key
                  ? "border-b-2 border-sage text-sage"
                  : "text-brown-500 hover:text-brown-700"
              }`}
            >
              {tab.label}
              {tab.count && (
                <span className="ml-1.5 rounded-full bg-brown-100 px-1.5 py-0.5 text-[0.5rem] text-brown-500">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB: CALENDARIO ───────────────────────────────────────────── */}
      {mainTab === "calendario" && (
        <>
          {/* Week selector */}
          <div className="border-b border-brown-100 bg-white px-6 py-3">
            <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto">
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
                  Sem. {w.weekNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Week title */}
          {week && (
            <div className="border-b border-brown-50 bg-cream px-6 py-3">
              <div className="mx-auto max-w-5xl">
                <p className="font-serif text-sm text-brown-900">{week.title}</p>
                <p className="font-sans text-[0.6rem] text-brown-500">{week.subtitle}</p>
              </div>
            </div>
          )}

          {/* Day selector */}
          {week && (
            <div className="border-b border-brown-50 bg-cream px-6 py-3">
              <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto">
                {week.days.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveDay(i)}
                    className={`shrink-0 rounded-lg px-3 py-2 text-center transition-all ${
                      activeDay === i ? "bg-gold/20 text-gold-dark" : "text-brown-400 hover:text-brown-600"
                    }`}
                  >
                    <span className="block font-sans text-[0.6rem] font-medium uppercase tracking-wider">{d.dayShort}</span>
                    <span className="mt-0.5 block font-sans text-[0.5rem] text-brown-400">{d.theme}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Day content */}
          {day && (
            <div className="mx-auto max-w-5xl px-6 py-8">
              <div className="mb-6">
                <h2 className="font-serif text-xl text-brown-900">{day.day}</h2>
                <p className="mt-1 font-sans text-sm text-brown-500">{day.theme}</p>
              </div>
              <div className="space-y-8">
                {day.slots.map((slot, si) => (
                  <SlotCard key={si} slot={slot} index={si} copiedId={copiedId} onCopy={copyText} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* ─── TAB: CARROSSEIS PROFISSIONAIS ─────────────────────────────── */}
      {mainTab === "carrosseis" && (
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="mb-8">
            <h2 className="font-serif text-xl text-brown-900">Carrosseis Profissionais</h2>
            <p className="mt-1 font-sans text-sm text-brown-500">
              Cada carrossel tem slides individuais com texto pronto. Recria no Canva com as cores e fontes indicadas.
            </p>
          </div>

          <div className="space-y-6">
            {professionalCarousels.map((carousel) => {
              const isExpanded = expandedCarousel === carousel.id;
              return (
                <div key={carousel.id} className="rounded-2xl border border-brown-100 bg-white overflow-hidden">
                  {/* Header */}
                  <button
                    onClick={() => setExpandedCarousel(isExpanded ? null : carousel.id)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-cream/50"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-pink-50 px-3 py-1 font-sans text-[0.55rem] font-medium uppercase tracking-wider text-pink-600">
                          {carousel.slides.length} slides
                        </span>
                        <span className="rounded-full bg-brown-50 px-3 py-1 font-sans text-[0.55rem] font-medium uppercase tracking-wider text-brown-500">
                          Instagram
                        </span>
                      </div>
                      <h3 className="mt-2 font-serif text-lg text-brown-900">{carousel.title}</h3>
                      <p className="mt-1 font-sans text-xs text-brown-500">{carousel.description}</p>
                    </div>
                    <span className={`text-brown-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="border-t border-brown-100 px-6 py-6">
                      {/* Canva specs */}
                      <div className="mb-6 rounded-lg bg-cream p-4">
                        <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-brown-500">Especificacoes Canva</p>
                        <div className="mt-2 grid gap-2 sm:grid-cols-3">
                          <div>
                            <p className="font-sans text-[0.55rem] text-brown-400">Dimensoes</p>
                            <p className="font-sans text-xs text-brown-700">{carousel.canvaSpecs.dimensions}</p>
                          </div>
                          <div>
                            <p className="font-sans text-[0.55rem] text-brown-400">Fontes</p>
                            <p className="font-sans text-xs text-brown-700">{carousel.canvaSpecs.fonts}</p>
                          </div>
                          <div>
                            <p className="font-sans text-[0.55rem] text-brown-400">Cores</p>
                            <div className="mt-1 flex gap-1">
                              {carousel.canvaSpecs.colorPalette.map((color) => (
                                <div
                                  key={color}
                                  className="h-5 w-5 rounded-full border border-brown-200"
                                  style={{ backgroundColor: color }}
                                  title={color}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Slide previews */}
                      <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-brown-500">Slides</p>
                      <div className="mt-3 flex gap-4 overflow-x-auto pb-4">
                        {carousel.slides.map((slide, i) => (
                          <SlidePreview key={i} slide={slide} index={i} />
                        ))}
                      </div>

                      {/* Caption */}
                      <div className="mt-6">
                        <div className="flex items-center justify-between">
                          <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-brown-500">Legenda</p>
                          <button
                            onClick={() => copyText(`carousel-${carousel.id}`, carousel.caption)}
                            className="rounded-md bg-cream px-3 py-1 font-sans text-[0.55rem] text-brown-600 hover:bg-cream-dark"
                          >
                            {copiedId === `carousel-${carousel.id}` ? "Copiada!" : "Copiar legenda"}
                          </button>
                        </div>
                        <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-cream/50 p-4 font-sans text-[0.75rem] leading-relaxed text-brown-600">
                          {carousel.caption}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── TAB: SCRIPTS DE REELS ─────────────────────────────────────── */}
      {mainTab === "reels" && (
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="mb-8">
            <h2 className="font-serif text-xl text-brown-900">Scripts de Reels</h2>
            <p className="mt-1 font-sans text-sm text-brown-500">
              Cada script tem o hook (primeiros 3 segundos), cenas descritas, CTA e sugestao de musica.
              Usa o CapCut Free para editar.
            </p>
          </div>

          <div className="space-y-6">
            {reelScripts.map((reel, ri) => {
              const isExpanded = expandedReel === ri;
              return (
                <div key={ri} className="rounded-2xl border border-brown-100 bg-white overflow-hidden">
                  {/* Header */}
                  <button
                    onClick={() => setExpandedReel(isExpanded ? null : ri)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-cream/50"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-purple-50 px-3 py-1 font-sans text-[0.55rem] font-medium uppercase tracking-wider text-purple-600">
                          Reel {reel.duration}
                        </span>
                        <span className="rounded-full bg-pink-50 px-3 py-1 font-sans text-[0.55rem] font-medium uppercase tracking-wider text-pink-600">
                          Instagram
                        </span>
                      </div>
                      <h3 className="mt-2 font-serif text-lg text-brown-900">
                        &ldquo;{reel.hook}&rdquo;
                      </h3>
                    </div>
                    <span className={`text-brown-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>

                  {/* Expanded */}
                  {isExpanded && (
                    <div className="border-t border-brown-100 px-6 py-6 space-y-5">
                      {/* Hook */}
                      <div className="rounded-lg border-2 border-purple-200 bg-purple-50/50 p-4">
                        <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-purple-600">
                          Hook (primeiros 3 segundos)
                        </p>
                        <p className="mt-2 font-serif text-lg text-brown-900">{reel.hook}</p>
                      </div>

                      {/* Scenes */}
                      <div>
                        <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-brown-500">Cenas</p>
                        <div className="mt-3 space-y-3">
                          {reel.scenes.map((scene, si) => (
                            <div key={si} className="rounded-lg bg-cream p-4">
                              <p className="whitespace-pre-line font-sans text-[0.75rem] leading-relaxed text-brown-600">{scene}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="rounded-lg bg-sage/10 p-4">
                        <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-sage">
                          Call to Action
                        </p>
                        <p className="mt-2 font-sans text-sm text-brown-900">{reel.cta}</p>
                      </div>

                      {/* Music + template */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-cream p-4">
                          <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-brown-500">Musica sugerida</p>
                          <p className="mt-2 font-sans text-xs text-brown-600">{reel.music}</p>
                        </div>
                        {reel.canvaTemplate && (
                          <div className="rounded-lg bg-cream p-4">
                            <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-brown-500">Template CapCut</p>
                            <p className="mt-2 font-sans text-xs text-brown-600">{reel.canvaTemplate}</p>
                          </div>
                        )}
                      </div>

                      {/* Copy full script */}
                      <button
                        onClick={() => copyText(
                          `reel-${ri}`,
                          `HOOK: ${reel.hook}\n\n${reel.scenes.join("\n\n")}\n\nCTA: ${reel.cta}\n\nMUSICA: ${reel.music}`
                        )}
                        className="w-full rounded-lg border border-brown-200 bg-cream px-4 py-3 font-sans text-xs text-brown-600 transition-colors hover:bg-cream-dark"
                      >
                        {copiedId === `reel-${ri}` ? "Script copiado!" : "Copiar script completo"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── TAB: GUIA DE PRODUCAO ─────────────────────────────────────── */}
      {mainTab === "producao" && (
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="mb-8">
            <h2 className="font-serif text-xl text-brown-900">Guia de Producao</h2>
            <p className="mt-1 font-sans text-sm text-brown-500">
              Tudo o que precisas para criar conteudo profissional. Dimensoes, cores, fontes, ferramentas e automacoes.
            </p>
          </div>

          <div className="space-y-8">
            {productionGuide.map((section) => (
              <div key={section.category} className="rounded-2xl border border-brown-100 bg-white p-6">
                <h3 className="font-serif text-lg text-brown-900">{section.category}</h3>
                <div className="mt-4 space-y-3">
                  {section.items.map((item) => (
                    <div key={item.title} className="rounded-lg bg-cream p-4">
                      <p className="font-sans text-sm font-medium text-brown-900">{item.title}</p>
                      <p className="mt-1 font-sans text-xs leading-relaxed text-brown-600">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Screenshot links */}
          <div className="mt-8 rounded-2xl border border-brown-100 bg-white p-6">
            <h3 className="font-serif text-lg text-brown-900">Links para screenshots</h3>
            <p className="mt-1 font-sans text-xs text-brown-500">
              Abre estas paginas no telemovel e faz screenshot para usar nos carrosseis e reels.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { label: "Dashboard", href: "/membro" },
                { label: "Leitor", href: "/membro/leitura" },
                { label: "Capitulo", href: "/membro/leitura/1" },
                { label: "Comunidade", href: "/comunidade" },
                { label: "Quiz", href: "/recursos/teste" },
                { label: "Recursos", href: "/recursos" },
                { label: "Nos", href: "/membro/nos" },
                { label: "Comprar", href: "/comprar/espelhos" },
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
      )}
    </div>
  );
}
