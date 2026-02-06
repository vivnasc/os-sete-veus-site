import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

const veusPeek = [
  {
    title: "O Véu da Ilusão",
    tagline: "Quando a vida que tens não foi a que escolheste",
  },
  {
    title: "O Véu do Medo",
    tagline: "Quando o medo decide por ti",
  },
  {
    title: "O Véu do Desejo",
    tagline: "Quando desejas tudo menos o que precisas",
  },
  {
    title: "O Véu do Controlo",
    tagline: "Quando segurar é a única forma que conheces",
  },
  {
    title: "O Véu da Culpa",
    tagline: "Quando te castigas por querer mais",
  },
  {
    title: "O Véu da Identidade",
    tagline: "Quando já não sabes quem és sem os outros",
  },
  {
    title: "O Véu da Separação",
    tagline: "Quando te afastas de ti mesma para pertencer",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[85vh] items-center justify-center px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl leading-tight tracking-tight text-warm-900 sm:text-5xl md:text-6xl">
            Para quem sente que merece mais da própria vida.
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-warm-600">
            Sete histórias que te devolvem a ti mesma.
            <br />
            Sem pressa. Sem fórmulas. Apenas verdade.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/recursos"
              className="rounded-xl bg-terracotta px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-terracotta-dark"
            >
              Começa por aqui
            </Link>
            <Link
              href="/os-sete-veus"
              className="rounded-xl border border-warm-300 px-8 py-4 text-sm font-medium text-warm-700 transition-colors hover:border-warm-400 hover:bg-warm-100"
            >
              Conhece a colecção
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-warm-100 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-warm-800 sm:text-4xl">Os Sete Véus</h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-warm-600">
            Não são manuais. Não são fórmulas de transformação. São histórias onde talvez te
            reconheças. E nesse reconhecimento, algo muda — devagar, ao teu ritmo.
          </p>
        </div>
      </section>

      {/* Collection peek */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {veusPeek.map((veu) => (
              <div
                key={veu.title}
                className="group rounded-2xl border border-warm-200 p-8 transition-colors hover:border-warm-300 hover:bg-warm-100"
              >
                <h3 className="font-serif text-lg text-warm-800">{veu.title}</h3>
                <p className="mt-2 text-sm italic leading-relaxed text-warm-500">
                  {veu.tagline}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/os-sete-veus"
              className="text-sm font-medium text-terracotta transition-colors hover:text-terracotta-dark"
            >
              Explorar a colecção &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-warm-100 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-warm-400">
              Da autora
            </p>
            <blockquote className="mt-6 font-serif text-2xl italic leading-relaxed text-warm-700 sm:text-3xl">
              &ldquo;Passei anos a construir uma vida que fazia sentido para toda a gente — menos
              para mim.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm text-warm-500">— Vivianne dos Santos</p>
            <Link
              href="/sobre"
              className="mt-8 inline-block text-sm font-medium text-terracotta transition-colors hover:text-terracotta-dark"
            >
              Conhece a Vivianne &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl text-warm-800">Queres levar mais contigo?</h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-warm-600">
            Deixa o teu email e enviamos recursos gratuitos. Só coisas úteis. Sem spam. Prometido.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
