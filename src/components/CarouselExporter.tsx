"use client";

import { useRef, useState, useCallback } from "react";
import { toPng } from "html-to-image";
import type { SlideData } from "./ExportableSlide";

type Props = {
  slides: SlideData[];
  caption: string;
  title: string;
  format?: "square" | "carousel" | "story";
  filePrefix?: string;
};

const DIMS: Record<string, { w: number; h: number }> = {
  square: { w: 1080, h: 1080 },
  carousel: { w: 1080, h: 1350 },
  story: { w: 1080, h: 1920 },
};

export default function CarouselExporter({
  slides,
  caption,
  title,
  format = "carousel",
  filePrefix = "sete-veus",
}: Props) {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [exporting, setExporting] = useState(false);
  const [exportingIdx, setExportingIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const dim = DIMS[format];
  const previewH = format === "story" ? 480 : format === "carousel" ? 440 : 360;
  const scale = previewH / dim.h;

  const titleSize = format === "story" ? 56 : format === "carousel" ? 48 : 42;
  const bodySize = format === "story" ? 26 : format === "carousel" ? 22 : 20;
  const footerSize = format === "story" ? 18 : 16;

  const exportOne = useCallback(
    async (idx: number) => {
      const el = slideRefs.current[idx];
      if (!el) return;
      setExportingIdx(idx);
      const orig = { t: el.style.transform, w: el.style.width, h: el.style.height };
      el.style.transform = "none";
      el.style.width = `${dim.w}px`;
      el.style.height = `${dim.h}px`;
      try {
        const dataUrl = await toPng(el, { width: dim.w, height: dim.h, pixelRatio: 1, cacheBust: true });
        const a = document.createElement("a");
        a.download = `${filePrefix}-slide-${idx + 1}.png`;
        a.href = dataUrl;
        a.click();
      } catch {
        // silent
      }
      el.style.transform = orig.t;
      el.style.width = orig.w;
      el.style.height = orig.h;
      setExportingIdx(null);
    },
    [dim, filePrefix],
  );

  const exportAll = useCallback(async () => {
    setExporting(true);
    for (let i = 0; i < slides.length; i++) {
      await exportOne(i);
      // Small delay between downloads so browser doesn't block them
      await new Promise((r) => setTimeout(r, 400));
    }
    setExporting(false);
  }, [slides.length, exportOne]);

  const copyCaption = useCallback(async () => {
    await navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [caption]);

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg text-brown-900">{title}</h3>
          <p className="font-sans text-xs text-brown-500">
            {slides.length} slides ~ {dim.w}x{dim.h}px ~ Pronto para publicar
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportAll}
            disabled={exporting}
            className={`rounded-lg bg-brown-900 px-5 py-2.5 font-sans text-xs font-medium text-cream transition-colors hover:bg-brown-800 ${exporting ? "opacity-60" : ""}`}
          >
            {exporting ? "A descarregar..." : `Descarregar ${slides.length} slides`}
          </button>
        </div>
      </div>

      {/* Slide navigator */}
      <div className="flex gap-1.5 overflow-x-auto pb-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`shrink-0 rounded-lg px-3 py-1.5 font-sans text-xs transition-all ${
              activeSlide === i
                ? "bg-brown-900 text-cream"
                : "bg-brown-50 text-brown-500 hover:bg-brown-100"
            }`}
          >
            Slide {i + 1}
          </button>
        ))}
      </div>

      {/* Active slide - large preview */}
      <div className="flex gap-8 max-lg:flex-col lg:items-start">
        {/* Preview */}
        <div className="flex flex-col items-center">
          <div
            className="overflow-hidden rounded-2xl shadow-2xl"
            style={{ width: dim.w * scale, height: dim.h * scale }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                style={{ display: activeSlide === i ? "block" : "none" }}
              >
                <div
                  ref={(el) => { slideRefs.current[i] = el; }}
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
                  {/* Optional bg image */}
                  {slide.bgImage && (
                    <>
                      <img
                        src={slide.bgImage}
                        alt=""
                        crossOrigin="anonymous"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ backgroundColor: slide.bg, opacity: 0.55 }}
                      />
                    </>
                  )}

                  {/* Slide number */}
                  <div
                    style={{
                      position: "absolute",
                      left: 40,
                      top: 40,
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      backgroundColor: slide.accent + "30",
                      color: slide.accent,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "system-ui, sans-serif",
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "80px 72px",
                    }}
                  >
                    {slide.title && (
                      <h2
                        style={{
                          fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                          fontSize: titleSize,
                          lineHeight: 1.2,
                          fontWeight: 700,
                          whiteSpace: "pre-line",
                          margin: 0,
                        }}
                      >
                        {slide.title}
                      </h2>
                    )}
                    {slide.title && slide.body && (
                      <div
                        style={{
                          width: "15%",
                          height: 2,
                          backgroundColor: slide.accent,
                          opacity: 0.5,
                          margin: "32px 0",
                        }}
                      />
                    )}
                    {slide.body && (
                      <p
                        style={{
                          fontFamily: "system-ui, -apple-system, sans-serif",
                          fontSize: bodySize,
                          lineHeight: 1.65,
                          fontWeight: 300,
                          whiteSpace: "pre-line",
                          margin: 0,
                          opacity: 0.85,
                        }}
                      >
                        {slide.body}
                      </p>
                    )}
                  </div>

                  {/* Footer */}
                  {slide.footer && (
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        padding: "0 72px 48px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "system-ui, sans-serif",
                            fontSize: footerSize,
                            fontWeight: 500,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: slide.accent,
                            margin: 0,
                          }}
                        >
                          {slide.footer}
                        </p>
                        <span
                          style={{
                            fontFamily: "Georgia, serif",
                            fontSize: 28,
                            opacity: 0.3,
                            color: slide.accent,
                          }}
                        >
                          ~
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Mandala watermark — brand identity */}
                  <img
                    src="/images/mandala-7veus.png"
                    alt=""
                    crossOrigin="anonymous"
                    style={{
                      position: "absolute",
                      right: 30,
                      top: 30,
                      width: 64,
                      height: 64,
                      opacity: 0.15,
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Per-slide download */}
          <button
            onClick={() => exportOne(activeSlide)}
            disabled={exportingIdx !== null}
            className="mt-4 rounded-lg border border-brown-200 bg-white px-5 py-2 font-sans text-xs text-brown-700 transition-colors hover:bg-cream"
          >
            {exportingIdx === activeSlide ? "A exportar..." : `Descarregar slide ${activeSlide + 1}`}
          </button>
        </div>

        {/* Caption + mini slides */}
        <div className="flex-1 space-y-5">
          {/* Mini slide strip */}
          <div>
            <p className="mb-2 font-sans text-[0.6rem] font-medium uppercase tracking-wider text-brown-500">
              Todos os slides
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {slides.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`relative flex aspect-[4/5] w-20 shrink-0 flex-col justify-center overflow-hidden rounded-lg border-2 p-2 transition-all ${
                    activeSlide === i
                      ? "border-sage ring-2 ring-sage/30"
                      : "border-transparent hover:border-brown-200"
                  }`}
                  style={{ backgroundColor: slide.bg, color: slide.text }}
                >
                  <div
                    className="absolute left-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full font-sans text-[0.4rem] font-bold"
                    style={{ backgroundColor: slide.accent + "40", color: slide.accent }}
                  >
                    {i + 1}
                  </div>
                  {slide.title && (
                    <span className="line-clamp-3 font-serif text-[0.35rem] leading-tight">
                      {slide.title}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Caption */}
          <div>
            <div className="flex items-center justify-between">
              <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-brown-500">
                Legenda (copiar e colar)
              </p>
              <button
                onClick={copyCaption}
                className="rounded-md bg-cream px-3 py-1 font-sans text-[0.55rem] text-brown-600 hover:bg-cream-dark"
              >
                {copied ? "Copiada!" : "Copiar"}
              </button>
            </div>
            <pre className="mt-2 max-h-60 overflow-y-auto whitespace-pre-wrap rounded-xl bg-cream/50 p-4 font-sans text-[0.75rem] leading-relaxed text-brown-600">
              {caption}
            </pre>
          </div>

          {/* Format info */}
          <div className="rounded-lg bg-sage/5 p-4">
            <p className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-sage">
              Como usar
            </p>
            <ol className="mt-2 space-y-1 font-sans text-[0.7rem] leading-relaxed text-brown-600">
              <li>1. Clica "Descarregar {slides.length} slides" para descarregar todas as imagens</li>
              <li>2. No Instagram, cria um novo post e selecciona todas as imagens em ordem</li>
              <li>3. Copia a legenda e cola no Instagram</li>
              <li>4. Publica</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
