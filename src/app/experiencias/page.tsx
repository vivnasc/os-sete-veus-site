import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { experiences } from "@/data/experiences";
import ScrollReveal from "@/components/ScrollReveal";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Colecção Espelhos",
  description:
    "Sete ficções de transformação. Histórias onde te reconheces, com respiração guiada, diário de reflexão e espelho pessoal.",
};

export default function ExperienciasPage() {
  // Apenas Espelho da Ilusão está publicado
  const published = experiences.filter((e) => e.slug === "veu-da-ilusao");
  const upcoming = experiences.filter((e) => e.slug !== "veu-da-ilusao");

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-brown-400">
              Colecção Espelhos
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Ficções de transformação
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brown-200">
              Sete histórias de ficção literária onde te reconheces.
              Cada Espelho combina narrativa, respiração guiada, diário de reflexão
              e um espelho pessoal.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/comprar/espelhos"
                className="inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
              >
                Ver preços
              </Link>
              <Link
                href="/recursos/teste"
                className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-200 transition-all hover:border-cream hover:text-cream"
              >
                Descobre o teu Espelho
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
          </ScrollReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "7 Capítulos",
                desc: "Ficção literária que te faz parar e reconhecer",
                color: "#c9b896",
              },
              {
                title: "Respiração guiada",
                desc: "Pausas entre cada capítulo. O corpo também precisa de pausa.",
                color: "#7a8c6e",
              },
              {
                title: "Diário de reflexão",
                desc: "Perguntas que ninguém te fez. As tuas respostas, guardadas.",
                color: "#b07a7a",
              },
              {
                title: "O Teu Espelho",
                desc: "Tudo o que escreveste, reunido. O teu livro de ti mesma.",
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

      {/* Disponível agora */}
      <section className="bg-cream-dark px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.65rem] uppercase tracking-[0.25em] text-sage">
              Disponível agora
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl text-brown-900">
              Começa a tua travessia
            </h2>
          </ScrollReveal>

          <div className="mx-auto mt-12 max-w-lg">
            {published.map((exp) => (
              <ScrollReveal key={exp.slug}>
                <div className="group overflow-hidden rounded-2xl border border-brown-100 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div
                    className="flex items-center justify-center px-8 py-8"
                    style={{
                      background: `linear-gradient(135deg, ${exp.color}15, ${exp.color}30)`,
                    }}
                  >
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      width={180}
                      height={270}
                      className="rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p
                      className="font-sans text-[0.6rem] uppercase tracking-[0.2em]"
                      style={{ color: exp.color }}
                    >
                      Espelho {exp.number} de 7
                    </p>
                    <h3 className="mt-1 font-serif text-xl text-brown-900">
                      {exp.title}
                    </h3>
                    <p className="mt-1 font-serif text-sm italic text-brown-500">
                      {exp.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-brown-600">
                      {exp.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="font-serif text-lg font-bold text-brown-900">
                        1.885 MZN / ${exp.priceUSD} USD
                      </span>
                      <Link
                        href="/comprar/espelhos"
                        className="rounded-full px-5 py-2 font-sans text-[0.7rem] uppercase tracking-[0.12em] text-white transition-colors hover:opacity-90"
                        style={{ backgroundColor: exp.color }}
                      >
                        Comprar
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nós — dimensão relacional */}
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
            Ao completar um Espelho, o seu Nó desbloqueia-se como continuação natural.
          </p>
        </div>
      </section>

      {/* Calendário de lançamentos */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.65rem] uppercase tracking-[0.25em] text-brown-400">
              Calendário
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl text-cream">
              Cada Espelho tem o seu momento
            </h2>
          </ScrollReveal>

          <div className="mt-12 space-y-4">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.slug} delay={0.08 * i}>
                <div
                  className={`flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all ${
                    exp.slug === "veu-da-ilusao"
                      ? "border-sage/30 bg-sage/10"
                      : "border-brown-700/30 bg-brown-800/50"
                  }`}
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold text-white"
                    style={{
                      backgroundColor:
                        exp.slug === "veu-da-ilusao" ? exp.color : exp.color + "50",
                    }}
                  >
                    {exp.number}
                  </span>
                  <div className="flex-1">
                    <h3
                      className={`font-serif text-base ${exp.slug === "veu-da-ilusao" ? "text-cream" : "text-brown-300"}`}
                    >
                      {exp.title}
                    </h3>
                    <p className="font-sans text-xs text-brown-500">
                      {exp.subtitle}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    {exp.slug === "veu-da-ilusao" ? (
                      <Link
                        href="/comprar/espelhos"
                        className="rounded-full bg-sage px-4 py-1.5 font-sans text-[0.6rem] uppercase tracking-[0.12em] text-white hover:bg-sage-dark"
                      >
                        Disponível
                      </Link>
                    ) : (
                      <span className="font-sans text-[0.65rem] text-brown-500">
                        {exp.launchLabel}
                      </span>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Waitlist */}
          <ScrollReveal delay={0.4}>
            <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-brown-700/30 bg-brown-800/50 p-8 text-center">
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
              &ldquo;Não precisas de saber para onde vais. Precisas apenas de dar o primeiro passo.&rdquo;
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/comprar/espelhos"
                className="inline-block rounded-md bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-white transition-all hover:bg-sage-dark"
              >
                Ver Colecção Espelhos
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
