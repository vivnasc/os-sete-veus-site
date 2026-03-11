"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { professionalCarousels, hashtagSets, thematicHub, productionGuide } from "@/data/content-calendar-weeks";
import type { CarouselSlide } from "@/data/content-calendar-weeks";

const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];
const DIMS = { w: 1080, h: 1080 };
const STORY_DIMS = { w: 1080, h: 1920 };

// Mapa semanal — cada dia da semana (0=Dom) aponta para conteúdo do Hub
// themeIdx: índice em thematicHub (0=Véus, 1=Espelhos, 2=Nós, 3=Comunidade, 4=Reflexões)
// dayIdx: sub-tema dentro do tema
const WEEKLY_RHYTHM = [
  { label: "Dom", hint: "Reflexão",    themeIdx: 4, dayIdx: 0 },  // Reflexões
  { label: "Seg", hint: "Véu",         themeIdx: 0, dayIdx: 0 },  // Permanência
  { label: "Ter", hint: "Espelho",     themeIdx: 1, dayIdx: 0 },  // Ilusão
  { label: "Qua", hint: "Véu",         themeIdx: 0, dayIdx: 2 },  // Turbilhão
  { label: "Qui", hint: "Nó",          themeIdx: 2, dayIdx: 0 },  // Nó da Herança
  { label: "Sex", hint: "Espelho",     themeIdx: 1, dayIdx: 1 },  // Medo
  { label: "Sáb", hint: "Os 7 Véus",  themeIdx: 0, dayIdx: 6 },  // Dualidade + carrossel 7 Véus
];

function stripHashtags(text: string): string {
  return text.replace(/\n*#[^\s#]+(\s+#[^\s#]+)*/g, "").trim();
}

function isMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

async function saveImage(dataUrl: string, filename: string): Promise<void> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  if (isMobile() && typeof navigator.share === "function" && typeof navigator.canShare === "function") {
    const file = new File([blob], filename, { type: "image/png" });
    if (navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file] }); return; } catch { /* fallthrough */ }
    }
  }
  if (isMobile()) {
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } else {
    const a = document.createElement("a");
    a.download = filename;
    a.href = dataUrl;
    a.click();
  }
}

function SlidePreview({ slide, index, scale }: { slide: CarouselSlide; index: number; scale: number }) {
  return (
    <div style={{
      width: DIMS.w, height: DIMS.h,
      transform: `scale(${scale})`, transformOrigin: "top left",
      backgroundColor: slide.bg, color: slide.text,
      position: "relative", overflow: "hidden",
    }}>
      {slide.bgImage && (
        <>
          <img src={slide.bgImage} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, backgroundColor: slide.bg, opacity: 0.82 }} />
        </>
      )}
      <div style={{ position: "absolute", right: 60, top: 60, width: 60, height: 60, borderRadius: "50%",
        backgroundColor: slide.accent + "25", color: slide.accent, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: "system-ui, sans-serif", fontSize: 22, fontWeight: 700 }}>
        {index + 1}
      </div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "120px 90px" }}>
        {slide.title && (
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 72,
            lineHeight: 1.15, fontWeight: 700, whiteSpace: "pre-line", margin: 0 }}>{slide.title}</h2>
        )}
        {slide.title && slide.body && (
          <div style={{ width: "10%", height: 3, backgroundColor: slide.accent, opacity: 0.6, margin: "44px 0" }} />
        )}
        {slide.body && (
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 34, lineHeight: 1.6,
            whiteSpace: "pre-line", margin: 0, opacity: 0.85 }}>{slide.body}</p>
        )}
      </div>
      {slide.footer && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 90px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 22, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", color: slide.accent, margin: 0 }}>{slide.footer}</p>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 36, opacity: 0.3, color: slide.accent }}>~</span>
          </div>
        </div>
      )}
      <img src="/images/mandala-7veus.png" alt=""
        style={{ position: "absolute", left: 60, bottom: 60, width: 60, height: 60, opacity: 0.1, objectFit: "contain" }} />
    </div>
  );
}

function SlidePreviewVertical({ slide, index, scale }: { slide: CarouselSlide; index: number; scale: number }) {
  return (
    <div style={{
      width: STORY_DIMS.w, height: STORY_DIMS.h,
      transform: `scale(${scale})`, transformOrigin: "top left",
      backgroundColor: slide.bg, color: slide.text,
      position: "relative", overflow: "hidden",
    }}>
      {slide.bgImage && (
        <>
          <img src={slide.bgImage} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, backgroundColor: slide.bg, opacity: 0.82 }} />
        </>
      )}
      <div style={{ position: "absolute", left: 60, top: 80, width: 80, height: 80, borderRadius: "50%",
        backgroundColor: slide.accent + "30", color: slide.accent, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: "system-ui, sans-serif", fontSize: 32, fontWeight: 700 }}>
        {index + 1}
      </div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "200px 90px" }}>
        {slide.title && (
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 80,
            lineHeight: 1.15, fontWeight: 700, whiteSpace: "pre-line", margin: 0 }}>{slide.title}</h2>
        )}
        {slide.title && slide.body && (
          <div style={{ width: "12%", height: 4, backgroundColor: slide.accent, opacity: 0.7, margin: "48px 0" }} />
        )}
        {slide.body && (
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 38, lineHeight: 1.55,
            whiteSpace: "pre-line", margin: 0 }}>{slide.body}</p>
        )}
      </div>
      {slide.footer && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 90px 100px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 26, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", color: slide.accent, margin: 0 }}>{slide.footer}</p>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 40, opacity: 0.3, color: slide.accent }}>~</span>
          </div>
        </div>
      )}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, padding: "80px 90px 0", display: "flex", justifyContent: "flex-end" }}>
        <img src="/images/mandala-7veus.png" alt="" style={{ width: 80, height: 80, opacity: 0.12, objectFit: "contain" }} />
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function MarketingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pageSection, setPageSection] = useState<"hub" | "posts" | "guia">("hub");
  const [selectedWeekday, setSelectedWeekday] = useState(() => new Date().getDay());
  const [hubModal, setHubModal] = useState<{ slides: CarouselSlide[]; title: string; caption?: string } | null>(null);
  const [hubFormat, setHubFormat] = useState<"vertical" | "square">("square");
  const hubSlideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hubExporting, setHubExporting] = useState(false);
  const [hubExportingIdx, setHubExportingIdx] = useState<number | null>(null);

  const captureElement = useCallback(async (el: HTMLElement, dims: { w: number; h: number }, filename: string) => {
    const { toPng } = await import("html-to-image");
    const orig = { t: el.style.transform, w: el.style.width, h: el.style.height };
    el.style.transform = "none";
    el.style.width = `${dims.w}px`;
    el.style.height = `${dims.h}px`;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    try {
      const dataUrl = await toPng(el, { width: dims.w, height: dims.h, pixelRatio: 1, cacheBust: true, skipAutoScale: true, includeQueryParams: true });
      await saveImage(dataUrl, filename);
    } finally {
      el.style.transform = orig.t;
      el.style.width = orig.w;
      el.style.height = orig.h;
    }
  }, []);

  const exportHubSlide = useCallback(async (idx: number, fmt: "vertical" | "square") => {
    const wrapper = hubSlideRefs.current[idx];
    if (!wrapper) return;
    const el = (wrapper.firstElementChild as HTMLElement) || wrapper;
    const dims = fmt === "vertical" ? STORY_DIMS : DIMS;
    setHubExportingIdx(idx);
    try { await captureElement(el, dims, `slide-${idx + 1}.png`); } catch { /* skip */ }
    setHubExportingIdx(null);
  }, [captureElement]);

  const exportAllHub = useCallback(async (count: number, fmt: "vertical" | "square") => {
    setHubExporting(true);
    const dims = fmt === "vertical" ? STORY_DIMS : DIMS;
    for (let i = 0; i < count; i++) {
      const wrapper = hubSlideRefs.current[i];
      if (!wrapper) continue;
      const el = (wrapper.firstElementChild as HTMLElement) || wrapper;
      try { await captureElement(el, dims, `slide-${i + 1}.png`); } catch { /* skip */ }
      await new Promise((r) => setTimeout(r, 500));
    }
    setHubExporting(false);
  }, [captureElement]);

  async function copyText(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  useEffect(() => {
    if (!loading && !user) router.push("/entrar");
    else if (!loading && user && !AUTHOR_EMAILS.includes(user.email || "")) router.push("/membro");
  }, [loading, user, router]);

  if (loading || !user || !AUTHOR_EMAILS.includes(user.email || "")) {
    return <div className="flex min-h-screen items-center justify-center bg-cream"><div className="h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" /></div>;
  }

  return (
    <>
    <div className="min-h-screen bg-[#1a1814]">

      {/* ── HEADER ── */}
      <div className="sticky top-0 z-30 border-b border-[#c9b896]/10 bg-[#1a1814]/95 backdrop-blur-lg">
        <div className="mx-auto max-w-lg px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-1.5 font-sans text-xs text-[#c9b896]/50 hover:text-[#c9b896]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              Painel
            </Link>
            <p className="font-serif text-sm font-medium tracking-wide text-cream/90">Conteudo Pronto</p>
            <Link href="/painel/marketing/gerador"
              className="rounded-lg border border-[#c9b896]/30 px-2.5 py-1.5 font-sans text-[0.6rem] font-medium text-[#c9b896]/80 hover:border-[#c9b896]/60 hover:text-[#c9b896]">
              Gerador
            </Link>
          </div>
          <div className="mt-3 flex gap-1">
            {([
              { id: "hub" as const, label: "Hub" },
              { id: "posts" as const, label: "Posts" },
              { id: "guia" as const, label: "Guia" },
            ]).map((s) => (
              <button key={s.id} onClick={() => setPageSection(s.id)}
                className={`rounded-lg px-3 py-1.5 font-sans text-[0.65rem] font-semibold transition-all ${
                  pageSection === s.id ? "bg-[#c9b896] text-[#1a1814]" : "text-cream/40 hover:text-cream/60 hover:bg-cream/5"
                }`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pb-28">

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* ── HUB TEMÁTICO ── */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* ── HUB — plano semanal ── */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {pageSection === "hub" && (() => {
          const today = new Date().getDay();
          const r = WEEKLY_RHYTHM[selectedWeekday];
          const day = thematicHub[r.themeIdx]?.days[r.dayIdx];
          return (
            <div className="py-4 space-y-4">
              {/* Day strip */}
              <div className="flex gap-1">
                {WEEKLY_RHYTHM.map((w, i) => (
                  <button key={i} onClick={() => setSelectedWeekday(i)}
                    className={`flex-1 rounded-xl py-2.5 text-center transition-all ${
                      selectedWeekday === i ? "bg-[#c9b896] shadow-lg shadow-[#c9b896]/20" : "hover:bg-cream/5"
                    }`}>
                    <span className={`block font-sans text-[0.5rem] font-semibold uppercase tracking-wider ${
                      selectedWeekday === i ? "text-[#1a1814]" : today === i ? "text-cream/80" : "text-cream/30"
                    }`}>{w.label}</span>
                    <span className={`mt-1 block h-1 w-1 rounded-full mx-auto ${
                      selectedWeekday === i ? "bg-[#1a1814]/40" : today === i ? "bg-[#c9b896]/60" : "bg-cream/20"
                    }`} />
                  </button>
                ))}
              </div>

              {/* Day header */}
              {day && (
                <div className="rounded-2xl border border-[#c9b896]/10 bg-gradient-to-br from-[#c9b896]/8 to-transparent p-4">
                  <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.15em] text-[#c9b896]/60">
                    {r.hint} — {thematicHub[r.themeIdx].title}
                  </p>
                  <h3 className="mt-1 font-serif text-lg text-cream/90">{day.theme}</h3>
                </div>
              )}

              {/* Slots */}
              {day?.slots.map((slot, si) => (
                <div key={si} className="overflow-hidden rounded-2xl border border-cream/10 bg-[#222019]">
                  <div className="flex items-center gap-2 border-b border-cream/5 px-4 py-3">
                    <div className={`h-2 w-2 rounded-full ${
                      slot.platform === "whatsapp" ? "bg-[#25D366]" : slot.platform === "instagram" ? "bg-[#E1306C]" : "bg-[#c9b896]"
                    }`} />
                    <span className="font-sans text-xs font-semibold text-cream/70">
                      {slot.platform === "whatsapp" ? "WhatsApp" : slot.platform === "instagram" ? "Instagram" : "Ambos"} — {slot.type}
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    {slot.visual && (() => {
                      const slide: CarouselSlide = { bg: slot.visual.bg, text: slot.visual.text, accent: slot.visual.accent, title: slot.visual.title, body: slot.visual.body || "", footer: slot.visual.footer || "" };
                      return (
                        <button
                          onClick={() => { setHubFormat("square"); setHubModal({ slides: [slide], title: slot.type, caption: slot.caption }); }}
                          className="w-full rounded-xl overflow-hidden text-left transition-all hover:ring-2 hover:ring-[#c9b896]/30 active:scale-[0.98]"
                          style={{ backgroundColor: slot.visual.bg, color: slot.visual.text, padding: "24px", minHeight: 120 }}
                        >
                          {slot.visual.title && <p className="font-serif text-sm font-bold leading-snug" style={{ whiteSpace: "pre-line" }}>{slot.visual.title}</p>}
                          {slot.visual.body && <p className="mt-2 font-sans text-[0.65rem] leading-relaxed opacity-80" style={{ whiteSpace: "pre-line" }}>{slot.visual.body}</p>}
                          {slot.visual.footer && <p className="mt-3 font-sans text-[0.55rem] font-semibold uppercase tracking-wider" style={{ color: slot.visual.accent }}>{slot.visual.footer}</p>}
                          <p className="mt-3 font-sans text-[0.5rem] font-semibold uppercase tracking-widest opacity-40">Toca para ver & baixar →</p>
                        </button>
                      );
                    })()}
                    {slot.carousel && slot.carousel.length > 0 && (
                      <button
                        onClick={() => { setHubFormat("square"); setHubModal({ slides: slot.carousel!, title: slot.type, caption: slot.caption }); }}
                        className="w-full rounded-xl border border-cream/10 bg-black/20 px-4 py-3 text-left transition-all hover:border-[#c9b896]/30 active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            {slot.carousel.slice(0, 4).map((sl, sli) => (
                              <div key={sli} className="shrink-0 rounded overflow-hidden" style={{ width: 36, height: 36, backgroundColor: sl.bg }} />
                            ))}
                            {slot.carousel.length > 4 && (
                              <div className="shrink-0 rounded overflow-hidden flex items-center justify-center" style={{ width: 36, height: 36, backgroundColor: "#ffffff10" }}>
                                <span className="font-sans text-[0.45rem] font-bold text-cream/40">+{slot.carousel.length - 4}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-sans text-xs font-semibold text-cream/70">{slot.carousel.length} slides</p>
                            <p className="font-sans text-[0.5rem] text-cream/30">Toca para ver & baixar</p>
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* ── POSTS — carrosseis prontos ── */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {pageSection === "posts" && (
          <div className="py-4 space-y-2">
            <p className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-cream/30 mb-3">
              {professionalCarousels.length} carrosseis prontos
            </p>
            {professionalCarousels.map((c) => (
              <button key={c.id}
                onClick={() => { setHubFormat("square"); setHubModal({ slides: c.slides, title: c.title, caption: c.caption }); }}
                className="w-full rounded-2xl border border-cream/10 bg-[#222019] p-4 text-left transition-all hover:border-[#c9b896]/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm font-bold text-cream/80 truncate">{c.title}</p>
                    <p className="mt-1 font-sans text-[0.6rem] text-cream/40 line-clamp-2">{c.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded-full bg-cream/10 px-2 py-0.5 font-sans text-[0.5rem] font-medium text-cream/40">{c.slides.length} slides</span>
                    </div>
                  </div>
                  <div className="shrink-0 rounded-lg overflow-hidden" style={{
                    width: 48, height: 48, backgroundColor: c.slides[0]?.bg || "#3d3630",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span className="font-serif text-[0.4rem] font-bold px-1 text-center leading-tight" style={{ color: c.slides[0]?.text || "#f7f5f0" }}>
                      {c.slides[0]?.title?.split("\n")[0]?.slice(0, 20) || "~"}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* ── GUIA DE PRODUCAO ── */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {pageSection === "guia" && (
          <div className="py-4 space-y-4">
            <p className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-cream/30">
              Referencia rapida para criacao de conteudo
            </p>
            {productionGuide.map((section, si) => (
              <div key={si} className="overflow-hidden rounded-2xl border border-cream/10 bg-[#222019]">
                <div className="border-b border-cream/5 px-4 py-3">
                  <p className="font-sans text-xs font-semibold text-[#c9b896]/80">{section.category}</p>
                </div>
                <div className="divide-y divide-cream/5">
                  {section.items.map((item, ii) => (
                    <div key={ii} className="px-4 py-3">
                      <p className="font-sans text-xs font-medium text-cream/70">{item.title}</p>
                      <p className="mt-0.5 font-sans text-[0.65rem] leading-relaxed text-cream/40">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="overflow-hidden rounded-2xl border border-cream/10 bg-[#222019]">
              <div className="border-b border-cream/5 px-4 py-3">
                <p className="font-sans text-xs font-semibold text-[#c9b896]/80">Hashtags</p>
              </div>
              <div className="divide-y divide-cream/5">
                {hashtagSets.map((set) => (
                  <button key={set.name}
                    onClick={() => copyText(`guide-ht-${set.name}`, set.tags.join(" "))}
                    className="block w-full px-4 py-3 text-left hover:bg-cream/3">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-xs font-semibold text-cream/60">{set.name}</span>
                      <span className="rounded-full bg-cream/10 px-2 py-0.5 font-sans text-[0.5rem] font-medium text-cream/40">
                        {copiedId === `guide-ht-${set.name}` ? "Copiado!" : `${set.tags.length} tags`}
                      </span>
                    </div>
                    <p className="mt-1 font-sans text-[0.6rem] leading-relaxed text-cream/30">{set.description}</p>
                    <p className="mt-1 font-sans text-[0.55rem] leading-relaxed text-[#c9b896]/40">{set.tags.join(" ")}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>

    {/* ── SLIDE MODAL ── */}
    {hubModal && (() => {
      const isVert = hubFormat === "vertical";
      const dims = isVert ? STORY_DIMS : DIMS;
      const previewW = isVert ? 220 : 328;
      const scale = previewW / dims.w;
      const previewH = Math.round(dims.h * scale);
      const waCaption = hubModal.caption ? stripHashtags(hubModal.caption) : "";
      return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#1a1814]">
          <div className="shrink-0 border-b border-cream/10 px-4 py-3 space-y-2.5">
            <div className="flex items-center gap-3">
              <button onClick={() => { setHubModal(null); setHubExporting(false); setHubExportingIdx(null); }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream/10 text-cream/60">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
              </button>
              <p className="flex-1 font-sans text-xs font-semibold text-cream/70 truncate">{hubModal.title}</p>
              <button onClick={() => exportAllHub(hubModal.slides.length, hubFormat)}
                disabled={hubExporting}
                className="shrink-0 rounded-lg bg-[#c9b896] px-3 py-1.5 font-sans text-[0.6rem] font-bold text-[#1a1814] disabled:opacity-50">
                {hubExporting ? "A baixar..." : `Baixar ${hubModal.slides.length > 1 ? `todos (${hubModal.slides.length})` : "imagem"}`}
              </button>
            </div>
            <div className="flex rounded-xl bg-black/30 p-1 gap-1">
              <button onClick={() => setHubFormat("square")}
                className={`flex-1 rounded-lg py-1.5 font-sans text-[0.6rem] font-semibold transition-all ${!isVert ? "bg-[#c9b896] text-[#1a1814]" : "text-cream/40 hover:text-cream/60"}`}>
                Instagram 1:1
              </button>
              <button onClick={() => setHubFormat("vertical")}
                className={`flex-1 rounded-lg py-1.5 font-sans text-[0.6rem] font-semibold transition-all ${isVert ? "bg-[#25D366] text-white" : "text-cream/40 hover:text-cream/60"}`}>
                WA Status 9:16
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
            {hubModal.slides.length > 1 ? (
              <div className="-mx-4 overflow-x-auto px-4 scrollbar-none">
                <div className="flex gap-3" style={{ width: "max-content" }}>
                  {hubModal.slides.map((slide, si) => (
                    <div key={si} className="shrink-0">
                      <div className="relative overflow-hidden rounded-xl" style={{ width: previewW, height: previewH }}>
                        <div ref={(el) => { hubSlideRefs.current[si] = el; }}>
                          {isVert
                            ? <SlidePreviewVertical slide={slide} index={si} scale={scale} />
                            : <SlidePreview slide={slide} index={si} scale={scale} />}
                        </div>
                      </div>
                      <button onClick={() => exportHubSlide(si, hubFormat)}
                        disabled={hubExportingIdx === si}
                        className="mt-1.5 w-full rounded-lg border border-cream/10 py-1.5 font-sans text-[0.55rem] font-semibold text-cream/40 hover:border-[#c9b896]/30 hover:text-cream/60 disabled:opacity-40 transition-all">
                        {hubExportingIdx === si ? "..." : `↓ ${si + 1}`}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div>
                  <div className="relative overflow-hidden rounded-xl" style={{ width: previewW, height: previewH }}>
                    <div ref={(el) => { hubSlideRefs.current[0] = el; }}>
                      {isVert
                        ? <SlidePreviewVertical slide={hubModal.slides[0]} index={0} scale={scale} />
                        : <SlidePreview slide={hubModal.slides[0]} index={0} scale={scale} />}
                    </div>
                  </div>
                  <button onClick={() => exportHubSlide(0, hubFormat)}
                    disabled={hubExportingIdx === 0}
                    className="mt-2 w-full rounded-xl border border-cream/10 py-2.5 font-sans text-xs font-semibold text-cream/50 hover:border-[#c9b896]/30 hover:text-cream/70 disabled:opacity-50 transition-all">
                    {hubExportingIdx === 0 ? "A baixar..." : "Baixar imagem"}
                  </button>
                </div>
              </div>
            )}

            {hubModal.caption && (
              <div className="space-y-2">
                <div className="rounded-2xl border border-[#E1306C]/20 bg-[#E1306C]/5 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-wider text-[#E1306C]/60">Legenda Instagram</p>
                    <button onClick={() => copyText("hub-ig", hubModal.caption || "")}
                      className={`rounded-lg px-3 py-1 font-sans text-[0.55rem] font-semibold transition-all ${copiedId === "hub-ig" ? "bg-[#E1306C] text-white" : "bg-[#E1306C]/10 text-[#E1306C]/60"}`}>
                      {copiedId === "hub-ig" ? "Copiada!" : "Copiar"}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-[0.65rem] leading-relaxed text-cream/60">{hubModal.caption}</pre>
                </div>
                {waCaption && waCaption !== hubModal.caption && (
                  <div className="rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-wider text-[#25D366]/60">Legenda Status</p>
                      <button onClick={() => copyText("hub-wa", waCaption)}
                        className={`rounded-lg px-3 py-1 font-sans text-[0.55rem] font-semibold transition-all ${copiedId === "hub-wa" ? "bg-[#25D366] text-white" : "bg-[#25D366]/10 text-[#25D366]/60"}`}>
                        {copiedId === "hub-wa" ? "Copiada!" : "Copiar"}
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap font-sans text-[0.65rem] leading-relaxed text-cream/60">{waCaption}</pre>
                  </div>
                )}
              </div>
            )}
            <div className="h-8" />
          </div>
        </div>
      );
    })()}
    </>
  );
}
