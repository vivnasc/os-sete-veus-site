"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { professionalCarousels, hashtagSets, thematicHub, productionGuide, WEEKLY_RHYTHM } from "@/data/content-calendar-weeks";
import type { CarouselSlide } from "@/data/content-calendar-weeks";
import { capcutContent, CAPCUT_CATEGORIES, AUDIO_BASE_PATH } from "@/data/capcut-content";
import type { CapCutCategory } from "@/data/capcut-content";
import { isMobile } from "@/lib/export-image";

const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];
const DIMS = { w: 1080, h: 1080 };
const STORY_DIMS = { w: 1080, h: 1920 };


function stripHashtags(text: string): string {
  return text.replace(/\n*#[^\s#]+(\s+#[^\s#]+)*/g, "").trim();
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
  const [pageSection, setPageSection] = useState<"hub" | "posts" | "guia" | "capcut">("hub");
  const [selectedWeekday, setSelectedWeekday] = useState(() => new Date().getDay());
  const [capcutCategory, setCapcutCategory] = useState<CapCutCategory | "todos">("todos");
  const [capcutModal, setCapcutModal] = useState<typeof capcutContent[0] | null>(null);
  const capcutSlideSquareRef = useRef<HTMLDivElement | null>(null);
  const capcutSlideVertRef = useRef<HTMLDivElement | null>(null);
  const [capcutExportingSquare, setCapcutExportingSquare] = useState(false);
  const [capcutExportingVert, setCapcutExportingVert] = useState(false);
  const [hubModal, setHubModal] = useState<{ slides: CarouselSlide[]; title: string; caption?: string } | null>(null);
  const hubSlideSquareRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hubSlideVertRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hubExportingSquare, setHubExportingSquare] = useState<number | "all" | null>(null);
  const [hubExportingVert, setHubExportingVert] = useState<number | "all" | null>(null);

  const captureElement = useCallback(async (el: HTMLElement, dims: { w: number; h: number }, filename: string) => {
    const { toPng } = await import("html-to-image");
    const orig = { t: el.style.transform, w: el.style.width, h: el.style.height };
    el.style.transform = "none";
    el.style.width = `${dims.w}px`;
    el.style.height = `${dims.h}px`;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    // Wait for all images to finish loading
    const imgs = Array.from(el.querySelectorAll<HTMLImageElement>("img"));
    await Promise.all(imgs.map((img) => img.complete ? Promise.resolve() : new Promise<void>((res) => { img.onload = () => res(); img.onerror = () => res(); })));
    try {
      const opts = { width: dims.w, height: dims.h, pixelRatio: 1, skipAutoScale: true };
      // First pass caches images into the canvas; second pass captures them correctly
      await toPng(el, opts);
      const dataUrl = await toPng(el, opts);
      await saveImage(dataUrl, filename);
    } finally {
      el.style.transform = orig.t;
      el.style.width = orig.w;
      el.style.height = orig.h;
    }
  }, []);

  const exportHubSlide = useCallback(async (idx: number, fmt: "square" | "vert") => {
    const refs = fmt === "square" ? hubSlideSquareRefs : hubSlideVertRefs;
    const wrapper = refs.current[idx];
    if (!wrapper) return;
    const el = (wrapper.firstElementChild as HTMLElement) || wrapper;
    const dims = fmt === "vert" ? STORY_DIMS : DIMS;
    if (fmt === "square") setHubExportingSquare(idx); else setHubExportingVert(idx);
    try {
      await captureElement(el, dims, `slide-${idx + 1}-${fmt}.png`);
    } catch (err) {
      console.error("Erro ao exportar slide", idx + 1, err);
      alert(`Erro ao exportar slide ${idx + 1}. Tenta de novo.`);
    }
    if (fmt === "square") setHubExportingSquare(null); else setHubExportingVert(null);
  }, [captureElement]);

  const exportAllHub = useCallback(async (count: number, fmt: "square" | "vert") => {
    const refs = fmt === "square" ? hubSlideSquareRefs : hubSlideVertRefs;
    const dims = fmt === "vert" ? STORY_DIMS : DIMS;
    if (fmt === "square") setHubExportingSquare("all"); else setHubExportingVert("all");
    for (let i = 0; i < count; i++) {
      const wrapper = refs.current[i];
      if (!wrapper) continue;
      const el = (wrapper.firstElementChild as HTMLElement) || wrapper;
      try {
        await captureElement(el, dims, `slide-${i + 1}-${fmt}.png`);
      } catch (err) {
        console.error("Erro ao exportar slide", i + 1, err);
      }
      await new Promise((r) => setTimeout(r, 500));
    }
    if (fmt === "square") setHubExportingSquare(null); else setHubExportingVert(null);
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
              { id: "capcut" as const, label: "CapCut" },
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
                          onClick={() => { setHubModal({ slides: [slide], title: slot.type, caption: slot.caption }); }}
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
                        onClick={() => { setHubModal({ slides: slot.carousel!, title: slot.type, caption: slot.caption }); }}
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
                onClick={() => { setHubModal({ slides: c.slides, title: c.title, caption: c.caption }); }}
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

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* ── CAPCUT — imagem + áudio ── */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {pageSection === "capcut" && (
          <div className="py-4 space-y-4">
            <div className="rounded-2xl border border-[#c9b896]/10 bg-[#c9b896]/5 p-3">
              <p className="font-sans text-[0.6rem] leading-relaxed text-[#c9b896]/70">
                Baixa a imagem e o áudio de cada entrada para combinar no CapCut.
                Os áudios ficam em <span className="font-mono">/audios/marketing/</span> quando os colocares lá.
              </p>
            </div>

            {/* Filtro de categoria */}
            <div className="-mx-4 overflow-x-auto px-4 scrollbar-none">
              <div className="flex gap-1" style={{ width: "max-content" }}>
                {CAPCUT_CATEGORIES.map((cat) => (
                  <button key={cat.id} onClick={() => setCapcutCategory(cat.id)}
                    className={`rounded-lg px-3 py-1.5 font-sans text-[0.6rem] font-semibold whitespace-nowrap transition-all ${
                      capcutCategory === cat.id
                        ? "bg-[#c9b896] text-[#1a1814]"
                        : "border border-cream/10 text-cream/40 hover:text-cream/60 hover:border-cream/20"
                    }`}>
                    {cat.label}
                    <span className={`ml-1.5 ${capcutCategory === cat.id ? "opacity-60" : "opacity-40"}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lista de entradas */}
            {capcutContent
              .filter((e) => capcutCategory === "todos" || e.category === capcutCategory)
              .map((entry) => (
                <button key={entry.id}
                  onClick={() => setCapcutModal(entry)}
                  className="w-full rounded-2xl border border-cream/10 bg-[#222019] p-3 text-left transition-all hover:border-[#c9b896]/20 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    {/* Miniatura do slide */}
                    <div className="shrink-0 rounded-xl overflow-hidden" style={{
                      width: 64, height: 64,
                      backgroundColor: entry.slide.bg,
                    }}>
                      <div style={{ padding: "8px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p className="font-serif leading-tight" style={{
                          fontSize: 7, color: entry.slide.text,
                          whiteSpace: "pre-line", lineClamp: 3,
                        }}>
                          {entry.slide.title}
                        </p>
                        {entry.slide.body && (
                          <p style={{
                            fontSize: 5, color: entry.slide.text, opacity: 0.6,
                            marginTop: 3, lineHeight: 1.4, display: "-webkit-box",
                            WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                          }}>
                            {entry.slide.body}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="rounded-full px-1.5 py-0.5 font-sans text-[0.45rem] font-semibold"
                          style={{ backgroundColor: entry.slide.accent + "25", color: entry.slide.accent }}>
                          {entry.categoryLabel}
                        </span>
                      </div>
                      <p className="font-serif text-sm font-bold text-cream/80 truncate">{entry.title}</p>
                      <p className="mt-0.5 font-sans text-[0.55rem] text-cream/35 line-clamp-2 leading-relaxed">{entry.script}</p>
                      <p className="mt-1.5 font-mono text-[0.45rem] text-cream/25">{entry.audioFile}</p>
                    </div>

                    {/* Seta */}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-cream/20">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </button>
              ))}
          </div>
        )}

      </div>
    </div>

    {/* ── CAPCUT MODAL ── */}
    {capcutModal && (() => {
      const sqW = 280, sqH = 280, sqScale = sqW / DIMS.w;
      const vtW = 180, vtH = Math.round(STORY_DIMS.h * (vtW / STORY_DIMS.w)), vtScale = vtW / STORY_DIMS.w;
      const audioUrl = `${AUDIO_BASE_PATH}/${capcutModal.audioFile}`;
      return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#1a1814]">
          {/* Header */}
          <div className="shrink-0 border-b border-cream/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => { setCapcutModal(null); setCapcutExportingSquare(false); setCapcutExportingVert(false); }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream/10 text-cream/60">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
              </button>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-xs font-semibold text-cream/70 truncate">{capcutModal.title}</p>
                <p className="font-sans text-[0.5rem] text-cream/30">{capcutModal.categoryLabel}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">

            {/* ── Áudio ── */}
            <div className="space-y-2">
              <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.15em] text-[#c9b896]/60">Áudio da Vivianne</p>
              <div className="rounded-2xl border border-[#c9b896]/15 bg-[#c9b896]/5 p-4 space-y-3">
                <p className="font-sans text-[0.65rem] leading-relaxed text-cream/70 italic">&ldquo;{capcutModal.script}&rdquo;</p>
                <CapCutAudioPlayer src={audioUrl} ficheiro={capcutModal.audioFile} />
              </div>
            </div>

            {/* ── Instagram 1:1 ── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.15em] text-[#E1306C]/60">Imagem 1:1</p>
                <button onClick={async () => {
                  const wrapper = capcutSlideSquareRef.current;
                  if (!wrapper) return;
                  const el = (wrapper.firstElementChild as HTMLElement) || wrapper;
                  setCapcutExportingSquare(true);
                  try { await captureElement(el, DIMS, `${capcutModal.id}-square.png`); } catch { /* skip */ }
                  setCapcutExportingSquare(false);
                }} disabled={capcutExportingSquare}
                  className="rounded-lg bg-[#E1306C]/15 px-3 py-1 font-sans text-[0.55rem] font-semibold text-[#E1306C]/80 hover:bg-[#E1306C]/25 disabled:opacity-40 transition-all">
                  {capcutExportingSquare ? "A baixar..." : "Baixar Imagem"}
                </button>
              </div>
              <div className="flex justify-center">
                <div className="overflow-hidden rounded-xl border border-cream/10" style={{ width: sqW, height: sqH }}>
                  <div ref={capcutSlideSquareRef}>
                    <SlidePreview slide={capcutModal.slide} index={0} scale={sqScale} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Story 9:16 ── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.15em] text-[#25D366]/60">Imagem Story 9:16</p>
                <button onClick={async () => {
                  const wrapper = capcutSlideVertRef.current;
                  if (!wrapper) return;
                  const el = (wrapper.firstElementChild as HTMLElement) || wrapper;
                  setCapcutExportingVert(true);
                  try { await captureElement(el, STORY_DIMS, `${capcutModal.id}-story.png`); } catch { /* skip */ }
                  setCapcutExportingVert(false);
                }} disabled={capcutExportingVert}
                  className="rounded-lg bg-[#25D366]/10 px-3 py-1 font-sans text-[0.55rem] font-semibold text-[#25D366]/80 hover:bg-[#25D366]/20 disabled:opacity-40 transition-all">
                  {capcutExportingVert ? "A baixar..." : "Baixar Imagem"}
                </button>
              </div>
              <div className="flex justify-center">
                <div className="overflow-hidden rounded-xl border border-cream/10" style={{ width: vtW, height: vtH }}>
                  <div ref={capcutSlideVertRef}>
                    <SlidePreviewVertical slide={capcutModal.slide} index={0} scale={vtScale} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Instrução CapCut ── */}
            <div className="rounded-2xl border border-cream/5 bg-[#222019] p-4 space-y-2">
              <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-wider text-cream/30">Como usar no CapCut</p>
              <ol className="space-y-1.5">
                {[
                  "Baixa a imagem (Story 9:16) e o áudio",
                  "Abre o CapCut → Novo projecto → Adiciona a imagem",
                  "Ajusta para 15–30 segundos",
                  "Importa o áudio e sincroniza",
                  "Adiciona texto sobreposto se quiseres",
                  "Exporta e publica no Reel / Story",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="shrink-0 font-sans text-[0.45rem] font-bold text-[#c9b896]/40 mt-0.5">{i + 1}.</span>
                    <span className="font-sans text-[0.6rem] text-cream/40 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="h-8" />
          </div>
        </div>
      );
    })()}

    {/* ── SLIDE MODAL — ambos os formatos visíveis ── */}
    {hubModal && (() => {
      const sqW = 280, sqH = 280, sqScale = sqW / DIMS.w;
      const vtW = 180, vtH = Math.round(STORY_DIMS.h * (vtW / STORY_DIMS.w)), vtScale = vtW / STORY_DIMS.w;
      const waCaption = hubModal.caption ? stripHashtags(hubModal.caption) : "";
      const n = hubModal.slides.length;
      const isExportingSquare = hubExportingSquare !== null;
      const isExportingVert = hubExportingVert !== null;
      return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#1a1814]">
          {/* Header */}
          <div className="shrink-0 border-b border-cream/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => { setHubModal(null); setHubExportingSquare(null); setHubExportingVert(null); }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream/10 text-cream/60">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
              </button>
              <p className="flex-1 font-sans text-xs font-semibold text-cream/70 truncate">{hubModal.title}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">

            {/* ── Instagram 1:1 ── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.15em] text-[#E1306C]/60">Instagram 1:1</p>
                <button onClick={() => exportAllHub(n, "square")} disabled={isExportingSquare}
                  className="rounded-lg bg-[#E1306C]/15 px-3 py-1 font-sans text-[0.55rem] font-semibold text-[#E1306C]/80 hover:bg-[#E1306C]/25 disabled:opacity-40 transition-all">
                  {hubExportingSquare === "all" ? "A baixar..." : n > 1 ? `Baixar todos (${n})` : "Baixar"}
                </button>
              </div>
              <div className={`${n > 1 ? "-mx-4 overflow-x-auto px-4 scrollbar-none" : "flex justify-center"}`}>
                <div className={`${n > 1 ? "flex gap-3" : ""}`} style={n > 1 ? { width: "max-content" } : {}}>
                  {hubModal.slides.map((slide, si) => (
                    <div key={si} className="shrink-0">
                      <div className="overflow-hidden rounded-xl border border-cream/10" style={{ width: sqW, height: sqH }}>
                        <div ref={(el) => { hubSlideSquareRefs.current[si] = el; }}>
                          <SlidePreview slide={slide} index={si} scale={sqScale} />
                        </div>
                      </div>
                      <button onClick={() => exportHubSlide(si, "square")}
                        disabled={hubExportingSquare === si}
                        className="mt-1.5 w-full rounded-lg border border-cream/10 py-1.5 font-sans text-[0.5rem] font-semibold text-cream/40 hover:border-[#E1306C]/30 hover:text-cream/60 disabled:opacity-40 transition-all">
                        {hubExportingSquare === si ? "..." : `↓ ${si + 1}`}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── WA Status 9:16 ── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.15em] text-[#25D366]/60">WA Status 9:16</p>
                <button onClick={() => exportAllHub(n, "vert")} disabled={isExportingVert}
                  className="rounded-lg bg-[#25D366]/10 px-3 py-1 font-sans text-[0.55rem] font-semibold text-[#25D366]/80 hover:bg-[#25D366]/20 disabled:opacity-40 transition-all">
                  {hubExportingVert === "all" ? "A baixar..." : n > 1 ? `Baixar todos (${n})` : "Baixar"}
                </button>
              </div>
              <div className={`${n > 1 ? "-mx-4 overflow-x-auto px-4 scrollbar-none" : "flex justify-center"}`}>
                <div className={`${n > 1 ? "flex gap-3" : ""}`} style={n > 1 ? { width: "max-content" } : {}}>
                  {hubModal.slides.map((slide, si) => (
                    <div key={si} className="shrink-0">
                      <div className="overflow-hidden rounded-xl border border-cream/10" style={{ width: vtW, height: vtH }}>
                        <div ref={(el) => { hubSlideVertRefs.current[si] = el; }}>
                          <SlidePreviewVertical slide={slide} index={si} scale={vtScale} />
                        </div>
                      </div>
                      <button onClick={() => exportHubSlide(si, "vert")}
                        disabled={hubExportingVert === si}
                        className="mt-1.5 w-full rounded-lg border border-cream/10 py-1.5 font-sans text-[0.5rem] font-semibold text-cream/40 hover:border-[#25D366]/30 hover:text-cream/60 disabled:opacity-40 transition-all">
                        {hubExportingVert === si ? "..." : `↓ ${si + 1}`}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Legendas ── */}
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

// ── Player de áudio para o modal CapCut ─────────────────────────────────────
function CapCutAudioPlayer({ src, ficheiro }: { src: string; ficheiro: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    playing ? audio.pause() : audio.play();
    setPlaying(!playing);
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
  }

  function fmt(s: number) {
    const m = Math.floor(s / 60);
    return `${m}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
  }

  return (
    <div className="rounded-xl border border-cream/10 bg-[#1a1814] p-3">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-2.5">
        <button
          onClick={toggle}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c9b896] text-[#1a1814] transition-opacity hover:opacity-80"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3.5 w-3.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-sans text-[0.55rem] text-cream/40">{fmt(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={seek}
              className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-cream/10 accent-[#c9b896]"
            />
            <span className="font-sans text-[0.55rem] text-cream/40">{fmt(duration)}</span>
          </div>
          <p className="mt-1 font-mono text-[0.45rem] text-cream/20 truncate">{ficheiro}</p>
        </div>
        <a
          href={src}
          download={ficheiro}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cream/10 text-cream/30 transition-colors hover:border-[#c9b896]/30 hover:text-[#c9b896]/60"
          title="Baixar"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
            <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" />
          </svg>
        </a>
      </div>
    </div>
  );
}
