import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { nosCollection, NOS_PRICING } from "@/data/nos-collection";

export const metadata: Metadata = {
  title: "Colecção Nós — Ficção Relacional",
  description:
    "7 livros. 7 nós. O que se passa entre duas pessoas quando um véu cai. Cada Nó é o par relacional de um Espelho.",
};

const espelhoNames: Record<number, string> = {
  1: "O Espelho da Ilusão",
  2: "O Espelho do Medo",
  3: "O Espelho da Culpa",
  4: "O Espelho da Identidade",
  5: "O Espelho do Controlo",
  6: "O Espelho do Desejo",
  7: "O Espelho da Separação",
};

export default function ColeccaoNosPage() {
  return (
    <>
      {/* Hero — dark with warm accent */}
      <section className="bg-gradient-to-b from-[#2e1a0e] to-brown-900 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-[#c9a87c]/70">
            7 livros ~ 7 capítulos cada
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl">
            Colecção Nós
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brown-200">
            O que se passa entre duas pessoas quando um véu cai.
            Cada Nó é a dimensão relacional de um Espelho.
          </p>
        </div>
      </section>

      {/* Intro — cream */}
      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="leading-relaxed text-brown-700">
            Os Espelhos mostram-te o véu que usas. Os Nós mostram-te o que esse véu
            fez entre ti e outra pessoa. Não é uma sequela — é a outra face da mesma história.
          </p>
          <div className="mx-auto mt-6 max-w-lg rounded-r-xl border-l-[3px] border-[#c9a87c] bg-cream-dark px-6 py-5 text-left">
            <p className="font-serif italic leading-relaxed text-brown-700">
              &ldquo;Só lês o Nó se viveste o Espelho. Não é restrição — é respeito pelo teu caminho.&rdquo;
            </p>
          </div>
          <div className="mx-auto mt-6 max-w-md rounded-lg bg-[#c9a87c]/10 px-5 py-4">
            <p className="text-sm text-brown-600">
              Cada Nó desbloqueia ao completar todos os capítulos do Espelho correspondente.
            </p>
            <p className="mt-2 text-sm text-brown-500">
              Nó individual: <strong className="text-brown-700">${NOS_PRICING.individual.usd} USD</strong> / {NOS_PRICING.individual.mt} MZN.
              Incluído gratuitamente no Pack 3 e na Jornada Completa.
            </p>
          </div>
        </div>
      </section>

      {/* Collection — alternating backgrounds */}
      {nosCollection.map((no, i) => (
        <section
          key={no.number}
          className={`px-6 py-16 ${i % 2 === 0 ? "bg-cream" : "bg-cream-dark"}`}
        >
          <div className="mx-auto max-w-5xl">
            <div className={`items-center gap-10 md:flex ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
              {/* Cover image */}
              <div className="shrink-0 text-center">
                <Image
                  src={no.image}
                  alt={no.title}
                  width={240}
                  height={360}
                  className="mx-auto rounded-lg shadow-xl"
                />
              </div>
              <div className="mt-8 flex-1 md:mt-0">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block h-8 w-8 rounded-full text-center font-sans text-sm font-bold leading-8 text-white"
                    style={{ backgroundColor: no.color }}
                  >
                    {no.number}
                  </span>
                  <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-brown-400">
                    Nó {no.number} de 7
                  </span>
                </div>
                <h2 className="mt-3 font-serif text-2xl text-brown-900 sm:text-3xl">{no.title}</h2>
                <p className="mt-1 font-serif italic text-brown-500">{no.subtitle}</p>
                <p className="mt-4 leading-relaxed text-brown-700">{no.description}</p>

                {/* Espelho paired */}
                <div className="mt-5 rounded-lg border border-sage/20 bg-sage/5 px-4 py-3">
                  <p className="font-sans text-[0.55rem] uppercase tracking-[0.2em] text-sage">
                    Espelho correspondente
                  </p>
                  <p className="mt-0.5 font-serif text-sm text-brown-700">
                    {espelhoNames[no.number]}
                  </p>
                  <p className="text-xs italic text-brown-400">
                    Completa este Espelho para desbloquear o Nó
                  </p>
                </div>

                {/* Preco e CTA */}
                <div className="mt-5 flex items-center gap-4">
                  {no.status === "available" ? (
                    <>
                      <Link
                        href={`/comprar/nos/${no.slug}`}
                        className="inline-block rounded-full px-6 py-2.5 font-sans text-[0.75rem] font-medium uppercase tracking-wider text-white transition-colors hover:opacity-90"
                        style={{ backgroundColor: no.color }}
                      >
                        ${no.priceUSD} · Saber mais
                      </Link>
                      <span className="font-sans text-xs text-brown-400">
                        {no.priceMT.toLocaleString()} MZN
                      </span>
                    </>
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

      {/* Colecção Espelhos — bridge */}
      <section className="bg-cream-dark px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-sage">
            A primeira dimensão
          </p>
          <h2 className="mt-4 font-serif text-3xl text-brown-900">Colecção Espelhos</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-brown-600">
            Antes de desatar o Nó, é preciso ver o véu.
            Os Espelhos são o início da jornada.
          </p>
          <Link
            href="/os-sete-veus"
            className="mt-8 inline-block rounded-full border-2 border-sage/40 px-8 py-3 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-sage transition-all hover:border-sage hover:bg-sage/10"
          >
            Explorar Colecção Espelhos
          </Link>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-cream">Não sabes por onde começar?</h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-brown-200">
            Começa pelo Espelho — o No virá quando estiveres pronta.
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
