import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PayPalButton from "@/components/PayPalButton";

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
              <div className="mt-8 flex flex-col gap-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-sans text-2xl font-bold text-cream">$19</span>
                  <span className="text-sm text-brown-400">USD — Ebook digital</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-sans text-2xl font-bold text-cream">1.500 MT</span>
                  <span className="text-sm text-brown-400">— Livro físico (Moçambique)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mandala divider */}
      <section className="bg-cream px-6 py-12 text-center">
        <Image
          src="/images/mandala-7veus.png"
          alt="Mandala dos Sete Véus"
          width={200}
          height={200}
          className="mx-auto opacity-80"
        />
      </section>

      {/* About the book */}
      <section className="bg-cream-dark px-6 py-24">
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
          <div className="mt-8 rounded-r-xl border-l-[3px] border-veu-7 bg-cream px-6 py-5">
            <p className="font-serif italic leading-relaxed text-brown-700">
              &ldquo;Não é que estejas a viver mal. É que há uma versão tua que ainda não teve
              espaço para existir.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* What this book is */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl text-brown-900">O que encontras neste livro</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-cream-dark p-6">
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
            <div className="rounded-xl bg-cream-dark p-6">
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
      <section className="bg-cream-dark px-6 py-24">
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

      {/* Purchase options */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl text-brown-900">Como adquirir</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Ebook — PayPal */}
            <div className="rounded-2xl border border-brown-100 bg-white p-8 shadow-sm">
              <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-sage">
                Ebook digital
              </p>
              <p className="mt-3 font-sans text-3xl font-bold text-brown-900">
                $19 <span className="text-base font-normal text-brown-400">USD</span>
              </p>
              <ul className="mt-5 space-y-2">
                {[
                  "Recebe imediatamente por email",
                  "Formato PDF — lê em qualquer dispositivo",
                  "Envio mundial",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brown-600">
                    <span className="mt-0.5 text-sage">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <PayPalButton />
              </div>
            </div>

            {/* Livro físico — WhatsApp */}
            <div className="rounded-2xl border border-brown-100 bg-white p-8 shadow-sm">
              <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-brown-400">
                Livro físico
              </p>
              <p className="mt-3 font-sans text-3xl font-bold text-brown-900">
                1.500 <span className="text-base font-normal text-brown-400">MT</span>
              </p>
              <ul className="mt-5 space-y-2">
                {[
                  "Edição impressa de alta qualidade",
                  "Entrega em Moçambique",
                  "Encomenda via WhatsApp",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brown-600">
                    <span className="mt-0.5 text-sage">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <a
                  href="https://wa.me/258845243875?text=Olá! Quero encomendar o livro físico O Véu da Ilusão"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-md border-2 border-[#25D366] bg-[#25D366] px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-all hover:bg-transparent hover:text-[#25D366]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Encomendar via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-2xl italic leading-relaxed text-cream">
            &ldquo;Sete histórias que te devolvem a ti mesma.&rdquo;
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/recursos"
              className="inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 text-center font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
            >
              Experimentar grátis primeiro
            </Link>
            <Link
              href="/os-sete-veus"
              className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 text-center font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-200 transition-all hover:border-cream hover:bg-cream hover:text-brown-900"
            >
              Conhecer a colecção
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
