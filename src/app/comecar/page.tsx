import type { Metadata } from "next";
import Link from "next/link";

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
      { text: "Faz o teste \"Qual véu te esconde?\" — sem email", href: "/recursos/teste" },
      { text: "Descarrega os recursos gratuitos", href: "/recursos" },
      { text: "Lê um artigo que te chame a atenção", href: "/artigos" },
    ],
  },
  {
    number: 3,
    title: "Estou pronta para começar a ler",
    description: "Já sentes que isto é para ti. Queres mergulhar.",
    steps: [
      { text: "Começa pelo Véu da Ilusão — o primeiro da colecção", href: "/os-sete-veus" },
      { text: "Descarrega o Diário dos Sete Véus para acompanhar a leitura", href: "/recursos" },
      { text: "Junta-te à lista para receber novidades", href: "/recursos" },
    ],
  },
];

export default function ComecarPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl leading-tight text-cream sm:text-5xl">
            Por onde começar
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brown-200">
            Não há uma forma certa. Há a tua. Escolhe o cenário que mais se parece contigo.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="leading-relaxed text-brown-700">
            Se estás aqui, é porque algo te trouxe. Talvez curiosidade, talvez reconhecimento,
            talvez uma intuição suave de que há mais para ti. Seja o que for — estás bem aqui.
            Não há pressa. Não há ordem certa. Há apenas o teu caminho.
          </p>
          <div className="mt-6 rounded-r-xl border-l-[3px] border-sage bg-cream-dark px-6 py-5">
            <p className="font-serif italic leading-relaxed text-brown-700">
              &ldquo;O primeiro passo é teu, e pode ser tão pequeno quanto quiseres.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Scenarios */}
      {cenarios.map((cenario, i) => (
        <section
          key={cenario.number}
          className={`px-6 py-16 ${i % 2 === 0 ? "bg-cream-dark" : "bg-cream"}`}
        >
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-sage font-sans text-lg font-bold text-sage">
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
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-2xl italic leading-relaxed text-cream">
            &ldquo;Não precisas de saber para onde vais. Precisas apenas de dar o primeiro passo.&rdquo;
          </p>
          <div className="mt-10">
            <Link
              href="/recursos/teste"
              className="inline-block rounded-md border-2 border-cream bg-cream px-10 py-4 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
            >
              Experimenta o teste gratuito
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
