import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Artigos",
  description:
    "Reflexões sobre a vida que queres viver. Sem lições. Sem fórmulas. Apenas verdade.",
};

const articles = [
  {
    slug: "a-vida-que-funciona-e-o-que-vem-depois",
    title: "A vida que funciona — e o que vem depois",
    subtitle: "Para quem sente que merece mais do que apenas cumprir",
    excerpt:
      "Há vidas que funcionam. Cumprem os prazos, pagam as contas, recebem os parabéns nas alturas certas. E no entanto, quando a casa fica em silêncio, surge algo que não é queixa nem ingratidão. É uma intuição suave: há mais.",
    date: "2026-02-01",
    readingTime: "5 min",
    image: "/images/artigo-vida-funciona.png",
  },
  {
    slug: "o-dia-em-que-deixas-de-agradar",
    title: "O dia em que deixas de agradar — e começas a escolher",
    subtitle: "Para quem está cansada de ser tudo para todos",
    excerpt:
      "Começa cedo, tão cedo que já não sabes quando começou. Um sorriso de aprovação, um elogio bem colocado, uma sensação breve de pertença. O corpo aprende antes da mente: isto é seguro, isto é aceite, isto é amor.",
    date: "2026-01-20",
    readingTime: "5 min",
    image: "/images/artigo-agradar.png",
  },
  {
    slug: "e-se-pudesses-escolher-de-novo",
    title: "E se pudesses escolher de novo?",
    subtitle: "Para quem sente que a vida aconteceu — e quer começar a decidir",
    excerpt:
      "Há um momento em que olhas para a tua vida e percebes, com uma clareza tranquila, que a maioria das coisas que tens não foram escolhidas. Não de verdade. Não da forma como se escolhe quando se sabe que se está a escolher.",
    date: "2026-01-08",
    readingTime: "5 min",
    image: "/images/artigo-escolha.png",
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
      <section className="bg-cream px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl leading-tight text-brown-900 sm:text-5xl">
            Artigos
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-brown-600">
            Reflexões para os dias em que precisas de companhia. Sem lições. Sem fórmulas. Apenas
            verdade.
          </p>
        </div>
      </section>

      {/* Articles list — horizontal cards like Ghost */}
      <section className="bg-cream-dark px-6 pb-24 pt-2">
        <div className="mx-auto max-w-4xl space-y-8">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(93,78,55,0.1)] transition-shadow hover:shadow-[0_4px_20px_rgba(93,78,55,0.15)]"
            >
              <Link href={`/artigos/${article.slug}`} className="items-stretch md:flex">
                {/* Image */}
                <div className="relative h-56 shrink-0 md:h-auto md:w-[320px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  {/* Gold accent bar */}
                  <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-gold to-gold-dark" />
                </div>
                {/* Content */}
                <div className="flex flex-1 flex-col justify-center p-8">
                  <div className="flex items-center gap-3 font-sans text-[0.7rem] text-brown-400">
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                    <span>&middot;</span>
                    <span>{article.readingTime} de leitura</span>
                  </div>
                  <h2 className="mt-3 font-serif text-xl text-brown-900 transition-colors group-hover:text-sage sm:text-2xl">
                    {article.title}
                  </h2>
                  <p className="mt-1 text-sm italic text-brown-500">{article.subtitle}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-brown-600">
                    {article.excerpt}
                  </p>
                  <span className="mt-4 inline-block font-sans text-sm font-medium text-sage">
                    Ler artigo &rarr;
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* More coming — dark */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-2xl text-cream">Mais reflexões em breve.</p>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-brown-200">
            Se quiseres ser a primeira a receber, deixa o teu email nos{" "}
            <Link href="/recursos" className="text-sage-light hover:text-cream">
              recursos gratuitos
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
