"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ─── TYPES ───────────────────────────────────────────────────────────────────

type CardFormat = "whatsapp-status" | "instagram-feed" | "instagram-story" | "broadcast";

type MarketingCard = {
  id: string;
  format: CardFormat;
  category: string;
  content: {
    title?: string;
    subtitle?: string;
    body: string;
    footer?: string;
    highlight?: string;
  };
  style: {
    bg: string;
    text: string;
    accent: string;
  };
};

// ─── CARD DATA ───────────────────────────────────────────────────────────────

const cards: MarketingCard[] = [
  // ── REVAMP / NOVIDADES ──────────────────────────────────────────────────

  {
    id: "revamp-1",
    format: "instagram-feed",
    category: "Novidades",
    content: {
      title: "A plataforma mudou.",
      body: "Novo design.\nNova experiencia de leitura.\nNovo chatbot de apoio.\nNova comunidade.\n\nTudo pensado para ti.\nAo teu ritmo.",
      footer: "seteecos.com",
      highlight: "Os Sete Veus",
    },
    style: { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896" },
  },
  {
    id: "revamp-2",
    format: "instagram-feed",
    category: "Novidades",
    content: {
      title: "O que ha de novo?",
      body: "Leitura integrada com pausas de reflexao\n\nDiario pessoal dentro da experiencia\n\nRespiracao guiada entre capitulos\n\nChatbot para todas as tuas duvidas\n\nComunidade anonima e impermanente",
      footer: "seteecos.com",
    },
    style: { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e" },
  },
  {
    id: "revamp-3",
    format: "instagram-story",
    category: "Novidades",
    content: {
      title: "A plataforma\nOs Sete Veus\nfoi redesenhada.",
      body: "Tudo novo.\nA mesma essencia.",
      footer: "Descobre em seteecos.com",
    },
    style: { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896" },
  },
  {
    id: "revamp-4",
    format: "whatsapp-status",
    category: "Novidades",
    content: {
      title: "Ha algo novo\na acontecer.",
      body: "A plataforma Os Sete Veus foi completamente redesenhada.\n\nNovo visual. Nova experiencia.\nA mesma profundidade.",
      footer: "seteecos.com",
    },
    style: { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896" },
  },

  // ── ESPELHO DA ILUSAO ───────────────────────────────────────────────────

  {
    id: "espelho-1",
    format: "instagram-feed",
    category: "Espelho da Ilusao",
    content: {
      highlight: "Espelho da Ilusao",
      title: "Quando foi que escolhi\ntomar cafe\nem vez de cha?",
      body: "Uma pergunta absurda\nque muda tudo.",
      footer: "seteecos.com/experiencias",
    },
    style: { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896" },
  },
  {
    id: "espelho-2",
    format: "instagram-feed",
    category: "Espelho da Ilusao",
    content: {
      title: "Via, mas nao sentia.",
      body: "Registava, mas nao participava.\nComo quem assiste a um\nespectaculo por tras de uma\njanela fechada.",
      footer: "O Espelho da Ilusao ~ seteecos.com",
    },
    style: { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896" },
  },
  {
    id: "espelho-3",
    format: "instagram-story",
    category: "Espelho da Ilusao",
    content: {
      highlight: "Disponivel agora",
      title: "O Espelho\nda Ilusao",
      body: "7 capitulos de ficcao\nRespiracao guiada\nDiario de reflexao\nO teu Espelho pessoal",
      footer: "$29 USD ~ seteecos.com",
    },
    style: { bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0" },
  },
  {
    id: "espelho-4",
    format: "whatsapp-status",
    category: "Espelho da Ilusao",
    content: {
      title: "Ha mais para ti\ndo que aquilo que\ntens vivido.",
      body: "O Espelho da Ilusao.\nUma experiencia de leitura integrada.",
      footer: "seteecos.com",
    },
    style: { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896" },
  },
  {
    id: "espelho-5",
    format: "instagram-feed",
    category: "Espelho da Ilusao",
    content: {
      title: "Nao e um livro.\nE uma experiencia.",
      body: "7 capitulos de ficcao\n+ respiracao guiada\n+ diario de reflexao\n+ o teu Espelho pessoal\n\nLes. Respiras. Escreves.\nE no final, ves-te.",
      footer: "seteecos.com/experiencias",
    },
    style: { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e" },
  },
  {
    id: "espelho-6",
    format: "instagram-feed",
    category: "Espelho da Ilusao",
    content: {
      title: "Perguntar,\nmesmo tarde,\ne o primeiro gesto\nde se escolher.",
      body: "",
      footer: "O Espelho da Ilusao ~ seteecos.com",
    },
    style: { bg: "#3d3630", text: "#c9b896", accent: "#f7f5f0" },
  },

  // ── NO DA HERANCA ───────────────────────────────────────────────────────

  {
    id: "no-1",
    format: "instagram-feed",
    category: "No da Heranca",
    content: {
      highlight: "Coleccao Nos",
      title: "A mae sempre viu.\nEsperou anos.",
      body: "Agora que Sara acordou,\nHelena tem algo\npara lhe dizer.",
      footer: "O No da Heranca ~ seteecos.com",
    },
    style: { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896" },
  },
  {
    id: "no-2",
    format: "instagram-story",
    category: "No da Heranca",
    content: {
      highlight: "Novo",
      title: "O No\nda Heranca",
      body: "O que se passa entre\nmae e filha quando\no veu cai.\n\nSara e Helena.\nO silencio herdado.",
      footer: "$12 USD ~ seteecos.com",
    },
    style: { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896" },
  },

  // ── COMUNIDADE ──────────────────────────────────────────────────────────

  {
    id: "comunidade-1",
    format: "instagram-feed",
    category: "Comunidade",
    content: {
      title: "Onde as vozes\nse encontram.",
      body: "Ecos. Mare. Circulo. Fogueira.\n\nQuatro salas.\nTudo anonimo.\nTudo impermanente.",
      footer: "Comunidade Ecos ~ seteecos.com",
      highlight: "Comunidade",
    },
    style: { bg: "#7a8c6e", text: "#f7f5f0", accent: "#ebe7df" },
  },

  // ── RECURSOS GRATUITOS ──────────────────────────────────────────────────

  {
    id: "recursos-1",
    format: "instagram-feed",
    category: "Recursos Gratuitos",
    content: {
      title: "Comeca sem pagar nada.",
      body: "Teste de autoconhecimento\nDiario de 7 dias\nArtigos\nMini-guia\nWallpapers\nGlossario\n\nTudo gratuito.",
      footer: "seteecos.com/recursos",
      highlight: "Gratuito",
    },
    style: { bg: "#f7f5f0", text: "#3d3630", accent: "#7a8c6e" },
  },
  {
    id: "recursos-2",
    format: "whatsapp-status",
    category: "Recursos Gratuitos",
    content: {
      title: "Descobre qual veu\nte esconde.",
      body: "Teste de autoconhecimento gratuito.\n3 minutos.\nSem compromisso.",
      footer: "seteecos.com/recursos/teste",
    },
    style: { bg: "#f7f5f0", text: "#3d3630", accent: "#c9b896" },
  },

  // ── PRECOS ──────────────────────────────────────────────────────────────

  {
    id: "precos-1",
    format: "instagram-feed",
    category: "Precos",
    content: {
      title: "Quanto custa\nescolher-te?",
      body: "Espelho da Ilusao\n$29 USD / 1.885 MZN\n\nNo da Heranca\n$12 USD / 780 MZN\n\nLivro fisico\n$23 USD / 1.495 MZN\n\nAcesso vitalicio.",
      footer: "seteecos.com/comprar",
    },
    style: { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896" },
  },

  // ── LIVRO FISICO ────────────────────────────────────────────────────────

  {
    id: "livro-1",
    format: "instagram-story",
    category: "Livro Fisico",
    content: {
      highlight: "232 paginas",
      title: "Os 7 Veus\ndo Despertar",
      body: "O ensaio filosofico\nque deu origem a tudo.\n\n$23 USD / 1.495 MZN\nEnvio para Mocambique\ne outros paises.",
      footer: "Encomendar via WhatsApp",
    },
    style: { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896" },
  },

  // ── ACESSO DIGITAL (convite leitores livro fisico) ──────────────────────

  {
    id: "acesso-1",
    format: "instagram-feed",
    category: "Livro Fisico",
    content: {
      highlight: "Leitores do livro",
      title: "O teu livro\nabre portas que ainda\nnao conheces.",
      body: "Tens Os 7 Veus do Despertar?\n\nRegista o teu interesse\ne recebe acesso a\nplataforma digital completa.\n\nGratuito.",
      footer: "seteecos.com/acesso-digital",
    },
    style: { bg: "#ebe7df", text: "#3d3630", accent: "#c9b896" },
  },
  {
    id: "acesso-2",
    format: "whatsapp-status",
    category: "Livro Fisico",
    content: {
      title: "Tens o livro\nOs 7 Veus?",
      body: "A plataforma digital\nfoi completamente redesenhada.\n\nTens acesso gratuito.\nRegista o teu interesse.",
      footer: "seteecos.com/acesso-digital",
    },
    style: { bg: "#3d3630", text: "#f7f5f0", accent: "#c9b896" },
  },
  {
    id: "acesso-3",
    format: "instagram-story",
    category: "Livro Fisico",
    content: {
      highlight: "Gratuito",
      title: "Do livro fisico\na experiencia digital.",
      body: "Se ja tens\nOs 7 Veus do Despertar,\nregista o teu interesse\ne recebe o codigo de acesso\na plataforma completa.",
      footer: "seteecos.com/acesso-digital",
    },
    style: { bg: "#c9b896", text: "#3d3630", accent: "#f7f5f0" },
  },

  // ── ESPELHO DO MEDO (teaser) ────────────────────────────────────────────

  {
    id: "medo-1",
    format: "instagram-feed",
    category: "Em Breve",
    content: {
      highlight: "Marco 2026",
      title: "Sabes o que queres.\nMas o medo decide\nantes de ti.",
      body: "O segundo espelho\nesta quase a chegar.",
      footer: "O Espelho do Medo ~ seteecos.com",
    },
    style: { bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df" },
  },
  {
    id: "medo-2",
    format: "whatsapp-status",
    category: "Em Breve",
    content: {
      title: "O primeiro passo\nnao precisa\nde ser grande.",
      body: "Precisa apenas\nde ser teu.",
      footer: "O Espelho do Medo ~ Marco 2026",
    },
    style: { bg: "#8b9b8e", text: "#f7f5f0", accent: "#ebe7df" },
  },
];

// ── BROADCAST MESSAGES (WhatsApp text) ──────────────────────────────────────

const broadcastMessages = [
  {
    id: "bc-revamp",
    category: "Novidades",
    title: "Anuncio da nova plataforma",
    text: `Ola! Tenho uma novidade para ti.

A plataforma Os Sete Veus foi completamente redesenhada. Novo visual, nova experiencia de leitura, novo chatbot de apoio.

Se ja tens conta, entra e explora. Se ainda nao conheces, comeca pelo teste gratuito:
seteecos.com/recursos/teste

Ao teu ritmo. Sem pressa.
~ Vivianne`,
  },
  {
    id: "bc-espelho",
    category: "Espelho da Ilusao",
    title: "Convite para o Espelho",
    text: `Ja alguma vez sentiste que a vida que construiste nao foi bem escolhida por ti?

Escrevi uma historia sobre isso. Chama-se O Espelho da Ilusao.

Nao e um livro que se le. E uma experiencia que se vive: 7 capitulos de ficcao, respiracao guiada, diario de reflexao e o teu Espelho pessoal.

Se quiseres comecar pelo teste gratuito:
seteecos.com/recursos/teste

Se quiseres comecar directamente:
seteecos.com/comprar/espelhos

~ Vivianne`,
  },
  {
    id: "bc-no",
    category: "No da Heranca",
    title: "Lancamento do No",
    text: `Se ja leste o Espelho da Ilusao, ha uma continuacao que quero partilhar contigo.

O No da Heranca e a historia de Sara e Helena (mae e filha). O que se passa entre duas pessoas quando o veu da ilusao cai.

So se desbloqueia depois de completares o Espelho. E a continuacao emocional, nao um upsell.

seteecos.com/coleccao-nos

~ Vivianne`,
  },
  {
    id: "bc-recursos",
    category: "Recursos Gratuitos",
    title: "Recursos gratuitos",
    text: `Sabes que na plataforma Os Sete Veus ha varios recursos completamente gratuitos?

- Teste de autoconhecimento (3 min)
- Diario de 7 dias
- Artigos sobre os veus
- Mini-guia
- Wallpapers

Comeca sem pagar nada:
seteecos.com/recursos

~ Vivianne`,
  },
  {
    id: "bc-acesso",
    category: "Livro Fisico",
    title: "Convite aos leitores do livro fisico",
    text: `Ola! Se tens o livro fisico Os 7 Veus do Despertar, tenho uma novidade:

A plataforma digital foi redesenhada e tens direito a acesso gratuito. Leitura integrada, diario de reflexao, comunidade e muito mais.

Regista o teu interesse aqui e envio-te o codigo:
seteecos.com/acesso-digital

Demora menos de 1 minuto. Sem compromisso.

~ Vivianne`,
  },
  {
    id: "bc-acesso-curto",
    category: "Livro Fisico",
    title: "Versao curta (WhatsApp Status)",
    text: `Tens o livro Os 7 Veus do Despertar?

A plataforma digital esta completamente nova. E tens acesso gratuito.

seteecos.com/acesso-digital`,
  },
  {
    id: "bc-medo",
    category: "Em Breve",
    title: "Teaser do Espelho do Medo",
    text: `O segundo espelho esta quase a chegar.

Sabes o que queres. Mas o medo decide antes de ti.

O Espelho do Medo chega em Marco de 2026.

Se quiseres ser a primeira a saber:
seteecos.com/experiencias

~ Vivianne`,
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

type FilterFormat = "all" | CardFormat | "broadcast";
type FilterCategory = string;

export default function MarketingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [format, setFormat] = useState<FilterFormat>("all");
  const [category, setCategory] = useState<FilterCategory>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (loading) {
    return (
      <section className="bg-cream px-6 py-32 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
      </section>
    );
  }

  if (!user) {
    router.push("/entrar");
    return null;
  }

  const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];
  if (!AUTHOR_EMAILS.includes(user.email || "")) {
    router.push("/membro");
    return null;
  }

  const formats: { key: FilterFormat; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "instagram-feed", label: "Instagram Feed" },
    { key: "instagram-story", label: "Instagram Story" },
    { key: "whatsapp-status", label: "WhatsApp Status" },
    { key: "broadcast", label: "Mensagens WhatsApp" },
  ];

  const allCategories = [
    "all",
    ...Array.from(new Set([
      ...cards.map((c) => c.category),
      ...broadcastMessages.map((b) => b.category),
    ])),
  ];

  const filteredCards = cards.filter((c) => {
    if (format !== "all" && format !== "broadcast" && c.format !== format) return false;
    if (category !== "all" && c.category !== category) return false;
    return true;
  });

  const filteredBroadcasts = broadcastMessages.filter((b) => {
    if (category !== "all" && b.category !== category) return false;
    return true;
  });

  const showCards = format !== "broadcast";
  const showBroadcasts = format === "all" || format === "broadcast";

  async function copyText(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-brown-100 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-brown-900">Marketing Engine</h1>
            <p className="mt-1 font-sans text-xs text-brown-500">
              Prints reais para WhatsApp e Instagram. Faz screenshot directamente.
            </p>
          </div>
          <Link
            href="/painel"
            className="font-sans text-xs text-brown-500 hover:text-brown-900"
          >
            &larr; Painel
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-brown-100 bg-white px-6 py-3">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            {formats.map((f) => (
              <button
                key={f.key}
                onClick={() => setFormat(f.key)}
                className={`rounded-full px-4 py-1.5 font-sans text-[0.65rem] uppercase tracking-wider transition-all ${
                  format === f.key
                    ? "bg-brown-900 text-cream"
                    : "bg-brown-100/50 text-brown-500 hover:text-brown-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {allCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-3 py-1 font-sans text-[0.6rem] transition-all ${
                  category === c
                    ? "bg-gold/20 text-gold-dark"
                    : "text-brown-400 hover:text-brown-600"
                }`}
              >
                {c === "all" ? "Todas categorias" : c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mx-auto max-w-7xl px-6 py-4">
        <p className="font-sans text-[0.65rem] text-brown-400">
          Cada card abaixo e um print real. No telemovel, faz screenshot directamente.
          No computador, clica com o botao direito e &quot;Guardar imagem&quot; ou faz screenshot da area.
          As mensagens de broadcast podem ser copiadas com um clique.
        </p>
      </div>

      {/* Visual Cards Grid */}
      {showCards && filteredCards.length > 0 && (
        <div className="mx-auto max-w-7xl px-6 pb-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCards.map((card) => (
              <div key={card.id} className="space-y-2">
                {/* Format badge */}
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-brown-100/50 px-3 py-0.5 font-sans text-[0.55rem] uppercase tracking-wider text-brown-500">
                    {card.format === "instagram-feed"
                      ? "Instagram 1:1"
                      : card.format === "instagram-story"
                        ? "Story 9:16"
                        : "WhatsApp Status"}
                  </span>
                  <span className="font-sans text-[0.55rem] text-brown-400">
                    {card.category}
                  </span>
                </div>

                {/* The actual visual card */}
                <VisualCard card={card} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Broadcast Messages */}
      {showBroadcasts && filteredBroadcasts.length > 0 && (
        <div className="mx-auto max-w-7xl px-6 pb-12">
          <h2 className="mb-4 font-serif text-lg text-brown-900">
            Mensagens para WhatsApp Broadcast
          </h2>
          <p className="mb-6 font-sans text-xs text-brown-500">
            Texto pronto a copiar e colar. Tom pessoal, directo, intimo.
          </p>
          <div className="space-y-4">
            {filteredBroadcasts.map((msg) => (
              <div
                key={msg.id}
                className="rounded-xl border border-brown-100 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-[#25D366]/10 px-3 py-1 font-sans text-[0.55rem] font-medium text-[#25D366]">
                      WhatsApp
                    </span>
                    <span className="font-sans text-[0.6rem] text-brown-400">
                      {msg.category}
                    </span>
                  </div>
                  <button
                    onClick={() => copyText(msg.id, msg.text)}
                    className="rounded-lg bg-cream px-4 py-1.5 font-sans text-[0.6rem] font-medium text-brown-600 transition-colors hover:bg-cream-dark"
                  >
                    {copiedId === msg.id ? "Copiado!" : "Copiar mensagem"}
                  </button>
                </div>
                <h3 className="mt-3 font-serif text-sm text-brown-900">
                  {msg.title}
                </h3>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-[0.8rem] leading-relaxed text-brown-600">
                  {msg.text}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {showCards && filteredCards.length === 0 && !showBroadcasts && (
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="font-serif text-base text-brown-400">
            Nenhum conteudo para estes filtros.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── VISUAL CARD COMPONENT ──────────────────────────────────────────────────

function VisualCard({ card }: { card: MarketingCard }) {
  const isSquare = card.format === "instagram-feed";
  const isVertical = card.format === "instagram-story" || card.format === "whatsapp-status";

  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl shadow-lg ${
        isSquare ? "aspect-square" : "aspect-[9/16]"
      }`}
      style={{
        backgroundColor: card.style.bg,
        color: card.style.text,
        maxWidth: isSquare ? 400 : 280,
      }}
    >
      {/* Decorative top accent */}
      <div className="px-8 pt-8">
        {card.content.highlight && (
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 font-sans text-[0.55rem] uppercase tracking-[0.15em]"
            style={{
              backgroundColor: card.style.accent + "25",
              color: card.style.accent,
            }}
          >
            {card.content.highlight}
          </span>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col justify-center px-8">
        {card.content.title && (
          <h2
            className={`font-serif leading-tight ${
              isSquare ? "text-[1.4rem]" : "text-[1.2rem]"
            }`}
            style={{ color: card.style.text }}
          >
            {card.content.title}
          </h2>
        )}
        {card.content.body && (
          <p
            className={`mt-4 whitespace-pre-line font-sans text-[0.75rem] leading-relaxed opacity-80`}
          >
            {card.content.body}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="px-8 pb-6">
        {card.content.subtitle && (
          <p className="mb-2 font-sans text-[0.65rem] opacity-70">
            {card.content.subtitle}
          </p>
        )}
        {card.content.footer && (
          <div className="flex items-center justify-between">
            <p
              className="font-sans text-[0.55rem] uppercase tracking-[0.12em]"
              style={{ color: card.style.accent }}
            >
              {card.content.footer}
            </p>
            {/* Decorative tilde */}
            <span
              className="font-serif text-lg opacity-30"
              style={{ color: card.style.accent }}
            >
              ~
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
