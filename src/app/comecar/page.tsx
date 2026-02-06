import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Começar",
  description:
    "Por onde começar a explorar Os Sete Véus. Três cenários, três caminhos — escolhe o teu.",
};

const cenarios = [
  {
    number: 1,
    title: "Quero perceber o que são Os Sete Véus",
    description: "Estás curiosa, queres saber mais antes de mergulhar.",
    steps: [
      { text: "Lê a página Os Sete Véus para perceber a colecção", href: "/os-sete-veus" },
      { text: "Explora os artigos para sentir o tom", href: "/artigos" },
      { text: "Conhece a Vivianne e a sua história", href: "/sobre" },
    ],
  },
  {
    number: 2,
    title: "Quero experimentar antes de me comprometer",
    description: "Queres explorar sem compromisso, ao teu ritmo.",
    steps: [
      { text: "Faz o teste \"Qual véu te esconde?\" — sem email, sem compromisso", href: "/recursos/teste" },
      { text: "Descarrega os recursos gratuitos", href: "/recursos" },
      { text: "Lê um artigo que te chame a atenção", href: "/artigos" },
    ],
  },
  {
    number: 3,
    title: "Estou pronta para começar a ler",
    description: "Já sentes que isto é para ti. Queres mergulhar.",
    steps: [
      { text: "Adquire O Véu da Ilusão e lê directamente no site, capítulo a capítulo", href: "/livro-fisico" },
      { text: "Ao leres, o diário de reflexão guia-te em cada pausa", href: "/livro-fisico" },
      { text: "No final, O Teu Espelho mostra-te tudo o que escreveste", href: "/livro-fisico" },
    ],
  },
];

export default function ComecarPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient-animated bg-gradient-to-br from-brown-800 via-[#3d3630] to-brown-900 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h1 className="font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Por onde começar
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brown-200">
              Não há uma forma certa. Há a tua. Escolhe o cenário que mais se parece contigo.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <p className="leading-relaxed text-brown-700">
              Se estás aqui, é porque algo te trouxe. Talvez curiosidade, talvez reconhecimento,
              talvez uma intuição suave de que há mais para ti. Seja o que for — estás bem aqui.
              Não há pressa. Não há ordem certa. Há apenas o teu caminho.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15} variant="fadeIn">
            <div className="mt-6 rounded-r-xl border-l-[3px] border-sage bg-cream-dark px-6 py-5">
              <p className="font-serif italic leading-relaxed text-brown-700">
                &ldquo;O primeiro passo é teu, e pode ser tão pequeno quanto quiseres.&rdquo;
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Scenarios */}
      {cenarios.map((cenario, i) => (
        <section
          key={cenario.number}
          className={`px-6 py-16 ${i % 2 === 0 ? "bg-cream-dark" : "bg-cream"}`}
        >
          <div className="mx-auto max-w-3xl">
            <ScrollReveal delay={0.1}>
              <div className="flex items-start gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-sage font-sans text-lg font-bold text-sage transition-transform duration-300 hover:scale-110">
                  {cenario.number}
                </span>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl text-brown-900">{cenario.title}</h2>
                  <p className="mt-1 italic text-brown-500">{cenario.description}</p>
                  <ol className="mt-6 space-y-4">
                    {cenario.steps.map((step, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-1 font-sans text-sm font-bold text-sage">{j + 1}.</span>
                        <Link
                          href={step.href}
                          className="text-brown-700 underline decoration-sage/30 underline-offset-4 transition-colors hover:text-sage"
                        >
                          {step.text}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}

      {/* What makes this different */}
      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="font-serif text-2xl text-brown-900">
              Uma experiência, não apenas um livro
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-serif text-base leading-relaxed text-brown-600">
              O Véu da Ilusão não é um PDF para baixar e esquecer. É uma experiência de leitura
              integrada, com pausas de reflexão, diário pessoal e checklists — tudo dentro do site.
              Lês ao teu ritmo. Escreves o que sentes. E no final, O Teu Espelho mostra-te
              as tuas palavras reunidas.
            </p>
          </ScrollReveal>
          <div className="mx-auto mt-8 grid max-w-lg gap-4 sm:grid-cols-3">
            {[
              { number: "7", label: "Capítulos", color: "#c9b896" },
              { number: "7", label: "Reflexões guiadas", color: "#7a8c6e" },
              { number: "1", label: "Espelho final", color: "#b07a7a" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={0.1 * i} variant="scale">
                <div className="rounded-xl bg-white px-4 py-4 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                  <p className="font-serif text-2xl" style={{ color: stat.color }}>{stat.number}</p>
                  <p className="mt-1 font-sans text-[0.6rem] uppercase tracking-wider text-brown-400">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient-animated bg-gradient-to-br from-brown-800 via-[#3d3630] to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-serif text-2xl italic leading-relaxed text-cream">
              &ldquo;Não precisas de saber para onde vais. Precisas apenas de dar o primeiro passo.&rdquo;
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/recursos/teste"
                className="animate-pulse-glow inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
              >
                Experimenta o teste gratuito
              </Link>
              <Link
                href="/livro-fisico"
                className="inline-block rounded-md border-2 border-cream/40 px-8 py-3.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.15em] text-cream/80 transition-all hover:border-cream hover:text-cream"
              >
                Conhece O Véu da Ilusão
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
