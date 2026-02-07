"use client";

import { useState, useRef } from "react";

/* ─────────────────────────────────────────────
   Brand tokens (kept local so every card is
   self-contained and copy-pasteable)
   ───────────────────────────────────────────── */
const brand = {
  brownDark: "#2d2620",
  brownDark2: "#4a3728",
  brownMedium: "#8a7b6b",
  cream: "#faf8f4",
  sage: "#7a8c6e",
  gold: "#c9b896",
  pink: "#b07a7a",
};

/* ═══════════════════════════════════════════════
   1. QuoteCardPreview
   ═══════════════════════════════════════════════ */
export interface QuoteCardPreviewProps {
  quote: string;
  author?: string;
  accentColor?: string;
  style?: "dark" | "light" | "gradient" | "minimal";
}

export function QuoteCardPreview({
  quote,
  author = "Vivianne dos Santos",
  accentColor = brand.gold,
  style = "dark",
}: QuoteCardPreviewProps) {
  const styles: Record<
    NonNullable<QuoteCardPreviewProps["style"]>,
    { bg: string; text: string; brandText: string; extra?: string }
  > = {
    dark: {
      bg: brand.brownDark,
      text: brand.cream,
      brandText: brand.gold,
    },
    light: {
      bg: brand.cream,
      text: brand.brownDark,
      brandText: brand.brownMedium,
    },
    gradient: {
      bg: `linear-gradient(135deg, ${brand.brownDark} 0%, ${accentColor} 100%)`,
      text: brand.cream,
      brandText: "rgba(255,255,255,0.7)",
    },
    minimal: {
      bg: "#ffffff",
      text: brand.brownDark,
      brandText: brand.brownMedium,
    },
  };

  const s = styles[style];
  const isGradient = style === "gradient";

  return (
    <div
      className="relative aspect-square w-full max-w-[480px] rounded-xl shadow-md transition-transform duration-200 hover:scale-[1.02] overflow-hidden select-none"
      style={{
        background: isGradient ? undefined : s.bg,
        backgroundImage: isGradient ? s.bg : undefined,
        color: s.text,
      }}
    >
      {/* Accent stripe — dark style only */}
      {style === "dark" && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5"
          style={{ backgroundColor: accentColor }}
        />
      )}

      <div className="flex flex-col justify-between h-full p-8">
        {/* Quote body */}
        <div className="flex-1 flex items-center">
          <p
            className={`font-serif leading-relaxed ${
              style === "minimal"
                ? "text-base text-center w-full"
                : "text-lg md:text-xl"
            }`}
          >
            &ldquo;{quote}&rdquo;
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between mt-4">
          <span
            className="text-sm opacity-80"
            style={{ color: s.text }}
          >
            &mdash; {author}
          </span>
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: s.brandText }}
          >
            Os Sete V&eacute;us
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   2. CarouselPreview
   ═══════════════════════════════════════════════ */
export interface CarouselPreviewProps {
  slides: string[];
  title: string;
  accentColor?: string;
}

export function CarouselPreview({
  slides,
  title,
  accentColor = brand.gold,
}: CarouselPreviewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const totalSlides = slides.length + 2; // title + content + CTA

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const slideWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth
      : 1;
    const idx = Math.round(el.scrollLeft / slideWidth);
    setActiveIdx(idx);
  };

  const scrollTo = (idx: number) => {
    if (!scrollRef.current) return;
    const slideWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth
      : 0;
    scrollRef.current.scrollTo({ left: slideWidth * idx, behavior: "smooth" });
    setActiveIdx(idx);
  };

  const slideBase =
    "flex-shrink-0 w-full aspect-square rounded-xl flex flex-col justify-center items-center p-8 text-center select-none";

  return (
    <div className="w-full max-w-[480px]">
      {/* Scrollable track */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide rounded-xl"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Title slide */}
        <div
          className={`${slideBase} shadow-md`}
          style={{
            backgroundColor: brand.brownDark,
            color: brand.cream,
          }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: accentColor }}
          >
            Os Sete V&eacute;us
          </span>
          <h3 className="text-xl md:text-2xl font-bold leading-snug">
            {title}
          </h3>
          <span className="mt-6 text-sm opacity-60">
            Desliza para descobrir &rarr;
          </span>
        </div>

        {/* Content slides */}
        {slides.map((text, i) => (
          <div
            key={i}
            className={`${slideBase} shadow-md`}
            style={{
              backgroundColor: brand.cream,
              color: brand.brownDark,
            }}
          >
            <span
              className="text-xs font-bold tracking-widest mb-4"
              style={{ color: accentColor }}
            >
              {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
            <p className="text-base md:text-lg leading-relaxed">{text}</p>
          </div>
        ))}

        {/* CTA slide */}
        <div
          className={`${slideBase} shadow-md`}
          style={{
            background: `linear-gradient(135deg, ${brand.brownDark2} 0%, ${brand.sage} 100%)`,
            color: brand.cream,
          }}
        >
          <p className="text-lg md:text-xl font-bold mb-6">
            Faz o teste gratuito
          </p>
          <span
            className="text-sm font-semibold px-5 py-2.5 rounded-full"
            style={{
              backgroundColor: accentColor,
              color: brand.brownDark,
            }}
          >
            seteecos.com
          </span>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="w-2 h-2 rounded-full transition-all duration-200"
            style={{
              backgroundColor:
                i === activeIdx ? brand.brownDark : brand.brownMedium,
              opacity: i === activeIdx ? 1 : 0.35,
              transform: i === activeIdx ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   3. ReelPreview
   ═══════════════════════════════════════════════ */
export interface ReelStep {
  second: string;
  visual: string;
  text?: string;
  audio?: string;
}

export interface ReelPreviewProps {
  steps: ReelStep[];
  title: string;
}

export function ReelPreview({ steps, title }: ReelPreviewProps) {
  return (
    <div
      className="relative w-full max-w-[320px] rounded-xl shadow-md transition-transform duration-200 hover:scale-[1.02] overflow-hidden select-none"
      style={{
        aspectRatio: "9/16",
        backgroundColor: brand.brownDark,
        color: brand.cream,
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center gap-2 px-5 py-4 border-b"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: brand.gold, color: brand.brownDark }}
        >
          SV
        </div>
        <div>
          <p className="text-xs font-semibold leading-tight">Os Sete V&eacute;us</p>
          <p className="text-[10px] opacity-50">Reel &middot; Storyboard</p>
        </div>
      </div>

      {/* Title */}
      <div className="px-5 pt-4 pb-2">
        <h4 className="text-sm font-bold leading-snug">{title}</h4>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto px-5 pb-5">
        <div className="relative pl-5 border-l border-white/15">
          {steps.map((step, i) => (
            <div key={i} className="mb-4 last:mb-0 relative">
              {/* Dot on timeline */}
              <div
                className="absolute -left-[22.5px] top-1 w-3 h-3 rounded-full border-2"
                style={{
                  borderColor: brand.gold,
                  backgroundColor: brand.brownDark,
                }}
              />

              {/* Timestamp */}
              <span
                className="text-[10px] font-mono font-semibold"
                style={{ color: brand.gold }}
              >
                {step.second}
              </span>

              {/* Visual */}
              <p className="text-xs mt-0.5 opacity-80">{step.visual}</p>

              {/* Text overlay */}
              {step.text && (
                <p
                  className="text-[11px] mt-1 italic pl-2 border-l-2"
                  style={{ borderColor: brand.pink, color: brand.cream }}
                >
                  &ldquo;{step.text}&rdquo;
                </p>
              )}

              {/* Audio note */}
              {step.audio && (
                <p
                  className="text-[10px] mt-1 flex items-center gap-1"
                  style={{ color: brand.sage }}
                >
                  <span>&#9835;</span> {step.audio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 py-3 text-center text-[10px] font-semibold tracking-widest uppercase"
        style={{
          background: `linear-gradient(transparent, ${brand.brownDark})`,
          color: brand.gold,
        }}
      >
        Os Sete V&eacute;us
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   4. EmailPreview
   ═══════════════════════════════════════════════ */
export interface EmailPreviewProps {
  subject: string;
  body: string;
  accentColor?: string;
}

export function EmailPreview({
  subject,
  body,
  accentColor = brand.gold,
}: EmailPreviewProps) {
  return (
    <div
      className="w-full max-w-[560px] rounded-xl shadow-md transition-transform duration-200 hover:scale-[1.02] overflow-hidden select-none"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 px-5 py-3 border-b"
        style={{ borderColor: "#e8e4de" }}
      >
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        <span
          className="ml-auto text-[10px] tracking-wide"
          style={{ color: brand.brownMedium }}
        >
          Caixa de Entrada
        </span>
      </div>

      {/* Headers */}
      <div
        className="px-6 py-4 border-b"
        style={{ borderColor: "#e8e4de" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: accentColor, color: brand.brownDark }}
          >
            VS
          </div>
          <div className="min-w-0">
            <p
              className="text-sm font-semibold truncate"
              style={{ color: brand.brownDark }}
            >
              Vivianne dos Santos
            </p>
            <p
              className="text-[11px] truncate"
              style={{ color: brand.brownMedium }}
            >
              vivianne@seteecos.com
            </p>
          </div>
        </div>
        <h3
          className="text-base font-bold leading-snug"
          style={{ color: brand.brownDark }}
        >
          {subject}
        </h3>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        <p
          className="text-sm leading-relaxed whitespace-pre-line"
          style={{ color: brand.brownDark2 }}
        >
          {body}
        </p>
      </div>

      {/* Footer */}
      <div
        className="px-6 py-3 text-center border-t"
        style={{ borderColor: "#e8e4de", backgroundColor: brand.cream }}
      >
        <span
          className="text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: brand.brownMedium }}
        >
          Os Sete V&eacute;us &middot; seteecos.com
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   5. StoryPreview
   ═══════════════════════════════════════════════ */
export interface StoryPreviewProps {
  question: string;
  options?: string[];
  accentColor?: string;
}

export function StoryPreview({
  question,
  options,
  accentColor = brand.gold,
}: StoryPreviewProps) {
  return (
    <div
      className="relative w-full max-w-[320px] rounded-xl shadow-md transition-transform duration-200 hover:scale-[1.02] overflow-hidden select-none"
      style={{
        aspectRatio: "9/16",
        background: `linear-gradient(160deg, ${brand.brownDark} 0%, ${brand.brownDark2} 40%, ${brand.pink} 100%)`,
        color: brand.cream,
      }}
    >
      {/* Story progress bar */}
      <div className="flex gap-1 px-3 pt-3">
        <div
          className="h-0.5 flex-1 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
        />
        <div
          className="h-0.5 flex-1 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        />
        <div
          className="h-0.5 flex-1 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        />
      </div>

      {/* Profile row */}
      <div className="flex items-center gap-2 px-4 py-3">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
          style={{ backgroundColor: accentColor, color: brand.brownDark }}
        >
          SV
        </div>
        <span className="text-xs font-semibold">os.sete.veus</span>
        <span className="text-[10px] opacity-50 ml-1">2h</span>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h4 className="text-lg font-bold leading-snug mb-8">{question}</h4>

        {/* Poll options */}
        {options && options.length > 0 && (
          <div className="w-full space-y-3">
            {options.map((opt, i) => (
              <div
                key={i}
                className="relative w-full rounded-lg py-3 px-4 text-sm font-medium text-left overflow-hidden"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {/* Fake poll result bar */}
                <div
                  className="absolute inset-y-0 left-0 rounded-lg"
                  style={{
                    width: i === 0 ? "62%" : i === 1 ? "38%" : "25%",
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                />
                <span className="relative">{opt}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom branding */}
      <div className="px-4 pb-5 pt-2 text-center">
        <span
          className="text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: accentColor }}
        >
          Os Sete V&eacute;us
        </span>
      </div>

      {/* Reply bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-t"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div
          className="flex-1 rounded-full py-1.5 px-3 text-[11px] opacity-40"
          style={{ border: "1px solid rgba(255,255,255,0.25)" }}
        >
          Enviar mensagem
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   6. CopyButton
   ═══════════════════════════════════════════════ */
export interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = "Copiar" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:opacity-80 active:scale-95"
      style={{
        backgroundColor: copied ? `${brand.sage}22` : `${brand.sage}15`,
        color: brand.sage,
        border: `1px solid ${brand.sage}30`,
      }}
    >
      {copied ? (
        <>
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Copiado!
        </>
      ) : (
        <>
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}
