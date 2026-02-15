import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Os Sete Véus",
  description:
    "Sete livros. Sete espelhos. Sete formas de nos escondermos de nós mesmas — e sete caminhos de volta.",
};

const veus = [
  {
    number: 1,
    title: "O Espelho da Ilusão",
    subtitle: "Quando a vida que tens não foi a que escolheste",
    description:
      "Sara tem tudo no sítio. Emprego, casa, relação. E uma pergunta que não a larga: \"Isto é mesmo meu?\" Este livro é para quem sente que está na vida certa de outra pessoa.",
    image: "/images/veu-1-ilusao.png.png",
    accent: "bg-veu-1",
    available: true,
  },
  {
    number: 2,
    title: "O Espelho do Medo",
    subtitle: "Quando o medo decide por ti",
    description:
      "E se o medo não fosse o inimigo, mas um espelho que te mostra o que há do outro lado? Este livro é para quem sabe o que quer — mas tem medo de ir buscar.",
    image: "/images/veu-2-medo.png.png",
    accent: "bg-veu-2",
    available: true,
  },
  {
    number: 3,
    title: "O Espelho do Desejo",
    subtitle: "Quando desejas tudo menos o que precisas",
    description:
      "O desejo que te move é realmente teu? Ou é uma resposta ao que te ensinaram a querer? Este livro é para quem precisa de parar e perguntar: o que é que eu quero, de verdade?",
    image: "/images/veu-3-desejo.png.png",
    accent: "bg-veu-3",
    available: false,
  },
  {
    number: 4,
    title: "O Espelho do Controlo",
    subtitle: "Quando segurar é a única forma que conheces",
    description:
      "Há uma diferença entre cuidar e controlar — e por vezes essa linha desaparece. Este livro é para quem precisa de aprender a largar para se encontrar.",
    image: "/images/veu-4-controlo.png.png",
    accent: "bg-veu-4",
    available: false,
  },
  {
    number: 5,
    title: "O Espelho da Culpa",
    subtitle: "Quando te castigas por querer mais",
    description:
      "Querer mais não é egoísmo. É vida. Este livro é para quem precisa de permissão — a permissão que só tu te podes dar.",
    image: "/images/veu-5-culpa.png.png",
    accent: "bg-veu-5",
    available: false,
  },
  {
    number: 6,
    title: "O Espelho da Identidade",
    subtitle: "Quando já não sabes quem és sem os outros",
    description:
      "O que sobra quando tiras todos os papéis — mãe, filha, mulher, profissional? Este livro é para quem está pronta para se descobrir por baixo de tudo.",
    image: "/images/veu-6-identidade.png.png",
    accent: "bg-veu-6",
    available: false,
  },
  {
    number: 7,
    title: "O Espelho da Separação",
    subtitle: "Quando te afastas de ti mesma para pertencer",
    description:
      "O último espelho. O mais difícil de ver. Este livro é para quem está pronta para voltar — a si mesma.",
    image: "/images/veu-7-separacao.png.png",
    accent: "bg-veu-7",
    available: false,
  },
];

export default function OsSeteVeusPage() {
  return (
    <>
      {/* Hero — dark */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl leading-tight text-cream sm:text-5xl">
            Os Sete Véus
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brown-200">
            Sete livros. Sete espelhos. Sete formas de nos escondermos de nós mesmas — e sete caminhos
            de volta.
          </p>
        </div>
      </section>

      {/* Intro — cream */}
      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="leading-relaxed text-brown-700">
            Cada espelho é uma história completa. Podes começar por qualquer um — pelo que mais te
            chama, pelo que mais te assusta, ou simplesmente pelo primeiro. Não há ordem certa. Há
            apenas o teu caminho.
          </p>
          <div className="mx-auto mt-6 max-w-lg rounded-r-xl border-l-[3px] border-sage bg-cream-dark px-6 py-5 text-left">
            <p className="font-serif italic leading-relaxed text-brown-700">
              &ldquo;Não são manuais. São histórias onde talvez te reconheças. E nesse reconhecimento, algo muda.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Collection — alternating backgrounds */}
      {veus.map((veu, i) => (
        <section
          key={veu.number}
          className={`px-6 py-16 ${i % 2 === 0 ? "bg-cream" : "bg-cream-dark"}`}
        >
          <div className="mx-auto max-w-5xl">
            <div className={`items-center gap-10 md:flex ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
              <div className="shrink-0 text-center">
                <Image
                  src={veu.image}
                  alt={veu.title}
                  width={240}
                  height={360}
                  className="mx-auto rounded-lg shadow-xl"
                />
              </div>
              <div className="mt-8 flex-1 md:mt-0">
                <div className="flex items-center gap-3">
                  <span className={`inline-block h-8 w-8 rounded-full ${veu.accent} text-center font-sans text-sm font-bold leading-8 text-white`}>
                    {veu.number}
                  </span>
                  <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-brown-400">
                    Espelho {veu.number} de 7
                  </span>
                </div>
                <h2 className="mt-3 font-serif text-2xl text-brown-900 sm:text-3xl">{veu.title}</h2>
                <p className="mt-1 font-serif italic text-brown-500">{veu.subtitle}</p>
                <p className="mt-4 leading-relaxed text-brown-700">{veu.description}</p>
                <div className="mt-6">
                  {veu.available ? (
                    <Link
                      href="/experiencias"
                      className="inline-block rounded-full bg-sage px-6 py-2.5 font-sans text-[0.75rem] font-medium uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
                    >
                      Explorar experiência
                    </Link>
                  ) : (
                    <span className="inline-block rounded-full bg-brown-100/60 px-5 py-2 font-sans text-[0.75rem] font-medium uppercase tracking-wider text-brown-400">
                      Em preparação
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA — dark */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-cream">Não sabes por onde começar?</h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-brown-200">
            Escolhe o cenário que mais se parece contigo — ou experimenta o teste gratuito.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/comecar"
              className="inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
            >
              Por onde começar
            </Link>
            <Link
              href="/recursos/teste"
              className="inline-block rounded-md border-2 border-cream/40 px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-cream/80 transition-all hover:border-cream hover:text-cream"
            >
              Fazer o teste gratuito
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
