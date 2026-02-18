"use client";

import { useState, useRef, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toPng } from "html-to-image";

const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];

// Print backgrounds disponíveis
const PRINTS = [
  { id: "homepage-hero", src: "/prints/homepage-hero-mandala.jpeg", label: "Homepage — Hero" },
  { id: "experiencia", src: "/prints/experiencia-funcionalidades.jpeg", label: "Experiencia" },
  { id: "quiz", src: "/prints/quiz-qual-veu.jpeg", label: "Quiz — Qual veu" },
  { id: "dashboard", src: "/prints/dashboard-membro.jpeg", label: "Dashboard" },
  { id: "leitura", src: "/prints/leitura-capitulo.jpeg", label: "Leitura" },
  { id: "ecos-tabs", src: "/prints/comunidade-ecos-tabs.jpeg", label: "Ecos — Tabs" },
  { id: "marcas", src: "/prints/comunidade-marcas-caminho.jpeg", label: "Marcas no Caminho" },
  { id: "reflexoes", src: "/prints/comunidade-reflexoes-leitoras.jpeg", label: "Reflexoes leitoras" },
  { id: "livro-fisico", src: "/prints/livro-fisico-preco-whatsapp.jpeg", label: "Livro fisico" },
  { id: "3-passos", src: "/prints/acesso-digital-3-passos.jpeg", label: "3 Passos" },
  { id: "comunidade-cta", src: "/prints/comunidade-cta-dark.jpeg", label: "Comunidade CTA" },
];

type Format = "story" | "post" | "carousel";

const FORMATS: Record<Format, { w: number; h: number; label: string }> = {
  story: { w: 1080, h: 1920, label: "Story (9:16)" },
  post: { w: 1080, h: 1080, label: "Post (1:1)" },
  carousel: { w: 1080, h: 1350, label: "Carrossel (4:5)" },
};

type TextPosition = "top" | "center" | "bottom";

// Presets de conteudo
const PRESETS = [
  {
    name: "Convite leitura",
    title: "E se pudesses ler\no que a tua alma\nja sabe?",
    subtitle: "Os Sete Veus do Despertar",
    cta: "seteveus.space",
  },
  {
    name: "Comunidade",
    title: "As vozes encontram-se\naqui.",
    subtitle: "Comunidade Ecos ~ anonima, impermanente",
    cta: "Entra em seteveus.space",
  },
  {
    name: "Livro fisico",
    title: "O livro que te le\na ti.",
    subtitle: "Edicao impressa ~ 1.500 MT\nVersao digital incluida",
    cta: "Encomenda via WhatsApp",
  },
  {
    name: "Espelho da Ilusao",
    title: "O primeiro veu\ne o mais silencioso.",
    subtitle: "Espelho da Ilusao ~ ja disponivel",
    cta: "Comeca em seteveus.space",
  },
  {
    name: "Codigo acesso",
    title: "Compraste o livro?\nTens acesso a tudo.",
    subtitle: "Usa o teu codigo e desbloqueia\na experiencia digital completa.",
    cta: "seteveus.space/registar-livro",
  },
  {
    name: "Despertar",
    title: "Nao e um livro.\nE um espelho.",
    subtitle: "7 veus. 7 historias. Uma jornada interior.",
    cta: "seteveus.space",
  },
  {
    name: "Frase leitora",
    title: '"sai do modo automatico.\nnao sei para onde vou\nmas pelo menos\nestou acordada."',
    subtitle: "~ leitora anonima, Veu 1",
    cta: "Comunidade Ecos ~ seteveus.space",
  },
  {
    name: "No da Heranca",
    title: "A mae sempre viu.\nEsperou anos.",
    subtitle: "O No da Heranca ~ desbloqueado\nao completar o Espelho da Ilusao",
    cta: "seteveus.space",
  },
];

export default function GeradorPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const canvasRef = useRef<HTMLDivElement>(null);

  // State
  const [selectedPrint, setSelectedPrint] = useState(PRINTS[0]);
  const [format, setFormat] = useState<Format>("story");
  const [blur, setBlur] = useState(4);
  const [overlay, setOverlay] = useState(50);
  const [title, setTitle] = useState("E se pudesses ler\no que a tua alma\nja sabe?");
  const [subtitle, setSubtitle] = useState("Os Sete Veus do Despertar");
  const [cta, setCta] = useState("seteveus.space");
  const [textPosition, setTextPosition] = useState<TextPosition>("center");
  const [titleSize, setTitleSize] = useState(48);
  const [subtitleSize, setSubtitleSize] = useState(20);
  const [ctaSize, setCtaSize] = useState(16);
  const [exporting, setExporting] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [overlayColor, setOverlayColor] = useState("#000000");

  // Auth check
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sage border-t-transparent" />
      </div>
    );
  }
  if (!user || !AUTHOR_EMAILS.includes(user.email || "")) {
    router.push("/entrar");
    return null;
  }

  const fmt = FORMATS[format];
  // Scale for preview (fit in ~400px height)
  const previewScale = Math.min(380 / fmt.h, 340 / fmt.w);

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setTitle(preset.title);
    setSubtitle(preset.subtitle);
    setCta(preset.cta);
  };

  const handleExport = useCallback(async () => {
    if (!canvasRef.current) return;
    setExporting(true);

    try {
      // Temporarily scale to real dimensions for export
      const el = canvasRef.current;
      const origTransform = el.style.transform;
      const origWidth = el.style.width;
      const origHeight = el.style.height;

      el.style.transform = "none";
      el.style.width = `${fmt.w}px`;
      el.style.height = `${fmt.h}px`;

      const dataUrl = await toPng(el, {
        width: fmt.w,
        height: fmt.h,
        pixelRatio: 1,
        cacheBust: true,
      });

      // Restore preview size
      el.style.transform = origTransform;
      el.style.width = origWidth;
      el.style.height = origHeight;

      // Download
      const link = document.createElement("a");
      link.download = `os-sete-veus-${format}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erro ao exportar:", err);
      alert("Erro ao exportar imagem. Tenta novamente.");
    }

    setExporting(false);
  }, [format, fmt]);

  const positionClass: Record<TextPosition, string> = {
    top: "justify-start pt-[15%]",
    center: "justify-center",
    bottom: "justify-end pb-[15%]",
  };

  return (
    <section className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-brown-100 bg-white/50 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/painel/marketing"
              className="font-sans text-sm text-brown-400 hover:text-brown-700"
            >
              Voltar ao Painel
            </Link>
            <h1 className="font-serif text-xl text-brown-900">
              Gerador de Conteudo
            </h1>
          </div>
          <button
            onClick={handleExport}
            disabled={exporting}
            className={`rounded-lg bg-sage px-6 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:bg-sage-dark ${exporting ? "opacity-60" : ""}`}
          >
            {exporting ? "A exportar..." : "Exportar PNG"}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex gap-8 max-lg:flex-col">
          {/* LEFT PANEL — Controls */}
          <div className="w-full space-y-6 lg:w-[380px]">
            {/* Format */}
            <div>
              <label className="mb-2 block font-sans text-xs font-medium uppercase tracking-wider text-brown-500">
                Formato
              </label>
              <div className="flex gap-2">
                {(Object.keys(FORMATS) as Format[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`flex-1 rounded-lg border px-3 py-2 font-sans text-xs transition-colors ${
                      format === f
                        ? "border-sage bg-sage/10 text-sage-dark"
                        : "border-brown-100 bg-white text-brown-500 hover:border-brown-200"
                    }`}
                  >
                    {FORMATS[f].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Background print */}
            <div>
              <label className="mb-2 block font-sans text-xs font-medium uppercase tracking-wider text-brown-500">
                Fundo (print)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {PRINTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPrint(p)}
                    className={`group relative aspect-[3/4] overflow-hidden rounded-lg border-2 transition-all ${
                      selectedPrint.id === p.id
                        ? "border-sage ring-2 ring-sage/30"
                        : "border-transparent hover:border-brown-200"
                    }`}
                  >
                    <img
                      src={p.src}
                      alt={p.label}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1">
                      <span className="font-sans text-[0.5rem] leading-tight text-white">
                        {p.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Overlay controls */}
            <div className="space-y-3">
              <label className="mb-2 block font-sans text-xs font-medium uppercase tracking-wider text-brown-500">
                Overlay
              </label>
              <div className="flex items-center gap-3">
                <span className="w-12 font-sans text-xs text-brown-400">Blur</span>
                <input
                  type="range"
                  min={0}
                  max={20}
                  value={blur}
                  onChange={(e) => setBlur(Number(e.target.value))}
                  className="flex-1 accent-sage"
                />
                <span className="w-8 font-sans text-xs text-brown-600">{blur}px</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 font-sans text-xs text-brown-400">Escuro</span>
                <input
                  type="range"
                  min={0}
                  max={90}
                  value={overlay}
                  onChange={(e) => setOverlay(Number(e.target.value))}
                  className="flex-1 accent-sage"
                />
                <span className="w-8 font-sans text-xs text-brown-600">{overlay}%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 font-sans text-xs text-brown-400">Cor</span>
                <div className="flex gap-2">
                  {["#000000", "#3d3630", "#1a1a2e", "#0d1b2a"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setOverlayColor(c)}
                      className={`h-7 w-7 rounded-full border-2 transition-all ${
                        overlayColor === c ? "border-sage scale-110" : "border-brown-200"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Presets */}
            <div>
              <label className="mb-2 block font-sans text-xs font-medium uppercase tracking-wider text-brown-500">
                Presets de texto
              </label>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => applyPreset(p)}
                    className="rounded-full border border-brown-100 bg-white px-3 py-1 font-sans text-[0.65rem] text-brown-600 transition-colors hover:border-sage hover:bg-sage/5 hover:text-sage-dark"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Text inputs */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <label className="font-sans text-xs font-medium text-brown-500">Titulo</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={24}
                      max={72}
                      value={titleSize}
                      onChange={(e) => setTitleSize(Number(e.target.value))}
                      className="w-20 accent-sage"
                    />
                    <span className="font-sans text-[0.6rem] text-brown-400">{titleSize}px</span>
                  </div>
                </div>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-3 py-2 font-sans text-sm text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="font-sans text-xs font-medium text-brown-500">Subtitulo</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={12}
                      max={36}
                      value={subtitleSize}
                      onChange={(e) => setSubtitleSize(Number(e.target.value))}
                      className="w-20 accent-sage"
                    />
                    <span className="font-sans text-[0.6rem] text-brown-400">{subtitleSize}px</span>
                  </div>
                </div>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-3 py-2 font-sans text-sm text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="font-sans text-xs font-medium text-brown-500">CTA / Link</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={10}
                      max={28}
                      value={ctaSize}
                      onChange={(e) => setCtaSize(Number(e.target.value))}
                      className="w-20 accent-sage"
                    />
                    <span className="font-sans text-[0.6rem] text-brown-400">{ctaSize}px</span>
                  </div>
                </div>
                <input
                  type="text"
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-3 py-2 font-sans text-sm text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
                />
              </div>
            </div>

            {/* Position + Logo */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="mb-1.5 block font-sans text-xs font-medium text-brown-500">
                  Posicao texto
                </label>
                <div className="flex gap-1.5">
                  {(["top", "center", "bottom"] as TextPosition[]).map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setTextPosition(pos)}
                      className={`flex-1 rounded border px-2 py-1.5 font-sans text-[0.65rem] capitalize ${
                        textPosition === pos
                          ? "border-sage bg-sage/10 text-sage-dark"
                          : "border-brown-100 bg-white text-brown-400"
                      }`}
                    >
                      {pos === "top" ? "Topo" : pos === "center" ? "Centro" : "Baixo"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block font-sans text-xs font-medium text-brown-500">
                  Logo
                </label>
                <button
                  onClick={() => setShowLogo(!showLogo)}
                  className={`rounded border px-3 py-1.5 font-sans text-[0.65rem] ${
                    showLogo
                      ? "border-sage bg-sage/10 text-sage-dark"
                      : "border-brown-100 bg-white text-brown-400"
                  }`}
                >
                  {showLogo ? "Visivel" : "Oculto"}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL — Preview */}
          <div className="flex flex-1 flex-col items-center">
            <div className="mb-4 font-sans text-xs text-brown-400">
              Pre-visualizacao ({fmt.w} x {fmt.h})
            </div>

            {/* Canvas wrapper */}
            <div
              className="overflow-hidden rounded-xl shadow-2xl"
              style={{
                width: fmt.w * previewScale,
                height: fmt.h * previewScale,
              }}
            >
              {/* Actual canvas at real size, scaled down */}
              <div
                ref={canvasRef}
                className="relative overflow-hidden"
                style={{
                  width: fmt.w,
                  height: fmt.h,
                  transform: `scale(${previewScale})`,
                  transformOrigin: "top left",
                }}
              >
                {/* Background image */}
                <img
                  src={selectedPrint.src}
                  alt=""
                  crossOrigin="anonymous"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ filter: `blur(${blur}px)` }}
                />

                {/* Color overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: overlayColor,
                    opacity: overlay / 100,
                  }}
                />

                {/* Text content */}
                <div
                  className={`relative flex h-full flex-col items-center px-[10%] text-center ${positionClass[textPosition]}`}
                >
                  {/* Title */}
                  {title && (
                    <h2
                      className="whitespace-pre-line font-serif leading-[1.2] text-white"
                      style={{ fontSize: titleSize }}
                    >
                      {title}
                    </h2>
                  )}

                  {/* Separator */}
                  {title && subtitle && (
                    <div
                      className="my-[3%] h-px w-[40%] bg-white/40"
                    />
                  )}

                  {/* Subtitle */}
                  {subtitle && (
                    <p
                      className="whitespace-pre-line font-sans font-light tracking-wide text-white/80"
                      style={{ fontSize: subtitleSize }}
                    >
                      {subtitle}
                    </p>
                  )}

                  {/* CTA */}
                  {cta && (
                    <p
                      className="mt-[5%] font-sans font-medium uppercase tracking-[0.2em] text-white/60"
                      style={{ fontSize: ctaSize }}
                    >
                      {cta}
                    </p>
                  )}
                </div>

                {/* Logo watermark */}
                {showLogo && (
                  <div className="absolute bottom-[4%] left-1/2 flex -translate-x-1/2 items-center gap-3 opacity-60">
                    <img
                      src="/images/logo-espiral.png.jpeg"
                      alt=""
                      crossOrigin="anonymous"
                      className="h-10 w-10 rounded-full"
                    />
                    <span
                      className="font-serif text-white/80"
                      style={{ fontSize: 18 }}
                    >
                      Os Sete Veus
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleExport}
                disabled={exporting}
                className="rounded-lg bg-sage px-8 py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-sage-dark"
              >
                {exporting ? "A exportar..." : "Descarregar PNG"}
              </button>
            </div>

            <p className="mt-4 max-w-sm text-center font-sans text-xs text-brown-400">
              A imagem e gerada em {fmt.w}x{fmt.h}px, pronta para publicar
              directamente no Instagram, WhatsApp ou Facebook.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
