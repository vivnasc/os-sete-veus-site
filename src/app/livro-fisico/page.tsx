import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Livro Físico — Os 7 Véus do Despertar",
  description:
    "Os 7 Véus do Despertar — Integração Colectiva Num Caminho Universalista. Edição impressa disponível em Moçambique.",
};

export default function LivroFisicoPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#2d2620] to-[#1a1510] px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-brown-400">
            Edição Impressa
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

          <p className="mx-auto mt-10 max-w-lg leading-relaxed text-brown-200">
            Uma travessia de dissolução e reconhecimento. Não um manual de respostas,
            mas um convite a olhar mais fundo — e a soltar o que perdeu verdade.
          </p>

          <p className="mt-2 text-sm text-brown-500">por Vivianne dos Santos</p>
        </div>
      </section>

      {/* About the book */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl text-brown-900">Um mapa da consciência</h2>
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
          <div className="mt-8 rounded-r-xl border-l-[3px] border-veu-7 bg-cream-dark px-6 py-5">
            <p className="font-serif italic leading-relaxed text-brown-700">
              &ldquo;O que chamamos de realidade é, muitas vezes, apenas uma projecção da mente,
              moldada pelas crenças que fomos acumulando ao longo da vida.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* The 7 veils of the book */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl text-brown-900">Os sete temas do despertar</h2>
          <p className="mt-4 leading-relaxed text-brown-600">
            Sete camadas de consciência que este livro atravessa — uma cartografia interior
            para quem está pronta a dissolver o que já não serve.
          </p>
          <div className="mt-8 space-y-6">
            {[
              { n: 1, name: "Permanência", desc: "Encobre a impermanência da vida, fazendo-nos acreditar num eu fixo e imutável.", color: "bg-veu-1" },
              { n: 2, name: "Memória", desc: "Encobre a liberdade do presente, mantendo-nos presos às histórias do passado.", color: "bg-veu-2" },
              { n: 3, name: "Turbilhão", desc: "Encobre o silêncio do ser, confundindo-nos com os pensamentos e emoções que se agitam sem cessar.", color: "bg-veu-3" },
              { n: 4, name: "Esforço", desc: "Encobre o repouso interior, fazendo-nos acreditar que a plenitude depende da busca incessante.", color: "bg-veu-4" },
              { n: 5, name: "Desolação", desc: "Encobre a fertilidade do vazio, fazendo-o parecer abandono e ameaça.", color: "bg-veu-5" },
              { n: 6, name: "Horizonte", desc: "Encobre a infinitude da consciência, sugerindo um destino final, uma chegada definitiva.", color: "bg-veu-6" },
              { n: 7, name: "Dualidade", desc: "Encobre a unidade do real, mantendo a ilusão de que estamos separados.", color: "bg-veu-7" },
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

      {/* Purchase — Physical only */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-brown-100 bg-white p-8 shadow-sm">
            <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-brown-400">
              Livro físico — Moçambique
            </p>
            <p className="mt-3 font-sans text-3xl font-bold text-brown-900">
              1.500 <span className="text-base font-normal text-brown-400">MT</span>
            </p>
            <ul className="mt-5 space-y-2">
              {[
                "Edição impressa de alta qualidade",
                "Versão digital do livro incluída",
                "Acesso à Comunidade dos Sete Véus",
                "Entrega em todo Moçambique",
                "Encomenda directa via Telegram",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-brown-700">
                  <span className="mt-0.5 text-sage">&#10003;</span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a
                href="https://t.me/viviannedossantos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-md border-2 border-[#0088cc] bg-[#0088cc] px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-all hover:bg-transparent hover:text-[#0088cc]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Encomendar via Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How to access digital version after purchase */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-3xl text-brown-900">
            Depois de comprares o livro físico
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-brown-600">
            Como aceder à versão digital do livro
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                number: "1",
                title: "Recebe o código",
                desc: "Vais receber um código único por email após a compra",
              },
              {
                number: "2",
                title: "Regista-te",
                desc: "Usa o código no site para criar a tua conta e aceder ao conteúdo",
              },
              {
                number: "3",
                title: "Lê digitalmente",
                desc: "Acede à versão digital do livro 'Os 7 Véus do Despertar' no site. Para sempre.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-brown-100 bg-white p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brown-800/10">
                  <span className="font-serif text-xl font-bold text-brown-800">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-lg text-brown-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-600">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/registar-livro"
              className="inline-block rounded-lg border-2 border-brown-700 bg-brown-700 px-8 py-3 font-sans text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-transparent hover:text-brown-700"
            >
              Já tenho o código
            </Link>
            <Link
              href="/pedir-codigo"
              className="inline-block rounded-lg border-2 border-brown-400 bg-transparent px-8 py-3 font-sans text-sm font-medium uppercase tracking-wider text-brown-600 transition-all hover:border-brown-700 hover:text-brown-700"
            >
              Pedir código de acesso
            </Link>
          </div>
        </div>
      </section>

      {/* Comunidade — incluída com a compra */}
      <section className="bg-gradient-to-b from-[#1a1510] to-[#2d2620] px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-sage-light">
            Incluído na tua compra
          </p>
          <h2 className="mt-4 font-serif text-3xl text-cream">
            Entra na Comunidade d&#39;Os Sete Véus
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-brown-200">
            Ao adquirires o livro, ganhas acesso a um espaço anónimo e impermanente
            onde leitoras partilham reflexões, sentem a consciência colectiva e contemplam juntas.
            Sem julgamento. Sem exposição. Apenas reconhecimento.
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-3">
            {[
              { icon: "🌊", name: "Ecos" },
              { icon: "🌀", name: "Maré" },
              { icon: "🪞", name: "Círculo" },
              { icon: "🔥", name: "Fogueira" },
            ].map((item) => (
              <span
                key={item.name}
                className="flex items-center gap-2 rounded-full border border-brown-600/30 bg-brown-800/50 px-4 py-2 text-sm text-brown-200"
              >
                <span>{item.icon}</span>
                {item.name}
              </span>
            ))}
          </div>
          <p className="mt-6 font-serif text-sm italic text-brown-400">
            &ldquo;Tudo é anónimo. Tudo é impermanente. Como os véus.&rdquo;
          </p>
        </div>
      </section>

      {/* CTA — self-contained */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-2xl italic leading-relaxed text-cream">
            &ldquo;Agora que vi, há um caminho — mesmo que ainda não saiba qual.&rdquo;
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/experiencias"
              className="inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
            >
              Ver experiências digitais
            </Link>
            <Link
              href="/sobre"
              className="inline-block rounded-md border-2 border-cream/40 px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-cream/80 transition-all hover:border-cream hover:text-cream"
            >
              Conhece a autora
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
