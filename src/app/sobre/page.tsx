import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "A Vivianne",
  description:
    "Vivianne dos Santos — economista, escritora, moçambicana. Escreve para quem quer viver, não apenas funcionar.",
};

export default function SobrePage() {
  return (
    <>
      {/* Hero with photo */}
      <section className="bg-cream px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="items-center gap-12 md:flex">
            <div className="shrink-0 text-center md:text-left">
              <Image
                src="/images/vivianne.jpg.jpeg"
                alt="Vivianne dos Santos"
                width={280}
                height={370}
                className="mx-auto rounded-2xl object-cover shadow-lg md:mx-0"
              />
            </div>
            <div className="mt-8 md:mt-0">
              <p className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-brown-400">
                A autora
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-tight text-brown-900 sm:text-5xl">
                Vivianne dos Santos
              </h1>
              <p className="mt-3 text-brown-500">
                Economista. Escritora. Moçambicana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story — dark section */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-3xl space-y-8">
          <p className="text-xl leading-relaxed text-cream">
            Passei anos a construir uma vida que fazia sentido para toda a gente — menos para mim.
          </p>
          <p className="leading-relaxed text-brown-200">
            Quando finalmente percebi, quis escrever o que teria precisado de ler aos 25. Não um
            manual. Não uma fórmula. Apenas histórias onde pudesse reconhecer-me. E talvez tu
            também.
          </p>
          <p className="leading-relaxed text-brown-200">
            Os Sete Véus nasceram dessa vontade — de dar às outras mais cedo o que aprendi tarde.
            São sete livros sobre as formas como nos escondemos de nós mesmas. Mas são, acima de
            tudo, sete caminhos de volta.
          </p>
        </div>
      </section>

      {/* What I want for you — cream */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl text-brown-900">O que quero para ti</h2>
          <div className="mt-8 space-y-6">
            <p className="leading-relaxed text-brown-700">
              Não prometo transformação instantânea. Não acredito em fórmulas mágicas. Acredito que
              há algo de profundamente poderoso em leres uma história e pensares: &ldquo;Isto sou
              eu.&rdquo;
            </p>
            <p className="leading-relaxed text-brown-700">
              Quero ser companhia no teu caminho. Quero que saibas que não estás sozinha nisto — nesta
              sensação de que há mais para ti, de que mereces mais da tua própria vida.
            </p>
            <p className="leading-relaxed text-brown-700">
              E quero que vás devagar. Sem pressa. Ao teu ritmo. Porque o primeiro passo é teu, e
              pode ser tão pequeno quanto quiseres.
            </p>
          </div>
          <div className="mt-8 rounded-r-xl border-l-[3px] border-sage bg-cream-dark px-6 py-5">
            <p className="font-serif italic leading-relaxed text-brown-700">
              &ldquo;Não precisas de mudar tudo. Precisas apenas de começar a ouvir-te.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Signature quote — beige */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="font-serif text-2xl italic leading-relaxed text-brown-800 sm:text-3xl">
            &ldquo;Escrevo para quem quer viver, não apenas funcionar.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-brown-500">— Vivianne dos Santos</p>
          <div className="mt-10">
            <Link
              href="/os-sete-veus"
              className="inline-block rounded-md border-2 border-brown-900 bg-brown-900 px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-cream transition-all hover:bg-transparent hover:text-brown-900"
            >
              Conhece Os Sete Véus
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
