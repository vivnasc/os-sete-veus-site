"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Props = {
  /** Current number of journal entries written */
  journalCount: number;
  /** Current chapter progress (0-7) */
  chaptersCompleted: number;
};

/**
 * Ponte de Continuação — Não é um upsell clássico.
 *
 * Na Lumina (Sete Ecos PWA), o upsell aparece após check-in de saúde mental.
 * Aqui, a experiência é diferente: é uma jornada de leitura e autoconhecimento.
 *
 * Este componente aparece como uma **reflexão contextual** que convida
 * a explorar mais do ecossistema — mas de forma que se sinta parte
 * natural da leitura, não uma interrupção comercial.
 *
 * A diferença fundamental:
 * - Lumina: "fizeste check-in → experimenta Vitalis" (produto → produto)
 * - Sete Véus: "as tuas palavras revelam algo → eis o que podes fazer com isso"
 *   (reflexão pessoal → aprofundamento natural)
 *
 * Momentos-chave (não pop-ups, mas secções integradas):
 * - Primeiras reflexões escritas → mostra O Teu Espelho como recompensa
 * - Meio da jornada → sugere práticas de integração (meditação/respiração)
 * - Livro completo → celebra + mostra horizonte da colecção
 */
export default function UpsellBridge({ journalCount, chaptersCompleted }: Props) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const key = `bridge-seen-${chaptersCompleted}-${journalCount > 0 ? "j" : "n"}`;
    if (typeof window !== "undefined" && localStorage.getItem(key)) {
      setDismissed(true);
    }
  }, [chaptersCompleted, journalCount]);

  // Não mostrar nada se:
  // - Sem progresso (ainda não começou)
  // - Sem reflexões escritas (a experiência ainda não é profunda)
  // - Já dismissado neste estágio
  if (dismissed || (chaptersCompleted === 0 && journalCount === 0)) return null;

  function handleDismiss() {
    setDismissed(true);
    const key = `bridge-seen-${chaptersCompleted}-${journalCount > 0 ? "j" : "n"}`;
    if (typeof window !== "undefined") {
      localStorage.setItem(key, "true");
    }
  }

  // === Momento 1: Primeiras reflexões (1-3 entradas, qualquer capítulo) ===
  // A leitora começou a escrever — mostrar que as suas palavras têm valor
  if (journalCount >= 1 && journalCount <= 3 && chaptersCompleted < 4) {
    return (
      <BridgeCard
        accent="#c9b896"
        onDismiss={handleDismiss}
        quote={
          journalCount === 1
            ? "A primeira palavra que escreves sobre ti mesma é sempre a mais difícil."
            : `Já tens ${journalCount} reflexões. Cada uma é um pedaço de ti que decidiste não ignorar.`
        }
        hint="Sabias que O Teu Espelho reúne tudo o que escreveste num só lugar?"
        linkHref="/membro/espelho"
        linkText="Visita O Teu Espelho"
      />
    );
  }

  // === Momento 2: Reflexão profunda (4+ entradas, a meio da jornada) ===
  // A leitora está envolvida — sugerir práticas como complemento à leitura
  if (journalCount >= 4 && chaptersCompleted >= 3 && chaptersCompleted < 7) {
    return (
      <BridgeCard
        accent="#7a8c6e"
        onDismiss={handleDismiss}
        quote="Às vezes o corpo precisa de sentir o que a mente já começou a entender."
        hint="As práticas guiadas — meditação e respiração — foram feitas para integrar o que estás a descobrir na leitura."
        linkHref="/membro/praticas"
        linkText="Experimenta uma prática"
      />
    );
  }

  // === Momento 3: Livro completo ===
  // Celebração genuína + horizonte (sem pressão de compra)
  if (chaptersCompleted === 7) {
    return (
      <div className="mt-8 rounded-2xl border border-veu-7/20 bg-gradient-to-br from-veu-7/5 to-cream p-7">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="font-serif text-lg text-brown-900">
              Atravessaste o primeiro espelho.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brown-600">
              O Espelho da Ilusão já não te esconde — pelo menos não da mesma forma.
              As tuas {journalCount} reflexões são a prova de que olhaste para dentro.
              Isso não é pouco. É raro.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brown-500 italic">
              Há mais seis espelhos na colecção. Vêm quando estiveres pronta — e não antes.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/membro/espelho"
                className="rounded-lg bg-veu-7/80 px-5 py-2.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white transition hover:bg-veu-7"
              >
                Relê as tuas palavras
              </Link>
              <Link
                href="/os-sete-veus"
                className="rounded-lg border border-veu-7/30 px-5 py-2.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.1em] text-brown-600 transition hover:bg-veu-7/10"
              >
                Ver a colecção
              </Link>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="ml-4 shrink-0 text-brown-300 transition hover:text-brown-500"
            aria-label="Fechar"
          >
            &#10005;
          </button>
        </div>
      </div>
    );
  }

  return null;
}

/** Componente interno — card de ponte com citação + sugestão suave */
function BridgeCard({
  accent,
  quote,
  hint,
  linkHref,
  linkText,
  onDismiss,
}: {
  accent: string;
  quote: string;
  hint: string;
  linkHref: string;
  linkText: string;
  onDismiss: () => void;
}) {
  return (
    <div
      className="mt-8 rounded-2xl border bg-white/60 p-6"
      style={{ borderColor: `${accent}30` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="h-0.5 w-8 rounded-full" style={{ backgroundColor: accent }} />
          <p className="mt-3 font-serif text-[15px] italic leading-relaxed text-brown-700">
            &ldquo;{quote}&rdquo;
          </p>
          <p className="mt-3 text-sm leading-relaxed text-brown-500">{hint}</p>
          <Link
            href={linkHref}
            className="mt-4 inline-block font-sans text-sm font-medium transition-colors hover:text-sage"
            style={{ color: accent }}
          >
            {linkText} &rarr;
          </Link>
        </div>
        <button
          onClick={onDismiss}
          className="ml-4 shrink-0 text-brown-300 transition hover:text-brown-500"
          aria-label="Fechar"
        >
          &#10005;
        </button>
      </div>
    </div>
  );
}
