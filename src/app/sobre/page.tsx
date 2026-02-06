import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "A Vivianne",
  description:
    "Vivianne dos Santos — economista, escritora, moçambicana. Escreve para quem quer viver, não apenas funcionar.",
};

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-warm-400">
            A autora
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-warm-900 sm:text-5xl">
            Vivianne dos Santos
          </h1>
          <p className="mt-2 text-base text-warm-500">
            Economista. Escritora. Moçambicana.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-warm-100 px-6 py-24">
        <div className="mx-auto max-w-3xl space-y-8">
          <p className="text-lg leading-relaxed text-warm-700">
            Passei anos a construir uma vida que fazia sentido para toda a gente — menos para mim.
          </p>
          <p className="text-base leading-relaxed text-warm-600">
            Quando finalmente percebi, quis escrever o que teria precisado de ler aos 25. Não um
            manual. Não uma fórmula. Apenas histórias onde pudesse reconhecer-me. E talvez tu
            também.
          </p>
          <p className="text-base leading-relaxed text-warm-600">
            Os Sete Véus nasceram dessa vontade — de dar às outras mais cedo o que aprendi tarde.
            São sete livros sobre as formas como nos escondemos de nós mesmas. Mas são, acima de
            tudo, sete caminhos de volta.
          </p>
        </div>
      </section>

      {/* What I want for you */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl text-warm-800">O que quero para ti</h2>
          <div className="mt-8 space-y-6">
            <p className="text-base leading-relaxed text-warm-600">
              Não prometo transformação instantânea. Não acredito em fórmulas mágicas. Acredito que
              há algo de profundamente poderoso em leres uma história e pensares: &ldquo;Isto sou
              eu.&rdquo;
            </p>
            <p className="text-base leading-relaxed text-warm-600">
              Quero ser companhia no teu caminho. Quero que saibas que não estás sozinha nisto — nesta
              sensação de que há mais para ti, de que mereces mais da tua própria vida.
            </p>
            <p className="text-base leading-relaxed text-warm-600">
              E quero que vás devagar. Sem pressa. Ao teu ritmo. Porque o primeiro passo é teu, e
              pode ser tão pequeno quanto quiseres.
            </p>
          </div>
        </div>
      </section>

      {/* Signature quote */}
      <section className="bg-warm-100 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="font-serif text-2xl italic leading-relaxed text-warm-700 sm:text-3xl">
            &ldquo;Escrevo para quem quer viver, não apenas funcionar.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-warm-500">— Vivianne dos Santos</p>
          <div className="mt-10">
            <Link
              href="/os-sete-veus"
              className="rounded-xl bg-terracotta px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-terracotta-dark"
            >
              Conhece Os Sete Véus
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
