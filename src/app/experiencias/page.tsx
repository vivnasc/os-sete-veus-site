import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { experiences } from "@/data/experiences";
import ScrollReveal from "@/components/ScrollReveal";
import WaitlistForm from "@/components/WaitlistForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Colecção Espelhos — Ficções de Transformação",
  description:
    "Sete ficções de transformação. Histórias de mulheres que vivem o que tu vives, com respiração guiada, diário de reflexão e espelho pessoal.",
};

export default function ExperienciasPage() {
  const published = experiences.filter((e) => e.status === "available");
  const upcoming = experiences.filter((e) => e.status !== "available");

  return (
    <>
      {/* Hero — quote-driven */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-brown-400">
              Colecção Espelhos
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Histórias de mulheres que acordam
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-xl font-serif text-xl italic leading-relaxed text-brown-200">
              &ldquo;Via, mas não sentia. Registava, mas não participava.
              Como quem assiste a um espectáculo por trás de uma janela fechada.&rdquo;
            </p>
            <p className="mt-3 text-sm text-brown-400">
              — O Espelho da Ilusão
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-brown-300">
              Não é autoajuda. É ficção que transforma.
              Cada Espelho conta a história de uma mulher que enfrenta um véu --
              e inclui respiração guiada, diário de reflexão e um espelho pessoal teu.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.5}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/comprar/espelhos"
                className="inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
              >
                Começa a ler
              </Link>
              <Link
                href="/recursos/teste"
                className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-200 transition-all hover:border-cream hover:text-cream"
              >
                Descobre o teu véu
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* O que cada Espelho inclui */}
      <section className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-center font-serif text-3xl text-brown-900">
              O que cada Espelho inclui
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-brown-500">
              Mais do que um livro digital. Uma experiência de leitura pensada para te acompanhar.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "7 Capítulos",
                desc: "Ficção literária que te faz parar e reconhecer-te na personagem.",
                color: "#c9b896",
              },
              {
                title: "Respiração Guiada",
                desc: "Pausas entre capítulos. O corpo também precisa de processar.",
                color: "#7a8c6e",
              },
              {
                title: "Diário de Reflexão",
                desc: "Perguntas que ninguém te fez. As tuas respostas, guardadas para sempre.",
                color: "#b07a7a",
              },
              {
                title: "Espelho Final",
                desc: "Tudo o que escreveste, reunido. A tua síntese pessoal.",
                color: "#baaacc",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={0.1 * i} variant="scale">
                <div className="rounded-2xl border border-brown-100 bg-white p-6 text-center shadow-sm">
                  <div
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <span className="font-serif text-lg" style={{ color: item.color }}>~</span>
                  </div>
                  <h3 className="mt-4 font-serif text-base text-brown-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brown-500">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Disponível agora — com imagem grande */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.65rem] uppercase tracking-[0.25em] text-sage">
              Disponível agora
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl text-brown-900">
              Começa a tua travessia
            </h2>
          </ScrollReveal>

          {published.map((exp) => (
            <ScrollReveal key={exp.slug}>
              <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-brown-200 bg-white shadow-md">
                <div className="md:flex">
                  {/* Cover — large and prominent */}
                  <div
                    className="flex shrink-0 items-center justify-center px-8 py-10 md:w-[280px]"
                    style={{
                      background: `linear-gradient(135deg, ${exp.color}15, ${exp.color}30)`,
                    }}
                  >
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      width={240}
                      height={360}
                      className="rounded-lg shadow-xl"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-8">
                    <p
                      className="font-sans text-[0.6rem] uppercase tracking-[0.2em]"
                      style={{ color: exp.color }}
                    >
                      Espelho {exp.number} de 7
                    </p>
                    <h3 className="mt-2 font-serif text-2xl text-brown-900">
                      {exp.title}
                    </h3>
                    <p className="mt-1 font-serif text-sm italic text-brown-500">
                      {exp.subtitle}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-brown-600">
                      {exp.longDescription}
                    </p>
                    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-serif text-2xl font-bold text-brown-900">
                        {exp.priceMT.toLocaleString()} MZN <span className="text-base font-normal text-brown-400">/ ${exp.priceUSD} USD</span>
                      </span>
                      <Link
                        href="/comprar/espelhos"
                        className="inline-block rounded-lg bg-sage px-6 py-3 text-center font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
                      >
                        Comprar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Nós — a segunda dimensão */}
      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#c9a87c]/20 bg-[#c9a87c]/[0.04] px-8 py-8 text-center">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-[#c9a87c]">
            A segunda dimensão
          </p>
          <h2 className="mt-3 font-serif text-xl text-brown-900">
            Cada Espelho tem um Nó
          </h2>
          <p className="mx-auto mt-3 max-w-md font-serif text-sm leading-relaxed text-brown-600">
            Os Espelhos mostram-te o véu que usas.
            Os Nós mostram-te o que esse véu fez entre ti e outra pessoa.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-brown-500">
            Ao completar um Espelho, o Nó correspondente desbloqueia-se como continuação natural.
            Nó individual: 780 MZN / $12 USD. Incluído nos packs.
          </p>
        </div>
      </section>

      {/* Calendário de lançamentos — com capas */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.65rem] uppercase tracking-[0.25em] text-brown-400">
              Calendário 2026
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl text-cream">
              Um novo Espelho cada mês
            </h2>
            <p className="mx-auto mt-4 max-w-md text-center text-sm text-brown-300">
              De Março a Agosto de 2026, um novo Espelho por mês.
              Cada história espera o seu momento.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((exp, i) => (
              <ScrollReveal key={exp.slug} delay={0.08 * i} variant="scale">
                <div className="overflow-hidden rounded-2xl border border-brown-700/30 bg-brown-800/50 transition-all hover:bg-brown-800/70">
                  <div
                    className="flex items-center justify-center px-4 py-6"
                    style={{
                      background: `linear-gradient(135deg, ${exp.color}08, ${exp.color}15)`,
                    }}
                  >
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      width={140}
                      height={210}
                      className="rounded-lg opacity-75 shadow-lg"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <span
                        className="font-sans text-[0.55rem] uppercase tracking-[0.2em]"
                        style={{ color: `${exp.color}cc` }}
                      >
                        Espelho {exp.number}
                      </span>
                      <span className="rounded-full bg-brown-700/50 px-3 py-0.5 text-[0.6rem] text-brown-300">
                        {exp.launchLabel}
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif text-base text-cream">
                      {exp.title}
                    </h3>
                    <p className="mt-1 text-sm italic text-brown-400">
                      {exp.subtitle}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-brown-500">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Waitlist */}
          <ScrollReveal delay={0.4}>
            <div className="mx-auto mt-14 max-w-lg rounded-2xl border border-brown-700/30 bg-brown-800/50 p-8 text-center">
              <h3 className="font-serif text-xl text-cream">
                Queres ser a primeira a saber?
              </h3>
              <p className="mt-2 text-sm text-brown-300">
                Junta-te à lista e recebe aviso quando cada novo Espelho for publicado.
              </p>
              <div className="mt-5">
                <WaitlistForm />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-serif text-2xl italic leading-relaxed text-brown-800">
              &ldquo;Há mais para ti do que aquilo que tens vivido.&rdquo;
            </p>
            <p className="mt-3 text-sm text-brown-400">
              — O Espelho da Ilusão, Epílogo
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/comprar/espelhos"
                className="inline-block rounded-md bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-white transition-all hover:bg-sage-dark"
              >
                Comprar Espelho da Ilusão
              </Link>
              <Link
                href="/recursos/teste"
                className="inline-block rounded-md border-2 border-sage bg-transparent px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-sage transition-all hover:bg-sage hover:text-white"
              >
                Fazer teste gratuito
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
