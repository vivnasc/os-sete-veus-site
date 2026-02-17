"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ─── Knowledge Base ──────────────────────────────────────────────────────────

type FAQ = { q: string; a: string; link?: { label: string; href: string } };

type Category = {
  id: string;
  label: string;
  icon: string;
  faqs: FAQ[];
};

const categories: Category[] = [
  {
    id: "plataforma",
    label: "Sobre a plataforma",
    icon: "~",
    faqs: [
      {
        q: "O que e a Sete Ecos?",
        a: "A Sete Ecos e uma plataforma de autoconhecimento com leitura integrada. Mais do que livros, e um ecossistema de historias, praticas guiadas, diario de reflexao e comunidade. Tudo pensado para quem quer despertar, ao seu ritmo.",
        link: { label: "Explorar o ecossistema", href: "/ecossistema" },
      },
      {
        q: "Quem e a autora?",
        a: "Vivianne dos Santos e economista, escritora e mocambicana. Escreveu Os Sete Veus do Despertar e criou as coleccoes Espelhos e Nos — ficcoes de transformacao interior e relacional.",
        link: { label: "Conhecer a Vivianne", href: "/sobre" },
      },
      {
        q: "A plataforma e gratuita?",
        a: "Sim, podes explorar bastante sem pagar: o teste de autoconhecimento, artigos, diario de 7 dias e outros recursos sao gratuitos. So pagas se quiseres aceder as experiencias de leitura integrada (Espelhos, Nos ou Livro).",
        link: { label: "Recursos gratuitos", href: "/recursos" },
      },
      {
        q: "Funciona no telemovel?",
        a: "Sim. A plataforma foi desenhada mobile-first. Funciona em qualquer browser — telemovel, tablet ou computador. Nao precisas de instalar nada.",
      },
    ],
  },
  {
    id: "espelhos",
    label: "Coleccao Espelhos",
    icon: "\u25CB",
    faqs: [
      {
        q: "O que sao os Espelhos?",
        a: "Sao uma coleccao de 7 ficcoes de transformacao interior — historias onde te reconheces. Cada Espelho corresponde a um veu (Ilusao, Medo, Culpa, Identidade, Controlo, Desejo, Separacao) e inclui 7 capitulos, praticas de respiracao, diario de reflexao e checklist pessoal.",
        link: { label: "Ver Coleccao Espelhos", href: "/os-sete-veus" },
      },
      {
        q: "Quantos Espelhos existem?",
        a: "Sao 7 no total. Actualmente esta disponivel o Espelho da Ilusao (completo, 7 capitulos). Os restantes serao publicados mensalmente de Marco a Agosto de 2026: Medo, Culpa, Identidade, Controlo, Desejo e Separacao.",
      },
      {
        q: "Como funciona a leitura?",
        a: "Les capitulo a capitulo, directamente no site. Cada capitulo tem pausas de reflexao, exercicios de respiracao, diario pessoal e checklists. O teu progresso e guardado automaticamente. Podes ler ao teu ritmo, quantas vezes quiseres.",
      },
      {
        q: "Quanto custa um Espelho?",
        a: "Um Espelho individual custa $29 USD (1.885 MZN). Existe tambem o Pack 3 Espelhos por $69 USD (18% desconto, inclui 3 Nos) e a Jornada Completa (7 Espelhos) por $149 USD (27% desconto, inclui todos os Nos).",
        link: { label: "Ver precos", href: "/comprar/espelhos" },
      },
    ],
  },
  {
    id: "nos",
    label: "Coleccao Nos",
    icon: "\u221E",
    faqs: [
      {
        q: "O que sao os Nos?",
        a: "Sao uma coleccao de 7 ficcoes relacionais — historias sobre o que se passa entre duas pessoas quando um veu cai. Cada No e o par relacional de um Espelho. Os Espelhos olham para dentro; os Nos olham para a relacao.",
        link: { label: "Ver Coleccao Nos", href: "/coleccao-nos" },
      },
      {
        q: "Como desbloqueio um No?",
        a: "Precisas de duas coisas: (1) completar todos os 7 capitulos do Espelho correspondente e (2) ter adquirido o No. Se compraste o Pack 3 Espelhos ou a Jornada Completa, os Nos ja estao incluidos.",
      },
      {
        q: "Quanto custa um No?",
        a: "Um No individual custa $12 USD (780 MZN). Mas se comprares o Pack 3 Espelhos ($69), os 3 Nos correspondentes ja estao incluidos. Na Jornada Completa ($149), todos os 7 Nos estao incluidos.",
        link: { label: "Ver precos", href: "/comprar/espelhos" },
      },
      {
        q: "Qual e o No disponivel agora?",
        a: "O No da Heranca — a historia de Sara e Helena, mae e filha, e o silencio herdado entre elas. E o par relacional do Espelho da Ilusao. Os restantes Nos serao publicados a medida que os Espelhos forem lancados.",
      },
    ],
  },
  {
    id: "precos",
    label: "Precos e pagamentos",
    icon: "$",
    faqs: [
      {
        q: "Quais sao os precos?",
        a: "Espelho individual: $29 USD (1.885 MZN). No individual: $12 USD (780 MZN). Pack 3 Espelhos: $69 USD (inclui 3 Nos, 18% desconto). Jornada Completa (7 Espelhos + 7 Nos): $149 USD (27% desconto). Livro fisico: $23 USD (1.495 MZN).",
        link: { label: "Ver todos os precos", href: "/comprar" },
      },
      {
        q: "Que metodos de pagamento aceitam?",
        a: "Aceitamos PayPal (cartao de credito/debito internacional), transferencia bancaria (Millennium BIM Mocambique) e M-Pesa. Apos o pagamento, recebes um codigo de acesso por email.",
      },
      {
        q: "O acesso e vitalicio?",
        a: "Sim. Uma vez comprado, tens acesso para sempre. Podes ler ao teu ritmo, quantas vezes quiseres. Sem subscricoes, sem renovacoes.",
      },
      {
        q: "Qual e o melhor valor?",
        a: "A Jornada Completa ($149 USD) inclui todos os 7 Espelhos e todos os 7 Nos — 14 livros no total. Comprados individualmente, custaria $287 USD. Com a Jornada, poupas 48%.",
        link: { label: "Ver Jornada Completa", href: "/comprar/espelhos" },
      },
    ],
  },
  {
    id: "conta",
    label: "Conta e acesso",
    icon: "\u2192",
    faqs: [
      {
        q: "Como crio a minha conta?",
        a: "Apos o pagamento, recebes um codigo de acesso por email. Usa esse codigo na pagina de registo para criar a tua conta e aceder imediatamente.",
        link: { label: "Registar", href: "/registar" },
      },
      {
        q: "Ja comprei o livro fisico. Como acedo ao digital?",
        a: "Se compraste o livro fisico, podes pedir o teu codigo de acesso digital. Basta enviar foto do livro ou recibo pela pagina de pedido de codigo ou directamente pelo WhatsApp.",
        link: { label: "Pedir codigo", href: "/pedir-codigo" },
      },
      {
        q: "Esqueci a minha senha",
        a: "Podes recuperar a tua senha na pagina de recuperacao. Recebes um email com um link para criar uma nova senha.",
        link: { label: "Recuperar senha", href: "/recuperar-senha" },
      },
      {
        q: "Posso ler em varios dispositivos?",
        a: "Sim. A tua conta funciona em qualquer browser. O progresso e sincronizado automaticamente entre dispositivos — podes comecar no telemovel e continuar no computador.",
      },
    ],
  },
  {
    id: "livro",
    label: "Livro fisico",
    icon: "\u25A1",
    faqs: [
      {
        q: "Que livro fisico existe?",
        a: "Os 7 Veus do Despertar — 232 paginas sobre despertar de consciencia. E o ensaio filosofico que deu origem a tudo. E independente das coleccoes de ficcao.",
        link: { label: "Ver livro fisico", href: "/livro-fisico" },
      },
      {
        q: "Como encomendo?",
        a: "A encomenda e feita directamente via WhatsApp. Custa $23 USD (1.495 MZN). Envio disponivel para Mocambique e outros paises.",
        link: { label: "Encomendar", href: "/livro-fisico" },
      },
      {
        q: "O livro fisico inclui acesso digital?",
        a: "O acesso digital pode ser pedido separadamente, enviando foto do livro ou recibo. O livro e os Espelhos sao experiencias diferentes — podes comecar por qualquer um.",
        link: { label: "Pedir codigo digital", href: "/pedir-codigo" },
      },
    ],
  },
  {
    id: "comunidade",
    label: "Comunidade",
    icon: "\u2248",
    faqs: [
      {
        q: "O que e a comunidade Ecos?",
        a: "E o espaco onde as vozes se encontram. Tem quatro salas: Ecos (reflexoes anonimas), Mare (consciencia colectiva), Circulo (espelho partilhado) e Fogueira (contemplacao silenciosa). Tudo anonimo. Tudo impermanente.",
        link: { label: "Visitar comunidade", href: "/comunidade" },
      },
      {
        q: "Preciso de pagar para aceder?",
        a: "A comunidade esta incluida com qualquer experiencia de leitura (Espelhos, Nos ou Livro). Nao tem custo adicional.",
      },
      {
        q: "As partilhas sao anonimas?",
        a: "Sim. Tudo na comunidade e anonimo. Podes partilhar reflexoes, comentar e ressoar com outros sem revelar a tua identidade.",
      },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [history, setHistory] = useState<{ q: string; a: string; link?: { label: string; href: string } }[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, activeCategory, activeQuestion]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        // Don't close if clicking the trigger button
        const trigger = document.getElementById("chatbot-trigger");
        if (trigger?.contains(e.target as Node)) return;
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    setActiveQuestion(null);
  };

  const handleSelectQuestion = (cat: Category, faqIndex: number) => {
    const faq = cat.faqs[faqIndex];
    setActiveQuestion(faqIndex);
    // Add to history if not already the last one
    const last = history[history.length - 1];
    if (!last || last.q !== faq.q) {
      setHistory((prev) => [...prev, { q: faq.q, a: faq.a, link: faq.link }]);
    }
  };

  const handleBack = () => {
    if (activeQuestion !== null) {
      setActiveQuestion(null);
    } else {
      setActiveCategory(null);
    }
  };

  const handleReset = () => {
    setActiveCategory(null);
    setActiveQuestion(null);
    setHistory([]);
  };

  const activeCat = categories.find((c) => c.id === activeCategory);

  return (
    <>
      {/* Floating trigger */}
      <button
        id="chatbot-trigger"
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl ${
          open
            ? "bg-brown-700 text-cream"
            : "bg-[#c9a87c] text-white"
        }`}
        aria-label={open ? "Fechar assistente" : "Precisa de ajuda?"}
        title={open ? "Fechar" : "Precisa de ajuda?"}
      >
        {open ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-20 right-6 z-50 flex w-[340px] flex-col overflow-hidden rounded-2xl border border-brown-100 bg-white shadow-2xl sm:w-[380px]"
          style={{ maxHeight: "min(520px, calc(100vh - 120px))" }}
        >
          {/* Header */}
          <div className="shrink-0 border-b border-brown-50 bg-gradient-to-r from-[#c9a87c]/10 to-cream px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-serif text-base text-brown-900">
                  {activeCat ? activeCat.label : "Como podemos ajudar?"}
                </p>
                <p className="mt-0.5 font-sans text-[0.65rem] tracking-wide text-brown-400">
                  Sete Ecos
                </p>
              </div>
              {(activeCategory || history.length > 0) && (
                <button
                  onClick={handleReset}
                  className="font-sans text-[0.6rem] uppercase tracking-wider text-brown-400 hover:text-brown-700"
                >
                  Inicio
                </button>
              )}
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto px-4 py-3" style={{ minHeight: 200 }}>
            {/* History messages */}
            {history.length > 0 && (
              <div className="space-y-3">
                {history.map((msg, i) => (
                  <div key={i} className="space-y-2">
                    {/* User question */}
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-[#c9a87c] px-4 py-2.5">
                        <p className="font-sans text-sm text-white">{msg.q}</p>
                      </div>
                    </div>
                    {/* Bot answer */}
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-brown-50 px-4 py-2.5">
                        <p className="font-serif text-[0.85rem] leading-relaxed text-brown-700">
                          {msg.a}
                        </p>
                        {msg.link && (
                          <Link
                            href={msg.link.href}
                            className="mt-2 inline-block font-sans text-[0.7rem] text-[#c9a87c] underline hover:text-[#b8975b]"
                            onClick={() => setOpen(false)}
                          >
                            {msg.link.label}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Category list (home) */}
            {!activeCategory && history.length === 0 && (
              <div className="space-y-2">
                <p className="mb-3 font-serif text-sm text-brown-500">
                  Escolhe um tema para encontrar a tua resposta:
                </p>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className="flex w-full items-center gap-3 rounded-xl border border-brown-50 bg-white px-4 py-3 text-left transition-all hover:border-[#c9a87c]/30 hover:bg-[#c9a87c]/5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c9a87c]/10 font-serif text-sm text-[#c9a87c]">
                      {cat.icon}
                    </span>
                    <span className="font-sans text-sm text-brown-700">{cat.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Category list (after history) */}
            {!activeCategory && history.length > 0 && (
              <div className="mt-4 space-y-2">
                <div className="h-px bg-brown-100" />
                <p className="pt-2 font-serif text-sm text-brown-500">
                  Tens outra pergunta?
                </p>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className="flex w-full items-center gap-3 rounded-xl border border-brown-50 bg-white px-4 py-2.5 text-left transition-all hover:border-[#c9a87c]/30 hover:bg-[#c9a87c]/5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c9a87c]/10 font-serif text-xs text-[#c9a87c]">
                      {cat.icon}
                    </span>
                    <span className="font-sans text-[0.8rem] text-brown-700">{cat.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Questions in category */}
            {activeCat && (
              <div className="mt-3 space-y-2">
                <button
                  onClick={handleBack}
                  className="mb-2 font-sans text-[0.65rem] uppercase tracking-wider text-brown-400 hover:text-brown-700"
                >
                  &larr; Voltar
                </button>
                {activeCat.faqs.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      handleSelectQuestion(activeCat, i);
                      setActiveCategory(null);
                    }}
                    className="flex w-full items-start gap-2 rounded-xl border border-brown-50 bg-white px-4 py-3 text-left transition-all hover:border-[#c9a87c]/30 hover:bg-[#c9a87c]/5"
                  >
                    <span className="mt-0.5 shrink-0 text-[#c9a87c]">~</span>
                    <span className="font-sans text-sm text-brown-700">{faq.q}</span>
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer with WhatsApp */}
          <div className="shrink-0 border-t border-brown-50 px-5 py-3">
            <div className="flex items-center justify-between">
              <p className="font-sans text-[0.6rem] text-brown-400">
                Nao encontraste resposta?
              </p>
              <a
                href="https://wa.me/258845243875?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20a%20Sete%20Ecos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-[#25D366]/10 px-3 py-1.5 font-sans text-[0.65rem] font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/20"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.61.609l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.386 0-4.592-.826-6.326-2.206l-.44-.352-3.2 1.073 1.073-3.2-.352-.44A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
