import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Livro "Os 7 Véus do Despertar" — Vivianne dos Santos',
  description: 'Ensaio filosófico sobre despertar de consciência. 232 páginas. Livro físico + experiência digital contemplativa incluída.',
}

export default function ComprarLivroPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brown-900 via-brown-800 to-brown-900 px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-4xl">
          <div className="items-center gap-12 md:flex">
            <div className="shrink-0 text-center">
              <Image
                src="/images/mandala-7veus.png"
                alt="Os 7 Véus do Despertar — mandala"
                width={220}
                height={220}
                className="mx-auto rounded-full shadow-2xl"
                priority
              />
            </div>
            <div className="mt-8 text-center md:mt-0 md:text-left">
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#c9b896]">
                Ensaio Filosófico
              </p>
              <h1 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl">
                Os 7 Véus do Despertar
              </h1>
              <div className="mx-auto mt-4 h-px w-16 bg-[#c9b896]/40 md:mx-0" />
              <p className="mx-auto mt-6 max-w-xl font-serif text-lg italic leading-relaxed text-brown-200 md:mx-0">
                Uma cartografia interior para quem quer acordar.
              </p>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-brown-400 md:mx-0">
                232 páginas sobre os sete véus que nos escondem de nós mesmas:
                Permanência, Memória, Turbilhão, Esforço, Desolação, Horizonte e Dualidade.
                Não é ficção. Não é autoajuda. É filosofia viva.
              </p>
              <p className="mt-6 text-sm text-brown-300">
                Por <strong className="text-cream">Vivianne dos Santos</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O que torna este livro diferente */}
      <section className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-center font-sans text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-[#c9b896]">
            Mais do que um livro
          </p>
          <h2 className="mt-3 text-center font-serif text-2xl text-brown-900 sm:text-3xl">
            Experiência Digital Contemplativa
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-brown-500">
            O livro abre-se numa plataforma digital pensada para a tua jornada interior.
            Não é um PDF. É uma experiência de leitura que te acompanha.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Leitura Contemplativa', desc: 'Modo claro e escuro. Ao teu ritmo. Cada véu é uma paragem.', color: '#c9b896' },
              { title: 'Pausas de Respiração', desc: 'Entre cada capítulo, um convite a parar. O corpo também precisa de processar.', color: '#7a8c6e' },
              { title: 'Práticas Guiadas', desc: 'Exercícios de reflexão concebidos especificamente para cada véu.', color: '#b07a7a' },
              { title: 'Diário de Reflexão', desc: 'Perguntas que ninguém te fez. As tuas respostas, guardadas para sempre.', color: '#baaacc' },
              { title: 'Espelho Final', desc: 'Tudo o que escreveste ao longo da leitura, reunido. A tua síntese pessoal.', color: '#ab9375' },
              { title: 'Acesso Vitalício', desc: 'A experiência digital fica tua para sempre. Relê quando quiseres.', color: '#8aaaca' },
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
                    ~
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-base text-brown-900">{item.title}</h3>
                <p className="mt-1.5 text-[0.8rem] leading-relaxed text-brown-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como queres aceder? — 3 opções claras */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-center font-sans text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-[#c9b896]">
            Escolhe o teu caminho
          </p>
          <h2 className="mt-3 text-center font-serif text-3xl text-brown-900">
            Como queres aceder?
          </h2>

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
                <p className="text-sm leading-relaxed text-brown-600">
                  Quem comprou o livro físico tem acesso digital incluído. Só precisas de registar o código.
                </p>
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-brown-800">
                      Tenho código de acesso
                    </p>
                    <Link
                      href="/registar-livro"
                      className="mt-3 inline-block rounded-lg bg-sage px-5 py-2.5 font-sans text-[0.75rem] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
                    >
                      Registar Grátis
                    </Link>
                  </div>
                  <div className="border-t border-brown-100 pt-4">
                    <p className="text-sm font-medium text-brown-800">
                      Não tenho código
                    </p>
                    <p className="mt-1 text-xs text-brown-500">
                      Enviamos em até 24h
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
                <p className="text-sm leading-relaxed text-brown-600">
                  Edição impressa de alta qualidade, com acesso digital incluído.
                  Entrega em todo Moçambique.
                </p>
                <ul className="mt-4 space-y-2.5 text-[0.8rem] text-brown-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 font-serif text-sm text-[#c9b896]">~</span>
                    <span>232 páginas, edição cuidada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 font-serif text-sm text-[#c9b896]">~</span>
                    <span>Versão digital incluída</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 font-serif text-sm text-[#c9b896]">~</span>
                    <span>Comunidade Ecos incluída</span>
                  </li>
                </ul>
                <div className="mt-6 rounded-xl bg-[#c9b896]/10 p-4 text-center">
                  <p className="font-serif text-2xl font-bold text-brown-900">
                    1.500 MZN
                  </p>
                  <p className="mt-1 text-xs text-brown-500">&asymp; $23 USD</p>
                </div>
                <a
                  href="https://wa.me/258845243875?text=Olá! Quero encomendar o livro físico Os 7 Véus do Despertar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-sans text-[0.75rem] font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#1ea952]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Encomendar via WhatsApp
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
                <p className="text-sm leading-relaxed text-brown-600">
                  Acesso digital imediato a toda a experiência contemplativa.
                  Disponível em qualquer parte do mundo.
                </p>
                <ul className="mt-4 space-y-2.5 text-[0.8rem] text-brown-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-sage">~</span>
                    <span>Começa a ler em minutos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-sage">~</span>
                    <span>Experiência completa no site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-sage">~</span>
                    <span>Comunidade Ecos incluída</span>
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
                  href="https://wa.me/258845243875?text=Olá! Quero comprar a versão digital do livro Os 7 Véus do Despertar"
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

      {/* Diferença entre Livro e Espelhos */}
      <section className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-brown-200 bg-white p-8">
            <h2 className="text-center font-serif text-xl text-brown-900">
              Livro Filosófico vs. Espelhos -- qual é a diferença?
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl bg-brown-50 p-5">
                <h3 className="font-serif text-base font-semibold text-brown-900">Este livro</h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-600">
                  Ensaio filosófico. Reflexão sobre os 7 véus que nos escondem de nós mesmas.
                  Para quem quer compreender <em>intelectualmente</em> o que são os véus
                  e como nos afectam.
                </p>
              </div>
              <div className="rounded-xl bg-sage/5 p-5">
                <h3 className="font-serif text-base font-semibold text-brown-900">Colecção Espelhos</h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-600">
                  7 ficções de transformação. Histórias de mulheres reais (ficcionais)
                  que vivem cada véu. Para quem quer <em>sentir</em> o véu na pele
                  e reconhecer-se na história.
                </p>
              </div>
            </div>
            <p className="mt-5 text-center text-sm text-brown-500">
              São complementares, não concorrentes. Podes começar por qualquer um.
            </p>
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
            Ficções onde te reconheces. Sete histórias de mulheres que acordam --
            com leitura sequencial, diário pessoal e comunidade.
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
