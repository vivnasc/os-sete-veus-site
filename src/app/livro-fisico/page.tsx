import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PayPalButton from "@/components/PayPalButton";

export const metadata: Metadata = {
  title: "Livro Físico",
  description:
    "Os 7 Véus do Despertar — Integração Colectiva Num Caminho Universalista. Disponível em ebook e livro físico.",
};

export default function LivroFisicoPage() {
  return (
    <>
      {/* Hero — very dark, matching Ghost */}
      <section className="bg-gradient-to-b from-[#2d2620] to-[#1a1510] px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-brown-400">
            Livro Físico
          </p>
          <h1 className="mt-6 font-serif text-4xl leading-tight text-cream sm:text-5xl md:text-6xl">
            Os 7 Véus do Despertar
          </h1>
          <p className="mt-4 font-serif text-lg italic text-brown-300">
            Integração Colectiva Num Caminho Universalista
          </p>

          <div className="mx-auto mt-10 h-px w-16 bg-brown-500" />

          <div className="mt-10">
            <Image
              src="/images/mandala-7veus.png"
              alt="Mandala dos Sete Véus do Despertar"
              width={300}
              height={300}
              className="mx-auto"
            />
          </div>

          <p className="mx-auto mt-10 max-w-lg leading-relaxed text-brown-300">
            Uma travessia de dissolução e reconhecimento. Não um manual de respostas,
            mas um convite a olhar mais fundo — e a soltar o que perdeu verdade.
          </p>

          <p className="mt-2 text-sm text-brown-500">por Vivianne dos Santos</p>
        </div>
      </section>

      {/* Purchase options — two big buttons like Ghost */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-xl">
          <div className="flex flex-col gap-5">
            {/* Ebook — PayPal */}
            <div className="rounded-2xl border border-brown-100 bg-white p-8 shadow-sm">
              <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-sage">
                Ebook digital
              </p>
              <p className="mt-3 font-sans text-3xl font-bold text-brown-900">
                $19 <span className="text-base font-normal text-brown-400">USD — Mundial</span>
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
                1.500 <span className="text-base font-normal text-brown-400">MT — Moçambique</span>
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
                  href="https://wa.me/258845243875?text=Olá! Quero encomendar o livro físico Os 7 Véus do Despertar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-md border-2 border-[#25D366] bg-[#25D366] px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-all hover:bg-transparent hover:text-[#25D366]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Livro Físico — 1.500 MT (Moçambique)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the book */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl text-brown-900">Sobre este livro</h2>
          <div className="mt-8 space-y-6">
            <p className="leading-relaxed text-brown-700">
              Este livro não é um manual de respostas prontas, nem um guia de etapas rígidas. É um
              convite a olhar mais profundamente para dentro, a desafiar as percepções limitadas que
              carregamos e a atravessar os véus que obscurecem a clareza da consciência.
            </p>
            <p className="leading-relaxed text-brown-700">
              O despertar não é uma chegada a um ponto fixo. É um processo gradual de desapego e
              dissolução — não sobre conquistar um novo estado, mas sobre soltar o que perdeu sentido.
              Cada camada removida é uma revelação do que sempre foi real.
            </p>
            <p className="leading-relaxed text-brown-700">
              À medida que cada véu se dissolve, o limite aparente revela-se passagem. O despertar
              deixa de ser conquista ou destino, mas espiral viva de expansão, onde cada camada que
              cai nos devolve à clareza do que sempre fomos: presença inseparável da vida que pulsa em tudo.
            </p>
          </div>
          <div className="mt-8 rounded-r-xl border-l-[3px] border-veu-7 bg-cream px-6 py-5">
            <p className="font-serif italic leading-relaxed text-brown-700">
              &ldquo;O que chamamos de realidade é, muitas vezes, apenas uma projecção da mente,
              moldada pelas crenças que fomos acumulando ao longo da vida.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* The 7 veils */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl text-brown-900">Os sete véus</h2>
          <div className="mt-8 space-y-6">
            {[
              { n: 1, name: "O Véu da Permanência", desc: "Encobre a impermanência da vida, fazendo-nos acreditar num eu fixo e imutável.", color: "bg-veu-1" },
              { n: 2, name: "O Véu da Memória", desc: "Encobre a liberdade do presente, mantendo-nos presos às histórias do passado.", color: "bg-veu-2" },
              { n: 3, name: "O Véu do Turbilhão", desc: "Encobre o silêncio do ser, confundindo-nos com os pensamentos e emoções que se agitam sem cessar.", color: "bg-veu-3" },
              { n: 4, name: "O Véu do Esforço", desc: "Encobre o repouso interior, fazendo-nos acreditar que a plenitude depende da busca incessante.", color: "bg-veu-4" },
              { n: 5, name: "O Véu da Desolação", desc: "Encobre a fertilidade do vazio, fazendo-o parecer abandono e ameaça.", color: "bg-veu-5" },
              { n: 6, name: "O Véu do Horizonte", desc: "Encobre a infinitude da consciência, sugerindo um destino final, uma chegada definitiva.", color: "bg-veu-6" },
              { n: 7, name: "O Véu da Dualidade", desc: "Encobre a unidade do real, mantendo a ilusão de que estamos separados.", color: "bg-veu-7" },
            ].map((veu) => (
              <div key={veu.n} className="flex items-start gap-4">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${veu.color} font-sans text-sm font-bold text-white`}>
                  {veu.n}
                </span>
                <div>
                  <span className="font-serif text-lg text-brown-800">{veu.name}</span>
                  <p className="mt-1 text-sm leading-relaxed text-brown-500">{veu.desc}</p>
                </div>
              </div>
            ))}
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
