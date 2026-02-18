"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toPng } from "html-to-image";

const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];

// ─── CONTEUDO PRONTO ────────────────────────────────────────────────────────
// Cada peca e um print + blur + overlay + texto, pronta para descarregar.

type MarketingPiece = {
  id: string;
  name: string;
  category: "story" | "post" | "carousel";
  bg: string;
  blur: number;
  overlay: number;
  overlayColor: string;
  title: string;
  subtitle: string;
  cta: string;
  titleSize: number;
  subtitleSize: number;
  ctaSize: number;
  textPosition: "top" | "center" | "bottom";
  showLogo: boolean;
};

const READY_CONTENT: MarketingPiece[] = [
  // ── STORIES (1080x1920) ──
  {
    id: "story-convite-hero",
    name: "Convite ~ Hero",
    category: "story",
    bg: "/prints/homepage-hero-mandala.jpeg",
    blur: 6,
    overlay: 55,
    overlayColor: "#1a1a2e",
    title: "E se pudesses ler\no que a tua alma\nja sabe?",
    subtitle: "Os Sete Veus do Despertar",
    cta: "seteveus.space",
    titleSize: 52,
    subtitleSize: 22,
    ctaSize: 16,
    textPosition: "center",
    showLogo: true,
  },
  {
    id: "story-quiz",
    name: "Quiz ~ Qual veu",
    category: "story",
    bg: "/prints/quiz-qual-veu.jpeg",
    blur: 5,
    overlay: 50,
    overlayColor: "#3d3630",
    title: "Qual veu\nte esconde?",
    subtitle: "Descobre em 2 minutos.\nUm teste que nao da respostas\n~ da perguntas.",
    cta: "seteveus.space/recursos/teste",
    titleSize: 56,
    subtitleSize: 20,
    ctaSize: 15,
    textPosition: "center",
    showLogo: true,
  },
  {
    id: "story-leitura",
    name: "Espelho ~ Leitura",
    category: "story",
    bg: "/prints/leitura-capitulo.jpeg",
    blur: 4,
    overlay: 50,
    overlayColor: "#000000",
    title: "Nao e um livro.\nE um espelho.",
    subtitle: "7 veus. 7 historias.\nUma jornada interior.",
    cta: "Comeca em seteveus.space",
    titleSize: 52,
    subtitleSize: 21,
    ctaSize: 15,
    textPosition: "center",
    showLogo: true,
  },
  {
    id: "story-frase-leitora",
    name: "Frase leitora",
    category: "story",
    bg: "/prints/comunidade-reflexoes-leitoras.jpeg",
    blur: 8,
    overlay: 60,
    overlayColor: "#0d1b2a",
    title: '"sai do modo automatico.\nnao sei para onde vou\nmas pelo menos\nestou acordada."',
    subtitle: "~ leitora anonima, Veu 1",
    cta: "Comunidade Ecos ~ seteveus.space",
    titleSize: 44,
    subtitleSize: 18,
    ctaSize: 14,
    textPosition: "center",
    showLogo: true,
  },
  {
    id: "story-marcas",
    name: "Marcas no Caminho",
    category: "story",
    bg: "/prints/comunidade-marcas-caminho.jpeg",
    blur: 6,
    overlay: 55,
    overlayColor: "#3d3630",
    title: "Frases que ficam.\nDe quem ja passou\npor aqui.",
    subtitle: "Comunidade Ecos\nAnonima. Impermanente. Real.",
    cta: "seteveus.space/comunidade",
    titleSize: 46,
    subtitleSize: 19,
    ctaSize: 14,
    textPosition: "center",
    showLogo: true,
  },
  {
    id: "story-codigo",
    name: "Codigo acesso",
    category: "story",
    bg: "/prints/acesso-digital-3-passos.jpeg",
    blur: 5,
    overlay: 50,
    overlayColor: "#3d3630",
    title: "Compraste o livro?\nTens acesso a tudo.",
    subtitle: "Usa o teu codigo e desbloqueia\na experiencia digital completa.\n\n1. Recebe o codigo\n2. Regista-te\n3. Le digitalmente",
    cta: "seteveus.space/registar-livro",
    titleSize: 48,
    subtitleSize: 18,
    ctaSize: 15,
    textPosition: "center",
    showLogo: true,
  },
  // ── POSTS (1080x1080) ──
  {
    id: "post-experiencia",
    name: "Experiencia ~ funcionalidades",
    category: "post",
    bg: "/prints/experiencia-funcionalidades.jpeg",
    blur: 5,
    overlay: 55,
    overlayColor: "#1a1a2e",
    title: "Uma experiencia\nde leitura\ndiferente.",
    subtitle: "Reflexoes. Checklists. Diario.\nTudo dentro do livro.",
    cta: "seteveus.space",
    titleSize: 48,
    subtitleSize: 20,
    ctaSize: 16,
    textPosition: "center",
    showLogo: true,
  },
  {
    id: "post-dashboard",
    name: "Dashboard ~ jornada",
    category: "post",
    bg: "/prints/dashboard-membro.jpeg",
    blur: 5,
    overlay: 50,
    overlayColor: "#000000",
    title: "A tua jornada,\nao teu ritmo.",
    subtitle: "Sem pressas. Sem prazos.\nAo ritmo da tua verdade.",
    cta: "seteveus.space",
    titleSize: 46,
    subtitleSize: 19,
    ctaSize: 15,
    textPosition: "center",
    showLogo: true,
  },
  {
    id: "post-ecos",
    name: "Ecos ~ comunidade",
    category: "post",
    bg: "/prints/comunidade-ecos-tabs.jpeg",
    blur: 6,
    overlay: 55,
    overlayColor: "#3d3630",
    title: "As vozes\nencontram-se\naqui.",
    subtitle: "Comunidade Ecos\nAnonima ~ Impermanente\nComo os veus.",
    cta: "Entra em seteveus.space",
    titleSize: 46,
    subtitleSize: 19,
    ctaSize: 15,
    textPosition: "center",
    showLogo: true,
  },
  {
    id: "post-livro-fisico",
    name: "Livro fisico ~ preco",
    category: "post",
    bg: "/prints/livro-fisico-preco-whatsapp.jpeg",
    blur: 5,
    overlay: 50,
    overlayColor: "#3d3630",
    title: "O livro que\nte le a ti.",
    subtitle: "Edicao impressa ~ 1.500 MT\nVersao digital incluida",
    cta: "Encomenda via WhatsApp",
    titleSize: 48,
    subtitleSize: 20,
    ctaSize: 15,
    textPosition: "center",
    showLogo: true,
  },
  {
    id: "post-comunidade-cta",
    name: "Comunidade ~ CTA",
    category: "post",
    bg: "/prints/comunidade-cta-dark.jpeg",
    blur: 3,
    overlay: 40,
    overlayColor: "#000000",
    title: "Entra na\ncomunidade.",
    subtitle: "Partilha o que sentiste.\nLe o que outros sentiram.\nSem nome. Sem julgamento.",
    cta: "seteveus.space/comunidade",
    titleSize: 48,
    subtitleSize: 19,
    ctaSize: 15,
    textPosition: "center",
    showLogo: true,
  },
  // ── CARROSSEIS (1080x1350) ──
  {
    id: "carousel-despertar-1",
    name: "Carrossel 1 ~ Despertar",
    category: "carousel",
    bg: "/prints/homepage-hero-mandala.jpeg",
    blur: 7,
    overlay: 60,
    overlayColor: "#0d1b2a",
    title: "Os 7 Veus\ndo Despertar",
    subtitle: "Uma jornada em 7 camadas.\nCada veu esconde algo que\nsempre soubeste.",
    cta: "Desliza para descobrir ~",
    titleSize: 52,
    subtitleSize: 20,
    ctaSize: 16,
    textPosition: "center",
    showLogo: true,
  },
  {
    id: "carousel-despertar-2",
    name: "Carrossel 2 ~ Ilusao",
    category: "carousel",
    bg: "/prints/leitura-capitulo.jpeg",
    blur: 6,
    overlay: 55,
    overlayColor: "#1a1a2e",
    title: "Veu 1\nIlusao",
    subtitle: "O que achas que es\nnao e quem es.\nO primeiro espelho parte-se\nsem barulho.",
    cta: "",
    titleSize: 56,
    subtitleSize: 20,
    ctaSize: 16,
    textPosition: "center",
    showLogo: false,
  },
  {
    id: "carousel-despertar-3",
    name: "Carrossel 3 ~ Medo",
    category: "carousel",
    bg: "/prints/comunidade-marcas-caminho.jpeg",
    blur: 7,
    overlay: 58,
    overlayColor: "#0d1b2a",
    title: "Veu 2\nMedo",
    subtitle: "O medo nao te protege.\nPrende-te a uma versao\nque ja nao serves.",
    cta: "",
    titleSize: 56,
    subtitleSize: 20,
    ctaSize: 16,
    textPosition: "center",
    showLogo: false,
  },
  {
    id: "carousel-despertar-4",
    name: "Carrossel 4 ~ Culpa",
    category: "carousel",
    bg: "/prints/comunidade-reflexoes-leitoras.jpeg",
    blur: 7,
    overlay: 55,
    overlayColor: "#3d3630",
    title: "Veu 3\nCulpa",
    subtitle: "Chamaste sacrificio\nao que era fuga.\nA culpa disfarça-se\nde entrega.",
    cta: "",
    titleSize: 56,
    subtitleSize: 20,
    ctaSize: 16,
    textPosition: "center",
    showLogo: false,
  },
  {
    id: "carousel-despertar-5",
    name: "Carrossel 5 ~ CTA final",
    category: "carousel",
    bg: "/prints/experiencia-funcionalidades.jpeg",
    blur: 6,
    overlay: 55,
    overlayColor: "#1a1a2e",
    title: "Ainda ha 4 veus\npor desvendar.",
    subtitle: "Identidade. Controlo. Desejo. Separacao.\nCada um revela o que sempre\ntiveste medo de ver.",
    cta: "Comeca em seteveus.space",
    titleSize: 44,
    subtitleSize: 19,
    ctaSize: 16,
    textPosition: "center",
    showLogo: true,
  },
  // ── MAIS STORIES ──
  {
    id: "story-no-heranca",
    name: "No da Heranca",
    category: "story",
    bg: "/prints/dashboard-membro.jpeg",
    blur: 7,
    overlay: 58,
    overlayColor: "#1a1a2e",
    title: "A mae sempre viu.\nEsperou anos.",
    subtitle: "O No da Heranca\nDesbloqueado ao completar\no Espelho da Ilusao.",
    cta: "seteveus.space",
    titleSize: 48,
    subtitleSize: 20,
    ctaSize: 15,
    textPosition: "center",
    showLogo: true,
  },
  {
    id: "story-frase-2",
    name: "Frase ~ banho",
    category: "story",
    bg: "/prints/comunidade-ecos-tabs.jpeg",
    blur: 8,
    overlay: 60,
    overlayColor: "#0d1b2a",
    title: '"chorei no banho.\noutra vez.\nmas desta vez\nnao foi por tristeza.\nfoi por reconhecimento."',
    subtitle: "~ leitora anonima, Veu 1",
    cta: "Comunidade Ecos ~ seteveus.space",
    titleSize: 40,
    subtitleSize: 17,
    ctaSize: 14,
    textPosition: "center",
    showLogo: true,
  },
  {
    id: "story-frase-3",
    name: "Frase ~ marido",
    category: "story",
    bg: "/prints/homepage-hero-mandala.jpeg",
    blur: 8,
    overlay: 58,
    overlayColor: "#3d3630",
    title: '"o meu marido perguntou\n"estas bem?"\ne eu disse que sim.\nautomaticamente."',
    subtitle: "~ leitora anonima, Veu 1",
    cta: "Comunidade Ecos ~ seteveus.space",
    titleSize: 40,
    subtitleSize: 17,
    ctaSize: 14,
    textPosition: "center",
    showLogo: true,
  },
  {
    id: "story-ilusao-disponivel",
    name: "Espelho Ilusao ~ disponivel",
    category: "story",
    bg: "/prints/leitura-capitulo.jpeg",
    blur: 5,
    overlay: 52,
    overlayColor: "#1a1a2e",
    title: "O primeiro veu\ne o mais silencioso.",
    subtitle: "Espelho da Ilusao\n7 capitulos. Reflexoes. Checklist.\nJa disponivel.",
    cta: "Comeca em seteveus.space",
    titleSize: 50,
    subtitleSize: 20,
    ctaSize: 15,
    textPosition: "center",
    showLogo: true,
  },
];

const FORMAT_SIZES = {
  story: { w: 1080, h: 1920 },
  post: { w: 1080, h: 1080 },
  carousel: { w: 1080, h: 1350 },
};

// ─── PIECE CARD (preview + download) ────────────────────────────────────────

function PieceCard({
  piece,
  onExport,
  exporting,
}: {
  piece: MarketingPiece;
  onExport: (piece: MarketingPiece, ref: HTMLDivElement) => void;
  exporting: string | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fmt = FORMAT_SIZES[piece.category];
  const scale = 200 / fmt.w; // fit in ~200px wide

  const positionClass = {
    top: "justify-start pt-[15%]",
    center: "justify-center",
    bottom: "justify-end pb-[15%]",
  };

  const categoryLabel = {
    story: "Story",
    post: "Post",
    carousel: "Carrossel",
  };

  return (
    <div className="group flex flex-col">
      {/* Preview */}
      <div
        className="cursor-pointer overflow-hidden rounded-xl shadow-lg transition-shadow hover:shadow-xl"
        style={{ width: fmt.w * scale, height: fmt.h * scale }}
        onClick={() => ref.current && onExport(piece, ref.current)}
      >
        <div
          ref={ref}
          className="relative overflow-hidden"
          style={{
            width: fmt.w,
            height: fmt.h,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <img
            src={piece.bg}
            alt=""
            crossOrigin="anonymous"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: `blur(${piece.blur}px)` }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: piece.overlayColor,
              opacity: piece.overlay / 100,
            }}
          />
          <div
            className={`relative flex h-full flex-col items-center px-[10%] text-center ${positionClass[piece.textPosition]}`}
          >
            {piece.title && (
              <h2
                className="whitespace-pre-line font-serif leading-[1.2] text-white"
                style={{ fontSize: piece.titleSize }}
              >
                {piece.title}
              </h2>
            )}
            {piece.title && piece.subtitle && (
              <div className="my-[3%] h-px w-[40%] bg-white/40" />
            )}
            {piece.subtitle && (
              <p
                className="whitespace-pre-line font-sans font-light tracking-wide text-white/80"
                style={{ fontSize: piece.subtitleSize }}
              >
                {piece.subtitle}
              </p>
            )}
            {piece.cta && (
              <p
                className="mt-[5%] font-sans font-medium uppercase tracking-[0.2em] text-white/60"
                style={{ fontSize: piece.ctaSize }}
              >
                {piece.cta}
              </p>
            )}
          </div>
          {piece.showLogo && (
            <div className="absolute bottom-[4%] left-1/2 flex -translate-x-1/2 items-center gap-3 opacity-60">
              <img
                src="/images/logo-espiral.png.jpeg"
                alt=""
                crossOrigin="anonymous"
                className="h-10 w-10 rounded-full"
              />
              <span className="font-serif text-white/80" style={{ fontSize: 18 }}>
                Os Sete Veus
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Info + download */}
      <div className="mt-2 flex items-center justify-between">
        <div>
          <p className="font-sans text-xs font-medium text-brown-700">{piece.name}</p>
          <p className="font-sans text-[0.6rem] text-brown-400">
            {categoryLabel[piece.category]} ~ {fmt.w}x{fmt.h}
          </p>
        </div>
        <button
          onClick={() => ref.current && onExport(piece, ref.current)}
          disabled={exporting === piece.id}
          className={`rounded-md bg-sage/10 px-3 py-1.5 font-sans text-[0.65rem] font-medium text-sage-dark transition-colors hover:bg-sage/20 ${
            exporting === piece.id ? "opacity-50" : ""
          }`}
        >
          {exporting === piece.id ? "..." : "PNG"}
        </button>
      </div>
    </div>
  );
}

// ─── CUSTOM GENERATOR (tab 2) ───────────────────────────────────────────────

const PRINTS = [
  { id: "homepage-hero", src: "/prints/homepage-hero-mandala.jpeg", label: "Homepage" },
  { id: "experiencia", src: "/prints/experiencia-funcionalidades.jpeg", label: "Experiencia" },
  { id: "quiz", src: "/prints/quiz-qual-veu.jpeg", label: "Quiz" },
  { id: "dashboard", src: "/prints/dashboard-membro.jpeg", label: "Dashboard" },
  { id: "leitura", src: "/prints/leitura-capitulo.jpeg", label: "Leitura" },
  { id: "ecos-tabs", src: "/prints/comunidade-ecos-tabs.jpeg", label: "Ecos" },
  { id: "marcas", src: "/prints/comunidade-marcas-caminho.jpeg", label: "Marcas" },
  { id: "reflexoes", src: "/prints/comunidade-reflexoes-leitoras.jpeg", label: "Reflexoes" },
  { id: "livro-fisico", src: "/prints/livro-fisico-preco-whatsapp.jpeg", label: "Livro" },
  { id: "3-passos", src: "/prints/acesso-digital-3-passos.jpeg", label: "3 Passos" },
  { id: "comunidade-cta", src: "/prints/comunidade-cta-dark.jpeg", label: "CTA" },
];

type CustomFormat = "story" | "post" | "carousel";

function CustomGenerator() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedPrint, setSelectedPrint] = useState(PRINTS[0]);
  const [format, setFormat] = useState<CustomFormat>("story");
  const [blur, setBlur] = useState(6);
  const [overlay, setOverlay] = useState(55);
  const [title, setTitle] = useState("O teu texto aqui.");
  const [subtitle, setSubtitle] = useState("Subtitulo");
  const [cta, setCta] = useState("seteveus.space");
  const [textPosition, setTextPosition] = useState<"top" | "center" | "bottom">("center");
  const [titleSize, setTitleSize] = useState(48);
  const [subtitleSize, setSubtitleSize] = useState(20);
  const [ctaSize, setCtaSize] = useState(16);
  const [overlayColor, setOverlayColor] = useState("#000000");
  const [showLogo, setShowLogo] = useState(true);
  const [exporting, setExporting] = useState(false);

  const fmt = FORMAT_SIZES[format];
  const previewScale = Math.min(340 / fmt.h, 300 / fmt.w);

  const positionClass = {
    top: "justify-start pt-[15%]",
    center: "justify-center",
    bottom: "justify-end pb-[15%]",
  };

  const handleExport = async () => {
    if (!canvasRef.current) return;
    setExporting(true);
    try {
      const el = canvasRef.current;
      const orig = { t: el.style.transform, w: el.style.width, h: el.style.height };
      el.style.transform = "none";
      el.style.width = `${fmt.w}px`;
      el.style.height = `${fmt.h}px`;
      const dataUrl = await toPng(el, { width: fmt.w, height: fmt.h, pixelRatio: 1, cacheBust: true });
      el.style.transform = orig.t;
      el.style.width = orig.w;
      el.style.height = orig.h;
      const link = document.createElement("a");
      link.download = `sete-veus-custom-${format}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      alert("Erro ao exportar.");
    }
    setExporting(false);
  };

  return (
    <div className="flex gap-8 max-lg:flex-col">
      {/* Controls */}
      <div className="w-full space-y-5 lg:w-[360px]">
        {/* Format */}
        <div className="flex gap-2">
          {(["story", "post", "carousel"] as CustomFormat[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`flex-1 rounded-lg border px-3 py-2 font-sans text-xs ${
                format === f ? "border-sage bg-sage/10 text-sage-dark" : "border-brown-100 bg-white text-brown-500"
              }`}
            >
              {f === "story" ? "Story 9:16" : f === "post" ? "Post 1:1" : "Carrossel 4:5"}
            </button>
          ))}
        </div>

        {/* Prints grid */}
        <div className="grid grid-cols-6 gap-1.5">
          {PRINTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPrint(p)}
              className={`aspect-[3/4] overflow-hidden rounded border-2 ${
                selectedPrint.id === p.id ? "border-sage" : "border-transparent"
              }`}
            >
              <img src={p.src} alt={p.label} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        {/* Sliders */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-14 font-sans text-xs text-brown-400">Blur</span>
            <input type="range" min={0} max={20} value={blur} onChange={(e) => setBlur(+e.target.value)} className="flex-1 accent-sage" />
            <span className="w-8 font-sans text-xs text-brown-500">{blur}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-14 font-sans text-xs text-brown-400">Escuro</span>
            <input type="range" min={0} max={90} value={overlay} onChange={(e) => setOverlay(+e.target.value)} className="flex-1 accent-sage" />
            <span className="w-8 font-sans text-xs text-brown-500">{overlay}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-14 font-sans text-xs text-brown-400">Cor</span>
            {["#000000", "#3d3630", "#1a1a2e", "#0d1b2a"].map((c) => (
              <button
                key={c}
                onClick={() => setOverlayColor(c)}
                className={`h-6 w-6 rounded-full border-2 ${overlayColor === c ? "border-sage" : "border-brown-200"}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs text-brown-500">Titulo ({titleSize}px)</span>
              <input type="range" min={24} max={72} value={titleSize} onChange={(e) => setTitleSize(+e.target.value)} className="w-24 accent-sage" />
            </div>
            <textarea value={title} onChange={(e) => setTitle(e.target.value)} rows={3} className="mt-1 w-full rounded border border-brown-100 px-3 py-2 font-sans text-sm focus:border-sage focus:outline-none" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs text-brown-500">Subtitulo ({subtitleSize}px)</span>
              <input type="range" min={12} max={36} value={subtitleSize} onChange={(e) => setSubtitleSize(+e.target.value)} className="w-24 accent-sage" />
            </div>
            <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="mt-1 w-full rounded border border-brown-100 px-3 py-2 font-sans text-sm focus:border-sage focus:outline-none" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs text-brown-500">CTA ({ctaSize}px)</span>
              <input type="range" min={10} max={28} value={ctaSize} onChange={(e) => setCtaSize(+e.target.value)} className="w-24 accent-sage" />
            </div>
            <input value={cta} onChange={(e) => setCta(e.target.value)} className="mt-1 w-full rounded border border-brown-100 px-3 py-2 font-sans text-sm focus:border-sage focus:outline-none" />
          </div>
        </div>

        {/* Position */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {(["top", "center", "bottom"] as const).map((p) => (
              <button key={p} onClick={() => setTextPosition(p)} className={`rounded border px-2 py-1 font-sans text-[0.65rem] ${textPosition === p ? "border-sage bg-sage/10 text-sage-dark" : "border-brown-100 text-brown-400"}`}>
                {p === "top" ? "Topo" : p === "center" ? "Centro" : "Baixo"}
              </button>
            ))}
          </div>
          <button onClick={() => setShowLogo(!showLogo)} className={`rounded border px-2 py-1 font-sans text-[0.65rem] ${showLogo ? "border-sage bg-sage/10 text-sage-dark" : "border-brown-100 text-brown-400"}`}>
            Logo {showLogo ? "On" : "Off"}
          </button>
        </div>

        <button onClick={handleExport} disabled={exporting} className="w-full rounded-lg bg-sage py-3 font-sans text-sm font-medium text-white hover:bg-sage-dark">
          {exporting ? "A exportar..." : "Descarregar PNG"}
        </button>
      </div>

      {/* Preview */}
      <div className="flex flex-1 flex-col items-center">
        <div className="overflow-hidden rounded-xl shadow-2xl" style={{ width: fmt.w * previewScale, height: fmt.h * previewScale }}>
          <div ref={canvasRef} className="relative overflow-hidden" style={{ width: fmt.w, height: fmt.h, transform: `scale(${previewScale})`, transformOrigin: "top left" }}>
            <img src={selectedPrint.src} alt="" crossOrigin="anonymous" className="absolute inset-0 h-full w-full object-cover" style={{ filter: `blur(${blur}px)` }} />
            <div className="absolute inset-0" style={{ backgroundColor: overlayColor, opacity: overlay / 100 }} />
            <div className={`relative flex h-full flex-col items-center px-[10%] text-center ${positionClass[textPosition]}`}>
              {title && <h2 className="whitespace-pre-line font-serif leading-[1.2] text-white" style={{ fontSize: titleSize }}>{title}</h2>}
              {title && subtitle && <div className="my-[3%] h-px w-[40%] bg-white/40" />}
              {subtitle && <p className="whitespace-pre-line font-sans font-light tracking-wide text-white/80" style={{ fontSize: subtitleSize }}>{subtitle}</p>}
              {cta && <p className="mt-[5%] font-sans font-medium uppercase tracking-[0.2em] text-white/60" style={{ fontSize: ctaSize }}>{cta}</p>}
            </div>
            {showLogo && (
              <div className="absolute bottom-[4%] left-1/2 flex -translate-x-1/2 items-center gap-3 opacity-60">
                <img src="/images/logo-espiral.png.jpeg" alt="" crossOrigin="anonymous" className="h-10 w-10 rounded-full" />
                <span className="font-serif text-white/80" style={{ fontSize: 18 }}>Os Sete Veus</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────

type Tab = "pronto" | "personalizar";

export default function GeradorPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("pronto");
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "story" | "post" | "carousel">("all");
  const [exportedCount, setExportedCount] = useState(0);

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

  const filtered = filter === "all" ? READY_CONTENT : READY_CONTENT.filter((p) => p.category === filter);

  const stories = READY_CONTENT.filter((p) => p.category === "story");
  const posts = READY_CONTENT.filter((p) => p.category === "post");
  const carousels = READY_CONTENT.filter((p) => p.category === "carousel");

  async function handleExport(piece: MarketingPiece, el: HTMLDivElement) {
    setExportingId(piece.id);
    const fmt = FORMAT_SIZES[piece.category];
    try {
      const orig = { t: el.style.transform, w: el.style.width, h: el.style.height };
      el.style.transform = "none";
      el.style.width = `${fmt.w}px`;
      el.style.height = `${fmt.h}px`;
      const dataUrl = await toPng(el, { width: fmt.w, height: fmt.h, pixelRatio: 1, cacheBust: true });
      el.style.transform = orig.t;
      el.style.width = orig.w;
      el.style.height = orig.h;
      const link = document.createElement("a");
      link.download = `sete-veus-${piece.id}.png`;
      link.href = dataUrl;
      link.click();
      setExportedCount((c) => c + 1);
    } catch {
      alert("Erro ao exportar. Tenta novamente.");
    }
    setExportingId(null);
  }

  async function handleExportAll() {
    const pieces = filtered;
    for (const piece of pieces) {
      const el = document.querySelector(`[data-piece-id="${piece.id}"]`) as HTMLDivElement | null;
      if (el) {
        await handleExportFromElement(piece, el);
        // Small delay between exports
        await new Promise((r) => setTimeout(r, 500));
      }
    }
  }

  async function handleExportFromElement(piece: MarketingPiece, el: HTMLDivElement) {
    setExportingId(piece.id);
    const fmt = FORMAT_SIZES[piece.category];
    try {
      const orig = { t: el.style.transform, w: el.style.width, h: el.style.height };
      el.style.transform = "none";
      el.style.width = `${fmt.w}px`;
      el.style.height = `${fmt.h}px`;
      const dataUrl = await toPng(el, { width: fmt.w, height: fmt.h, pixelRatio: 1, cacheBust: true });
      el.style.transform = orig.t;
      el.style.width = orig.w;
      el.style.height = orig.h;
      const link = document.createElement("a");
      link.download = `sete-veus-${piece.id}.png`;
      link.href = dataUrl;
      link.click();
      setExportedCount((c) => c + 1);
    } catch {
      // skip failed export
    }
    setExportingId(null);
  }

  return (
    <section className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-brown-100 bg-white/50 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/painel/marketing" className="font-sans text-sm text-brown-400 hover:text-brown-700">
              Voltar ao Painel
            </Link>
            <h1 className="font-serif text-xl text-brown-900">Conteudo de Marketing</h1>
          </div>
          {tab === "pronto" && (
            <div className="flex items-center gap-3">
              {exportedCount > 0 && (
                <span className="font-sans text-xs text-sage-dark">{exportedCount} exportados</span>
              )}
              <button
                onClick={handleExportAll}
                className="rounded-lg bg-sage px-5 py-2 font-sans text-xs font-medium text-white transition-colors hover:bg-sage-dark"
              >
                Descarregar tudo ({filtered.length})
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-brown-100 bg-white px-6">
        <div className="mx-auto flex max-w-7xl gap-1">
          {([
            { key: "pronto" as Tab, label: "Conteudo Pronto", count: READY_CONTENT.length },
            { key: "personalizar" as Tab, label: "Criar Personalizado" },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`border-b-2 px-4 py-3 font-sans text-xs font-medium transition-colors ${
                tab === t.key
                  ? "border-sage text-sage-dark"
                  : "border-transparent text-brown-400 hover:text-brown-600"
              }`}
            >
              {t.label}
              {t.count && (
                <span className="ml-1.5 rounded-full bg-brown-100 px-1.5 py-0.5 text-[0.6rem]">
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {tab === "pronto" ? (
          <>
            {/* Filter */}
            <div className="mb-6 flex items-center gap-2">
              {([
                { key: "all" as const, label: "Todos", count: READY_CONTENT.length },
                { key: "story" as const, label: "Stories", count: stories.length },
                { key: "post" as const, label: "Posts", count: posts.length },
                { key: "carousel" as const, label: "Carrosseis", count: carousels.length },
              ]).map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full border px-3 py-1.5 font-sans text-xs transition-colors ${
                    filter === f.key
                      ? "border-sage bg-sage/10 text-sage-dark"
                      : "border-brown-100 bg-white text-brown-500 hover:border-brown-200"
                  }`}
                >
                  {f.label} ({f.count})
                </button>
              ))}
            </div>

            {/* Description */}
            <p className="mb-8 font-sans text-sm text-brown-500">
              Conteudo pronto para publicar. Clica no card ou no botao PNG para descarregar.
              Cada imagem usa prints reais da plataforma como fundo com blur e overlay.
            </p>

            {/* Grid */}
            <div className="flex flex-wrap gap-6">
              {filtered.map((piece) => (
                <PieceCardWithRef
                  key={piece.id}
                  piece={piece}
                  onExport={handleExport}
                  exporting={exportingId}
                />
              ))}
            </div>
          </>
        ) : (
          <CustomGenerator />
        )}
      </div>
    </section>
  );
}

// Wrapper that passes ref through data attribute for batch export
function PieceCardWithRef({
  piece,
  onExport,
  exporting,
}: {
  piece: MarketingPiece;
  onExport: (piece: MarketingPiece, ref: HTMLDivElement) => void;
  exporting: string | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fmt = FORMAT_SIZES[piece.category];
  const scale = 200 / fmt.w;

  const positionClass = {
    top: "justify-start pt-[15%]",
    center: "justify-center",
    bottom: "justify-end pb-[15%]",
  };

  const categoryLabel = { story: "Story", post: "Post", carousel: "Carrossel" };

  return (
    <div className="flex flex-col">
      <div
        className="cursor-pointer overflow-hidden rounded-xl shadow-lg transition-shadow hover:shadow-xl"
        style={{ width: fmt.w * scale, height: fmt.h * scale }}
        onClick={() => ref.current && onExport(piece, ref.current)}
      >
        <div
          ref={ref}
          data-piece-id={piece.id}
          className="relative overflow-hidden"
          style={{
            width: fmt.w,
            height: fmt.h,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <img
            src={piece.bg}
            alt=""
            crossOrigin="anonymous"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: `blur(${piece.blur}px)` }}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: piece.overlayColor, opacity: piece.overlay / 100 }}
          />
          <div className={`relative flex h-full flex-col items-center px-[10%] text-center ${positionClass[piece.textPosition]}`}>
            {piece.title && (
              <h2 className="whitespace-pre-line font-serif leading-[1.2] text-white" style={{ fontSize: piece.titleSize }}>
                {piece.title}
              </h2>
            )}
            {piece.title && piece.subtitle && <div className="my-[3%] h-px w-[40%] bg-white/40" />}
            {piece.subtitle && (
              <p className="whitespace-pre-line font-sans font-light tracking-wide text-white/80" style={{ fontSize: piece.subtitleSize }}>
                {piece.subtitle}
              </p>
            )}
            {piece.cta && (
              <p className="mt-[5%] font-sans font-medium uppercase tracking-[0.2em] text-white/60" style={{ fontSize: piece.ctaSize }}>
                {piece.cta}
              </p>
            )}
          </div>
          {piece.showLogo && (
            <div className="absolute bottom-[4%] left-1/2 flex -translate-x-1/2 items-center gap-3 opacity-60">
              <img src="/images/logo-espiral.png.jpeg" alt="" crossOrigin="anonymous" className="h-10 w-10 rounded-full" />
              <span className="font-serif text-white/80" style={{ fontSize: 18 }}>Os Sete Veus</span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between" style={{ width: fmt.w * scale }}>
        <div>
          <p className="font-sans text-xs font-medium text-brown-700">{piece.name}</p>
          <p className="font-sans text-[0.6rem] text-brown-400">{categoryLabel[piece.category]} ~ {fmt.w}x{fmt.h}</p>
        </div>
        <button
          onClick={() => ref.current && onExport(piece, ref.current)}
          disabled={exporting === piece.id}
          className={`rounded-md bg-sage/10 px-3 py-1.5 font-sans text-[0.65rem] font-medium text-sage-dark hover:bg-sage/20 ${exporting === piece.id ? "opacity-50" : ""}`}
        >
          {exporting === piece.id ? "..." : "PNG"}
        </button>
      </div>
    </div>
  );
}
