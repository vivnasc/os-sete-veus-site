import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Artigos",
  description:
    "Reflexões sobre a vida que queres viver. Sem lições. Sem fórmulas. Apenas verdade.",
};

const articles = [
  {
    slug: "e-se-pudesses-escolher-de-novo",
    title: "E se pudesses escolher de novo?",
    excerpt:
      "Há uma liberdade enorme em perceber que a vida que tens não é a única possível. Que podes, a qualquer momento, começar a escolher de novo.",
    date: "2026-02-01",
    readingTime: "5 min",
  },
  {
    slug: "o-primeiro-passo-nao-precisa-de-ser-grande",
    title: "O primeiro passo não precisa de ser grande",
    excerpt:
      "Achamos que mudar exige coragem enorme, gestos dramáticos. Mas e se o primeiro passo fosse apenas parar? Respirar. Perguntar: o que é que eu preciso agora?",
    date: "2026-01-20",
    readingTime: "4 min",
  },
  {
    slug: "para-os-dias-em-que-te-esqueces-de-ti",
    title: "Para os dias em que te esqueces de ti",
    excerpt:
      "Há dias em que cuidas de tudo e de todos — menos de ti. Estas palavras são para esses dias. Um lembrete gentil de que tu também mereces o teu tempo.",
    date: "2026-01-08",
    readingTime: "3 min",
  },
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArtigosPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl leading-tight text-warm-900 sm:text-5xl">
            Artigos
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-warm-600">
            Reflexões para os dias em que precisas de companhia. Sem lições. Sem fórmulas. Apenas
            verdade.
          </p>
        </div>
      </section>

      {/* Articles list */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl space-y-8">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group rounded-2xl border border-warm-200 p-8 transition-colors hover:border-warm-300 hover:bg-warm-100 sm:p-10"
            >
              <Link href={`/artigos/${article.slug}`} className="block">
                <div className="flex items-center gap-3 text-xs text-warm-400">
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                  <span>&middot;</span>
                  <span>{article.readingTime} de leitura</span>
                </div>
                <h2 className="mt-3 font-serif text-2xl text-warm-800 transition-colors group-hover:text-terracotta">
                  {article.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-warm-600">{article.excerpt}</p>
                <span className="mt-4 inline-block text-sm font-medium text-terracotta">
                  Continuar a ler &rarr;
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* More coming */}
      <section className="bg-warm-100 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-2xl text-warm-700">Mais reflexões em breve.</p>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-warm-500">
            Se quiseres ser a primeira a receber, deixa o teu email nos{" "}
            <Link href="/recursos" className="text-terracotta hover:text-terracotta-dark">
              recursos gratuitos
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
