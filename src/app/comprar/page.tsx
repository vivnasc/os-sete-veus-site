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
                  <p className="mt-2 text-sm text-brown-600">
                    Cada Espelho tem um <strong>Nó</strong> — a dimensão relacional da mesma história.
                    Incluído nos pacotes de 3 e na Jornada Completa.
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

          {/* NOS — dimensão relacional */}
          <div className="overflow-hidden rounded-2xl border-2 border-brown-200 bg-white shadow-lg transition-all hover:border-brown-300 hover:shadow-xl">
            <div className="p-8 sm:p-10">
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-brown-400">
                ~ A segunda dimensao dos Espelhos
              </p>
              <h2 className="mt-3 font-serif text-3xl text-brown-900">
                NOS
              </h2>
              <p className="mt-2 font-serif italic text-brown-700">
                Os Espelhos mostram-te o véu que usas. Os Nós mostram-te o que esse véu fez entre ti e outra pessoa.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-brown-600">
                São histórias relacionais — mãe e filha, casal, amigas — que só se abrem
                depois de viveres o Espelho correspondente. Não é upsell. É continuação emocional.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 rounded-lg bg-brown-50 p-4">
                  <span className="mt-0.5 font-serif text-lg text-brown-400">~</span>
                  <div>
                    <p className="font-serif text-base font-medium text-brown-900">O No da Heranca</p>
                    <p className="text-sm italic text-brown-500">O que a mae guardou, a filha carregou</p>
                    <p className="mt-1 text-[0.7rem] text-sage">Disponivel agora (requer Espelho da Ilusao completo)</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {[
                    "No do Silencio",
                    "No da Divida",
                    "No do Reflexo",
                    "No da Corda",
                    "No da Fome",
                    "No da Raiz",
                  ].map((no) => (
                    <div key={no} className="rounded-lg border border-brown-100 bg-brown-50/50 px-3 py-2 text-center">
                      <p className="font-serif text-xs text-brown-600">{no}</p>
                      <p className="text-[0.55rem] italic text-brown-300">Em breve</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-sage/20 bg-sage/5 p-4">
                <p className="text-sm text-brown-700">
                  <strong>No individual:</strong> 780 MZN / $12 USD
                </p>
                <p className="mt-1 text-sm text-sage font-medium">
                  Incluido gratuitamente no Pack de 3 Espelhos e na Jornada Completa
                </p>
              </div>

              <Link
                href="/comprar/espelhos"
                className="mt-6 inline-block rounded-lg border-2 border-brown-300 bg-transparent px-8 py-3.5 font-sans text-sm font-medium uppercase tracking-wider text-brown-700 transition-all hover:bg-brown-700 hover:text-white"
              >
                Ver pacotes com Nos incluido
              </Link>
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

      {/* Comunidade incluída */}
      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-sage/20 bg-white p-8 sm:p-10">
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-sage">
              Incluido em todas as experiencias
            </p>
            <h2 className="mt-3 font-serif text-2xl text-brown-900 sm:text-3xl">
              Ecos — a comunidade
            </h2>
            <p className="mt-4 leading-relaxed text-brown-600">
              Quem compra qualquer experiencia acede a comunidade Ecos: reflexoes anonimas,
              consciencia colectiva, contemplacao partilhada. Quatro espacos onde te
              reconheces nas palavras de outras mulheres que caminham o mesmo caminho.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { nome: "Ecos", desc: "Reflexoes anonimas" },
                { nome: "Mare", desc: "Consciencia colectiva" },
                { nome: "Circulo", desc: "Espelho partilhado" },
                { nome: "Fogueira", desc: "Contemplacao silenciosa" },
              ].map((espaco) => (
                <div key={espaco.nome} className="flex items-start gap-2 text-sm text-brown-600">
                  <span className="mt-0.5 text-sage">~</span>
                  <span><strong className="text-brown-800">{espaco.nome}</strong> — {espaco.desc}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm italic text-brown-400">
              Porque transformacao nao acontece sozinha.
            </p>
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
