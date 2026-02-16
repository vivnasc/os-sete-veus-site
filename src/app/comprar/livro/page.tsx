import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Livro "Os 7 Véus do Despertar"',
  description: 'Ensaio filosófico sobre despertar de consciência + experiência digital contemplativa',
}

export default function ComprarLivroPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-sm font-medium uppercase tracking-wider text-brown-500">
            Livro Filosófico
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-brown-900 sm:text-5xl">
            📖 Os 7 Véus do Despertar
          </h1>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-brown-600">
            Ensaio filosófico sobre despertar de consciência
          </p>
          <p className="mx-auto mt-4 text-sm text-brown-500">
            232 páginas | 7 véus: <strong>Permanência</strong>, <strong>Memória</strong>,{' '}
            <strong>Turbilhão</strong>, <strong>Esforço</strong>, <strong>Desolação</strong>,{' '}
            <strong>Horizonte</strong>, <strong>Dualidade</strong>
          </p>
        </div>
      </section>

      {/* O que está incluído */}
      <section className="bg-cream-dark px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-2xl text-brown-900">
            Experiência digital incluída
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <div className="text-2xl">✨</div>
              <p className="mt-2 text-sm font-medium text-brown-900">Leitura contemplativa</p>
              <p className="mt-1 text-xs text-brown-600">2 modos de leitura</p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <div className="text-2xl">🌬️</div>
              <p className="mt-2 text-sm font-medium text-brown-900">Pausas de respiração</p>
              <p className="mt-1 text-xs text-brown-600">Entre capítulos</p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <div className="text-2xl">🧘</div>
              <p className="mt-2 text-sm font-medium text-brown-900">Práticas guiadas</p>
              <p className="mt-1 text-xs text-brown-600">Por véu</p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <div className="text-2xl">📔</div>
              <p className="mt-2 text-sm font-medium text-brown-900">Reflexões pessoais</p>
              <p className="mt-1 text-xs text-brown-600">Diário</p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <div className="text-2xl">🪞</div>
              <p className="mt-2 text-sm font-medium text-brown-900">Espelho final</p>
              <p className="mt-1 text-xs text-brown-600">Síntese</p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <div className="text-2xl">♾️</div>
              <p className="mt-2 text-sm font-medium text-brown-900">Acesso vitalício</p>
              <p className="mt-1 text-xs text-brown-600">No site</p>
            </div>
          </div>
        </div>
      </section>

      {/* Como queres aceder? */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl text-brown-900">
            Como queres aceder?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-brown-600">
            Escolhe a opção que mais se adequa a ti
          </p>

          <div className="mt-12 space-y-8">
            {/* Já comprei físico */}
            <div className="overflow-hidden rounded-2xl border-2 border-green-200 bg-white shadow-md">
              <div className="bg-green-50 px-6 py-4">
                <h3 className="font-serif text-xl text-brown-900">
                  ✅ Já comprei o livro físico
                </h3>
              </div>
              <div className="p-6 sm:p-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-brown-700">
                      ✅ Tenho código de acesso
                    </p>
                    <p className="mt-1 text-xs text-brown-500">
                      Recebeste um código? Regista-o aqui para aceder à versão digital
                    </p>
                    <Link
                      href="/registar-livro"
                      className="mt-3 inline-block rounded-lg bg-sage px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
                    >
                      Registar grátis
                    </Link>
                  </div>
                  <div className="border-t border-brown-100 pt-4">
                    <p className="text-sm font-medium text-brown-700">
                      ⏳ Não tenho código
                    </p>
                    <p className="mt-1 text-xs text-brown-500">
                      Pede o teu código de acesso — enviamos em até 24h
                    </p>
                    <Link
                      href="/pedir-codigo"
                      className="mt-3 inline-block rounded-lg border-2 border-sage bg-transparent px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-wider text-sage transition-all hover:bg-sage hover:text-white"
                    >
                      Pedir código
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprar Livro Físico */}
            <div className="overflow-hidden rounded-2xl border-2 border-brown-300 bg-white shadow-md">
              <div className="bg-brown-50 px-6 py-4">
                <h3 className="font-serif text-xl text-brown-900">
                  📦 Comprar livro físico
                </h3>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <p className="text-brown-700">
                      Livro impresso + Acesso digital incluído
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-brown-600">
                      <li className="flex items-start gap-2">
                        <span className="text-brown-500">📖</span>
                        <span>Edição física de alta qualidade</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brown-500">💻</span>
                        <span>Versão digital incluída (mesmo livro)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brown-500">🇲🇿</span>
                        <span>Entrega em Moçambique</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brown-500">📧</span>
                        <span>Recebes código por email após pagamento</span>
                      </li>
                    </ul>
                    <div className="mt-6 rounded-lg bg-brown-100 p-4">
                      <p className="text-sm font-semibold text-brown-700">Preço:</p>
                      <p className="mt-1 font-serif text-3xl font-bold text-brown-900">
                        1.500 MZN
                      </p>
                    </div>
                    <a
                      href="https://wa.me/258845243875?text=Olá! Quero encomendar o livro físico Os 7 Véus do Despertar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg border-2 border-[#25D366] bg-[#25D366] px-6 py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#1ea952]"
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

            {/* Comprar Digital */}
            <div className="overflow-hidden rounded-2xl border-2 border-sage/30 bg-white shadow-md">
              <div className="bg-sage/10 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl text-brown-900">
                    💻 Comprar livro digital
                  </h3>
                  <span className="rounded-full bg-sage px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-white">
                    Imediato
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <p className="text-brown-700">
                      Acesso digital imediato à experiência completa
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-brown-600">
                      <li className="flex items-start gap-2">
                        <span className="text-sage">✓</span>
                        <span>Acesso digital imediato</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage">✓</span>
                        <span>Disponível mundialmente</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage">✓</span>
                        <span>Código enviado por email</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage">✓</span>
                        <span>Experiência completa no site</span>
                      </li>
                    </ul>
                    <div className="mt-6 rounded-lg bg-sage/10 p-4">
                      <p className="text-sm font-semibold text-sage-dark">Preço:</p>
                      <p className="mt-1 flex items-baseline gap-3">
                        <span className="font-serif text-3xl font-bold text-brown-900">
                          1.500 MZN
                        </span>
                        <span className="text-brown-600">/ $23 USD</span>
                      </p>
                    </div>
                    <Link
                      href="/checkout/livro-digital"
                      className="mt-6 block w-full rounded-lg bg-sage px-6 py-3.5 text-center font-sans text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-sage-dark hover:shadow-lg"
                    >
                      Comprar versão digital
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Espelhos */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-xl italic leading-relaxed text-cream">
            Conhece também a Colecção Espelhos
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-brown-200">
            Ficções de transformação onde te reconheces nas histórias
          </p>
          <Link
            href="/comprar/espelhos"
            className="mt-6 inline-block rounded-lg border-2 border-cream bg-transparent px-8 py-3.5 font-sans text-sm font-medium uppercase tracking-wider text-cream transition-all hover:bg-cream hover:text-brown-900"
          >
            Ver Colecção Espelhos
          </Link>
        </div>
      </section>
    </>
  )
}
