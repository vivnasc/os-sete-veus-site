import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { experiences, PRICING } from "@/data/experiences";
import ScrollReveal from "@/components/ScrollReveal";
import WaitlistForm from "@/components/WaitlistForm";
import PricingTiers from "@/components/PricingTiers";

export const metadata: Metadata = {
  title: "Experiências — Os Sete Véus",
  description:
    "Sete experiências de leitura imersiva. Ficção + respiração guiada + diário de reflexão + espelho pessoal. Escolhe o teu véu ou vive a jornada completa.",
};

export default function ExperienciasPage() {
  const available = experiences.filter((e) => e.status === "available");
  const upcoming = experiences.filter((e) => e.status !== "available");

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient-animated bg-gradient-to-br from-brown-800 via-[#3d3630] to-brown-900 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-brown-400">
              Mais do que livros
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl md:text-[3.5rem]">
              Sete experiências de transformação
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brown-200">
              Cada véu é uma jornada de leitura imersiva — com ficção literária,
              respiração guiada, diário de reflexão e um espelho que te devolve
              as tuas próprias palavras. Não lês. Vives.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/recursos/teste"
                className="animate-pulse-glow inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
              >
                Descobre o teu véu
              </Link>
              <a
                href="#precos"
                className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-200 transition-all hover:border-cream hover:text-cream"
              >
                Ver preços
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-center font-serif text-3xl text-brown-900">
              O que cada experiência inclui
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "&#9997;",
                title: "7 Capítulos",
                desc: "Ficção literária que te faz parar e reconhecer",
                color: "#c9b896",
              },
              {
                icon: "&#9711;",
                title: "Respiração guiada",
                desc: "3 ciclos entre cada capítulo. O corpo também precisa de pausa.",
                color: "#7a8c6e",
              },
              {
                icon: "&#9826;",
                title: "Diário de reflexão",
                desc: "Perguntas que ninguém te fez. As tuas respostas, guardadas para sempre.",
                color: "#b07a7a",
              },
              {
                icon: "&#10024;",
                title: "O Teu Espelho",
                desc: "Tudo o que escreveste, reunido. O teu livro de ti mesma.",
                color: "#baaacc",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={0.1 * i} variant="scale">
                <div className="rounded-2xl border border-brown-100 bg-white p-6 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span
                    className="inline-flex h-14 w-14 items-center justify-center rounded-xl text-2xl text-white"
                    style={{ backgroundColor: item.color }}
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
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

      {/* Available experiences */}
      <section className="bg-cream-dark px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.7rem] uppercase tracking-[0.25em] text-sage">
              Disponíveis agora
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl text-brown-900">
              Começa a tua travessia
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {available.map((exp, i) => (
              <ScrollReveal key={exp.slug} delay={0.15 * i}>
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
                      Experiência {exp.number}
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
                      <span className="font-sans text-lg font-bold text-brown-900">
                        ${exp.priceUSD}
                      </span>
                      <Link
                        href={`/experiencias/${exp.slug}`}
                        className="rounded-full px-5 py-2 font-sans text-[0.7rem] uppercase tracking-[0.12em] text-white transition-colors hover:opacity-90"
                        style={{ backgroundColor: exp.color }}
                      >
                        Explorar
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section id="precos" className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-center font-serif text-3xl text-brown-900">
              Escolhe o teu caminho
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center leading-relaxed text-brown-600">
              Uma experiência, um pack, ou a jornada completa. Sem pressa. Sem
              compromisso de tempo. Acesso para sempre.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <PricingTiers />
          </ScrollReveal>
        </div>
      </section>

      {/* Launch calendar */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.7rem] uppercase tracking-[0.25em] text-brown-400">
              Calendário de lançamentos
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl text-cream">
              Cada véu tem o seu momento
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center leading-relaxed text-brown-300">
              Um véu novo a cada poucas semanas. Junta-te à waitlist para seres
              a primeira a saber — e ter acesso early bird com 20% de desconto.
            </p>
          </ScrollReveal>

          <div className="mt-12 space-y-4">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.slug} delay={0.08 * i}>
                <div
                  className={`flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all ${
                    exp.status === "available"
                      ? "border-sage/30 bg-sage/10"
                      : "border-brown-700/30 bg-brown-800/50"
                  }`}
                >
                  {/* Number */}
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold text-white"
                    style={{
                      backgroundColor:
                        exp.status === "available" ? exp.color : exp.color + "50",
                    }}
                  >
                    {exp.number}
                  </span>

                  {/* Info */}
                  <div className="flex-1">
                    <h3
                      className={`font-serif text-base ${exp.status === "available" ? "text-cream" : "text-brown-300"}`}
                    >
                      {exp.title}
                    </h3>
                    <p className="font-sans text-xs text-brown-500">
                      {exp.subtitle}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="shrink-0 text-right">
                    {exp.status === "available" ? (
                      <Link
                        href={`/experiencias/${exp.slug}`}
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
                Junta-te à waitlist e recebe 20% de desconto no lançamento de
                cada novo véu.
              </p>
              <div className="mt-5">
                <WaitlistForm />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Espelho pitch */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl text-brown-900">
              O Teu Espelho cresce contigo
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-brown-600">
              Cada experiência que completas adiciona novas reflexões ao teu
              Espelho. Com uma experiência, tens 7 reflexões. Com a jornada
              completa, tens 49 — um diário de auto-descoberta que escreveste
              sem perceber que estavas a escrever.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mx-auto mt-8 grid max-w-md gap-4 sm:grid-cols-3">
              {[
                { n: "7", label: "reflexões", sub: "1 experiência" },
                { n: "21", label: "reflexões", sub: "3 experiências" },
                { n: "49", label: "reflexões", sub: "jornada completa" },
              ].map((stat, i) => (
                <div
                  key={stat.sub}
                  className="rounded-xl bg-white px-4 py-5 shadow-sm"
                >
                  <p
                    className="font-serif text-3xl"
                    style={{
                      color: ["#c9b896", "#7a8c6e", "#baaacc"][i],
                    }}
                  >
                    {stat.n}
                  </p>
                  <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-wider text-brown-400">
                    {stat.label}
                  </p>
                  <p className="font-sans text-[0.55rem] text-brown-300">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hero-gradient-animated bg-gradient-to-br from-brown-800 via-[#3d3630] to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-serif text-2xl italic leading-relaxed text-cream">
              &ldquo;Não precisas de saber para onde vais. Precisas apenas de
              dar o primeiro passo.&rdquo;
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/recursos/teste"
                className="animate-pulse-glow inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
              >
                Qual véu te esconde?
              </Link>
              <a
                href="#precos"
                className="inline-block rounded-md border-2 border-cream/40 px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-cream/80 transition-all hover:border-cream hover:text-cream"
              >
                Ver preços
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
