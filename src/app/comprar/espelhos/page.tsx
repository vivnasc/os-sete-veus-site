'use client'

import { motion } from 'framer-motion'

import { useState } from 'react'

export default function ComprarPage() {
  const [moeda, setMoeda] = useState<'MZN' | 'USD'>('MZN')

  const handleComprar = (nome: string, precoMzn: number, precoUsd: number) => {
    alert(`Comprar: ${nome}\nPreço: ${moeda === 'MZN' ? `${precoMzn} MZN` : `$${precoUsd} USD`}\n\nSistema de pagamento será integrado em breve!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-stone-100">
      {/* Header */}
      <div className="bg-gradient-to-b from-brown-800 to-brown-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-brown-300">
              Colecção Espelhos
            </p>
            <h1 className="mt-3 font-serif text-4xl text-cream sm:text-5xl">
              Ficções de transformação
            </h1>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-brown-200">
              Sete histórias onde te reconheces. Cada Espelho inclui 7 capítulos,
              práticas de respiração, diário pessoal e acesso vitalício.
            </p>
          </motion.div>

          {/* Toggle de Moeda */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-lg bg-white/10 p-1">
              <button
                onClick={() => setMoeda('MZN')}
                className={`rounded-md px-6 py-2 transition-all ${
                  moeda === 'MZN'
                    ? 'bg-white font-bold text-brown-900'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                MZN (Metical)
              </button>
              <button
                onClick={() => setMoeda('USD')}
                className={`rounded-md px-6 py-2 transition-all ${
                  moeda === 'USD'
                    ? 'bg-white font-bold text-brown-900'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                USD (Dólar)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Disponível agora */}
        <section className="mb-16">
          <h2 className="text-center font-serif text-2xl text-brown-900 sm:text-3xl">
            Disponível agora
          </h2>
          <div className="mx-auto mt-10 max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border-2 border-sage/30 bg-white p-8 shadow-lg"
            >
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-sage">
                Espelho 1 de 7
              </p>
              <h3 className="mt-2 font-serif text-2xl text-brown-900">
                Espelho da Ilusão
              </h3>
              <p className="mt-1 font-serif text-sm italic text-brown-500">
                Quando a vida que tens não foi a que escolheste
              </p>
              <p className="mt-4 text-sm leading-relaxed text-brown-600">
                Sara tem tudo no sítio. Emprego, casa, relação. E uma pergunta que
                não a larga: &ldquo;Isto é mesmo meu?&rdquo;
              </p>
              <ul className="mt-5 space-y-2">
                {[
                  '7 capítulos de ficção',
                  'Práticas de respiração guiada',
                  'Diário de reflexão pessoal',
                  'Acesso vitalício no site',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brown-600">
                    <span className="mt-0.5 text-sage">~</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Nó incluído */}
              <div className="mt-5 rounded-lg border border-[#c9956a]/20 bg-[#c9956a]/5 px-4 py-3">
                <p className="font-sans text-[0.55rem] uppercase tracking-[0.2em] text-[#c9956a]">
                  Nó incluído
                </p>
                <p className="mt-0.5 font-serif text-sm text-brown-700">O Nó da Herança</p>
                <p className="text-xs italic text-brown-400">
                  Desbloqueia ao completar o Espelho
                </p>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-brown-900">
                  {moeda === 'MZN' ? '1.885 MZN' : '$29 USD'}
                </span>
                <span className="text-sm text-brown-400">
                  {moeda === 'MZN' ? '/ $29 USD' : '/ 1.885 MZN'}
                </span>
              </div>

              <button
                onClick={() => handleComprar('Espelho da Ilusão', 1885, 29)}
                className="mt-5 w-full rounded-lg bg-sage py-3.5 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
              >
                Comprar
              </button>
            </motion.div>
          </div>
        </section>

        {/* Em preparação */}
        <section className="mb-16">
          <h2 className="text-center font-serif text-2xl text-brown-900 sm:text-3xl">
            Em preparação
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-sm text-brown-500">
            Os próximos Espelhos serão publicados ao longo de 2026
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { num: 2, nome: 'Espelho do Medo', sub: 'Quando o medo decide por ti', data: 'Março 2026' },
              { num: 3, nome: 'Espelho da Culpa', sub: 'Quando te castigas por querer mais', data: 'Abril 2026' },
              { num: 4, nome: 'Espelho da Identidade', sub: 'Quando já não sabes quem és sem os outros', data: 'Junho 2026' },
              { num: 5, nome: 'Espelho do Controlo', sub: 'Quando segurar é a única forma que conheces', data: 'Agosto 2026' },
              { num: 6, nome: 'Espelho do Desejo', sub: 'Quando desejas tudo menos o que precisas', data: 'Outubro 2026' },
              { num: 7, nome: 'Espelho da Separação', sub: 'Quando te afastas de ti mesma para pertencer', data: 'Dezembro 2026' },
            ].map((espelho) => (
              <motion.div
                key={espelho.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-brown-200 bg-white p-6"
              >
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brown-400">
                  Espelho {espelho.num} de 7
                </p>
                <h3 className="mt-2 font-serif text-lg text-brown-900">{espelho.nome}</h3>
                <p className="mt-1 text-sm italic text-brown-400">{espelho.sub}</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-serif text-xl font-bold text-brown-900">
                    {moeda === 'MZN' ? '1.885 MZN' : '$29 USD'}
                  </span>
                </div>
                <p className="mt-3 text-xs text-brown-400">{espelho.data}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Nós — informação */}
        <section className="mb-16">
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#c9a87c]/20 bg-[#c9a87c]/[0.04] px-8 py-8 text-center">
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-[#c9a87c]">
              Ficção relacional
            </p>
            <h2 className="mt-3 font-serif text-2xl text-brown-900">
              Cada Espelho tem um Nó
            </h2>
            <p className="mx-auto mt-4 max-w-md font-serif text-sm leading-relaxed text-brown-600">
              Os Espelhos mostram-te o véu que usas.
              Os Nós mostram-te o que esse véu fez entre ti e outra pessoa.
            </p>
            <p className="mx-auto mt-4 max-w-md text-sm text-brown-500">
              Ao completar um Espelho, o seu Nó desbloqueia-se como continuação natural da história.
              Nó individual: {moeda === 'MZN' ? '780 MZN' : '$12 USD'}.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-serif text-2xl text-brown-900 sm:text-3xl">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-bold text-brown-900">Como recebo acesso após comprar?</h3>
              <p className="mt-2 text-sm text-brown-600">
                Após o pagamento, receberás um código de acesso por email. Usa esse código na página de registo para criar a tua conta e aceder imediatamente.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-bold text-brown-900">O acesso é vitalício?</h3>
              <p className="mt-2 text-sm text-brown-600">
                Sim. Uma vez comprado, tens acesso para sempre. Podes ler ao teu ritmo, quantas vezes quiseres.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-bold text-brown-900">O que são os Nós?</h3>
              <p className="mt-2 text-sm text-brown-600">
                Os Espelhos mostram-te o véu que usas. Os Nós mostram-te o que esse véu fez entre ti e outra pessoa. Ao completar um Espelho, o Nó correspondente desbloqueia-se como continuação natural.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-bold text-brown-900">Haverá pacotes quando houver mais Espelhos?</h3>
              <p className="mt-2 text-sm text-brown-600">
                Sim. À medida que mais Espelhos forem publicados, disponibilizaremos pacotes com desconto. Por agora, começa pelo Espelho da Ilusão.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
