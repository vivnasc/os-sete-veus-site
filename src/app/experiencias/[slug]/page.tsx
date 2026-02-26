import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getExperience, experiences } from "@/data/experiences";
import ScrollReveal from "@/components/ScrollReveal";
import WaitlistForm from "@/components/WaitlistForm";

// ---------------------------------------------------------------------------
// Static generation for all 7 slugs
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return experiences.map((exp) => ({ slug: exp.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata per experience
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) return { title: "Experiência não encontrada" };

  return {
    title: `${exp.title} — Os Sete Véus`,
    description: exp.description,
    openGraph: {
      title: `${exp.title} — Os Sete Véus`,
      description: exp.description,
      images: [{ url: exp.image, width: 600, height: 900 }],
    },
  };
}

// ---------------------------------------------------------------------------
// What each experience includes — shared across all veils
// ---------------------------------------------------------------------------
const includes = [
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
  {
    icon: "&#9733;",
    title: "Práticas integradas",
    desc: "Exercícios que levam a experiência das páginas para o teu dia.",
    color: "#8aaaca",
  },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default async function ExperienciaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) notFound();

  const isAvailable = exp.status === "available";

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Hero */}
      {/* ----------------------------------------------------------------- */}
      <section
        className="relative overflow-hidden px-6 py-24 sm:py-32"
        style={{
          background: `linear-gradient(135deg, ${exp.color}18, ${exp.colorBg} 40%, ${exp.color}10)`,
        }}
      >
        {/* Decorative circle */}
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{ backgroundColor: exp.color }}
        />

        <div className="mx-auto max-w-5xl">
          {/* Back link */}
          <ScrollReveal variant="fadeIn">
            <Link
              href="/experiencias"
              className="inline-flex items-center gap-1.5 font-sans text-[0.75rem] uppercase tracking-[0.15em] text-brown-400 transition-colors hover:text-brown-700"
            >
              <span aria-hidden="true">&larr;</span>
              Voltar às experiências
            </Link>
          </ScrollReveal>

          <div className="mt-10 items-center gap-12 md:flex">
            {/* Cover image */}
            <ScrollReveal variant="scale" className="shrink-0 text-center md:text-left">
              <div
                className="inline-block rounded-2xl p-4"
                style={{
                  background: `linear-gradient(135deg, ${exp.color}20, ${exp.color}08)`,
                }}
              >
                <Image
                  src={exp.image}
                  alt={exp.title}
                  width={260}
                  height={390}
                  priority
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </ScrollReveal>

            {/* Text */}
            <div className="mt-10 flex-1 md:mt-0">
              <ScrollReveal delay={0.15}>
                <p
                  className="font-sans text-[0.65rem] uppercase tracking-[0.25em]"
                  style={{ color: exp.color }}
                >
                  Experiência {exp.number} de 7
                </p>
                <h1 className="mt-3 font-serif text-4xl leading-tight text-brown-900 sm:text-5xl">
                  {exp.title}
                </h1>
                <p className="mt-2 font-serif text-lg italic text-brown-500">
                  {exp.subtitle}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="mt-6 max-w-lg leading-relaxed text-brown-700">
                  {exp.longDescription}
                </p>
              </ScrollReveal>

              {/* CTA */}
              <ScrollReveal delay={0.45}>
                <div className="mt-8">
                  {isAvailable ? (
                    <Link
                      href="/entrar"
                      className="animate-pulse-glow inline-block rounded-md border-2 px-10 py-4 font-sans text-[0.85rem] font-medium uppercase tracking-[0.15em] text-white transition-all hover:opacity-90"
                      style={{
                        backgroundColor: exp.color,
                        borderColor: exp.color,
                      }}
                    >
                      Começar &mdash; ${exp.priceUSD}
                    </Link>
                  ) : (
                    <div className="inline-flex items-center gap-3 rounded-lg border border-brown-200 bg-white/60 px-5 py-3">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: exp.color }}
                      />
                      <span className="font-sans text-sm text-brown-600">
                        Lança em{" "}
                        <strong className="text-brown-900">{exp.launchLabel}</strong>
                      </span>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* What this experience includes */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-center font-serif text-3xl text-brown-900">
              O que esta experiência inclui
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center leading-relaxed text-brown-600">
              Mais do que um livro. Uma jornada imersiva com{" "}
              {exp.chapters} capítulos, práticas guiadas e o teu espelho pessoal.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {includes.map((item, i) => (
              <ScrollReveal key={item.title} delay={0.08 * i} variant="scale">
                <div className="rounded-2xl border border-brown-100 bg-white p-6 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-xl text-white"
                    style={{ backgroundColor: item.color }}
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                  <h3 className="mt-3 font-serif text-sm text-brown-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-brown-500">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Deep dive — the story */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-cream-dark px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div
              className="rounded-2xl border px-8 py-10 sm:px-12 sm:py-14"
              style={{
                borderColor: exp.color + "30",
                background: `linear-gradient(135deg, ${exp.color}06, ${exp.colorBg})`,
              }}
            >
              <p
                className="font-sans text-[0.65rem] uppercase tracking-[0.25em]"
                style={{ color: exp.color }}
              >
                A história
              </p>
              <h3 className="mt-3 font-serif text-2xl leading-snug text-brown-900">
                {exp.subtitle}
              </h3>
              <p className="mt-5 leading-relaxed text-brown-700">
                {exp.longDescription}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { n: exp.chapters, label: "capítulos" },
                  { n: exp.practices, label: "práticas" },
                  { n: 7, label: "reflexões" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-white/70 px-4 py-4 text-center"
                  >
                    <p
                      className="font-serif text-2xl font-bold"
                      style={{ color: exp.color }}
                    >
                      {stat.n}
                    </p>
                    <p className="mt-0.5 font-sans text-[0.6rem] uppercase tracking-wider text-brown-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* How it works */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="text-center font-serif text-3xl text-brown-900">
              Como funciona
            </h2>
          </ScrollReveal>

          <div className="mt-12 space-y-8">
            {[
              {
                step: "01",
                title: "Lê ao teu ritmo",
                desc: "7 capítulos de ficção literária. Sem pressão. Sem prazos. Acesso para sempre.",
              },
              {
                step: "02",
                title: "Respira entre capítulos",
                desc: "Respiração guiada de 3 ciclos para integrar o que leste antes de avançar.",
              },
              {
                step: "03",
                title: "Escreve no teu diário",
                desc: "Perguntas de reflexão que te devolvem as tuas próprias palavras. Guardadas para sempre.",
              },
              {
                step: "04",
                title: "Descobre o teu Espelho",
                desc: "No final, tudo o que escreveste é reunido num retrato único de ti mesma.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={0.1 * i}>
                <div className="flex gap-5">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-sans text-xs font-bold text-white"
                    style={{ backgroundColor: exp.color }}
                  >
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-brown-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 leading-relaxed text-brown-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* CTA section — available vs coming soon */}
      {/* ----------------------------------------------------------------- */}
      {isAvailable ? (
        <section className="hero-gradient-animated bg-gradient-to-br from-brown-800 via-[#3d3630] to-brown-900 px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <p className="font-serif text-2xl italic leading-relaxed text-cream">
                &ldquo;Não precisas de saber para onde vais.
                <br />
                Precisas apenas de dar o primeiro passo.&rdquo;
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-lg text-brown-300">
                {exp.chapters} capítulos &middot; Respiração guiada &middot;
                Diário de reflexão &middot; O Teu Espelho. Acesso para sempre.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.35}>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/entrar"
                  className="animate-pulse-glow inline-block rounded-md border-2 border-cream bg-cream px-10 py-4 font-sans text-[0.85rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
                >
                  Comecar &mdash; ${exp.priceUSD}
                </Link>
                <Link
                  href="/experiencias"
                  className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-200 transition-all hover:border-cream hover:text-cream"
                >
                  Ver todas as experiências
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      ) : (
        <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <p
                className="font-sans text-[0.7rem] uppercase tracking-[0.25em]"
                style={{ color: exp.color }}
              >
                Em breve
              </p>
              <h2 className="mt-3 font-serif text-3xl text-cream">
                {exp.title} chega em {exp.launchLabel}
              </h2>
              <p className="mx-auto mt-4 max-w-lg leading-relaxed text-brown-300">
                Junta-te à waitlist e serás a primeira a saber quando esta
                experiência estiver disponível — com 20% de desconto no lançamento.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="mx-auto mt-8 max-w-md">
                <WaitlistForm />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.35}>
              <div className="mt-10">
                <Link
                  href="/experiencias"
                  className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-200 transition-all hover:border-cream hover:text-cream"
                >
                  Ver experiências disponíveis
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Bottom back link */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-cream px-6 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/experiencias"
            className="inline-flex items-center gap-1.5 font-sans text-sm text-brown-400 transition-colors hover:text-brown-700"
          >
            <span aria-hidden="true">&larr;</span>
            Voltar às experiências
          </Link>
        </div>
      </section>
    </>
  );
}
