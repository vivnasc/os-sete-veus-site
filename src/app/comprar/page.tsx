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
                <div className="text-5xl">📖</div>
                <div className="flex-1">
                  <p className="font-sans text-sm font-medium italic text-brown-500">
                    &ldquo;Quero compreender <strong>FILOSOFICAMENTE</strong> os véus que me escondem de mim mesma&rdquo;
                  </p>
                  <h2 className="mt-4 font-serif text-3xl text-brown-900">
                    LIVRO "Os 7 Véus do Despertar"
                  </h2>
                  <p className="mt-2 text-brown-700">
                    Ensaio filosófico + Experiência contemplativa digital
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-brown-900">1.500 MZN</span>
                    <span className="text-brown-500">/ $23 USD</span>
                  </div>
                  <p className="mt-4 text-sm text-brown-600">
                    <strong>O que inclui:</strong> 232 páginas sobre despertar de consciência, leitura contemplativa com pausas de respiração, práticas guiadas por véu, diário pessoal, síntese final (Espelho).
                  </p>
                  <p className="mt-2 text-sm italic text-brown-500">
                    Os 7 véus: Permanência, Memória, Turbilhão, Esforço, Desolação, Horizonte, Dualidade.
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
                <div className="text-5xl">🪞</div>
                <div className="flex-1">
                  <p className="font-sans text-sm font-medium italic text-brown-500">
                    &ldquo;Quero reconhecer-me em <strong>HISTÓRIAS</strong> de mulheres que vivem o que eu vivo&rdquo;
                  </p>
                  <h2 className="mt-4 font-serif text-3xl text-brown-900">
                    ESPELHOS
                  </h2>
                  <p className="mt-2 text-brown-700">
                    7 ficções de transformação (histórias onde te reconheces)
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-brown-600">Desde</span>
                    <span className="font-serif text-2xl font-bold text-brown-900">1.885 MZN</span>
                    <span className="text-brown-500">/ $29 USD</span>
                  </div>
                  <p className="mt-4 text-sm text-brown-600">
                    <strong>Cada Espelho inclui:</strong> História ficcional completa (7 capítulos), personagens com quem te identificas, práticas contextuais, diário pessoal, o teu Espelho pessoal (ferramenta de síntese).
                  </p>
                  <p className="mt-2 text-sm italic text-brown-500">
                    Os 7 Espelhos: Ilusão, Medo, Desejo, Culpa, Pressa, Comparação, Controlo.
                  </p>
                  <Link
                    href="/comprar/espelhos"
                    className="mt-6 inline-block rounded-lg bg-sage px-8 py-3.5 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
                  >
                    Ver Espelhos disponíveis
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Não sei qual escolher */}
          <div className="rounded-xl border border-brown-200 bg-white/50 p-6 text-center">
            <p className="font-sans text-sm font-medium text-brown-700">
              Não sabes qual escolher?
            </p>
            <p className="mt-2 text-sm text-brown-600">
              Faz o teste gratuito e descobre qual véu/espelho te chama mais
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

      {/* Dica final */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-xl italic leading-relaxed text-cream">
            💡 Podes começar pelo livro e depois explorar os Espelhos que mais te chamarem
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-brown-200">
            Ou vice-versa. Não há ordem certa. Há apenas o teu caminho.
          </p>
        </div>
      </section>
    </>
  )
}
