import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Livro Físico",
  description:
    "O Véu da Ilusão — Histórias de Quem Acordou a Meio. Disponível em ebook e livro físico.",
};

export default function LivroFisicoPage() {
  return (
    <>
      {/* Hero — very dark */}
      <section className="bg-gradient-to-b from-[#2d2620] to-[#1a1510] px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="items-center gap-12 md:flex">
            <div className="shrink-0 text-center">
              <Image
                src="/images/veu-1-ilusao.png.png"
                alt="O Véu da Ilusão — capa"
                width={280}
                height={420}
                className="mx-auto rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              />
            </div>
            <div className="mt-10 md:mt-0">
              <p className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-brown-400">
                Véu 1 de 7
              </p>
              <h1 className="mt-3 font-serif text-3xl leading-tight text-cream sm:text-4xl md:text-5xl">
                O Véu da Ilusão
              </h1>
              <p className="mt-2 font-serif text-lg italic text-brown-300">
                Histórias de Quem Acordou a Meio
              </p>
              <p className="mt-1 text-sm text-brown-400">por Vivianne dos Santos</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://hotmart.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 text-center font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
                >
                  Ebook — comprar
                </a>
                <a
                  href="https://wa.me/258849999999?text=Olá! Quero encomendar o livro físico O Véu da Ilusão"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md border-2 border-[#25D366] bg-[#25D366] px-8 py-3.5 text-center font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-white transition-all hover:bg-transparent hover:text-[#25D366]"
                >
                  Livro físico — WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the book */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl text-brown-900">Sobre este livro</h2>
          <div className="mt-8 space-y-6">
            <p className="leading-relaxed text-brown-700">
              Sara tem tudo no sítio. Emprego, casa, relação. E uma pergunta que não a larga:
              &ldquo;Isto é mesmo meu?&rdquo;
            </p>
            <p className="leading-relaxed text-brown-700">
              O Véu da Ilusão é o primeiro livro da colecção Os Sete Véus. É para quem sente
              que está na vida certa de outra pessoa. Para quem construiu tudo &ldquo;bem&rdquo; —
              mas sente que falta algo que não consegue nomear.
            </p>
            <p className="leading-relaxed text-brown-700">
              Através de histórias onde talvez te reconheças, este livro convida-te a olhar para
              a vida que tens e perguntar, com gentileza: isto é meu? Isto quero eu?
            </p>
          </div>
          <div className="mt-8 rounded-r-xl border-l-[3px] border-veu-7 bg-cream-dark px-6 py-5">
            <p className="font-serif italic leading-relaxed text-brown-700">
              &ldquo;Não é que estejas a viver mal. É que há uma versão tua que ainda não teve
              espaço para existir.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* What this book is */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl text-brown-900">O que encontras neste livro</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-cream p-6">
              <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-sage">
                O que é
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  "Histórias de ficção psicológica",
                  "Reflexões sobre a vida que escolhemos (ou não)",
                  "Um espelho gentil, sem julgamento",
                  "Um convite para te ouvires",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brown-700">
                    <span className="mt-1 text-sage">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-cream p-6">
              <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-brown-400">
                O que não é
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  "Não é auto-ajuda nem coaching",
                  "Não é um manual com passos",
                  "Não promete transformação instantânea",
                  "Não te diz o que fazer",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brown-500">
                    <span className="mt-1">&#10005;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* For whom */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl text-brown-900">Para quem é este livro</h2>
          <ul className="mt-8 space-y-4">
            {[
              "Para quem tem uma vida que funciona, mas sente que merece mais",
              "Para quem já se perguntou \"Isto é mesmo o que eu quero?\"",
              "Para quem precisa de se reconhecer numa história antes de mudar a sua",
              "Para quem quer ir devagar, ao seu ritmo, sem pressão",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-brown-700">
                <span className="mt-1 text-lg text-gold">&rarr;</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm italic text-brown-500">
            Nota: Este livro pode ser lido independentemente dos outros véus da colecção.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-2xl italic leading-relaxed text-cream">
            &ldquo;Sete histórias que te devolvem a ti mesma.&rdquo;
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://hotmart.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 text-center font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
            >
              Ebook — comprar
            </a>
            <Link
              href="/recursos"
              className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 text-center font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-200 transition-all hover:border-cream hover:bg-cream hover:text-brown-900"
            >
              Experimentar grátis primeiro
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
