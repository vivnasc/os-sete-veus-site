"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { professionalCarousels } from "@/data/content-calendar-weeks";
import type { CarouselSlide } from "@/data/content-calendar-weeks";

const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];
const DIMS = { w: 1080, h: 1080 };
const STORY_DIMS = { w: 1080, h: 1920 };

// ─── CAMPAIGN CALENDAR ───────────────────────────────────────────────────────

type DayContent = {
  carouselId?: string;
  whatsapp?: string;
  hook: string;
  storyBg?: string;
};

const CAMPAIGN_START = new Date(2026, 1, 25);

const DAILY_PLAN: DayContent[] = [
  // Semana 1 — Pede o teu código
  { carouselId: "carousel-pede-codigo", hook: "Compraste o livro? Pede o teu código digital gratuito.", storyBg: "/prints/7veuspedircod-portrait.png", whatsapp: `Já tens o livro físico "Os 7 Véus do Despertar"?\n\nAgora existe uma experiência digital que complementa a tua leitura — com diário reflexivo, comunidade anónima e conteúdo exclusivo.\n\nE o melhor: se já compraste o livro, o acesso é gratuito.\n\nPede o teu código aqui: https://seteveus.space/pedir-codigo\n\nDemora menos de 2 minutos. Recebes o código em até 24h.\n\n— Vivianne` },
  { carouselId: "carousel-funil-livro-fisico", hook: "Tens o livro físico? Descobre o que mais te espera.", storyBg: "/prints/7veus-3niveis-portrait.png" },
  { carouselId: "carousel-do-papel-ao-digital", hook: "Do papel ao ecrã. A mesma essência, uma nova forma.", storyBg: "/prints/7veus- incio-portrait.png", whatsapp: `Uma coisa que talvez não saibas:\n\nO livro físico "Os 7 Véus do Despertar" tem uma extensão digital.\n\nNão é uma cópia — é uma experiência diferente. Podes escrever reflexões à medida que lês, guardar pensamentos por capítulo, e participar numa comunidade anónima de leitoras.\n\nSe tens o livro, pede o teu código: https://seteveus.space/pedir-codigo\n\nÉ gratuito. É pessoal. É teu.\n\n— Vivianne` },
  { carouselId: "carousel-3-razoes-digital", hook: "3 razões para activar o teu acesso digital.", storyBg: "/prints/7veus-darkmode-portrait.png" },
  { carouselId: "carousel-tom-intimo", hook: "Uma coisa que talvez não saibas sobre o teu livro.", storyBg: "/prints/7veus-introdeveu-portrait.png", whatsapp: `Antes do fim de semana:\n\nSe compraste "Os 7 Véus do Despertar" e ainda não pediste o teu código digital — este é o momento.\n\nSó precisas de nome, email e (se quiseres) uma foto do livro.\n\nhttps://seteveus.space/pedir-codigo\n\nBom fim de semana. Que o silêncio te encontre.\n\n— Vivianne` },
  { hook: "Descanso. Responder mensagens." },
  { hook: "Descanso." },
  // Semana 2 — O que são Os Sete Véus
  { carouselId: "carousel-o-que-e", hook: "Já sentiste que a vida que tens não foi a que escolheste?", storyBg: "/prints/7veus- incio-portrait.png", whatsapp: `Conheces Os 7 Véus do Despertar?\n\nFiz um teste gratuito — 3 minutos, 7 perguntas — que te mostra qual dos 7 véus mais te influencia neste momento.\n\nNão dá respostas. Dá perguntas.\n\nhttps://seteveus.space/recursos/teste\n\nSe quiseres saber mais: https://seteveus.space\n\n— Vivianne` },
  { carouselId: "carousel-7-veus-resumo", hook: "Os 7 véus que te escondem de ti mesma.", storyBg: "/prints/7veus-dessolucao-portrait.png" },
  { carouselId: "carousel-como-funciona", hook: "Como funciona a experiência digital. 3 passos.", storyBg: "/prints/7veus-3niveis-portrait.png" },
  { carouselId: "carousel-experiencia-vs-livro", hook: "Isto não é um livro. É uma experiência.", storyBg: "/prints/7veus-darkmode-portrait.png" },
  { carouselId: "carousel-experiencia-digital-completa", hook: "O que está dentro da experiência digital?", storyBg: "/prints/dashboard-membro.jpeg", whatsapp: `Para quem já leu ou está a ler Os 7 Véus do Despertar:\n\nSabias que agora podes continuar a experiência no digital? Existe um diário reflexivo por capítulo, uma comunidade anónima de leitoras, e recursos exclusivos.\n\nSe compraste o livro, o acesso é gratuito:\nhttps://seteveus.space/pedir-codigo\n\nSe queres começar a experiência digital:\nhttps://seteveus.space/comprar/espelhos\n\n— Vivianne` },
  { hook: "Descanso." },
  { hook: "Descanso." },
  // Semana 3 — Espelho da Ilusão + testemunhos
  { carouselId: "carousel-espelho-ilusao", hook: "5 frases que mudam a forma como te vês.", storyBg: "/prints/leitura-capitulo.jpeg", whatsapp: `Uma novidade:\n\nO Espelho do Medo está quase pronto. É o segundo véu — e prometo que vai tocar em coisas que reconheces.\n\nSe já tens o livro físico e ainda não pediste o acesso digital, este é o momento ideal. Vais poder acompanhar o lançamento de perto.\n\nhttps://seteveus.space/pedir-codigo\n\n— Vivianne` },
  { carouselId: "carousel-testemunhos", hook: "O que dizem as leitoras.", storyBg: "/prints/comunidade-reflexoes-leitoras.jpeg" },
  { carouselId: "carousel-mae-filha", hook: "Há coisas que uma mãe nunca diz.", storyBg: "/prints/7veus-introdeveu-portrait.png" },
  { carouselId: "carousel-pede-codigo", hook: "Lembrete: pede o teu código digital gratuito.", storyBg: "/prints/7veuspedircod-portrait.png", whatsapp: `Obrigada pelo interesse!\n\nPara pedir o teu código de acesso digital gratuito, é só preencher este formulário:\n\nhttps://seteveus.space/pedir-codigo\n\nDemora menos de 2 minutos. Recebes o código no teu email em até 24h.\n\nQualquer dúvida, diz-me.\n\n— Vivianne` },
  { hook: "Descanso." },
  { hook: "Descanso." },
  { hook: "Descanso." },
  // Semana 4 — Recursos + comunidade + lançamento Espelho do Medo
  { carouselId: "carousel-recursos-gratis", hook: "5 recursos gratuitos para começar a tua jornada.", storyBg: "/prints/quiz-qual-veu.jpeg" },
  { carouselId: "carousel-comunidade-ecos", hook: "Comunidade Ecos — onde as vozes se encontram.", storyBg: "/prints/comunidade-ecos-tabs.jpeg" },
  { carouselId: "carousel-espelho-medo-coming", hook: "Espelho do Medo — em breve.", storyBg: "/images/espelho-medo.png", whatsapp: `Uma novidade:\n\nO Espelho do Medo está quase pronto. É o segundo véu — sobre tudo o que não fazes por medo.\n\nSe já tens o livro físico e ainda não pediste o acesso digital, este é o momento. Vais receber notificação quando lançar.\n\nhttps://seteveus.space/pedir-codigo\n\n— Vivianne` },
  { carouselId: "carousel-funil-livro-fisico", hook: "Tens o livro? O teu livro abre portas que ainda não conheces.", storyBg: "/prints/7veus-3niveis-portrait.png" },
  { carouselId: "carousel-experiencia-digital-completa", hook: "Tour completo: o que inclui o acesso digital.", storyBg: "/prints/experiencia-funcionalidades.jpeg" },
  { hook: "Descanso." },
  { hook: "Descanso." },
];

const DAY_NAMES_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DAY_NAMES_FULL = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const MONTH_NAMES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function getDayIndex(date: Date): number {
  return Math.floor((date.getTime() - CAMPAIGN_START.getTime()) / (1000 * 60 * 60 * 24));
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

// ─── CAPTION GENERATORS ─────────────────────────────────────────────────────

function stripHashtags(text: string): string {
  return text.replace(/\n*#[^\s#]+(\s+#[^\s#]+)*/g, "").trim();
}

function toFacebook(igCaption: string): string {
  const clean = stripHashtags(igCaption);
  if (!clean.includes("seteveus.space")) {
    return clean + "\n\nDescobre mais em seteveus.space";
  }
  return clean;
}

function toTikTok(hook: string, igCaption: string): string {
  const firstLine = igCaption.split("\n")[0];
  return `${firstLine}\n\n${hook}\n\nLink na bio.\n\n#autoconhecimento #livros #booktokmocambique #booktok #seteveus`;
}

// ─── SLIDE RENDERER ──────────────────────────────────────────────────────────

function SlidePreview({ slide, index, scale, dims }: {
  slide: CarouselSlide; index: number; scale: number; dims?: { w: number; h: number };
}) {
  const d = dims || DIMS;
  return (
    <div className="relative overflow-hidden" style={{
      width: d.w, height: d.h,
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

// Story text version — 9:16 with first slide content
function StoryTextPreview({ slide, scale }: { slide: CarouselSlide; scale: number }) {
  return (
    <div className="relative overflow-hidden" style={{
      width: STORY_DIMS.w, height: STORY_DIMS.h,
      transform: `scale(${scale})`, transformOrigin: "top left",
      backgroundColor: slide.bg, color: slide.text,
    }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "120px 80px", textAlign: "center" }}>
        {slide.title && (
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 52,
            lineHeight: 1.25, fontWeight: 700, whiteSpace: "pre-line", margin: 0 }}>{slide.title}</h2>
        )}
        {slide.title && slide.body && (
          <div style={{ width: 60, height: 2, backgroundColor: slide.accent, opacity: 0.5, margin: "40px auto" }} />
        )}
        {slide.body && (
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, lineHeight: 1.7,
            fontWeight: 300, whiteSpace: "pre-line", margin: 0, opacity: 0.85 }}>{slide.body}</p>
        )}
      </div>
      {slide.footer && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 80px 80px", textAlign: "center" }}>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 18, fontWeight: 500,
            letterSpacing: "0.08em", textTransform: "uppercase", color: slide.accent, margin: 0 }}>{slide.footer}</p>
        </div>
      )}
      <img src="/images/mandala-7veus.png" alt="" crossOrigin="anonymous"
        style={{ position: "absolute", right: 40, top: 40, width: 80, height: 80, opacity: 0.12, objectFit: "contain" }} />
    </div>
  );
}

// Story mockup version — 9:16 with device screenshot
function StoryMockupPreview({ bgImage, title, scale }: { bgImage: string; title: string; scale: number }) {
  return (
    <div className="relative overflow-hidden" style={{
      width: STORY_DIMS.w, height: STORY_DIMS.h,
      transform: `scale(${scale})`, transformOrigin: "top left",
      backgroundColor: "#2a2420",
    }}>
      {/* Screenshot as background */}
      <img src={bgImage} alt="" crossOrigin="anonymous"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3, filter: "blur(20px)" }} />
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(42,36,32,0.7) 0%, rgba(42,36,32,0.4) 40%, rgba(42,36,32,0.7) 100%)" }} />
      {/* Phone frame with screenshot */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
        width: 660, height: 1320, borderRadius: 48, overflow: "hidden",
        border: "6px solid rgba(255,255,255,0.15)", boxShadow: "0 40px 100px rgba(0,0,0,0.5)" }}>
        <img src={bgImage} alt="" crossOrigin="anonymous"
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      {/* Title overlay at top */}
      <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center", padding: "0 60px" }}>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 18, fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase", color: "#c9b896", margin: 0 }}>
          Os Sete Véus
        </p>
      </div>
      {/* CTA at bottom */}
      <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, textAlign: "center", padding: "0 60px" }}>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28,
          lineHeight: 1.3, color: "#f7f5f0", margin: 0 }}>{title}</p>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, fontWeight: 500,
          color: "#c9b896", marginTop: 16, letterSpacing: "0.05em" }}>seteveus.space</p>
      </div>
      <img src="/images/mandala-7veus.png" alt="" crossOrigin="anonymous"
        style={{ position: "absolute", right: 40, top: 40, width: 72, height: 72, opacity: 0.1, objectFit: "contain" }} />
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function MarketingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const storyTextRef = useRef<HTMLDivElement | null>(null);
  const storyMockupRef = useRef<HTMLDivElement | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [activeSlide, setActiveSlide] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [exportingStory, setExportingStory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openCaption, setOpenCaption] = useState<string | null>(null);

  const today = useMemo(() => new Date(), []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
      </div>
    );
  }
  if (!user) { router.push("/entrar"); return null; }
  if (!AUTHOR_EMAILS.includes(user.email || "")) { router.push("/membro"); return null; }

  const weekStart = getWeekStart(selectedDate);
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const dayIdx = getDayIndex(selectedDate);
  const dayContent = dayIdx >= 0 && dayIdx < DAILY_PLAN.length ? DAILY_PLAN[dayIdx] : null;
  const carousel = dayContent?.carouselId
    ? professionalCarousels.find((c) => c.id === dayContent.carouselId)
    : null;

  const postScale = 320 / DIMS.h;
  const storyScale = 180 / STORY_DIMS.h;

  async function copyText(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const exportAll = useCallback(async () => {
    if (!carousel) return;
    setExporting(true);
    const { toPng } = await import("html-to-image");
    for (let i = 0; i < carousel.slides.length; i++) {
      const wrapper = slideRefs.current[i];
      if (!wrapper) continue;
      const el = (wrapper.firstElementChild as HTMLElement) || wrapper;
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

  async function exportStory(ref: React.RefObject<HTMLDivElement | null>, name: string, dims = STORY_DIMS) {
    const wrapper = ref.current;
    if (!wrapper) return;
    const el = (wrapper.firstElementChild as HTMLElement) || wrapper;
    setExportingStory(name);
    const orig = { t: el.style.transform, w: el.style.width, h: el.style.height };
    el.style.transform = "none";
    el.style.width = `${dims.w}px`;
    el.style.height = `${dims.h}px`;
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(el, { width: dims.w, height: dims.h, pixelRatio: 1, cacheBust: true });
      const a = document.createElement("a");
      a.download = `story-${name}.png`;
      a.href = dataUrl;
      a.click();
    } catch { /* skip */ }
    el.style.transform = orig.t;
    el.style.width = orig.w;
    el.style.height = orig.h;
    setExportingStory(null);
  }

  function prevWeek() {
    setSelectedDate((prev) => { const d = new Date(prev); d.setDate(d.getDate() - 7); return d; });
    setActiveSlide(0);
  }
  function nextWeek() {
    setSelectedDate((prev) => { const d = new Date(prev); d.setDate(d.getDate() + 7); return d; });
    setActiveSlide(0);
  }
  function selectDay(d: Date) {
    setSelectedDate(d);
    setActiveSlide(0);
    setOpenCaption(null);
  }

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  // Per-platform captions
  const igCaption = carousel?.caption || "";
  const fbCaption = toFacebook(igCaption);
  const waCaption = dayContent?.whatsapp || stripHashtags(igCaption).replace(/seteveus\.space/g, "https://seteveus.space");
  const tkCaption = toTikTok(dayContent?.hook || "", igCaption);

  const platformCaptions = [
    { id: "ig", label: "Instagram", caption: igCaption, color: "#E1306C" },
    { id: "fb", label: "Facebook", caption: fbCaption, color: "#1877F2" },
    { id: "wa", label: "WhatsApp", caption: waCaption, color: "#25D366" },
    { id: "tk", label: "TikTok / Reels", caption: tkCaption, color: "#000000" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-[#c9b896]/20 bg-gradient-to-r from-brown-900 to-brown-800 px-4 py-4">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link href="/admin" className="font-sans text-xs text-[#c9b896]/70 hover:text-[#c9b896]">
            &larr; Painel
          </Link>
          <p className="font-serif text-sm font-medium tracking-wide text-cream">Conteúdo Pronto</p>
          <Link href="/painel/marketing/gerador"
            className="rounded-lg bg-[#c9b896] px-3 py-1.5 font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-brown-900 hover:bg-[#b8a785]">
            Criar Imagem
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pb-8">
        {/* Date header */}
        <div className="py-5">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gradient-to-r from-[#c9b896] to-[#b8a785] px-3 py-1 font-serif text-[0.6rem] font-medium tracking-wide text-brown-900">
              Os Sete Véus
            </span>
          </div>
          <p className="mt-2 font-serif text-lg text-brown-900">
            {DAY_NAMES_FULL[selectedDate.getDay()]}, {selectedDate.getDate()} de {MONTH_NAMES[selectedDate.getMonth()]}
          </p>
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
              <div className="mb-5 rounded-2xl bg-gradient-to-r from-[#c9b896]/10 to-transparent p-4">
                <p className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-[#c9b896]">
                  Post do Dia
                </p>
                <h2 className="mt-2 font-serif text-xl leading-snug text-brown-900">{dayContent.hook}</h2>
              </div>

              {/* ── Post image (1:1) ── */}
              <div className="rounded-2xl border border-brown-100 bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-[#c9b896]">
                    Imagem Pronta
                  </p>
                  <span className="rounded bg-brown-100 px-2 py-0.5 font-sans text-[0.55rem] font-semibold text-brown-500">
                    1:1
                  </span>
                </div>

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

                <div className="mx-auto overflow-hidden rounded-xl"
                  style={{ width: DIMS.w * postScale, height: DIMS.h * postScale }}>
                  {carousel.slides.map((slide, i) => (
                    <div key={i} style={{ display: activeSlide === i ? "block" : "none" }}>
                      <div ref={(el) => { slideRefs.current[i] = el; }}>
                        <SlidePreview slide={slide} index={i} scale={postScale} />
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={exportAll} disabled={exporting}
                  className={`mt-4 w-full rounded-xl bg-brown-900 py-3 font-sans text-sm font-medium text-cream transition-colors hover:bg-brown-800 ${exporting ? "opacity-60" : ""}`}>
                  {exporting ? "A descarregar..." : `Descarregar ${carousel.slides.length} imagens`}
                </button>
              </div>

              {/* ── Stories (9:16) ── */}
              <div className="mt-4 rounded-2xl border border-brown-100 bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-[#c9b896]">
                      Stories — 2 Versões
                    </p>
                  </div>
                  <span className="rounded bg-brown-100 px-2 py-0.5 font-sans text-[0.55rem] font-semibold text-brown-500">
                    9:16
                  </span>
                </div>

                <div className="flex gap-3">
                  {/* Story version 1: Text */}
                  <div className="flex-1">
                    <div className="overflow-hidden rounded-xl"
                      style={{ width: STORY_DIMS.w * storyScale, height: STORY_DIMS.h * storyScale, margin: "0 auto" }}>
                      <div ref={storyTextRef}>
                        <StoryTextPreview slide={carousel.slides[0]} scale={storyScale} />
                      </div>
                    </div>
                    <button onClick={() => exportStory(storyTextRef, "texto")}
                      disabled={exportingStory === "texto"}
                      className="mt-2 w-full rounded-lg bg-brown-900 py-2 font-sans text-[0.6rem] font-medium text-cream hover:bg-brown-800">
                      {exportingStory === "texto" ? "..." : "Descarregar"}
                    </button>
                  </div>

                  {/* Story version 2: Mockup */}
                  <div className="flex-1">
                    <div className="overflow-hidden rounded-xl"
                      style={{ width: STORY_DIMS.w * storyScale, height: STORY_DIMS.h * storyScale, margin: "0 auto" }}>
                      <div ref={storyMockupRef}>
                        {dayContent.storyBg ? (
                          <StoryMockupPreview
                            bgImage={dayContent.storyBg}
                            title={carousel.slides[0]?.title?.split("\n")[0] || dayContent.hook}
                            scale={storyScale}
                          />
                        ) : (
                          <StoryTextPreview slide={{
                            ...carousel.slides[0],
                            bg: "#2a2420",
                            text: "#f7f5f0",
                            accent: "#c9b896",
                          }} scale={storyScale} />
                        )}
                      </div>
                    </div>
                    <button onClick={() => exportStory(storyMockupRef, "mockup")}
                      disabled={exportingStory === "mockup"}
                      className="mt-2 w-full rounded-lg bg-brown-900 py-2 font-sans text-[0.6rem] font-medium text-cream hover:bg-brown-800">
                      {exportingStory === "mockup" ? "..." : "Descarregar"}
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Legendas prontas ── */}
              <div className="mt-4 rounded-2xl border border-brown-100 bg-white p-4">
                <div className="mb-3">
                  <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#c9b896]">
                    Legendas Prontas
                  </p>
                  <p className="mt-0.5 font-sans text-[0.6rem] text-brown-400">
                    Toca para copiar o texto de cada rede
                  </p>
                </div>

                <div className="space-y-1">
                  {platformCaptions.map((p) => (
                    <div key={p.id} className="overflow-hidden rounded-xl border border-brown-50">
                      <button
                        onClick={() => setOpenCaption(openCaption === p.id ? null : p.id)}
                        className="flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors hover:bg-cream/40"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                          <span className="font-sans text-xs font-medium text-brown-700">{p.label}</span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); copyText(p.id, p.caption); }}
                          className="rounded-lg px-3 py-1 font-sans text-[0.6rem] font-medium text-white transition-colors"
                          style={{ backgroundColor: copiedId === p.id ? "#7a8c6e" : p.color }}
                        >
                          {copiedId === p.id ? "Copiada!" : "Copiar"}
                        </button>
                      </button>
                      {openCaption === p.id && (
                        <div className="border-t border-brown-50 bg-cream/30 px-3 py-2.5">
                          <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap font-sans text-[0.7rem] leading-relaxed text-brown-600">
                            {p.caption}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : dayContent ? (
            <div className="rounded-2xl border border-brown-100 bg-white p-8 text-center">
              <p className="font-serif text-base text-brown-400">{dayContent.hook}</p>
              <p className="mt-2 font-sans text-xs text-brown-300">Sem post agendado para hoje.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-brown-100 bg-white p-8 text-center">
              <p className="font-serif text-base text-brown-400">Fora do calendário de campanha.</p>
              <p className="mt-2 font-sans text-xs text-brown-300">
                A campanha vai de 25 Fev a 25 Mar.
              </p>
            </div>
          )}
        </div>

        {/* Todos os posts */}
        <div className="mt-8">
          <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#c9b896]">
            Todos os Posts ({professionalCarousels.length})
          </p>
          <div className="mt-3 space-y-2">
            {professionalCarousels.map((c) => (
              <button key={c.id} onClick={() => {
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
