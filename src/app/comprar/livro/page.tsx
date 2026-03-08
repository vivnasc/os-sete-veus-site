import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Livro "Os 7 Véus do Despertar"',
  description: 'Ensaio filosófico sobre despertar de consciência + experiência digital contemplativa',
}

export default function ComprarLivroPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brown-900 via-brown-800 to-brown-900 px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#c9b896]">
            Obra Filosófica
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-tight text-cream sm:text-5xl">
            Os 7 Véus do Despertar
          </h1>
          <div className="mx-auto mt-4 h-px w-16 bg-[#c9b896]/40" />
          <p className="mx-auto mt-6 max-w-xl font-serif text-lg italic leading-relaxed text-brown-200">
            Ensaio filosófico sobre despertar de consciência
          </p>
          <p className="mx-auto mt-5 text-sm text-brown-400">
            232 páginas &middot; 7 véus: <strong className="text-brown-300">Permanência</strong>, <strong className="text-brown-300">Memória</strong>,{' '}
            <strong className="text-brown-300">Turbilhão</strong>, <strong className="text-brown-300">Esforço</strong>, <strong className="text-brown-300">Desolação</strong>,{' '}
            <strong className="text-brown-300">Horizonte</strong>, <strong className="text-brown-300">Dualidade</strong>
          </p>
        </div>
      </section>

      {/* Experiência digital incluída */}
      <section className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-center font-sans text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-[#c9b896]">
            Incluído com o livro
          </p>
          <h2 className="mt-3 text-center font-serif text-2xl text-brown-900">
            Experiência Digital Contemplativa
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-brown-500">
            O livro abre-se numa plataforma pensada para a tua jornada interior.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '~', title: 'Leitura Contemplativa', desc: 'Dois modos de leitura: claro e escuro, ao teu ritmo', color: '#c9b896' },
              { icon: '~', title: 'Pausas de Respiração', desc: 'Entre cada capítulo, um convite a parar e respirar', color: '#7a8c6e' },
              { icon: '~', title: 'Práticas Guiadas', desc: 'Exercícios de reflexão pensados para cada véu', color: '#b07a7a' },
              { icon: '~', title: 'Diário de Reflexão', desc: 'As tuas palavras, guardadas. Um espelho em texto.', color: '#baaacc' },
              { icon: '~', title: 'Espelho Final', desc: 'Tudo o que escreveste, reunido. A tua síntese pessoal.', color: '#ab9375' },
              { icon: '~', title: 'Acesso Vitalício', desc: 'A experiência fica tua, para sempre.', color: '#8aaaca' },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-brown-100 bg-white p-6 transition-all hover:shadow-md"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <span className="font-serif text-xl" style={{ color: item.color }}>
                    {item.icon}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-base text-brown-900">{item.title}</h3>
                <p className="mt-1.5 text-[0.8rem] leading-relaxed text-brown-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como queres aceder? */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-center font-sans text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-[#c9b896]">
            Três Caminhos
          </p>
          <h2 className="mt-3 text-center font-serif text-3xl text-brown-900">
            Como queres aceder?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-brown-500">
            Escolhe a opção que mais se adequa a ti
          </p>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {/* Já comprei físico */}
            <div className="overflow-hidden rounded-2xl border-2 border-sage/40 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-sage/10 px-6 py-5">
                <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-sage">
                  Gratuito
                </p>
                <h3 className="mt-1 font-serif text-lg text-brown-900">
                  Já comprei o livro físico
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-medium text-brown-800">
                      Tenho código de acesso
                    </p>
                    <p className="mt-1 text-[0.8rem] text-brown-500">
                      Regista-o aqui para aceder à versão digital
                    </p>
                    <Link
                      href="/registar-livro"
                      className="mt-3 inline-block rounded-lg bg-sage px-5 py-2.5 font-sans text-[0.75rem] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
                    >
                      Registar Grátis
                    </Link>
                  </div>
                  <div className="border-t border-brown-100 pt-5">
                    <p className="text-sm font-medium text-brown-800">
                      Não tenho código
                    </p>
                    <p className="mt-1 text-[0.8rem] text-brown-500">
                      Pede o teu código de acesso — enviamos em até 24h
                    </p>
                    <Link
                      href="/pedir-codigo"
                      className="mt-3 inline-block rounded-lg border-2 border-sage bg-transparent px-5 py-2 font-sans text-[0.75rem] font-semibold uppercase tracking-wider text-sage transition-all hover:bg-sage hover:text-white"
                    >
                      Pedir Código
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprar Livro Físico */}
            <div className="overflow-hidden rounded-2xl border-2 border-[#c9b896]/40 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-[#c9b896]/10 px-6 py-5">
                <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-[#c9b896]">
                  Livro + Digital
                </p>
                <h3 className="mt-1 font-serif text-lg text-brown-900">
                  Comprar livro físico
                </h3>
              </div>
              <div className="p-6">
                <p className="text-[0.8rem] text-brown-600">
                  Livro impresso + acesso digital incluído
                </p>
                <ul className="mt-4 space-y-2.5 text-[0.8rem] text-brown-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 font-serif text-sm text-[#c9b896]">~</span>
                    <span>Edição física de alta qualidade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 font-serif text-sm text-[#c9b896]">~</span>
                    <span>Versão digital incluída</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 font-serif text-sm text-[#c9b896]">~</span>
                    <span>Entrega em Moçambique</span>
                  </li>
                </ul>
                <div className="mt-6 rounded-xl bg-[#c9b896]/10 p-4 text-center">
                  <p className="font-serif text-2xl font-bold text-brown-900">
                    1.500 MZN
                  </p>
                </div>
                <a
                  href="https://t.me/viviannedossantos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0088cc] px-5 py-3 font-sans text-[0.75rem] font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#006daa]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Encomendar via Telegram
                </a>
              </div>
            </div>

            {/* Comprar Digital */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-brown-900 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-brown-900 px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-[#c9b896]">
                      Acesso Imediato
                    </p>
                    <h3 className="mt-1 font-serif text-lg text-cream">
                      Comprar livro digital
                    </h3>
                  </div>
                  <span className="rounded-full bg-[#c9b896] px-3 py-1 font-sans text-[0.55rem] font-bold uppercase tracking-wider text-brown-900">
                    Imediato
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[0.8rem] text-brown-600">
                  Acesso digital imediato à experiência completa
                </p>
                <ul className="mt-4 space-y-2.5 text-[0.8rem] text-brown-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-sage">~</span>
                    <span>Acesso digital imediato</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-sage">~</span>
                    <span>Disponível mundialmente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-sage">~</span>
                    <span>Experiência completa no site</span>
                  </li>
                </ul>
                <div className="mt-6 rounded-xl bg-brown-900 p-4 text-center">
                  <p className="flex items-baseline justify-center gap-2">
                    <span className="font-serif text-2xl font-bold text-cream">
                      1.500 MZN
                    </span>
                    <span className="text-sm text-brown-400">/ $23 USD</span>
                  </p>
                </div>
                <a
                  href="https://t.me/viviannedossantos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 block w-full rounded-xl bg-[#c9b896] px-5 py-3 text-center font-sans text-[0.75rem] font-bold uppercase tracking-wider text-brown-900 shadow-sm transition-all hover:bg-[#b8a785]"
                >
                  Comprar versão digital
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Espelhos */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 h-px w-12 bg-[#c9b896]/30" />
          <p className="font-serif text-xl italic leading-relaxed text-cream">
            Conhece também a Colecção Espelhos
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-brown-300">
            Ficções de transformação onde te reconheces nas histórias.
            Sete narrativas imersivas com leitura sequencial, diário e comunidade.
          </p>
          <Link
            href="/comprar/espelhos"
            className="mt-8 inline-block rounded-lg border-2 border-[#c9b896] bg-transparent px-8 py-3.5 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-[#c9b896] transition-all hover:bg-[#c9b896] hover:text-brown-900"
          >
            Ver Colecção Espelhos
          </Link>
        </div>
      </section>
    </>
  )
}
