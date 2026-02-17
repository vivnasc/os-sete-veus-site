import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Escolhe a tua jornada',
  description: 'Duas formas de começar: Livro filosófico ou Espelhos (ficções interativas)',
}

export default function ComprarPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl leading-tight text-brown-900 sm:text-5xl">
            Escolhe a tua jornada
          </h1>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-brown-600">
            Qual destas descrições te chama mais?
          </p>
        </div>
      </section>

      {/* 2 opções principais */}
      <section className="bg-cream-dark px-6 pb-24">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* LIVRO */}
          <div className="overflow-hidden rounded-2xl border-2 border-brown-300 bg-white shadow-lg transition-all hover:border-brown-400 hover:shadow-xl">
            <div className="p-8 sm:p-10">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-brown-400">
                    Obra filosófica
                  </p>
                  <p className="mt-3 font-sans text-sm font-medium italic text-brown-500">
                    &ldquo;Quero compreender filosoficamente os véus que me escondem de mim mesma&rdquo;
                  </p>
                  <h2 className="mt-4 font-serif text-3xl text-brown-900">
                    Os 7 Véus do Despertar
                  </h2>
                  <p className="mt-2 text-brown-700">
                    Ensaio filosófico + Experiência contemplativa digital
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-brown-900">1.500 MZN</span>
                    <span className="text-brown-500">/ $23 USD</span>
                  </div>
                  <p className="mt-4 text-sm text-brown-600">
                    232 páginas sobre despertar de consciência, leitura contemplativa com pausas de respiração, práticas guiadas por véu, diário pessoal, síntese final.
                  </p>
                  <Link
                    href="/comprar/livro"
                    className="mt-6 inline-block rounded-lg bg-brown-700 px-8 py-3.5 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-brown-800"
                  >
                    Ver opções do Livro
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ESPELHOS */}
          <div className="overflow-hidden rounded-2xl border-2 border-sage/30 bg-white shadow-lg transition-all hover:border-sage hover:shadow-xl">
            <div className="p-8 sm:p-10">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-sage">
                    Colecção Espelhos
                  </p>
                  <p className="mt-3 font-sans text-sm font-medium italic text-brown-500">
                    &ldquo;Quero reconhecer-me em histórias de mulheres que vivem o que eu vivo&rdquo;
                  </p>
                  <h2 className="mt-4 font-serif text-3xl text-brown-900">
                    Espelhos
                  </h2>
                  <p className="mt-2 text-brown-700">
                    7 ficções de transformação (histórias onde te reconheces)
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-brown-900">1.885 MZN</span>
                    <span className="text-brown-500">/ $29 USD por Espelho</span>
                  </div>
                  <p className="mt-4 text-sm text-brown-600">
                    Cada Espelho inclui 7 capítulos de ficção, práticas de respiração,
                    diário de reflexão pessoal e acesso vitalício.
                  </p>
                  <p className="mt-2 text-sm text-brown-500">
                    Cada Espelho tem um Nó — a dimensão relacional da mesma história.
                    Desbloqueia ao completar o Espelho. Nó individual: $12 USD.
                  </p>
                  <p className="mt-2 text-xs italic text-brown-400">
                    Disponível agora: Espelho da Ilusão. Próximos mensalmente até Agosto de 2026.
                  </p>
                  <Link
                    href="/comprar/espelhos"
                    className="mt-6 inline-block rounded-lg bg-sage px-8 py-3.5 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
                  >
                    Ver Espelhos
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Já comprei o livro físico */}
          <div className="overflow-hidden rounded-2xl border-2 border-brown-700/30 bg-brown-700/5 shadow-md">
            <div className="p-8 sm:p-10 text-center">
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-brown-500">
                Já tens o livro?
              </p>
              <h2 className="mt-3 font-serif text-2xl text-brown-900">
                Comprei o livro físico e preciso do código
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-brown-600">
                Quem comprou o livro físico tem acesso digital incluído.
                Pede o teu código e recebes em até 24h.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/pedir-codigo"
                  className="inline-block rounded-lg bg-brown-700 px-8 py-3.5 font-sans text-sm font-medium uppercase tracking-wider text-cream transition-colors hover:bg-brown-800"
                >
                  Pedir código
                </Link>
                <Link
                  href="/registar-livro"
                  className="inline-block rounded-lg border-2 border-brown-700/30 bg-transparent px-8 py-3.5 font-sans text-sm font-medium uppercase tracking-wider text-brown-700 transition-all hover:border-brown-700 hover:bg-brown-700 hover:text-cream"
                >
                  Já tenho código
                </Link>
              </div>
            </div>
          </div>

          {/* Não sei qual escolher */}
          <div className="rounded-xl border border-brown-200 bg-white/50 p-6 text-center">
            <p className="font-sans text-sm font-medium text-brown-700">
              Não sabes qual escolher?
            </p>
            <p className="mt-2 text-sm text-brown-600">
              Faz o teste gratuito e descobre qual véu te chama mais
            </p>
            <Link
              href="/recursos/teste"
              className="mt-4 inline-block rounded-lg border-2 border-sage bg-transparent px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-wider text-sage transition-all hover:bg-sage hover:text-white"
            >
              Fazer teste grátis
            </Link>
          </div>
        </div>
      </section>

      {/* Comunidade incluída */}
      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-sage/20 bg-white p-8 sm:p-10">
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-sage">
              Incluído em todas as experiências
            </p>
            <h2 className="mt-3 font-serif text-2xl text-brown-900 sm:text-3xl">
              Ecos — a comunidade
            </h2>
            <p className="mt-4 leading-relaxed text-brown-600">
              Quem compra qualquer experiência acede à comunidade Ecos: reflexões anónimas,
              consciência colectiva, contemplação partilhada. Quatro espaços onde te
              reconheces nas palavras de outras mulheres que caminham o mesmo caminho.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { nome: "Ecos", desc: "Reflexões anónimas" },
                { nome: "Maré", desc: "Consciência colectiva" },
                { nome: "Círculo", desc: "Espelho partilhado" },
                { nome: "Fogueira", desc: "Contemplação silenciosa" },
              ].map((espaco) => (
                <div key={espaco.nome} className="flex items-start gap-2 text-sm text-brown-600">
                  <span className="mt-0.5 text-sage">~</span>
                  <span><strong className="text-brown-800">{espaco.nome}</strong> — {espaco.desc}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm italic text-brown-400">
              Porque transformação não acontece sozinha.
            </p>
          </div>
        </div>
      </section>

      {/* Dica final */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-xl italic leading-relaxed text-cream">
            Podes começar pelo livro e depois explorar os Espelhos que mais te chamarem
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-brown-200">
            Ou vice-versa. Não há ordem certa. Há apenas o teu caminho.
          </p>
        </div>
      </section>
    </>
  )
}
