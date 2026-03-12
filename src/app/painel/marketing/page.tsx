"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { professionalCarousels, reelScripts, hashtagSets, thematicHub, productionGuide, WEEKLY_RHYTHM } from "@/data/content-calendar-weeks";
import type { CarouselSlide } from "@/data/content-calendar-weeks";
import { capcutContent, CAPCUT_CATEGORIES, AUDIO_BASE_PATH } from "@/data/capcut-content";
import type { CapCutCategory } from "@/data/capcut-content";
import { isMobile } from "@/lib/export-image";
import { REELS_VOZ, CARROSSEIS_VOZ } from "@/data/marketing-reels-audio";

const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];
const DIMS = { w: 1080, h: 1080 };
const STORY_DIMS = { w: 1080, h: 1920 };

// ─── Extrair visuais do thematicHub para Feed e Status ─────────────────────────

type HubFeedItem = { id: string; theme: string; weekTitle: string; slide: CarouselSlide; caption?: string };
type HubStatusItem = { id: string; theme: string; weekTitle: string; slides: CarouselSlide[]; caption?: string };

// Feed 1:1 — slots com visual definido (Post Feed)
const hubFeedPosts: HubFeedItem[] = thematicHub.flatMap((week) =>
  week.days.flatMap((day) =>
    day.slots
      .filter((s) => s.visual != null)
      .map((s, i) => ({
        id: `feed-${week.weekNumber}-${day.day}-${i}`,
        theme: day.theme,
        weekTitle: week.title,
        slide: {
          bg: s.visual!.bg,
          text: s.visual!.text,
          accent: s.visual!.accent,
          title: s.visual!.title || "",
          body: s.visual!.body || "",
          footer: s.visual!.footer || "",
        },
        caption: s.caption,
      }))
  )
);

// Status/Stories 9:16 — slots WhatsApp Status
const hubStatusPosts: HubStatusItem[] = thematicHub.flatMap((week) =>
  week.days.flatMap((day) =>
    day.slots
      .filter((s) => s.type === "WhatsApp Status" && s.carousel && s.carousel.length > 0)
      .map((s, i) => ({
        id: `status-${week.weekNumber}-${day.day}-${i}`,
        theme: day.theme,
        weekTitle: week.title,
        slides: s.carousel!,
        caption: s.caption,
      }))
  )
);


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

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function MarketingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  type Section = "semana" | "feed" | "carrosseis" | "status" | "reels";

  const [section, setSection] = useState<Section>("semana");
  const [selectedWeekday, setSelectedWeekday] = useState(() => new Date().getDay());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hubModal, setHubModal] = useState<{ slides: CarouselSlide[]; title: string; caption?: string } | null>(null);
  const [capcutModal, setCapcutModal] = useState<typeof capcutContent[0] | null>(null);
  const hubSlideSquareRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hubSlideVertRefs = useRef<(HTMLDivElement | null)[]>([]);
  const capcutSlideSquareRef = useRef<HTMLDivElement | null>(null);
  const capcutSlideVertRef = useRef<HTMLDivElement | null>(null);
  const [hubExportingSquare, setHubExportingSquare] = useState<number | "all" | null>(null);
  const [hubExportingVert, setHubExportingVert] = useState<number | "all" | null>(null);
  const [capcutExportingSquare, setCapcutExportingSquare] = useState(false);
  const [capcutExportingVert, setCapcutExportingVert] = useState(false);

  const captureElement = useCallback(async (el: HTMLElement, dims: { w: number; h: number }, filename: string) => {
    const { toPng } = await import("html-to-image");
    const orig = { t: el.style.transform, w: el.style.width, h: el.style.height };
    el.style.transform = "none";
    el.style.width = `${dims.w}px`;
    el.style.height = `${dims.h}px`;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const imgs = Array.from(el.querySelectorAll<HTMLImageElement>("img"));
    await Promise.all(imgs.map((img) => img.complete ? Promise.resolve() : new Promise<void>((res) => { img.onload = () => res(); img.onerror = () => res(); })));
    try {
      const opts = { width: dims.w, height: dims.h, pixelRatio: 1, skipAutoScale: true };
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
    return <div className="flex min-h-screen items-center justify-center bg-[#1a1814]"><div className="h-8 w-8 animate-spin rounded-full border-2 border-[#c9b896]/30 border-t-[#c9b896]" /></div>;
  }

  // ── Today data ──────────────────────────────────────────────────────────────
  const today = new Date().getDay();
  const r = WEEKLY_RHYTHM[selectedWeekday];
  const dayData = thematicHub[r.themeIdx]?.days[r.dayIdx];
  const slotCounts = WEEKLY_RHYTHM.map((wr) =>
    thematicHub[wr.themeIdx]?.days[wr.dayIdx]?.slots.length || 0
  );

  // ── Slot card (shared between Hoje and other sections) ──────────────────────
  function SlotCard({ slot, idx }: { slot: NonNullable<typeof dayData>["slots"][0]; idx: number }) {
    const platformColor = slot.platform === "whatsapp" ? "#25D366" : slot.platform === "instagram" ? "#E1306C" : "#c9b896";
    const platformLabel = slot.platform === "whatsapp" ? "WhatsApp" : slot.platform === "instagram" ? "Instagram" : "Ambos";
    return (
      <div className="overflow-hidden rounded-2xl border border-cream/8 bg-[#1e1c18]">
        <div className="flex items-center gap-2 px-4 py-2.5">
          <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: platformColor }} />
          <span className="font-sans text-[0.55rem] font-bold uppercase tracking-[0.12em]" style={{ color: platformColor + "cc" }}>{platformLabel}</span>
          <span className="text-cream/20">·</span>
          <span className="font-sans text-[0.55rem] font-semibold text-cream/40">{slot.type}</span>
        </div>

        {slot.visual && (() => {
          const slide: CarouselSlide = { bg: slot.visual!.bg, text: slot.visual!.text, accent: slot.visual!.accent, title: slot.visual!.title, body: slot.visual!.body || "", footer: slot.visual!.footer || "" };
          return (
            <button onClick={() => setHubModal({ slides: [slide], title: slot.type, caption: slot.caption })}
              className="mx-3 mb-3 w-[calc(100%-1.5rem)] overflow-hidden rounded-xl text-left transition-all active:scale-[0.98] hover:opacity-90"
              style={{ backgroundColor: slot.visual!.bg }}>
              <div className="p-5">
                {slot.visual!.title && <p className="font-serif text-sm font-bold leading-snug" style={{ color: slot.visual!.text, whiteSpace: "pre-line" }}>{slot.visual!.title}</p>}
                {slot.visual!.body && <p className="mt-2 font-sans text-[0.65rem] leading-relaxed" style={{ color: slot.visual!.text, opacity: 0.75, whiteSpace: "pre-line" }}>{slot.visual!.body}</p>}
                {slot.visual!.footer && <p className="mt-3 font-sans text-[0.5rem] font-semibold uppercase tracking-[0.15em]" style={{ color: slot.visual!.accent }}>{slot.visual!.footer}</p>}
              </div>
              <div className="flex items-center justify-between border-t px-4 py-2" style={{ borderColor: slot.visual!.text + "15" }}>
                <span className="font-sans text-[0.5rem] font-semibold uppercase tracking-widest" style={{ color: slot.visual!.text, opacity: 0.3 }}>1080×1080</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={slot.visual!.accent} strokeWidth="2.5" opacity="0.6"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </div>
            </button>
          );
        })()}

        {slot.carousel && slot.carousel.length > 0 && (() => {
          const first = slot.carousel![0];
          const isStatus = slot.type === "WhatsApp Status";
          return (
            <button onClick={() => setHubModal({ slides: slot.carousel!, title: slot.type, caption: slot.caption })}
              className="mx-3 mb-3 w-[calc(100%-1.5rem)] overflow-hidden rounded-xl text-left transition-all active:scale-[0.98] hover:opacity-90"
              style={{ backgroundColor: first.bg }}>
              <div className="p-5">
                {first.title && <p className="font-serif text-sm font-bold leading-snug" style={{ color: first.text, whiteSpace: "pre-line" }}>{first.title}</p>}
                {first.body && <p className="mt-2 font-sans text-[0.65rem] leading-relaxed" style={{ color: first.text, opacity: 0.7, whiteSpace: "pre-line" }}>{first.body.split("\n")[0]}</p>}
              </div>
              <div className="flex items-center justify-between border-t px-4 py-2" style={{ borderColor: first.text + "15" }}>
                <div className="flex items-center gap-1.5">
                  {slot.carousel!.map((sl, sli) => (
                    <div key={sli} className="rounded-sm" style={{ width: sli === 0 ? 16 : 8, height: 8, backgroundColor: sli === 0 ? first.accent : sl.bg === first.bg ? first.text + "30" : sl.bg, opacity: sli === 0 ? 1 : 0.5 }} />
                  ))}
                  <span className="ml-1 font-sans text-[0.5rem] font-semibold uppercase tracking-widest" style={{ color: first.text, opacity: 0.35 }}>{slot.carousel!.length} {isStatus ? "status" : "slides"}</span>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={first.accent} strokeWidth="2.5" opacity="0.6"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </div>
            </button>
          );
        })()}

        {slot.caption && (
          <div className="border-t border-cream/5 px-4 pb-4 pt-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-sans text-[0.45rem] font-bold uppercase tracking-[0.15em] text-cream/25">Legenda</span>
              <button onClick={() => copyText(`slot-${idx}`, slot.caption!)}
                className="rounded bg-cream/8 px-2 py-0.5 font-sans text-[0.45rem] font-semibold text-cream/40 hover:bg-cream/15 transition-all">
                {copiedId === `slot-${idx}` ? "Copiado" : "Copiar"}
              </button>
            </div>
            <p className="font-sans text-[0.6rem] leading-relaxed text-cream/40 whitespace-pre-wrap">{slot.caption}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-[#1a1814]">

      {/* ── HEADER ── */}
      <div className="sticky top-0 z-30 border-b border-[#c9b896]/10 bg-[#1a1814]/95 backdrop-blur-lg">
        <div className="mx-auto max-w-lg px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-1.5 font-sans text-xs text-[#c9b896]/50 hover:text-[#c9b896]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              Painel
            </Link>
            <p className="font-serif text-sm font-medium tracking-wide text-cream/90">Conteúdo</p>
            <Link href="/painel/marketing/gerador"
              className="rounded-lg border border-[#c9b896]/30 px-2.5 py-1.5 font-sans text-[0.6rem] font-medium text-[#c9b896]/80 hover:border-[#c9b896]/60">
              Gerador
            </Link>
          </div>

          {/* ── Nav principal (única linha) ── */}
          <div className="mt-3 -mx-4 overflow-x-auto px-4 scrollbar-none">
            <div className="flex gap-1" style={{ width: "max-content" }}>
              {([
                { id: "semana" as const,    label: "Semana",     badge: undefined },
                { id: "feed" as const,      label: "Feed",       badge: hubFeedPosts.length },
                { id: "carrosseis" as const,label: "Carrosseis", badge: professionalCarousels.length },
                { id: "status" as const,    label: "Status",     badge: hubStatusPosts.length },
                { id: "reels" as const,     label: "Reels",      badge: capcutContent.length },
              ] satisfies { id: Section; label: string; badge?: number }[]).map((s) => (
                <button key={s.id} onClick={() => setSection(s.id)}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 font-sans text-[0.65rem] font-semibold whitespace-nowrap transition-all ${
                    section === s.id
                      ? "bg-[#c9b896] text-[#1a1814]"
                      : "text-cream/40 hover:text-cream/70 hover:bg-cream/5"
                  }`}>
                  {s.label}
                  {s.badge != null && (
                    <span className={`rounded-full px-1.5 py-px font-mono text-[0.45rem] ${
                      section === s.id ? "bg-[#1a1814]/20 text-[#1a1814]/70" : "bg-cream/10 text-cream/30"
                    }`}>{s.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pb-28">

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* SEMANA — guia temático semanal (inspiração, não obrigação)           */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {section === "semana" && (
          <div className="py-4 space-y-4">

            {/* Faixa de temas (7 colunas — um por tipo de dia) */}
            <div className="grid grid-cols-7 gap-1">
              {WEEKLY_RHYTHM.map((w, i) => {
                const isSel = selectedWeekday === i;
                const isTod = today === i;
                return (
                  <button key={i} onClick={() => setSelectedWeekday(i)}
                    className={`flex flex-col items-center rounded-xl py-2.5 transition-all ${
                      isSel ? "bg-[#c9b896] shadow-lg shadow-[#c9b896]/20"
                      : "hover:bg-cream/5"
                    }`}>
                    <span className={`font-sans text-[0.55rem] font-bold ${isSel ? "text-[#1a1814]" : "text-cream/50"}`}>{w.hint}</span>
                    <span className={`mt-0.5 font-sans text-[0.42rem] ${isSel ? "text-[#1a1814]/50" : isTod ? "text-[#c9b896]/60" : "text-cream/25"}`}>{w.label}{isTod ? " ·" : ""}</span>
                  </button>
                );
              })}
            </div>

            {/* Cabeçalho do dia */}
            {dayData ? (
              <div className="rounded-2xl border border-[#c9b896]/15 bg-gradient-to-br from-[#c9b896]/10 to-[#c9b896]/3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-sans text-[0.5rem] font-bold uppercase tracking-[0.2em] text-[#c9b896]/50">Tema · {thematicHub[r.themeIdx]?.title}</p>
                    <h3 className="mt-1.5 font-serif text-base leading-snug text-cream/90">{dayData.theme}</h3>
                  </div>
                  <span className="shrink-0 rounded-full border border-[#c9b896]/20 px-2 py-0.5 font-mono text-[0.45rem] text-[#c9b896]/50">
                    {dayData.slots.length} peça{dayData.slots.length > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-cream/5 bg-[#222019] p-6 text-center">
                <p className="font-sans text-xs text-cream/30">Sem conteúdo para este tema.</p>
              </div>
            )}

            {dayData?.slots.map((slot, si) => <SlotCard key={si} slot={slot} idx={si} />)}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* FEED — posts 1:1 para o feed do Instagram                            */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {section === "feed" && (
          <div className="py-4 space-y-2">
            <p className="mb-3 font-sans text-[0.55rem] text-cream/25">Posts quadrados · 1080×1080px · Instagram feed</p>
            {hubFeedPosts.map((item, fi) => (
              <div key={item.id} className="overflow-hidden rounded-2xl">
                <button
                  onClick={() => setHubModal({ slides: [item.slide], title: item.theme, caption: item.caption })}
                  className="w-full overflow-hidden text-left transition-all active:scale-[0.98] hover:opacity-90"
                  style={{ backgroundColor: item.slide.bg }}>
                  <div className="p-5">
                    {item.slide.title && <p className="font-serif text-sm font-bold leading-snug" style={{ color: item.slide.text, whiteSpace: "pre-line" }}>{item.slide.title}</p>}
                    {item.slide.body && <p className="mt-2 font-sans text-[0.65rem] leading-relaxed" style={{ color: item.slide.text, opacity: 0.7, whiteSpace: "pre-line" }}>{item.slide.body}</p>}
                    {item.slide.footer && <p className="mt-3 font-sans text-[0.5rem] font-semibold uppercase tracking-[0.15em]" style={{ color: item.slide.accent }}>{item.slide.footer}</p>}
                  </div>
                  <div className="flex items-center justify-between border-t px-4 py-2.5" style={{ borderColor: item.slide.text + "15" }}>
                    <span className="font-sans text-[0.5rem] font-semibold uppercase tracking-widest" style={{ color: item.slide.text, opacity: 0.3 }}>1:1 + 9:16 · {item.weekTitle}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={item.slide.accent} strokeWidth="2.5" opacity="0.6"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </div>
                </button>
                {item.caption && (
                  <div className="border-t border-cream/5 bg-[#1a1814] px-4 pb-4 pt-3">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="font-sans text-[0.45rem] font-bold uppercase tracking-[0.15em] text-cream/25">Legenda</span>
                      <button onClick={() => copyText(`feed-${fi}`, item.caption!)}
                        className="rounded bg-cream/8 px-2 py-0.5 font-sans text-[0.45rem] font-semibold text-cream/40 hover:bg-cream/15 transition-all">
                        {copiedId === `feed-${fi}` ? "Copiado" : "Copiar"}
                      </button>
                    </div>
                    <p className="font-sans text-[0.6rem] leading-relaxed text-cream/40 whitespace-pre-wrap">{item.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* CARROSSEIS — séries de slides temáticos                              */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {section === "carrosseis" && (
          <div className="py-4 space-y-2">
            <p className="mb-3 font-sans text-[0.55rem] text-cream/25">Carrosseis prontos · 1080×1080px · Instagram</p>
            {professionalCarousels.map((car, ci) => (
              <div key={car.id} className="overflow-hidden rounded-2xl">
                <button
                  onClick={() => setHubModal({ slides: car.slides, title: car.title, caption: car.caption })}
                  className="w-full overflow-hidden text-left transition-all active:scale-[0.98] hover:opacity-90"
                  style={{ backgroundColor: car.slides[0]?.bg || "#3d3630" }}>
                  <div className="p-5">
                    <p className="font-serif text-sm font-bold leading-snug" style={{ color: car.slides[0]?.text || "#f7f5f0", whiteSpace: "pre-line" }}>
                      {car.slides[0]?.title || car.title}
                    </p>
                    {car.description && <p className="mt-2 font-sans text-[0.65rem] leading-relaxed" style={{ color: car.slides[0]?.text || "#f7f5f0", opacity: 0.6 }}>{car.description}</p>}
                  </div>
                  <div className="flex items-center justify-between border-t px-4 py-2.5" style={{ borderColor: (car.slides[0]?.text || "#f7f5f0") + "15" }}>
                    <div className="flex items-center gap-1.5">
                      {car.slides.map((sl, sli) => (
                        <div key={sli} className="rounded-sm" style={{ width: sli === 0 ? 16 : 8, height: 8, backgroundColor: sli === 0 ? (sl.accent || "#c9b896") : sl.bg, opacity: sli === 0 ? 1 : 0.45 }} />
                      ))}
                      <span className="ml-1 font-sans text-[0.5rem] font-semibold uppercase tracking-widest" style={{ color: car.slides[0]?.text || "#f7f5f0", opacity: 0.3 }}>{car.slides.length} slides · 1:1 e 9:16</span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={car.slides[0]?.accent || "#c9b896"} strokeWidth="2.5" opacity="0.6"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </div>
                </button>
                {car.caption && (
                  <div className="border-t border-cream/5 bg-[#1a1814] px-4 pb-4 pt-3">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="font-sans text-[0.45rem] font-bold uppercase tracking-[0.15em] text-cream/25">Legenda</span>
                      <button onClick={() => copyText(`carr-${ci}`, car.caption!)}
                        className="rounded bg-cream/8 px-2 py-0.5 font-sans text-[0.45rem] font-semibold text-cream/40 hover:bg-cream/15 transition-all">
                        {copiedId === `carr-${ci}` ? "Copiado" : "Copiar"}
                      </button>
                    </div>
                    <p className="font-sans text-[0.6rem] leading-relaxed text-cream/40 whitespace-pre-wrap">{car.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* STATUS — imagens 9:16 para WA Status e Stories                       */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {section === "status" && (
          <div className="py-4 space-y-2">
            <p className="mb-3 font-sans text-[0.55rem] text-cream/25">Imagens verticais · 1080×1920px · WA Status e Stories</p>
            {hubStatusPosts.map((item, si) => (
              <div key={item.id} className="overflow-hidden rounded-2xl">
                <button
                  onClick={() => setHubModal({ slides: item.slides, title: item.theme, caption: item.caption })}
                  className="w-full overflow-hidden text-left transition-all active:scale-[0.98] hover:opacity-90"
                  style={{ backgroundColor: item.slides[0]?.bg || "#3d3630" }}>
                  <div className="flex gap-3 p-5">
                    {/* Miniatura vertical */}
                    <div className="shrink-0 rounded-lg overflow-hidden flex flex-col justify-center px-1.5"
                      style={{ width: 40, height: 72, backgroundColor: item.slides[0]?.bg }}>
                      <p className="font-serif text-center leading-tight" style={{ fontSize: 4.5, color: item.slides[0]?.text, whiteSpace: "pre-line" }}>
                        {item.slides[0]?.title?.split("\n").slice(0, 5).join("\n")}
                      </p>
                      {item.slides[0]?.footer && (
                        <p className="mt-0.5 text-center font-sans font-semibold uppercase" style={{ fontSize: 3, color: item.slides[0]?.accent, letterSpacing: "0.05em" }}>
                          {item.slides[0].footer}
                        </p>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm font-bold leading-snug" style={{ color: item.slides[0]?.text || "#f7f5f0", whiteSpace: "pre-line" }}>
                        {item.slides[0]?.title?.split("\n").slice(0, 2).join("\n")}
                      </p>
                      <p className="mt-1 font-sans text-[0.55rem]" style={{ color: item.slides[0]?.text || "#f7f5f0", opacity: 0.4 }}>{item.theme}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t px-4 py-2.5" style={{ borderColor: (item.slides[0]?.text || "#f7f5f0") + "15" }}>
                    <span className="font-sans text-[0.5rem] font-semibold uppercase tracking-widest" style={{ color: item.slides[0]?.text || "#f7f5f0", opacity: 0.3 }}>
                      {item.slides.length} imagem{item.slides.length > 1 ? "ns" : ""} · 9:16 · {item.weekTitle}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={item.slides[0]?.accent || "#c9b896"} strokeWidth="2.5" opacity="0.6"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </div>
                </button>
                {item.caption && (
                  <div className="border-t border-cream/5 bg-[#1a1814] px-4 pb-4 pt-3">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="font-sans text-[0.45rem] font-bold uppercase tracking-[0.15em] text-cream/25">Legenda</span>
                      <button onClick={() => copyText(`status-${si}`, item.caption!)}
                        className="rounded bg-cream/8 px-2 py-0.5 font-sans text-[0.45rem] font-semibold text-cream/40 hover:bg-cream/15 transition-all">
                        {copiedId === `status-${si}` ? "Copiado" : "Copiar"}
                      </button>
                    </div>
                    <p className="font-sans text-[0.6rem] leading-relaxed text-cream/40 whitespace-pre-wrap">{item.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* REELS — CapCut templates + scripts de reel                           */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {section === "reels" && (
          <div className="py-4 space-y-4">

            {/* CapCut templates */}
            <div className="space-y-2">
              <p className="font-sans text-[0.55rem] text-cream/25">CapCut · imagem + áudio · toca para abrir</p>
              {capcutContent.map((entry) => (
                <button key={entry.id}
                  onClick={() => setCapcutModal(entry)}
                  className="w-full rounded-2xl border border-cream/10 bg-[#222019] p-3 text-left transition-all hover:border-[#c9b896]/20 active:scale-[0.98]">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 rounded-xl overflow-hidden" style={{ width: 56, height: 56, backgroundColor: entry.slide.bg, display: "flex", flexDirection: "column", justifyContent: "center", padding: "6px" }}>
                      <p className="font-serif leading-tight text-center" style={{ fontSize: 6, color: entry.slide.text, whiteSpace: "pre-line" }}>{entry.slide.title}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-xs font-semibold text-cream/70 truncate">{entry.title}</p>
                      <p className="mt-0.5 font-sans text-[0.55rem] text-cream/30 truncate">{entry.categoryLabel}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-1 rounded-lg border border-[#c9b896]/20 px-2 py-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c9b896" strokeWidth="2" opacity="0.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      <span className="font-sans text-[0.45rem] font-semibold text-[#c9b896]/50">CapCut</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Scripts de reel */}
            <div className="space-y-2">
              <p className="font-sans text-[0.55rem] text-cream/25">Scripts de Reel · copia e grava</p>
              {reelScripts.map((reel, ri) => (
                <div key={ri} className="overflow-hidden rounded-2xl border border-cream/10 bg-[#222019]">
                  <div className="px-4 py-3 border-b border-cream/5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-sans text-xs font-semibold text-cream/70 line-clamp-1">{reel.hook}</p>
                      <button onClick={() => copyText(`reel-${ri}`, [reel.hook, ...reel.scenes, `CTA: ${reel.cta}`].join("\n\n"))}
                        className="shrink-0 rounded-lg bg-cream/8 px-2.5 py-1 font-sans text-[0.5rem] font-semibold text-cream/40 hover:bg-cream/15 transition-all">
                        {copiedId === `reel-${ri}` ? "Copiado" : "Copiar"}
                      </button>
                    </div>
                    <p className="mt-1 font-sans text-[0.5rem] text-cream/30">{reel.duration} · {reel.music.split(",")[0]}</p>
                  </div>
                  <div className="px-4 py-3 space-y-1.5">
                    {reel.scenes.map((scene, si) => (
                      <p key={si} className="font-sans text-[0.6rem] leading-relaxed text-cream/40">{scene}</p>
                    ))}
                    <p className="mt-2 font-sans text-[0.6rem] font-semibold text-[#c9b896]/60">CTA: {reel.cta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>

    {/* ════════════════════════════════════════════════════════════════════════ */}
    {/* MODAL DE EXPORTAÇÃO — slides quadrados + verticais                      */}
    {/* ════════════════════════════════════════════════════════════════════════ */}
    {hubModal && (() => {
      const sqW = 280, sqScale = sqW / DIMS.w;
      const vtW = 160, vtH = Math.round(STORY_DIMS.h * (vtW / STORY_DIMS.w)), vtScale = vtW / STORY_DIMS.w;
      const slides = hubModal.slides;
      return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#1a1814]">
          {/* Header */}
          <div className="shrink-0 border-b border-cream/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => { setHubModal(null); hubSlideSquareRefs.current = []; hubSlideVertRefs.current = []; }}
                aria-label="Fechar"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream/10 text-cream/60">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
              </button>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-xs font-semibold text-cream/70 truncate">{hubModal.title}</p>
                <p className="font-sans text-[0.5rem] text-cream/30">{slides.length} imagem{slides.length > 1 ? "ns" : ""}</p>
              </div>
              {slides.length > 1 && (
                <div className="flex gap-2">
                  <button onClick={() => exportAllHub(slides.length, "square")} disabled={hubExportingSquare !== null}
                    className="rounded-lg bg-cream/10 px-2.5 py-1.5 font-sans text-[0.55rem] font-semibold text-cream/60 hover:bg-cream/15 disabled:opacity-40 transition-all">
                    {hubExportingSquare === "all" ? "..." : "1:1 ×" + slides.length}
                  </button>
                  <button onClick={() => exportAllHub(slides.length, "vert")} disabled={hubExportingVert !== null}
                    className="rounded-lg bg-cream/10 px-2.5 py-1.5 font-sans text-[0.55rem] font-semibold text-cream/60 hover:bg-cream/15 disabled:opacity-40 transition-all">
                    {hubExportingVert === "all" ? "..." : "9:16 ×" + slides.length}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">

            {/* Caption */}
            {hubModal.caption && (
              <div className="rounded-2xl border border-cream/10 bg-[#222019] p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-sans text-[0.5rem] font-bold uppercase tracking-[0.15em] text-cream/30">Legenda</span>
                  <button onClick={() => copyText("modal-caption", hubModal.caption!)}
                    className="rounded bg-cream/8 px-2.5 py-1 font-sans text-[0.5rem] font-semibold text-cream/40 hover:bg-cream/15 transition-all">
                    {copiedId === "modal-caption" ? "Copiado" : "Copiar"}
                  </button>
                </div>
                <p className="font-sans text-[0.65rem] leading-relaxed text-cream/50 whitespace-pre-wrap">
                  {stripHashtags(hubModal.caption)}
                </p>
              </div>
            )}

            {/* Slides */}
            {slides.map((slide, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[0.5rem] font-bold uppercase tracking-[0.15em] text-cream/30">Imagem {idx + 1}</span>
                  <div className="flex-1" />
                  <button onClick={() => exportHubSlide(idx, "square")} disabled={hubExportingSquare !== null}
                    className="rounded-lg bg-[#E1306C]/15 px-3 py-1 font-sans text-[0.55rem] font-semibold text-[#E1306C]/80 hover:bg-[#E1306C]/25 disabled:opacity-40 transition-all">
                    {hubExportingSquare === idx ? "..." : "1:1"}
                  </button>
                  <button onClick={() => exportHubSlide(idx, "vert")} disabled={hubExportingVert !== null}
                    className="rounded-lg bg-[#25D366]/10 px-3 py-1 font-sans text-[0.55rem] font-semibold text-[#25D366]/80 hover:bg-[#25D366]/20 disabled:opacity-40 transition-all">
                    {hubExportingVert === idx ? "..." : "9:16"}
                  </button>
                </div>
                {/* Square preview */}
                <div className="flex gap-3">
                  <div ref={(el) => { hubSlideSquareRefs.current[idx] = el; }}
                    className="overflow-hidden rounded-xl border border-cream/10" style={{ width: sqW, height: sqW }}>
                    <SlidePreview slide={slide} index={idx} scale={sqScale} />
                  </div>
                  {/* Vertical preview */}
                  <div ref={(el) => { hubSlideVertRefs.current[idx] = el; }}
                    className="overflow-hidden rounded-xl border border-cream/10" style={{ width: vtW, height: vtH }}>
                    <SlidePreviewVertical slide={slide} index={idx} scale={vtScale} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    })()}

    {/* ════════════════════════════════════════════════════════════════════════ */}
    {/* MODAL CAPCUT                                                             */}
    {/* ════════════════════════════════════════════════════════════════════════ */}
    {capcutModal && (() => {
      const sqW = 280, sqH = 280, sqScale = sqW / DIMS.w;
      const vtW = 160, vtH = Math.round(STORY_DIMS.h * (vtW / STORY_DIMS.w)), vtScale = vtW / STORY_DIMS.w;
      const audioUrl = `${AUDIO_BASE_PATH}/${capcutModal.audioFile}`;
      return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#1a1814]">
          <div className="shrink-0 border-b border-cream/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => { setCapcutModal(null); setCapcutExportingSquare(false); setCapcutExportingVert(false); }}
                aria-label="Fechar"
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
            {/* Áudio */}
            <div className="rounded-2xl border border-[#c9b896]/15 bg-[#c9b896]/5 p-4 space-y-3">
              <p className="font-sans text-[0.5rem] font-bold uppercase tracking-[0.2em] text-[#c9b896]/50">Áudio da Vivianne</p>
              <p className="font-sans text-[0.65rem] leading-relaxed text-cream/70 italic">&ldquo;{capcutModal.script}&rdquo;</p>
              {/* Player de áudio nativo */}
              <audio
                key={audioUrl}
                controls
                preload="metadata"
                className="w-full rounded-xl"
                style={{ height: 44, colorScheme: "dark" }}
              >
                <source src={audioUrl} type="audio/mpeg" />
                <source src={audioUrl} type="audio/mp4" />
              </audio>
              <div className="flex items-center justify-between border-t border-cream/5 pt-2">
                <p className="font-mono text-[0.5rem] text-cream/25">{capcutModal.audioFile}</p>
                <a href={audioUrl} download={capcutModal.audioFile}
                  className="rounded-lg bg-[#c9b896]/15 px-3 py-1.5 font-sans text-[0.55rem] font-semibold text-[#c9b896]/80 hover:bg-[#c9b896]/25 transition-all">
                  Baixar
                </a>
              </div>
            </div>

            {/* ── Instagram 1:1 ── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-sans text-[0.5rem] font-bold uppercase tracking-[0.2em] text-cream/30">Imagens</p>
                <div className="flex gap-2">
                  <button onClick={async () => { const wrapper = capcutSlideSquareRef.current; if (!wrapper) return; const el = (wrapper.firstElementChild as HTMLElement) || wrapper; setCapcutExportingSquare(true); try { await captureElement(el, DIMS, `${capcutModal.id}-square.png`); } catch { /**/ } setCapcutExportingSquare(false); }} disabled={capcutExportingSquare}
                    className="rounded-lg bg-[#E1306C]/15 px-3 py-1 font-sans text-[0.55rem] font-semibold text-[#E1306C]/80 hover:bg-[#E1306C]/25 disabled:opacity-40 transition-all">
                    {capcutExportingSquare ? "..." : "1:1"}
                  </button>
                  <button onClick={async () => { const wrapper = capcutSlideVertRef.current; if (!wrapper) return; const el = (wrapper.firstElementChild as HTMLElement) || wrapper; setCapcutExportingVert(true); try { await captureElement(el, STORY_DIMS, `${capcutModal.id}-story.png`); } catch { /**/ } setCapcutExportingVert(false); }} disabled={capcutExportingVert}
                    className="rounded-lg bg-[#25D366]/10 px-3 py-1 font-sans text-[0.55rem] font-semibold text-[#25D366]/80 hover:bg-[#25D366]/20 disabled:opacity-40 transition-all">
                    {capcutExportingVert ? "..." : "9:16"}
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <div ref={capcutSlideSquareRef} className="overflow-hidden rounded-xl border border-cream/10" style={{ width: sqW, height: sqH }}>
                  <SlidePreview slide={capcutModal.slide} index={0} scale={sqScale} />
                </div>
                <div ref={capcutSlideVertRef} className="overflow-hidden rounded-xl border border-cream/10" style={{ width: vtW, height: vtH }}>
                  <SlidePreviewVertical slide={capcutModal.slide} index={0} scale={vtScale} />
                </div>
              </div>
            </div>

            {/* Como usar */}
            <div className="rounded-2xl border border-cream/5 bg-[#222019] p-4 space-y-2">
              <p className="font-sans text-[0.5rem] font-bold uppercase tracking-[0.15em] text-cream/30">Como usar no CapCut</p>
              <ol className="space-y-1.5">
                {["Baixa a imagem (9:16) e o áudio", "Abre o CapCut → Novo projecto → Adiciona a imagem", "Adiciona o áudio na timeline", "Ajusta timing se necessário → Exporta", "Publica como Reel"].map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="shrink-0 font-mono text-[0.5rem] font-bold text-[#c9b896]/30">{i + 1}.</span>
                    <span className="font-sans text-[0.6rem] leading-relaxed text-cream/40">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
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
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Reset state when src changes
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setError(false);
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => setPlaying(false);
    const onError = () => { setError(true); setPlaying(false); };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onError);
    };
  }, [src]);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio || error) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setError(true);
      }
    }
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
      <audio key={src} ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-2.5">
        <button
          onClick={toggle}
          disabled={error}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-opacity ${
            error ? "bg-cream/10 opacity-40 cursor-not-allowed" : "bg-[#c9b896] text-[#1a1814] hover:opacity-80"
          }`}
        >
          {error ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-cream/40">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          ) : playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-[#1a1814]">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3.5 w-3.5 text-[#1a1814]">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="flex-1 min-w-0">
          {error ? (
            <p className="font-sans text-[0.55rem] text-cream/30">Ficheiro não encontrado no Storage</p>
          ) : (
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
          )}
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
