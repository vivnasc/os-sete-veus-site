import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Os Sete Véus",
  description:
    "Sete livros. Sete véus. Sete formas de nos escondermos de nós mesmas — e sete caminhos de volta.",
};

const veus = [
  {
    number: 1,
    title: "O Véu da Ilusão",
    subtitle: "Quando a vida que tens não foi a que escolheste",
    description:
      "Sara tem tudo no sítio. Emprego, casa, relação. E uma pergunta que não a larga: \"Isto é mesmo meu?\" Este livro é para quem sente que está na vida certa de outra pessoa.",
    available: true,
  },
  {
    number: 2,
    title: "O Véu do Medo",
    subtitle: "Quando o medo decide por ti",
    description:
      "E se o medo não fosse o inimigo, mas um véu que te impede de ver o que há do outro lado? Este livro é para quem sabe o que quer — mas tem medo de ir buscar.",
    available: true,
  },
  {
    number: 3,
    title: "O Véu do Desejo",
    subtitle: "Quando desejas tudo menos o que precisas",
    description:
      "O desejo que te move é realmente teu? Ou é uma resposta ao que te ensinaram a querer? Este livro é para quem precisa de parar e perguntar: o que é que eu quero, de verdade?",
    available: false,
  },
  {
    number: 4,
    title: "O Véu do Controlo",
    subtitle: "Quando segurar é a única forma que conheces",
    description:
      "Há uma diferença entre cuidar e controlar — e por vezes essa linha desaparece. Este livro é para quem precisa de aprender a largar para se encontrar.",
    available: false,
  },
  {
    number: 5,
    title: "O Véu da Culpa",
    subtitle: "Quando te castigas por querer mais",
    description:
      "Querer mais não é egoísmo. É vida. Este livro é para quem precisa de permissão — a permissão que só tu te podes dar.",
    available: false,
  },
  {
    number: 6,
    title: "O Véu da Identidade",
    subtitle: "Quando já não sabes quem és sem os outros",
    description:
      "O que sobra quando tiras todos os papéis — mãe, filha, mulher, profissional? Este livro é para quem está pronta para se descobrir por baixo de tudo.",
    available: false,
  },
  {
    number: 7,
    title: "O Véu da Separação",
    subtitle: "Quando te afastas de ti mesma para pertencer",
    description:
      "O último véu. O mais difícil de ver. Este livro é para quem está pronta para voltar — a si mesma.",
    available: false,
  },
];

export default function OsSeteVeusPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl leading-tight text-warm-900 sm:text-5xl">
            Os Sete Véus
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-warm-600">
            Sete livros. Sete véus. Sete formas de nos escondermos de nós mesmas — e sete caminhos
            de volta.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-warm-100 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-warm-600">
            Cada véu é uma história completa. Podes começar por qualquer um — pelo que mais te
            chama, pelo que mais te assusta, ou simplesmente pelo primeiro. Não há ordem certa. Há
            apenas o teu caminho.
          </p>
        </div>
      </section>

      {/* Collection */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl space-y-8">
          {veus.map((veu) => (
            <article
              key={veu.number}
              className="rounded-2xl border border-warm-200 p-8 transition-colors hover:border-warm-300 sm:p-10"
            >
              <div className="flex items-start gap-6">
                <span className="hidden font-serif text-5xl text-warm-200 sm:block">
                  {veu.number}
                </span>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl text-warm-800">{veu.title}</h2>
                  <p className="mt-1 text-sm italic text-warm-500">{veu.subtitle}</p>
                  <p className="mt-4 text-base leading-relaxed text-warm-600">
                    {veu.description}
                  </p>
                  <div className="mt-6">
                    {veu.available ? (
                      <span className="inline-block rounded-lg bg-terracotta/10 px-4 py-2 text-xs font-medium text-terracotta">
                        Disponível
                      </span>
                    ) : (
                      <span className="inline-block rounded-lg bg-warm-100 px-4 py-2 text-xs font-medium text-warm-400">
                        Em breve
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-warm-100 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-warm-800">Não sabes por onde começar?</h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-warm-600">
            Temos recursos gratuitos que te ajudam a descobrir qual véu fala mais contigo.
          </p>
          <div className="mt-8">
            <Link
              href="/recursos"
              className="rounded-xl bg-terracotta px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-terracotta-dark"
            >
              Explorar recursos gratuitos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
