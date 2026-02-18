import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { experiences } from "@/data/experiences";
import { nosCollection } from "@/data/nos-collection";

export const metadata: Metadata = {
  title: "Colecção Espelhos — Ficção de Transformação Interior",
  description:
    "7 livros. 7 espelhos. Histórias onde te reconheces — e algo muda. Cada Espelho revela um véu que usas sem saber.",
};

export default function OsSeteVeusPage() {
  return (
    <>
      {/* Hero — dark */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-brown-400">
            7 livros ~ 7 capítulos cada
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl">
            Colecção Espelhos
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brown-200">
            Histórias onde te reconheces — e algo muda. Cada Espelho revela um véu
            que usas sem saber.
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
      {experiences.map((exp, i) => {
        const no = nosCollection.find((n) => n.espelhoSlug === exp.slug);
        const accentClasses = [
          "bg-veu-1", "bg-veu-2", "bg-veu-3", "bg-veu-4",
          "bg-veu-5", "bg-veu-6", "bg-veu-7",
        ];

        return (
          <section
            key={exp.slug}
            className={`px-6 py-16 ${i % 2 === 0 ? "bg-cream" : "bg-cream-dark"}`}
          >
            <div className="mx-auto max-w-5xl">
              <div className={`items-center gap-10 md:flex ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                <div className="shrink-0 text-center">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    width={240}
                    height={360}
                    className="mx-auto rounded-lg shadow-xl"
                  />
                </div>
                <div className="mt-8 flex-1 md:mt-0">
                  <div className="flex items-center gap-3">
                    <span className={`inline-block h-8 w-8 rounded-full ${accentClasses[i] || "bg-brown-400"} text-center font-sans text-sm font-bold leading-8 text-white`}>
                      {exp.number}
                    </span>
                    <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-brown-400">
                      Espelho {exp.number} de 7
                    </span>
                  </div>
                  <h2 className="mt-3 font-serif text-2xl text-brown-900 sm:text-3xl">{exp.title}</h2>
                  <p className="mt-1 font-serif italic text-brown-500">{exp.subtitle}</p>
                  <p className="mt-4 leading-relaxed text-brown-700">{exp.description}</p>
                  {/* Nó paired */}
                  {no && (
                    <div className="mt-5 flex items-center gap-3 rounded-lg border border-[#c9a87c]/20 bg-[#c9a87c]/5 px-4 py-3">
                      <Image
                        src={no.image}
                        alt={no.title}
                        width={40}
                        height={60}
                        className="shrink-0 rounded shadow-sm"
                      />
                      <div>
                        <p className="font-sans text-[0.55rem] uppercase tracking-[0.2em] text-[#c9a87c]">
                          Nó correspondente · $12
                        </p>
                        <p className="mt-0.5 font-serif text-sm text-brown-700">{no.title}</p>
                        <p className="text-xs italic text-brown-400">{no.subtitle}</p>
                        {no.status !== "available" && (
                          <p className="mt-1 text-[0.65rem] text-brown-300">Em preparação</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-5">
                    {exp.status === "available" ? (
                      <Link
                        href={`/experiencias/${exp.slug}`}
                        className="inline-block rounded-full bg-sage px-6 py-2.5 font-sans text-[0.75rem] font-medium uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
                      >
                        Explorar experiência
                      </Link>
                    ) : (
                      <span className="inline-block rounded-full bg-brown-100/60 px-5 py-2 font-sans text-[0.75rem] font-medium uppercase tracking-wider text-brown-400">
                        {exp.launchLabel || "Em preparação"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Colecção Nós — bridge */}
      <section className="bg-cream-dark px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-[#c9a87c]">
            A segunda dimensão
          </p>
          <h2 className="mt-4 font-serif text-3xl text-brown-900">Colecção Nos</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-brown-600">
            Os Espelhos mostram-te o véu que usas.
            Os Nos mostram-te o que esse véu fez entre ti e outra pessoa.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-brown-500">
            Cada No desbloqueia-se ao completar o Espelho correspondente.
          </p>
          <Link
            href="/coleccao-nos"
            className="mt-8 inline-block rounded-full border-2 border-[#c9a87c]/40 px-8 py-3 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-[#c9a87c] transition-all hover:border-[#c9a87c] hover:bg-[#c9a87c]/10"
          >
            Explorar Colecção Nos
          </Link>
        </div>
      </section>

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
