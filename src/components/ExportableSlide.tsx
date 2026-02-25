"use client";

import { useRef, useState, useCallback } from "react";
import { toPng } from "html-to-image";

export type SlideData = {
  bg: string;
  text: string;
  accent: string;
  title: string;
  body: string;
  footer?: string;
  /** Optional background image (blurred behind the color overlay) */
  bgImage?: string;
};

type Props = {
  slide: SlideData;
  index: number;
  format?: "square" | "carousel" | "story";
  /** When true, show download button on hover */
  showDownload?: boolean;
  /** Prefix for the downloaded filename */
  filePrefix?: string;
};

const DIMS: Record<string, { w: number; h: number }> = {
  square: { w: 1080, h: 1080 },
  carousel: { w: 1080, h: 1350 },
  story: { w: 1080, h: 1920 },
};

export default function ExportableSlide({
  slide,
  index,
  format = "carousel",
  showDownload = true,
  filePrefix = "sete-veus",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const dim = DIMS[format];
  // Preview scale — fit inside a reasonable card
  const previewH = format === "story" ? 420 : format === "carousel" ? 380 : 300;
  const scale = previewH / dim.h;

  const handleExport = useCallback(async () => {
    if (!ref.current || exporting) return;
    setExporting(true);
    try {
      const el = ref.current;
      const orig = { t: el.style.transform, w: el.style.width, h: el.style.height };
      el.style.transform = "none";
      el.style.width = `${dim.w}px`;
      el.style.height = `${dim.h}px`;
      const dataUrl = await toPng(el, {
        width: dim.w,
        height: dim.h,
        pixelRatio: 1,
        cacheBust: true,
      });
      el.style.transform = orig.t;
      el.style.width = orig.w;
      el.style.height = orig.h;
      const a = document.createElement("a");
      a.download = `${filePrefix}-slide-${index + 1}.png`;
      a.href = dataUrl;
      a.click();
    } catch {
      // silent fail
    }
    setExporting(false);
  }, [dim, exporting, filePrefix, index]);

  // Decide font sizes based on format
  const titleSize = format === "story" ? 56 : format === "carousel" ? 48 : 42;
  const bodySize = format === "story" ? 26 : format === "carousel" ? 22 : 20;
  const footerSize = format === "story" ? 18 : 16;

  return (
    <div className="group relative shrink-0">
      {/* Outer container with scale */}
      <div
        className="overflow-hidden rounded-xl shadow-lg transition-shadow group-hover:shadow-2xl"
        style={{ width: dim.w * scale, height: dim.h * scale }}
      >
        {/* Actual rendered slide at full resolution, scaled down for preview */}
        <div
          ref={ref}
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
          {/* Optional background image */}
          {slide.bgImage && (
            <>
              <img
                src={slide.bgImage}
                alt=""
                crossOrigin="anonymous"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter: "blur(30px)" }}
              />
              <div
                className="absolute inset-0"
                style={{ backgroundColor: slide.bg, opacity: 0.75 }}
              />
            </>
          )}

          {/* Slide number badge */}
          <div
            className="absolute left-[40px] top-[40px] flex h-[56px] w-[56px] items-center justify-center rounded-full"
            style={{
              backgroundColor: slide.accent + "30",
              color: slide.accent,
              fontFamily: "system-ui, sans-serif",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {index + 1}
          </div>

          {/* Content area */}
          <div
            className="absolute inset-0 flex flex-col justify-center"
            style={{ padding: "80px 72px" }}
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
              className="absolute inset-x-0 bottom-0"
              style={{ padding: "0 72px 48px" }}
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

          {/* Subtle corner accent */}
          <div
            className="absolute right-0 top-0"
            style={{
              width: 120,
              height: 120,
              background: `linear-gradient(135deg, ${slide.accent}15 0%, transparent 60%)`,
            }}
          />
        </div>
      </div>

      {/* Download overlay */}
      {showDownload && (
        <button
          onClick={handleExport}
          disabled={exporting}
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/0 opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100"
        >
          <span className="rounded-lg bg-white/90 px-4 py-2 font-sans text-xs font-medium text-brown-900 shadow-lg backdrop-blur-sm">
            {exporting ? "A exportar..." : "Descarregar PNG"}
          </span>
        </button>
      )}
    </div>
  );
}

/**
 * Exports a slide ref to PNG at full resolution. Used for batch export.
 */
export async function exportSlideToBlob(
  el: HTMLDivElement,
  dim: { w: number; h: number },
): Promise<string | null> {
  const orig = { t: el.style.transform, w: el.style.width, h: el.style.height };
  el.style.transform = "none";
  el.style.width = `${dim.w}px`;
  el.style.height = `${dim.h}px`;
  try {
    const dataUrl = await toPng(el, {
      width: dim.w,
      height: dim.h,
      pixelRatio: 1,
      cacheBust: true,
    });
    return dataUrl;
  } catch {
    return null;
  } finally {
    el.style.transform = orig.t;
    el.style.width = orig.w;
    el.style.height = orig.h;
  }
}
