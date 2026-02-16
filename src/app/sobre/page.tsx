import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { nosCollection } from "@/data/nos-collection";

export const metadata: Metadata = {
  title: "A Vivianne",
  description:
    "Vivianne dos Santos — economista, escritora, moçambicana. Escreve para quem quer viver, não apenas funcionar.",
};

const espelhos = [
  { number: 1, title: "O Espelho da Ilusão", subtitle: "Quando a vida que tens não foi a que escolheste", color: "#c9b896", available: true },
  { number: 2, title: "O Espelho do Medo", subtitle: "Quando o medo decide por ti", color: "#8b9b8e", available: false },
  { number: 3, title: "O Espelho da Culpa", subtitle: "Quando te castigas por querer mais", color: "#b07a7a", available: false },
  { number: 4, title: "O Espelho da Identidade", subtitle: "Quando já não sabes quem és sem os outros", color: "#ab9375", available: false },
  { number: 5, title: "O Espelho do Controlo", subtitle: "Quando segurar é a única forma que conheces", color: "#8aaaca", available: false },
  { number: 6, title: "O Espelho do Desejo", subtitle: "Quando desejas tudo menos o que precisas", color: "#c08aaa", available: false },
  { number: 7, title: "O Espelho da Separação", subtitle: "Quando te afastas de ti mesma para pertencer", color: "#baaacc", available: false },
];

const nos = nosCollection.map((n) => ({
  number: n.number,
  title: n.title,
  subtitle: n.subtitle,
  characters: n.characters,
  color: n.color,
  available: n.status === "available",
}));

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

      {/* The Vision — two collections + ecos */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-sage">
              A visão
            </p>
            <h2 className="mt-3 font-serif text-3xl text-brown-900 sm:text-4xl">
              Espelhos, Nós e Ecos
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-brown-600">
              Cada véu tem três dimensões. O <strong>Espelho</strong> é a história — onde te reconheces.
              O <strong>Nó</strong> é a relação — onde vês o que herdaste e partilhaste.
              E os <strong>Ecos</strong> são a comunidade — onde as vozes se encontram.
            </p>
          </div>

          {/* Visual diagram */}
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#c9b896]/30 bg-white px-6 py-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#c9b896]/10">
                <span className="font-serif text-2xl text-[#c9b896]">&#9826;</span>
              </div>
              <h3 className="mt-4 font-serif text-lg text-brown-800">Espelhos</h3>
              <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-wider text-brown-400">Ficção interior</p>
              <p className="mt-3 font-serif text-sm leading-relaxed text-brown-600">
                Histórias onde te reconheces. Cada espelho revela um véu que usas sem saber.
              </p>
            </div>

            <div className="rounded-2xl border border-[#c9a87c]/30 bg-white px-6 py-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#c9a87c]/10">
                <span className="font-serif text-2xl text-[#c9a87c]">&#8734;</span>
              </div>
              <h3 className="mt-4 font-serif text-lg text-brown-800">Nós</h3>
              <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-wider text-brown-400">Ficção relacional</p>
              <p className="mt-3 font-serif text-sm leading-relaxed text-brown-600">
                O que se passa entre duas pessoas. Cada nó revela o que herdaste, o que partilhas, o que te prende.
              </p>
            </div>

            <div className="rounded-2xl border border-sage/30 bg-white px-6 py-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/10">
                <span className="font-serif text-2xl text-sage">~</span>
              </div>
              <h3 className="mt-4 font-serif text-lg text-brown-800">Ecos</h3>
              <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-wider text-brown-400">Comunidade</p>
              <p className="mt-3 font-serif text-sm leading-relaxed text-brown-600">
                Onde as vozes se encontram. Partilhas, reflexões, ressonâncias entre quem lê e sente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Colecção Espelhos */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#c9b896]/30" />
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-[#c9b896]">
              Colecção
            </p>
            <div className="h-px flex-1 bg-[#c9b896]/30" />
          </div>
          <h2 className="mt-4 text-center font-serif text-3xl text-brown-900">Espelhos</h2>
          <p className="mt-2 text-center font-serif text-base italic text-brown-500">
            Sete histórias. Sete formas de nos escondermos de nós mesmas.
          </p>

          <div className="mt-10 space-y-3">
            {espelhos.map((e) => (
              <div
                key={e.number}
                className="flex items-center gap-4 rounded-xl bg-white px-5 py-4 shadow-sm"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold text-white"
                  style={{ backgroundColor: e.color }}
                >
                  {e.number}
                </span>
                <div className="flex-1">
                  <p className="font-serif text-base text-brown-800">{e.title}</p>
                  <p className="font-serif text-sm italic text-brown-500">{e.subtitle}</p>
                </div>
                {e.available ? (
                  <span className="rounded-full bg-sage/10 px-3 py-1 font-sans text-[0.6rem] uppercase tracking-wider text-sage">
                    Disponível
                  </span>
                ) : (
                  <span className="rounded-full bg-brown-50 px-3 py-1 font-sans text-[0.6rem] uppercase tracking-wider text-brown-300">
                    Em breve
                  </span>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Concepção dos 7 Nós */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#c9a87c]/30" />
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-[#c9a87c]">
              A concepção
            </p>
            <div className="h-px flex-1 bg-[#c9a87c]/30" />
          </div>
          <h2 className="mt-4 text-center font-serif text-3xl text-brown-900">
            Os 7 Nós
          </h2>
          <p className="mt-4 text-center font-serif text-base italic text-brown-500">
            Visão, estrutura e razão de ser
          </p>

          <div className="mt-10 space-y-6">
            <p className="leading-relaxed text-brown-700">
              Os Espelhos mostram-te o véu que usas. Os Nós mostram-te o que esse véu fez
              entre ti e outra pessoa. São dois lados do mesmo fio — um olha para dentro,
              o outro olha para o espaço entre duas pessoas.
            </p>
            <p className="leading-relaxed text-brown-700">
              Cada Nó nasce do Espelho correspondente. Não é uma sequela, não é um bónus.
              É a continuação emocional da mesma ferida — vista agora através da relação.
              Porque nenhum véu existe isolado. Tudo o que escondes de ti, ecoa no outro.
            </p>
            <p className="leading-relaxed text-brown-700">
              Os Nós são ficção relacional: histórias entre duas pessoas — mãe e filha,
              amantes, amigas, estranhos, um casal que se reinventa. Cada par de personagens
              carrega o peso de um véu partilhado.
            </p>
          </div>

          <div className="mt-10 rounded-r-xl border-l-[3px] border-[#c9a87c] bg-[#c9a87c]/5 px-6 py-5">
            <p className="font-serif italic leading-relaxed text-brown-700">
              Regra fundamental: só lês o Nó se viveste o Espelho. Não é restrição — é respeito
              pelo processo. O Nó só faz sentido depois de teres olhado para ti.
            </p>
          </div>
        </div>
      </section>

      {/* Colecção Nós */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#c9a87c]/30" />
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-[#c9a87c]">
              Colecção
            </p>
            <div className="h-px flex-1 bg-[#c9a87c]/30" />
          </div>
          <h2 className="mt-4 text-center font-serif text-3xl text-brown-900">Nós</h2>
          <p className="mt-2 text-center font-serif text-base italic text-brown-500">
            Sete nós. O que se passa entre duas pessoas quando um véu cai.
          </p>

          <div className="mt-10 space-y-3">
            {nos.map((n) => (
              <div
                key={n.number}
                className="flex items-center gap-4 rounded-xl bg-white px-5 py-4 shadow-sm"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold text-white"
                  style={{ backgroundColor: n.color }}
                >
                  {n.number}
                </span>
                <div className="flex-1">
                  <p className="font-serif text-base text-brown-800">{n.title}</p>
                  <p className="font-serif text-sm italic text-brown-500">{n.subtitle}</p>
                  <p className="mt-0.5 font-sans text-[0.65rem] uppercase tracking-wider text-brown-400">
                    {n.characters}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  {n.available ? (
                    <span className="rounded-full bg-[#c9a87c]/10 px-3 py-1 font-sans text-[0.6rem] uppercase tracking-wider text-[#c9a87c]">
                      Disponível
                    </span>
                  ) : (
                    <span className="rounded-full bg-brown-50 px-3 py-1 font-sans text-[0.6rem] uppercase tracking-wider text-brown-300">
                      Em breve
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Echo connection */}
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-[#c9a87c]/20 bg-[#c9a87c]/5 px-6 py-5 text-center">
            <p className="font-serif text-sm leading-relaxed text-brown-600">
              Cada Nó é o par relacional de um Espelho. O Espelho da Ilusão e o Nó da Herança
              nascem do mesmo véu — um olha para dentro, o outro olha para o espaço entre duas pessoas.
            </p>
          </div>
        </div>
      </section>

      {/* What I want for you — cream dark */}
      <section className="bg-cream-dark px-6 py-24">
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
              Por isso criei uma comunidade onde podes partilhar o que sentes, de forma anónima,
              e encontrar reconhecimento em quem caminha o mesmo caminho.
            </p>
            <p className="leading-relaxed text-brown-700">
              E quero que vás devagar. Sem pressa. Ao teu ritmo. Porque o primeiro passo é teu, e
              pode ser tão pequeno quanto quiseres.
            </p>
          </div>
          <div className="mt-8 rounded-r-xl border-l-[3px] border-sage bg-cream px-6 py-5">
            <p className="font-serif italic leading-relaxed text-brown-700">
              &ldquo;Não precisas de mudar tudo. Precisas apenas de começar a ouvir-te.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Signature quote */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="font-serif text-2xl italic leading-relaxed text-cream sm:text-3xl">
            &ldquo;Escrevo para quem quer viver, não apenas funcionar.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-brown-400">— Vivianne dos Santos</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/os-sete-veus"
              className="inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
            >
              Conhece Os Sete Véus
            </Link>
            <Link
              href="/comunidade"
              className="inline-block rounded-md border-2 border-cream/40 px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-cream/80 transition-all hover:border-cream hover:text-cream"
            >
              Entra nos Ecos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
