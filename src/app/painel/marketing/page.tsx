"use client";

import { useState, useRef, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toPng } from "html-to-image";
import { professionalCarousels } from "@/data/content-calendar-weeks";
import type { CarouselSlide } from "@/data/content-calendar-weeks";

const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];

// ─── WHATSAPP MESSAGES (ready to copy-paste) ─────────────────────────────────

const WHATSAPP_MESSAGES = [
  {
    label: "Anuncio principal",
    message: `Ja tens o livro fisico "Os 7 Veus do Despertar"?

Agora existe uma experiencia digital que complementa a tua leitura — com diario reflexivo, comunidade anonima e conteudo exclusivo.

E o melhor: se ja compraste o livro, o acesso e gratuito.

Pede o teu codigo aqui: https://seteveus.space/pedir-codigo

Demora menos de 2 minutos. Recebes o codigo em ate 24h.

— Vivianne`,
  },
  {
    label: "Tom pessoal",
    message: `Uma coisa que talvez nao saibas:

O livro fisico "Os 7 Veus do Despertar" tem uma extensao digital.

Nao e uma copia — e uma experiencia diferente. Podes escrever reflexoes a medida que les, guardar pensamentos por capitulo, e participar numa comunidade anonima de leitoras que tambem estao a atravessar os veus.

Se tens o livro, pede o teu codigo: https://seteveus.space/pedir-codigo

E gratuito. E pessoal. E teu.

— Vivianne`,
  },
  {
    label: "Lembrete fim de semana",
    message: `Antes do fim de semana:

Se compraste "Os 7 Veus do Despertar" e ainda nao pediste o teu codigo digital — este e o momento.

So precisas de nome, email e (se quiseres) uma foto do livro.

https://seteveus.space/pedir-codigo

Bom fim de semana. Que o silencio te encontre.

— Vivianne`,
  },
  {
    label: "Resposta a quem pergunta",
    message: `Obrigada pelo interesse!

Para pedir o teu codigo de acesso digital gratuito, e so preencher este formulario:

https://seteveus.space/pedir-codigo

Demora menos de 2 minutos. Recebes o codigo no teu email em ate 24h.

Qualquer duvida, diz-me.

— Vivianne`,
  },
  {
    label: "Novo espelho a caminho",
    message: `Uma novidade:

O Espelho do Medo esta quase pronto. E o segundo veu — e prometo que vai tocar em coisas que reconheces.

Se ja tens o livro fisico e ainda nao pediste o acesso digital, este e o momento ideal. Vais poder acompanhar o lancamento de perto.

https://seteveus.space/pedir-codigo

— Vivianne`,
  },
  {
    label: "Convite teste gratuito",
    message: `Conheces Os 7 Veus do Despertar?

Fiz um teste gratuito — 3 minutos, 7 perguntas — que te mostra qual dos 7 veus mais te influencia neste momento.

Nao da respostas. Da perguntas.

https://seteveus.space/recursos/teste

Se quiseres saber mais: https://seteveus.space

— Vivianne`,
  },
  {
    label: "Para quem ja leu o livro",
    message: `Para quem ja leu ou esta a ler Os 7 Veus do Despertar:

Sabias que agora podes continuar a experiencia no digital? Existe um diario reflexivo por capitulo, uma comunidade anonima de leitoras, e recursos exclusivos.

Se compraste o livro, o acesso e gratuito:
https://seteveus.space/pedir-codigo

Se queres comecar a experiencia digital:
https://seteveus.space/comprar/espelhos

— Vivianne`,
  },
];

// ─── CAMPAIGN GROUPS (organize carousels) ────────────────────────────────────

type CampaignGroup = {
  label: string;
  ids: string[];
};

const CAMPAIGN_GROUPS: CampaignGroup[] = [
  {
    label: "Pede o teu codigo",
    ids: ["carousel-pede-codigo", "carousel-funil-livro-fisico", "carousel-do-papel-ao-digital", "carousel-3-razoes-digital", "carousel-tom-intimo", "carousel-experiencia-digital-completa"],
  },
  {
    label: "O que sao Os Sete Veus",
    ids: ["carousel-o-que-e", "carousel-7-veus-resumo", "carousel-como-funciona", "carousel-experiencia-vs-livro"],
  },
  {
    label: "Espelho da Ilusao",
    ids: ["carousel-espelho-ilusao", "carousel-mae-filha", "carousel-testemunhos"],
  },
  {
    label: "Recursos e comunidade",
    ids: ["carousel-recursos-gratis", "carousel-comunidade-ecos", "carousel-espelho-medo-coming"],
  },
];

// ─── SLIDE RENDERER (for export) ─────────────────────────────────────────────

const DIMS = { w: 1080, h: 1080 };

function SlidePreview({ slide, index, dim, scale }: {
  slide: CarouselSlide; index: number; dim: { w: number; h: number }; scale: number;
}) {
  const titleSize = 42;
  const bodySize = 20;
  const footerSize = 16;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: dim.w,
        height: dim.h,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        backgroundColor: slide.bg,
        color: slide.text,
      }}
    >
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
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: titleSize,
            lineHeight: 1.2, fontWeight: 700, whiteSpace: "pre-line", margin: 0 }}>{slide.title}</h2>
        )}
        {slide.title && slide.body && (
          <div style={{ width: "15%", height: 2, backgroundColor: slide.accent, opacity: 0.5, margin: "32px 0" }} />
        )}
        {slide.body && (
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: bodySize, lineHeight: 1.65,
            fontWeight: 300, whiteSpace: "pre-line", margin: 0, opacity: 0.85 }}>{slide.body}</p>
        )}
      </div>
      {slide.footer && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 72px 48px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: footerSize, fontWeight: 500,
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

// ─── POST CARD (main UI element) ─────────────────────────────────────────────

function PostCard({ carousel, copiedId, onCopy }: {
  carousel: typeof professionalCarousels[0];
  copiedId: string | null;
  onCopy: (id: string, text: string) => void;
}) {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [exporting, setExporting] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const scale = 280 / DIMS.h;

  const exportAll = useCallback(async () => {
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

  return (
    <div className="overflow-hidden rounded-2xl border border-brown-100 bg-white">
      {/* Slide preview area */}
      <div className="relative bg-brown-50 p-4">
        {/* Slide strip */}
        <div className="flex gap-2 overflow-x-auto pb-3">
          {carousel.slides.map((_, i) => (
            <button key={i} onClick={() => setActiveSlide(i)}
              className={`shrink-0 rounded px-2.5 py-1 font-sans text-[0.6rem] ${
                activeSlide === i ? "bg-brown-900 text-cream" : "bg-white text-brown-400"
              }`}>
              {i + 1}
            </button>
          ))}
        </div>

        {/* Active slide preview */}
        <div className="mx-auto overflow-hidden rounded-xl shadow-lg"
          style={{ width: DIMS.w * scale, height: DIMS.h * scale }}>
          {carousel.slides.map((slide, i) => (
            <div key={i} style={{ display: activeSlide === i ? "block" : "none" }}>
              <div ref={(el) => { slideRefs.current[i] = el; }}>
                <SlidePreview slide={slide} index={i} dim={DIMS} scale={scale} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="p-5">
        <h3 className="font-serif text-base text-brown-900">{carousel.title}</h3>
        <p className="mt-1 font-sans text-xs text-brown-400">
          {carousel.slides.length} slides ~ 1080x1080px
        </p>

        {/* Caption preview */}
        <pre className="mt-3 max-h-32 overflow-y-auto whitespace-pre-wrap rounded-lg bg-cream/60 p-3 font-sans text-[0.7rem] leading-relaxed text-brown-600">
          {carousel.caption}
        </pre>

        {/* Action buttons */}
        <div className="mt-4 flex gap-2">
          <button onClick={exportAll} disabled={exporting}
            className={`flex-1 rounded-lg bg-brown-900 py-2.5 font-sans text-xs font-medium text-cream transition-colors hover:bg-brown-800 ${exporting ? "opacity-60" : ""}`}>
            {exporting ? "A descarregar..." : `Descarregar ${carousel.slides.length} imagens`}
          </button>
          <button onClick={() => onCopy(carousel.id, carousel.caption)}
            className="rounded-lg border border-brown-200 bg-white px-4 py-2.5 font-sans text-xs text-brown-600 transition-colors hover:bg-cream">
            {copiedId === carousel.id ? "Copiada!" : "Copiar legenda"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

type ViewMode = "posts" | "whatsapp";

export default function MarketingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("posts");
  const [activeGroup, setActiveGroup] = useState(0);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
      </div>
    );
  }

  if (!user) { router.push("/entrar"); return null; }
  if (!AUTHOR_EMAILS.includes(user.email || "")) { router.push("/membro"); return null; }

  async function copyText(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const group = CAMPAIGN_GROUPS[activeGroup];
  const groupCarousels = group.ids
    .map((id) => professionalCarousels.find((c) => c.id === id))
    .filter(Boolean) as typeof professionalCarousels;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-brown-100 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="font-serif text-xl text-brown-900 sm:text-2xl">Conteudo pronto</h1>
            <p className="mt-0.5 font-sans text-[0.65rem] text-brown-400">
              Descarrega imagens, copia legendas, publica.
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/painel/marketing/gerador"
              className="rounded-lg bg-sage px-3 py-2 font-sans text-[0.65rem] font-medium text-white hover:bg-sage-dark sm:px-4 sm:text-xs">
              Criar imagem
            </Link>
            <Link href="/admin" className="font-sans text-[0.65rem] text-brown-400 hover:text-brown-700 sm:text-xs">
              Painel
            </Link>
          </div>
        </div>
      </div>

      {/* View toggle: Posts vs WhatsApp */}
      <div className="border-b border-brown-100 bg-white px-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl gap-1">
          <button onClick={() => setViewMode("posts")}
            className={`px-4 py-3 font-sans text-xs uppercase tracking-wider transition-colors ${
              viewMode === "posts" ? "border-b-2 border-sage text-sage" : "text-brown-400 hover:text-brown-600"
            }`}>
            Posts Instagram ({professionalCarousels.length})
          </button>
          <button onClick={() => setViewMode("whatsapp")}
            className={`px-4 py-3 font-sans text-xs uppercase tracking-wider transition-colors ${
              viewMode === "whatsapp" ? "border-b-2 border-[#25D366] text-[#25D366]" : "text-brown-400 hover:text-brown-600"
            }`}>
            WhatsApp ({WHATSAPP_MESSAGES.length})
          </button>
        </div>
      </div>

      {/* ─── POSTS VIEW ────────────────────────────────────────────────── */}
      {viewMode === "posts" && (
        <>
          {/* Campaign group tabs */}
          <div className="bg-cream px-4 py-3 sm:px-6">
            <div className="mx-auto flex max-w-6xl flex-wrap gap-2">
              {CAMPAIGN_GROUPS.map((g, i) => (
                <button key={g.label} onClick={() => setActiveGroup(i)}
                  className={`rounded-full border px-4 py-2 font-sans text-xs transition-all ${
                    activeGroup === i
                      ? "border-brown-900 bg-brown-900 text-cream"
                      : "border-brown-200 bg-white text-brown-500 hover:border-brown-400"
                  }`}>
                  {g.label} ({g.ids.length})
                </button>
              ))}
            </div>
          </div>

          {/* Cards grid */}
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groupCarousels.map((c) => (
                <PostCard key={c.id} carousel={c} copiedId={copiedId} onCopy={copyText} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* ─── WHATSAPP VIEW ─────────────────────────────────────────────── */}
      {viewMode === "whatsapp" && (
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
          <p className="mb-4 font-sans text-xs text-brown-400">
            Mensagens prontas para copiar e enviar via WhatsApp. Cada uma com tom diferente.
          </p>
          <div className="space-y-4">
            {WHATSAPP_MESSAGES.map((msg, i) => (
              <div key={i} className="rounded-2xl border border-brown-100 bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#25D366]/10 px-3 py-1 font-sans text-[0.6rem] font-medium text-[#25D366]">
                    {msg.label}
                  </span>
                  <button onClick={() => copyText(`wa-${i}`, msg.message)}
                    className="rounded-lg bg-[#25D366] px-4 py-2 font-sans text-xs font-medium text-white transition-colors hover:bg-[#22c55e]">
                    {copiedId === `wa-${i}` ? "Copiada!" : "Copiar"}
                  </button>
                </div>
                <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-brown-600">
                  {msg.message}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
