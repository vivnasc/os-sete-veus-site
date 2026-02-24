"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
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
        q: "O que \u00e9 a Sete Ecos?",
        a: "A Sete Ecos \u00e9 uma plataforma de autoconhecimento com leitura integrada. Mais do que livros, \u00e9 um ecossistema de hist\u00f3rias, pr\u00e1ticas guiadas, di\u00e1rio de reflex\u00e3o e comunidade. Tudo pensado para quem quer despertar, ao seu ritmo.",
        link: { label: "Explorar o ecossistema", href: "/ecossistema" },
      },
      {
        q: "Quem \u00e9 a autora?",
        a: "Vivianne dos Santos \u00e9 economista, escritora e mo\u00e7ambicana. Escreveu Os Sete V\u00e9us do Despertar e criou as colec\u00e7\u00f5es Espelhos e N\u00f3s \u2014 fic\u00e7\u00f5es de transforma\u00e7\u00e3o interior e relacional.",
        link: { label: "Conhecer a Vivianne", href: "/sobre" },
      },
      {
        q: "A plataforma \u00e9 gratuita?",
        a: "Sim, podes explorar bastante sem pagar: o teste de autoconhecimento, artigos, di\u00e1rio de 7 dias e outros recursos s\u00e3o gratuitos. S\u00f3 pagas se quiseres aceder \u00e0s experi\u00eancias de leitura integrada (Espelhos, N\u00f3s ou Livro).",
        link: { label: "Recursos gratuitos", href: "/recursos" },
      },
      {
        q: "Funciona no telem\u00f3vel?",
        a: "Sim. A plataforma foi desenhada mobile-first. Funciona em qualquer browser \u2014 telem\u00f3vel, tablet ou computador. N\u00e3o precisas de instalar nada.",
      },
    ],
  },
  {
    id: "espelhos",
    label: "Colec\u00e7\u00e3o Espelhos",
    icon: "\u25CB",
    faqs: [
      {
        q: "O que s\u00e3o os Espelhos?",
        a: "S\u00e3o uma colec\u00e7\u00e3o de 7 fic\u00e7\u00f5es de transforma\u00e7\u00e3o interior \u2014 hist\u00f3rias onde te reconheces. Cada Espelho corresponde a um v\u00e9u (Ilus\u00e3o, Medo, Culpa, Identidade, Controlo, Desejo, Separa\u00e7\u00e3o) e inclui 7 cap\u00edtulos, pr\u00e1ticas de respira\u00e7\u00e3o, di\u00e1rio de reflex\u00e3o e checklist pessoal.",
        link: { label: "Ver Colec\u00e7\u00e3o Espelhos", href: "/os-sete-veus" },
      },
      {
        q: "Qual Espelho est\u00e1 dispon\u00edvel agora?",
        a: "O Espelho da Ilus\u00e3o \u2014 completo, com 7 cap\u00edtulos. \u00c9 o primeiro da colec\u00e7\u00e3o. Os restantes ser\u00e3o publicados mensalmente de Mar\u00e7o a Agosto de 2026: Medo, Culpa, Identidade, Controlo, Desejo e Separa\u00e7\u00e3o.",
        link: { label: "Come\u00e7ar a ler", href: "/comprar/espelhos" },
      },
      {
        q: "Como funciona a leitura?",
        a: "L\u00eas cap\u00edtulo a cap\u00edtulo, directamente no site. Cada cap\u00edtulo tem pausas de reflex\u00e3o, exerc\u00edcios de respira\u00e7\u00e3o, di\u00e1rio pessoal e checklists. O teu progresso \u00e9 guardado automaticamente. Podes ler ao teu ritmo, quantas vezes quiseres.",
      },
      {
        q: "Quanto custa?",
        a: "O Espelho da Ilus\u00e3o custa $29 USD (1.885 MZN / R$119 / \u20ac27). Inclui acesso vital\u00edcio \u00e0 experi\u00eancia completa: 7 cap\u00edtulos, pr\u00e1ticas guiadas, di\u00e1rio de reflex\u00e3o e acesso \u00e0 comunidade.",
        link: { label: "Ver pre\u00e7os", href: "/comprar/espelhos" },
      },
    ],
  },
  {
    id: "nos",
    label: "Colec\u00e7\u00e3o N\u00f3s",
    icon: "\u221E",
    faqs: [
      {
        q: "O que s\u00e3o os N\u00f3s?",
        a: "S\u00e3o fic\u00e7\u00f5es relacionais \u2014 hist\u00f3rias sobre o que se passa entre duas pessoas quando um v\u00e9u cai. Cada N\u00f3 \u00e9 o par relacional de um Espelho. Os Espelhos olham para dentro; os N\u00f3s olham para a rela\u00e7\u00e3o.",
        link: { label: "Ver Colec\u00e7\u00e3o N\u00f3s", href: "/coleccao-nos" },
      },
      {
        q: "Como desbloqueio um N\u00f3?",
        a: "Precisas de completar todos os 7 cap\u00edtulos do Espelho correspondente. Quando terminares, o N\u00f3 desbloqueia automaticamente \u2014 \u00e9 a continua\u00e7\u00e3o emocional da hist\u00f3ria.",
      },
      {
        q: "Quanto custa um N\u00f3?",
        a: "O N\u00f3 da Heran\u00e7a custa $12 USD (780 MZN / R$49 / \u20ac11). \u00c9 o \u00fanico dispon\u00edvel de momento, e s\u00f3 se desbloqueia ap\u00f3s completares o Espelho da Ilus\u00e3o.",
        link: { label: "Ver pre\u00e7os", href: "/comprar/espelhos" },
      },
      {
        q: "Qual \u00e9 o N\u00f3 dispon\u00edvel agora?",
        a: "O N\u00f3 da Heran\u00e7a \u2014 a hist\u00f3ria de Sara e Helena, m\u00e3e e filha, e o sil\u00eancio herdado entre elas. \u00c9 o par relacional do Espelho da Ilus\u00e3o. Os restantes N\u00f3s ser\u00e3o publicados \u00e0 medida que os Espelhos forem lan\u00e7ados.",
      },
    ],
  },
  {
    id: "precos",
    label: "Pre\u00e7os e pagamentos",
    icon: "$",
    faqs: [
      {
        q: "Quais s\u00e3o os pre\u00e7os?",
        a: "Espelho da Ilus\u00e3o: $29 USD (1.885 MZN). N\u00f3 da Heran\u00e7a: $12 USD (780 MZN). Livro f\u00edsico Os 7 V\u00e9us do Despertar: $23 USD (1.495 MZN). \u00c0 medida que novos Espelhos forem publicados, haver\u00e1 pacotes com desconto.",
        link: { label: "Ver pre\u00e7os", href: "/comprar" },
      },
      {
        q: "Que m\u00e9todos de pagamento aceitam?",
        a: "Aceitamos PayPal (cart\u00e3o de cr\u00e9dito/d\u00e9bito internacional), transfer\u00eancia banc\u00e1ria (Millennium BIM Mo\u00e7ambique) e M-Pesa. Ap\u00f3s o pagamento, recebes um c\u00f3digo de acesso por email.",
      },
      {
        q: "O acesso \u00e9 vital\u00edcio?",
        a: "Sim. Uma vez comprado, tens acesso para sempre. Podes ler ao teu ritmo, quantas vezes quiseres. Sem subscri\u00e7\u00f5es, sem renova\u00e7\u00f5es.",
      },
      {
        q: "Aceitam pagamento em meticais?",
        a: "Sim. Podes pagar por transfer\u00eancia banc\u00e1ria em meticais (Millennium BIM) ou por M-Pesa. Os pre\u00e7os em MZN est\u00e3o indicados em cada produto. Ap\u00f3s o pagamento, envias o comprovativo e recebes o c\u00f3digo de acesso.",
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
        a: "Ap\u00f3s o pagamento, recebes um c\u00f3digo de acesso por email. Usa esse c\u00f3digo na p\u00e1gina de registo para criar a tua conta e aceder imediatamente.",
        link: { label: "Registar", href: "/registar" },
      },
      {
        q: "J\u00e1 comprei o livro f\u00edsico. Como acedo ao digital?",
        a: "Se compraste o livro f\u00edsico, podes pedir o teu c\u00f3digo de acesso digital. Basta enviar foto do livro ou recibo pela p\u00e1gina de pedido de c\u00f3digo ou directamente pelo WhatsApp.",
        link: { label: "Pedir c\u00f3digo", href: "/pedir-codigo" },
      },
      {
        q: "Esqueci a minha senha",
        a: "Podes recuperar a tua senha na p\u00e1gina de recupera\u00e7\u00e3o. Recebes um email com um link para criar uma nova senha.",
        link: { label: "Recuperar senha", href: "/recuperar-senha" },
      },
      {
        q: "Posso ler em v\u00e1rios dispositivos?",
        a: "Sim. A tua conta funciona em qualquer browser. O progresso \u00e9 sincronizado automaticamente entre dispositivos \u2014 podes come\u00e7ar no telem\u00f3vel e continuar no computador.",
      },
    ],
  },
  {
    id: "livro",
    label: "Livro f\u00edsico",
    icon: "\u25A1",
    faqs: [
      {
        q: "Que livro f\u00edsico existe?",
        a: "Os 7 V\u00e9us do Despertar \u2014 232 p\u00e1ginas sobre despertar de consci\u00eancia. \u00c9 o ensaio filos\u00f3fico que deu origem a tudo. \u00c9 independente das colec\u00e7\u00f5es de fic\u00e7\u00e3o.",
        link: { label: "Ver livro f\u00edsico", href: "/livro-fisico" },
      },
      {
        q: "Como encomendo?",
        a: "A encomenda \u00e9 feita directamente via WhatsApp. Custa $23 USD (1.495 MZN). Envio dispon\u00edvel para Mo\u00e7ambique e outros pa\u00edses.",
        link: { label: "Encomendar", href: "/livro-fisico" },
      },
      {
        q: "O livro f\u00edsico inclui acesso digital?",
        a: "O acesso digital pode ser pedido separadamente, enviando foto do livro ou recibo. O livro e os Espelhos s\u00e3o experi\u00eancias diferentes \u2014 podes come\u00e7ar por qualquer um.",
        link: { label: "Pedir c\u00f3digo digital", href: "/pedir-codigo" },
      },
    ],
  },
  {
    id: "comunidade",
    label: "Comunidade",
    icon: "\u2248",
    faqs: [
      {
        q: "O que \u00e9 a comunidade Ecos?",
        a: "\u00c9 o espa\u00e7o onde as vozes se encontram. Tem quatro salas: Ecos (reflex\u00f5es an\u00f3nimas), Mar\u00e9 (consci\u00eancia colectiva), C\u00edrculo (espelho partilhado) e Fogueira (contempla\u00e7\u00e3o silenciosa). Tudo an\u00f3nimo. Tudo impermanente.",
        link: { label: "Visitar comunidade", href: "/comunidade" },
      },
      {
        q: "Preciso de pagar para aceder?",
        a: "A comunidade est\u00e1 inclu\u00edda com qualquer experi\u00eancia de leitura (Espelhos, N\u00f3s ou Livro). N\u00e3o tem custo adicional.",
      },
      {
        q: "As partilhas s\u00e3o an\u00f3nimas?",
        a: "Sim. Tudo na comunidade \u00e9 an\u00f3nimo. Podes partilhar reflex\u00f5es, comentar e ressoar com outros sem revelar a tua identidade.",
      },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Chatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [history, setHistory] = useState<{ q: string; a: string; link?: { label: string; href: string } }[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Esconder chatbot em todas as paginas de leitura do livro
  const isReadingPage = pathname?.startsWith('/livro/')
    || pathname?.startsWith('/membro/leitura/')
    || pathname?.startsWith('/membro/nos/');

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

  // Early return AFTER all hooks (React rules of hooks)
  if (isReadingPage) return null;

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
                  In\u00edcio
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
                N\u00e3o encontraste resposta?
              </p>
              <a
                href="https://wa.me/258845243875?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20Os%20Sete%20V%C3%A9us%20%E2%80%94%20seteveus.space"
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
