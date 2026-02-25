"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toPng } from "html-to-image";
import { professionalCarousels } from "@/data/content-calendar-weeks";
import type { CarouselSlide } from "@/data/content-calendar-weeks";

const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];
const DIMS = { w: 1080, h: 1080 };

// ─── CAMPAIGN CALENDAR ───────────────────────────────────────────────────────

type DayContent = {
  carouselId?: string;
  whatsapp?: string;
  hook: string;
};

// 4 weeks starting Feb 25 2026. Each day has a carousel and/or WhatsApp message.
const CAMPAIGN_START = new Date(2026, 1, 25); // Feb 25

const DAILY_PLAN: DayContent[] = [
  // Semana 1 — Pede o teu codigo
  { carouselId: "carousel-pede-codigo", hook: "Compraste o livro? Pede o teu codigo digital gratuito.", whatsapp: `Ja tens o livro fisico "Os 7 Veus do Despertar"?\n\nAgora existe uma experiencia digital que complementa a tua leitura — com diario reflexivo, comunidade anonima e conteudo exclusivo.\n\nE o melhor: se ja compraste o livro, o acesso e gratuito.\n\nPede o teu codigo aqui: https://seteveus.space/pedir-codigo\n\nDemora menos de 2 minutos. Recebes o codigo em ate 24h.\n\n— Vivianne` },
  { carouselId: "carousel-funil-livro-fisico", hook: "Tens o livro fisico? Descobre o que mais te espera." },
  { carouselId: "carousel-do-papel-ao-digital", hook: "Do papel ao ecra. A mesma essencia, uma nova forma.", whatsapp: `Uma coisa que talvez nao saibas:\n\nO livro fisico "Os 7 Veus do Despertar" tem uma extensao digital.\n\nNao e uma copia — e uma experiencia diferente. Podes escrever reflexoes a medida que les, guardar pensamentos por capitulo, e participar numa comunidade anonima de leitoras.\n\nSe tens o livro, pede o teu codigo: https://seteveus.space/pedir-codigo\n\nE gratuito. E pessoal. E teu.\n\n— Vivianne` },
  { carouselId: "carousel-3-razoes-digital", hook: "3 razoes para activar o teu acesso digital." },
  { carouselId: "carousel-tom-intimo", hook: "Uma coisa que talvez nao saibas sobre o teu livro.", whatsapp: `Antes do fim de semana:\n\nSe compraste "Os 7 Veus do Despertar" e ainda nao pediste o teu codigo digital — este e o momento.\n\nSo precisas de nome, email e (se quiseres) uma foto do livro.\n\nhttps://seteveus.space/pedir-codigo\n\nBom fim de semana. Que o silencio te encontre.\n\n— Vivianne` },
  { hook: "Descanso. Responder mensagens." },
  { hook: "Descanso." },
  // Semana 2 — O que sao Os Sete Veus
  { carouselId: "carousel-o-que-e", hook: "Ja sentiste que a vida que tens nao foi a que escolheste?", whatsapp: `Conheces Os 7 Veus do Despertar?\n\nFiz um teste gratuito — 3 minutos, 7 perguntas — que te mostra qual dos 7 veus mais te influencia neste momento.\n\nNao da respostas. Da perguntas.\n\nhttps://seteveus.space/recursos/teste\n\nSe quiseres saber mais: https://seteveus.space\n\n— Vivianne` },
  { carouselId: "carousel-7-veus-resumo", hook: "Os 7 veus que te escondem de ti mesma." },
  { carouselId: "carousel-como-funciona", hook: "Como funciona a experiencia digital. 3 passos." },
  { carouselId: "carousel-experiencia-vs-livro", hook: "Isto nao e um livro. E uma experiencia." },
  { carouselId: "carousel-experiencia-digital-completa", hook: "O que esta dentro da experiencia digital?", whatsapp: `Para quem ja leu ou esta a ler Os 7 Veus do Despertar:\n\nSabias que agora podes continuar a experiencia no digital? Existe um diario reflexivo por capitulo, uma comunidade anonima de leitoras, e recursos exclusivos.\n\nSe compraste o livro, o acesso e gratuito:\nhttps://seteveus.space/pedir-codigo\n\nSe queres comecar a experiencia digital:\nhttps://seteveus.space/comprar/espelhos\n\n— Vivianne` },
  { hook: "Descanso." },
  { hook: "Descanso." },
  // Semana 3 — Espelho da Ilusao + testemunhos
  { carouselId: "carousel-espelho-ilusao", hook: "5 frases que mudam a forma como te ves.", whatsapp: `Uma novidade:\n\nO Espelho do Medo esta quase pronto. E o segundo veu — e prometo que vai tocar em coisas que reconheces.\n\nSe ja tens o livro fisico e ainda nao pediste o acesso digital, este e o momento ideal. Vais poder acompanhar o lancamento de perto.\n\nhttps://seteveus.space/pedir-codigo\n\n— Vivianne` },
  { carouselId: "carousel-testemunhos", hook: "O que dizem as leitoras." },
  { carouselId: "carousel-mae-filha", hook: "Ha coisas que uma mae nunca diz." },
  { carouselId: "carousel-pede-codigo", hook: "Lembrete: pede o teu codigo digital gratuito.", whatsapp: `Obrigada pelo interesse!\n\nPara pedir o teu codigo de acesso digital gratuito, e so preencher este formulario:\n\nhttps://seteveus.space/pedir-codigo\n\nDemora menos de 2 minutos. Recebes o codigo no teu email em ate 24h.\n\nQualquer duvida, diz-me.\n\n— Vivianne` },
  { hook: "Descanso." },
  { hook: "Descanso." },
  { hook: "Descanso." },
  // Semana 4 — Recursos + comunidade + lancamento Espelho do Medo
  { carouselId: "carousel-recursos-gratis", hook: "5 recursos gratuitos para comecar a tua jornada." },
  { carouselId: "carousel-comunidade-ecos", hook: "Comunidade Ecos — onde as vozes se encontram." },
  { carouselId: "carousel-espelho-medo-coming", hook: "Espelho do Medo — em breve.", whatsapp: `Uma novidade:\n\nO Espelho do Medo esta quase pronto. E o segundo veu — sobre tudo o que nao fazes por medo.\n\nSe ja tens o livro fisico e ainda nao pediste o acesso digital, este e o momento. Vais receber notificacao quando lancar.\n\nhttps://seteveus.space/pedir-codigo\n\n— Vivianne` },
  { carouselId: "carousel-funil-livro-fisico", hook: "Tens o livro? O teu livro abre portas que ainda nao conheces." },
  { carouselId: "carousel-experiencia-digital-completa", hook: "Tour completo: o que inclui o acesso digital." },
  { hook: "Descanso." },
  { hook: "Descanso." },
];

const DAY_NAMES_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const DAY_NAMES_FULL = ["Domingo", "Segunda-feira", "Terca-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sabado"];
const MONTH_NAMES = ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function getDayIndex(date: Date): number {
  const diff = Math.floor((date.getTime() - CAMPAIGN_START.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

// ─── SLIDE RENDERER ──────────────────────────────────────────────────────────

function SlidePreview({ slide, index, scale }: {
  slide: CarouselSlide; index: number; scale: number;
}) {
  return (
    <div className="relative overflow-hidden" style={{
      width: DIMS.w, height: DIMS.h,
      transform: `scale(${scale})`, transformOrigin: "top left",
      backgroundColor: slide.bg, color: slide.text,
    }}>
      {slide.bgImage && (
        <>
          <img src={slide.bgImage} alt="" crossOrigin="anonymous"
            className="absolute inset-0 h-full w-full object-cover" style={{ filter: "blur(30px)" }} />
          <div className="absolute inset-0" style={{ backgroundColor: slide.bg, opacity: 0.75 }} />
        </>
      )}
      <div style={{ position: "absolute", left: 40, top: 40, width: 56, height: 56, borderRadius: "50%",
        backgroundColor: slide.accent + "30", color: slide.accent, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: "system-ui, sans-serif", fontSize: 22, fontWeight: 700 }}>
        {index + 1}
      </div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "80px 72px" }}>
        {slide.title && (
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 42,
            lineHeight: 1.2, fontWeight: 700, whiteSpace: "pre-line", margin: 0 }}>{slide.title}</h2>
        )}
        {slide.title && slide.body && (
          <div style={{ width: "15%", height: 2, backgroundColor: slide.accent, opacity: 0.5, margin: "32px 0" }} />
        )}
        {slide.body && (
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 20, lineHeight: 1.65,
            fontWeight: 300, whiteSpace: "pre-line", margin: 0, opacity: 0.85 }}>{slide.body}</p>
        )}
      </div>
      {slide.footer && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 72px 48px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, fontWeight: 500,
              letterSpacing: "0.08em", textTransform: "uppercase", color: slide.accent, margin: 0 }}>{slide.footer}</p>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 28, opacity: 0.3, color: slide.accent }}>~</span>
          </div>
        </div>
      )}
      <img src="/images/mandala-7veus.png" alt="" crossOrigin="anonymous"
        style={{ position: "absolute", right: 30, top: 30, width: 64, height: 64, opacity: 0.15, objectFit: "contain" }} />
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function MarketingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [activeSlide, setActiveSlide] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const today = useMemo(() => new Date(), []);

  // Auth
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
      </div>
    );
  }
  if (!user) { router.push("/entrar"); return null; }
  if (!AUTHOR_EMAILS.includes(user.email || "")) { router.push("/membro"); return null; }

  // Current week dates
  const weekStart = getWeekStart(selectedDate);
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  // Selected day content
  const dayIdx = getDayIndex(selectedDate);
  const dayContent = dayIdx >= 0 && dayIdx < DAILY_PLAN.length ? DAILY_PLAN[dayIdx] : null;
  const carousel = dayContent?.carouselId
    ? professionalCarousels.find((c) => c.id === dayContent.carouselId)
    : null;

  const scale = 320 / DIMS.h;

  async function copyText(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const exportAll = useCallback(async () => {
    if (!carousel) return;
    setExporting(true);
    for (let i = 0; i < carousel.slides.length; i++) {
      const el = slideRefs.current[i];
      if (!el) continue;
      const orig = { t: el.style.transform, w: el.style.width, h: el.style.height };
      el.style.transform = "none";
      el.style.width = `${DIMS.w}px`;
      el.style.height = `${DIMS.h}px`;
      try {
        const dataUrl = await toPng(el, { width: DIMS.w, height: DIMS.h, pixelRatio: 1, cacheBust: true });
        const a = document.createElement("a");
        a.download = `${carousel.id}-slide-${i + 1}.png`;
        a.href = dataUrl;
        a.click();
      } catch { /* skip */ }
      el.style.transform = orig.t;
      el.style.width = orig.w;
      el.style.height = orig.h;
      await new Promise((r) => setTimeout(r, 400));
    }
    setExporting(false);
  }, [carousel]);

  function prevWeek() {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 7);
    setSelectedDate(d);
    setActiveSlide(0);
  }
  function nextWeek() {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 7);
    setSelectedDate(d);
    setActiveSlide(0);
  }
  function selectDay(d: Date) {
    setSelectedDate(d);
    setActiveSlide(0);
  }

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-brown-100 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link href="/admin" className="font-sans text-sm text-brown-400 hover:text-brown-700">
            &larr; Painel
          </Link>
          <Link href="/painel/marketing/gerador"
            className="rounded-lg bg-sage px-3 py-1.5 font-sans text-xs font-medium text-white hover:bg-sage-dark">
            Criar imagem
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pb-8">
        {/* Date header */}
        <div className="py-5">
          <p className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-brown-400">
            {DAY_NAMES_FULL[selectedDate.getDay()]}, {selectedDate.getDate()} de {MONTH_NAMES[selectedDate.getMonth()]}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-full bg-brown-900 px-2 py-0.5 font-sans text-[0.5rem] font-medium text-cream">
              Os Sete Veus
            </span>
          </div>
        </div>

        {/* Week calendar */}
        <div className="flex items-center gap-1">
          <button onClick={prevWeek} className="p-1 text-brown-300 hover:text-brown-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div className="flex flex-1 justify-between">
            {weekDates.map((d) => {
              const idx = getDayIndex(d);
              const hasContent = idx >= 0 && idx < DAILY_PLAN.length && DAILY_PLAN[idx].carouselId;
              const isToday = isSameDay(d, today);
              const isSelected = isSameDay(d, selectedDate);

              return (
                <button key={d.toISOString()} onClick={() => selectDay(d)}
                  className={`flex flex-col items-center rounded-xl px-2 py-2 transition-all ${
                    isSelected ? "bg-brown-900 text-cream" : "text-brown-400 hover:bg-brown-50"
                  }`}>
                  <span className="font-sans text-[0.55rem] font-medium uppercase">
                    {DAY_NAMES_SHORT[d.getDay()]}
                  </span>
                  <span className={`mt-0.5 font-sans text-lg font-semibold ${isSelected ? "text-cream" : "text-brown-700"}`}>
                    {d.getDate()}
                  </span>
                  {/* Dot indicator */}
                  <div className="mt-1 h-1.5 w-1.5 rounded-full" style={{
                    backgroundColor: hasContent ? (isSelected ? "#ebe7df" : "#7a8c6e") : "transparent",
                  }} />
                  {isToday && !isSelected && (
                    <div className="mt-0.5 h-0.5 w-3 rounded-full bg-sage" />
                  )}
                </button>
              );
            })}
          </div>
          <button onClick={nextWeek} className="p-1 text-brown-300 hover:text-brown-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        {/* Day content */}
        <div className="mt-6">
          {dayContent && carousel ? (
            <>
              {/* Hook */}
              <div className="mb-4">
                <p className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-sage">
                  Os Sete Veus — Post do dia
                </p>
                <h2 className="mt-1 font-serif text-lg text-brown-900">{dayContent.hook}</h2>
              </div>

              {/* Post image */}
              <div className="rounded-2xl border border-brown-100 bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-sans text-[0.6rem] font-medium text-brown-400">
                    Imagem pronta — descarrega e publica
                  </p>
                  <span className="rounded bg-brown-100 px-2 py-0.5 font-sans text-[0.55rem] font-semibold text-brown-500">
                    1:1
                  </span>
                </div>

                {/* Slide tabs */}
                {carousel.slides.length > 1 && (
                  <div className="mb-3 flex gap-1 overflow-x-auto">
                    {carousel.slides.map((_, i) => (
                      <button key={i} onClick={() => setActiveSlide(i)}
                        className={`shrink-0 rounded-lg px-2.5 py-1 font-sans text-[0.6rem] transition-all ${
                          activeSlide === i ? "bg-brown-900 text-cream" : "bg-brown-50 text-brown-400"
                        }`}>
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}

                {/* Slide image */}
                <div className="mx-auto overflow-hidden rounded-xl"
                  style={{ width: DIMS.w * scale, height: DIMS.h * scale }}>
                  {carousel.slides.map((slide, i) => (
                    <div key={i} style={{ display: activeSlide === i ? "block" : "none" }}>
                      <div ref={(el) => { slideRefs.current[i] = el; }}>
                        <SlidePreview slide={slide} index={i} scale={scale} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Download button */}
                <button onClick={exportAll} disabled={exporting}
                  className={`mt-4 w-full rounded-xl bg-brown-900 py-3 font-sans text-sm font-medium text-cream transition-colors hover:bg-brown-800 ${exporting ? "opacity-60" : ""}`}>
                  {exporting ? "A descarregar..." : `Descarregar ${carousel.slides.length} imagens`}
                </button>
              </div>

              {/* Caption */}
              <div className="mt-4 rounded-2xl border border-brown-100 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-brown-400">
                    Legenda Instagram
                  </p>
                  <button onClick={() => copyText("caption", carousel.caption)}
                    className="rounded-lg bg-brown-900 px-3 py-1.5 font-sans text-[0.6rem] font-medium text-cream hover:bg-brown-800">
                    {copiedId === "caption" ? "Copiada!" : "Copiar"}
                  </button>
                </div>
                <pre className="mt-2 max-h-40 overflow-y-auto whitespace-pre-wrap font-sans text-[0.75rem] leading-relaxed text-brown-600">
                  {carousel.caption}
                </pre>
              </div>

              {/* WhatsApp message */}
              {dayContent.whatsapp && (
                <div className="mt-4 rounded-2xl border border-[#25D366]/20 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-[#25D366]">
                      WhatsApp
                    </p>
                    <button onClick={() => copyText("whatsapp", dayContent.whatsapp!)}
                      className="rounded-lg bg-[#25D366] px-3 py-1.5 font-sans text-[0.6rem] font-medium text-white hover:bg-[#22c55e]">
                      {copiedId === "whatsapp" ? "Copiada!" : "Copiar"}
                    </button>
                  </div>
                  <pre className="mt-2 max-h-40 overflow-y-auto whitespace-pre-wrap font-sans text-[0.75rem] leading-relaxed text-brown-600">
                    {dayContent.whatsapp}
                  </pre>
                </div>
              )}
            </>
          ) : dayContent ? (
            <div className="rounded-2xl border border-brown-100 bg-white p-8 text-center">
              <p className="font-serif text-base text-brown-400">{dayContent.hook}</p>
              <p className="mt-2 font-sans text-xs text-brown-300">Sem post agendado para hoje.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-brown-100 bg-white p-8 text-center">
              <p className="font-serif text-base text-brown-400">Fora do calendario de campanha.</p>
              <p className="mt-2 font-sans text-xs text-brown-300">
                A campanha vai de 25 Fev a 25 Mar.
              </p>
            </div>
          )}
        </div>

        {/* Todos os posts (quick access) */}
        <div className="mt-8">
          <p className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-brown-400">
            Todos os posts ({professionalCarousels.length})
          </p>
          <div className="mt-3 space-y-2">
            {professionalCarousels.map((c) => (
              <button key={c.id} onClick={() => {
                // Find the first day that uses this carousel
                const idx = DAILY_PLAN.findIndex((d) => d.carouselId === c.id);
                if (idx >= 0) {
                  const d = new Date(CAMPAIGN_START);
                  d.setDate(d.getDate() + idx);
                  selectDay(d);
                }
              }}
                className="flex w-full items-center gap-3 rounded-xl border border-brown-100 bg-white p-3 text-left transition-colors hover:bg-cream/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg"
                  style={{ backgroundColor: c.slides[0]?.bg || "#3d3630" }}>
                  <span className="font-serif text-[0.5rem] leading-tight" style={{ color: c.slides[0]?.text || "#f7f5f0" }}>
                    {c.slides[0]?.title?.split("\n")[0]?.slice(0, 12)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-sans text-xs font-medium text-brown-700">{c.title}</p>
                  <p className="font-sans text-[0.6rem] text-brown-400">{c.slides.length} slides</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
