"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toPng } from "html-to-image";

const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];

// ─── PRINTS (fundos) ────────────────────────────────────────────────────────

const PRINTS = [
  { id: "hero", src: "/prints/homepage-hero-mandala.jpeg", label: "Hero ~ Mandala" },
  { id: "experiencia", src: "/prints/experiencia-funcionalidades.jpeg", label: "Experiencia" },
  { id: "quiz", src: "/prints/quiz-qual-veu.jpeg", label: "Quiz" },
  { id: "dashboard", src: "/prints/dashboard-membro.jpeg", label: "Dashboard" },
  { id: "leitura", src: "/prints/leitura-capitulo.jpeg", label: "Leitura" },
  { id: "ecos", src: "/prints/comunidade-ecos-tabs.jpeg", label: "Ecos" },
  { id: "marcas", src: "/prints/comunidade-marcas-caminho.jpeg", label: "Marcas" },
  { id: "reflexoes", src: "/prints/comunidade-reflexoes-leitoras.jpeg", label: "Reflexoes" },
  { id: "livro", src: "/prints/livro-fisico-preco-whatsapp.jpeg", label: "Livro fisico" },
  { id: "passos", src: "/prints/acesso-digital-3-passos.jpeg", label: "3 Passos" },
  { id: "cta", src: "/prints/comunidade-cta-dark.jpeg", label: "CTA dark" },
];

// ─── MENSAGENS (presets de texto) ───────────────────────────────────────────

const MENSAGENS = [
  {
    label: "Convite geral",
    title: "E se pudesses ler\no que a tua alma\nja sabe?",
    subtitle: "Os Sete Veus do Despertar",
    cta: "seteveus.space",
  },
  {
    label: "Nao e um livro",
    title: "Nao e um livro.\nE um espelho.",
    subtitle: "7 veus. 7 historias.\nUma jornada interior.",
    cta: "Comeca em seteveus.space",
  },
  {
    label: "Qual veu",
    title: "Qual veu\nte esconde?",
    subtitle: "Descobre em 2 minutos.\nUm teste que nao da respostas ~ da perguntas.",
    cta: "seteveus.space/recursos/teste",
  },
  {
    label: "Comunidade",
    title: "As vozes encontram-se\naqui.",
    subtitle: "Comunidade Ecos\nAnonima. Impermanente. Real.",
    cta: "Entra em seteveus.space",
  },
  {
    label: "Livro fisico",
    title: "O livro que\nte le a ti.",
    subtitle: "Edicao impressa ~ 1.500 MT\nVersao digital incluida",
    cta: "Encomenda via WhatsApp",
  },
  {
    label: "Espelho Ilusao",
    title: "O primeiro veu\ne o mais silencioso.",
    subtitle: "Espelho da Ilusao\n7 capitulos. Reflexoes. Checklist.\nJa disponivel.",
    cta: "Comeca em seteveus.space",
  },
  {
    label: "Codigo acesso",
    title: "Compraste o livro?\nTens acesso a tudo.",
    subtitle: "Usa o teu codigo e desbloqueia\na experiencia digital completa.",
    cta: "seteveus.space/registar-livro",
  },
  {
    label: "No da Heranca",
    title: "A mae sempre viu.\nEsperou anos.",
    subtitle: "O No da Heranca\nDesbloqueado ao completar\no Espelho da Ilusao.",
    cta: "seteveus.space",
  },
  {
    label: "Despertar",
    title: "Os 7 Veus\ndo Despertar",
    subtitle: "Uma jornada em 7 camadas.\nCada veu esconde algo\nque sempre soubeste.",
    cta: "seteveus.space",
  },
  {
    label: "Frase ~ automatico",
    title: '"sai do modo automatico.\nnao sei para onde vou\nmas pelo menos\nestou acordada."',
    subtitle: "~ leitora anonima, Veu 1",
    cta: "Comunidade Ecos ~ seteveus.space",
  },
  {
    label: "Frase ~ banho",
    title: '"chorei no banho.\noutra vez.\nmas desta vez\nnao foi por tristeza.\nfoi por reconhecimento."',
    subtitle: "~ leitora anonima, Veu 1",
    cta: "Comunidade Ecos ~ seteveus.space",
  },
  {
    label: "Frase ~ marido",
    title: '"o meu marido perguntou\nestas bem?\ne eu disse que sim.\nautomaticamente."',
    subtitle: "~ leitora anonima, Veu 1",
    cta: "Comunidade Ecos ~ seteveus.space",
  },
  {
    label: "Jornada ritmo",
    title: "A tua jornada,\nao teu ritmo.",
    subtitle: "Sem pressas. Sem prazos.\nAo ritmo da tua verdade.",
    cta: "seteveus.space",
  },
  {
    label: "Experiencia leitura",
    title: "Uma experiencia\nde leitura\ndiferente.",
    subtitle: "Reflexoes. Checklists. Diario.\nTudo dentro do livro.",
    cta: "seteveus.space",
  },
  {
    label: "Vazio",
    title: "",
    subtitle: "",
    cta: "",
  },
];

// ─── FORMATOS ───────────────────────────────────────────────────────────────

type Format = "story" | "post" | "carousel";

const FORMATS: Record<Format, { w: number; h: number; label: string }> = {
  story: { w: 1080, h: 1920, label: "Story 9:16" },
  post: { w: 1080, h: 1080, label: "Post 1:1" },
  carousel: { w: 1080, h: 1350, label: "Carrossel 4:5" },
};

type TextPos = "top" | "center" | "bottom";

// ─── PAGINA ─────────────────────────────────────────────────────────────────

export default function GeradorPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const canvasRef = useRef<HTMLDivElement>(null);

  // State
  const [print, setPrint] = useState(PRINTS[0]);
  const [format, setFormat] = useState<Format>("story");
  const [blur, setBlur] = useState(40);
  const [overlay, setOverlay] = useState(72);
  const [overlayColor, setOverlayColor] = useState("#1a1a2e");
  const [title, setTitle] = useState(MENSAGENS[0].title);
  const [subtitle, setSubtitle] = useState(MENSAGENS[0].subtitle);
  const [cta, setCta] = useState(MENSAGENS[0].cta);
  const [textPos, setTextPos] = useState<TextPos>("center");
  const [titleSize, setTitleSize] = useState(48);
  const [subtitleSize, setSubtitleSize] = useState(20);
  const [ctaSize, setCtaSize] = useState(16);
  const [showLogo, setShowLogo] = useState(true);
  const [exporting, setExporting] = useState(false);

  // Auth
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
  const previewScale = Math.min(420 / fmt.h, 380 / fmt.w);

  const posClass: Record<TextPos, string> = {
    top: "justify-start pt-[15%]",
    center: "justify-center",
    bottom: "justify-end pb-[15%]",
  };

  function applyMsg(m: (typeof MENSAGENS)[number]) {
    setTitle(m.title);
    setSubtitle(m.subtitle);
    setCta(m.cta);
  }

  async function handleExport() {
    if (!canvasRef.current) return;
    setExporting(true);
    try {
      const el = canvasRef.current;
      const parent = el.parentElement as HTMLElement | null;

      // Guardar estilos originais
      const origEl = { t: el.style.transform, w: el.style.width, h: el.style.height };
      const origParent = parent
        ? { w: parent.style.width, h: parent.style.height, o: parent.style.overflow, r: parent.style.borderRadius }
        : null;

      // Expandir para tamanho real
      el.style.transform = "none";
      el.style.width = `${fmt.w}px`;
      el.style.height = `${fmt.h}px`;
      if (parent) {
        parent.style.width = `${fmt.w}px`;
        parent.style.height = `${fmt.h}px`;
        parent.style.overflow = "visible";
        parent.style.borderRadius = "0";
      }

      // Esperar reflow do browser
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

      const dataUrl = await toPng(el, { width: fmt.w, height: fmt.h, pixelRatio: 1, cacheBust: true });

      // Restaurar estilos
      el.style.transform = origEl.t;
      el.style.width = origEl.w;
      el.style.height = origEl.h;
      if (parent && origParent) {
        parent.style.width = origParent.w;
        parent.style.height = origParent.h;
        parent.style.overflow = origParent.o;
        parent.style.borderRadius = origParent.r;
      }

      const a = document.createElement("a");
      a.download = `sete-veus-${format}-${Date.now()}.png`;
      a.href = dataUrl;
      a.click();
    } catch {
      alert("Erro ao exportar.");
    }
    setExporting(false);
  }

  return (
    <section className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-brown-100 bg-white/50 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-sans text-sm text-brown-400 hover:text-brown-700">
              Painel
            </Link>
            <span className="text-brown-200">/</span>
            <h1 className="font-serif text-xl text-brown-900">Gerador de Conteudo</h1>
          </div>
          <button
            onClick={handleExport}
            disabled={exporting}
            className={`rounded-lg bg-sage px-6 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:bg-sage-dark ${exporting ? "opacity-60" : ""}`}
          >
            {exporting ? "A exportar..." : "Descarregar PNG"}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex gap-8 max-lg:flex-col">

          {/* ── PAINEL ESQUERDO: Controlos ── */}
          <div className="w-full space-y-5 lg:w-[400px]">

            {/* Formato */}
            <div>
              <label className="mb-2 block font-sans text-[0.65rem] font-medium uppercase tracking-wider text-brown-400">
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

            {/* Fundo (prints) */}
            <div>
              <label className="mb-2 block font-sans text-[0.65rem] font-medium uppercase tracking-wider text-brown-400">
                Fundo ~ escolhe um print
              </label>
              <div className="grid grid-cols-6 gap-1.5">
                {PRINTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPrint(p)}
                    title={p.label}
                    className={`group relative aspect-[3/4] overflow-hidden rounded-lg border-2 transition-all ${
                      print.id === p.id
                        ? "border-sage ring-2 ring-sage/30"
                        : "border-transparent hover:border-brown-200"
                    }`}
                  >
                    <img src={p.src} alt={p.label} className="h-full w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1">
                      <span className="font-sans text-[0.45rem] leading-tight text-white">{p.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mensagem (presets) */}
            <div>
              <label className="mb-2 block font-sans text-[0.65rem] font-medium uppercase tracking-wider text-brown-400">
                Mensagem ~ escolhe ou edita
              </label>
              <div className="flex flex-wrap gap-1.5">
                {MENSAGENS.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => applyMsg(m)}
                    className="rounded-full border border-brown-100 bg-white px-3 py-1 font-sans text-[0.65rem] text-brown-600 transition-colors hover:border-sage hover:bg-sage/5 hover:text-sage-dark"
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Blur + Overlay */}
            <div className="space-y-2">
              <label className="block font-sans text-[0.65rem] font-medium uppercase tracking-wider text-brown-400">
                Fundo ~ ajustes
              </label>
              <div className="flex items-center gap-2">
                <span className="w-14 font-sans text-xs text-brown-400">Blur</span>
                <input type="range" min={10} max={60} value={blur} onChange={(e) => setBlur(+e.target.value)} className="flex-1 accent-sage" />
                <span className="w-10 text-right font-sans text-xs text-brown-500">{blur}px</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-14 font-sans text-xs text-brown-400">Escuro</span>
                <input type="range" min={30} max={90} value={overlay} onChange={(e) => setOverlay(+e.target.value)} className="flex-1 accent-sage" />
                <span className="w-10 text-right font-sans text-xs text-brown-500">{overlay}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-14 font-sans text-xs text-brown-400">Cor</span>
                <div className="flex gap-2">
                  {[
                    { c: "#000000", l: "Preto" },
                    { c: "#3d3630", l: "Castanho" },
                    { c: "#1a1a2e", l: "Azul escuro" },
                    { c: "#0d1b2a", l: "Noite" },
                  ].map(({ c, l }) => (
                    <button
                      key={c}
                      onClick={() => setOverlayColor(c)}
                      title={l}
                      className={`h-7 w-7 rounded-full border-2 transition-all ${
                        overlayColor === c ? "border-sage scale-110" : "border-brown-200"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Texto editavel */}
            <div className="space-y-3">
              <label className="block font-sans text-[0.65rem] font-medium uppercase tracking-wider text-brown-400">
                Texto ~ editar
              </label>
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs text-brown-500">Titulo</span>
                  <div className="flex items-center gap-1">
                    <input type="range" min={24} max={72} value={titleSize} onChange={(e) => setTitleSize(+e.target.value)} className="w-20 accent-sage" />
                    <span className="w-8 font-sans text-[0.6rem] text-brown-400">{titleSize}</span>
                  </div>
                </div>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-3 py-2 font-sans text-sm text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs text-brown-500">Subtitulo</span>
                  <div className="flex items-center gap-1">
                    <input type="range" min={12} max={36} value={subtitleSize} onChange={(e) => setSubtitleSize(+e.target.value)} className="w-20 accent-sage" />
                    <span className="w-8 font-sans text-[0.6rem] text-brown-400">{subtitleSize}</span>
                  </div>
                </div>
                <textarea
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-3 py-2 font-sans text-sm text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs text-brown-500">CTA / Link</span>
                  <div className="flex items-center gap-1">
                    <input type="range" min={10} max={28} value={ctaSize} onChange={(e) => setCtaSize(+e.target.value)} className="w-20 accent-sage" />
                    <span className="w-8 font-sans text-[0.6rem] text-brown-400">{ctaSize}</span>
                  </div>
                </div>
                <input
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-3 py-2 font-sans text-sm text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                />
              </div>
            </div>

            {/* Posicao + Logo */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="mb-1.5 block font-sans text-[0.65rem] font-medium uppercase tracking-wider text-brown-400">
                  Posicao
                </label>
                <div className="flex gap-1.5">
                  {(["top", "center", "bottom"] as TextPos[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setTextPos(p)}
                      className={`flex-1 rounded border px-2 py-1.5 font-sans text-[0.65rem] ${
                        textPos === p
                          ? "border-sage bg-sage/10 text-sage-dark"
                          : "border-brown-100 bg-white text-brown-400"
                      }`}
                    >
                      {p === "top" ? "Topo" : p === "center" ? "Centro" : "Baixo"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block font-sans text-[0.65rem] font-medium uppercase tracking-wider text-brown-400">
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

            {/* Export button (mobile) */}
            <button
              onClick={handleExport}
              disabled={exporting}
              className="w-full rounded-lg bg-sage py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-sage-dark lg:hidden"
            >
              {exporting ? "A exportar..." : "Descarregar PNG"}
            </button>
          </div>

          {/* ── PAINEL DIREITO: Preview ── */}
          <div className="flex flex-1 flex-col items-center">
            <div className="mb-3 font-sans text-xs text-brown-400">
              {fmt.w} x {fmt.h} ~ {print.label}
            </div>

            <div
              className="overflow-hidden rounded-xl shadow-2xl"
              style={{ width: fmt.w * previewScale, height: fmt.h * previewScale }}
            >
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
                {/* BG image */}
                <img
                  src={print.src}
                  alt=""
                  crossOrigin="anonymous"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ filter: `blur(${blur}px)` }}
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: overlayColor, opacity: overlay / 100 }}
                />

                {/* Texto */}
                <div className={`relative flex h-full flex-col items-center px-[10%] text-center ${posClass[textPos]}`}>
                  {title && (
                    <h2
                      className="whitespace-pre-line font-serif leading-[1.2] text-white"
                      style={{ fontSize: titleSize }}
                    >
                      {title}
                    </h2>
                  )}
                  {title && subtitle && (
                    <div className="my-[3%] h-px w-[40%] bg-white/40" />
                  )}
                  {subtitle && (
                    <p
                      className="whitespace-pre-line font-sans font-light tracking-wide text-white/80"
                      style={{ fontSize: subtitleSize }}
                    >
                      {subtitle}
                    </p>
                  )}
                  {cta && (
                    <p
                      className="mt-[5%] font-sans font-medium uppercase tracking-[0.2em] text-white/60"
                      style={{ fontSize: ctaSize }}
                    >
                      {cta}
                    </p>
                  )}
                </div>

                {/* Logo */}
                {showLogo && (
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

            <p className="mt-4 max-w-sm text-center font-sans text-xs text-brown-400">
              Escolhe um print como fundo, uma mensagem, ajusta o blur e exporta.
              Imagem gerada em {fmt.w}x{fmt.h}px.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
