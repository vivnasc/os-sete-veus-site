'use client'

import { use, useState } from 'react'
import { motion } from 'framer-motion'
import { getNosBook, NOS_PRICING } from '@/data/nos-collection'
import { getExperience } from '@/data/experiences'
import Link from 'next/link'

export default function ComprarNoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [moeda, setMoeda] = useState<'MZN' | 'USD'>('MZN')

  const nosBook = getNosBook(slug)
  const espelho = nosBook ? getExperience(nosBook.espelhoSlug) : null

  if (!nosBook) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="font-serif text-lg text-brown-600">Nó não encontrado.</p>
          <Link href="/comprar/espelhos" className="mt-4 inline-block text-sage hover:underline">
            Ver Espelhos
          </Link>
        </div>
      </div>
    )
  }

  const handleComprar = () => {
    const preco = moeda === 'MZN' ? `${nosBook.priceMT} MZN` : `$${nosBook.priceUSD} USD`
    alert(`Comprar: ${nosBook.title}\nPreco: ${preco}\n\nSistema de pagamento sera integrado em breve!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-stone-100">
      {/* Header */}
      <div className="py-16 text-white" style={{ background: `linear-gradient(to bottom, ${nosBook.colorBg}, ${nosBook.colorBg}ee)` }}>
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em]" style={{ color: nosBook.color }}>
              Colecção Nós · Ficção Relacional
            </p>
            <h1 className="mt-3 font-serif text-4xl text-cream sm:text-5xl">
              {nosBook.title}
            </h1>
            <p className="mt-3 font-serif text-lg italic text-brown-300">
              {nosBook.subtitle}
            </p>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-brown-200">
              {nosBook.description}
            </p>
          </motion.div>

          {/* Toggle moeda */}
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
                USD (Dolar)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Card de compra */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border-2 bg-white p-8 shadow-lg"
          style={{ borderColor: nosBook.color + '40' }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full font-serif text-xl" style={{ backgroundColor: nosBook.color + '15', color: nosBook.color }}>
              &#8734;
            </span>
            <div>
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em]" style={{ color: nosBook.color }}>
                No {nosBook.number} de 7
              </p>
              <h2 className="font-serif text-2xl text-brown-900">{nosBook.title}</h2>
            </div>
          </div>

          <p className="mt-1 font-serif text-sm italic text-brown-500">
            {nosBook.characters}
          </p>

          <ul className="mt-6 space-y-2">
            {[
              'Continuacao emocional do Espelho',
              'Historia relacional completa',
              'Reflexoes e praticas incluidas',
              'Acesso vitalício no site',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-brown-600">
                <span style={{ color: nosBook.color }}>~</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Requisito */}
          <div className="mt-6 rounded-lg border border-brown-100 bg-brown-50/50 px-4 py-3">
            <p className="font-sans text-[0.55rem] uppercase tracking-[0.2em] text-brown-400">
              Requisito
            </p>
            <p className="mt-1 text-sm text-brown-600">
              Para ler este No, precisas de completar{' '}
              {espelho ? (
                <Link href={`/comprar/espelhos`} className="underline hover:text-brown-800" style={{ color: nosBook.color }}>
                  {espelho.title}
                </Link>
              ) : (
                'o Espelho correspondente'
              )}
            </p>
          </div>

          {/* Preco */}
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-brown-900">
              {moeda === 'MZN' ? `${nosBook.priceMT.toLocaleString()} MZN` : `$${nosBook.priceUSD} USD`}
            </span>
            <span className="text-sm text-brown-400">
              {moeda === 'MZN' ? `/ $${nosBook.priceUSD} USD` : `/ ${nosBook.priceMT.toLocaleString()} MZN`}
            </span>
          </div>

          <button
            onClick={handleComprar}
            className="mt-5 w-full rounded-lg py-3.5 font-sans text-sm font-medium uppercase tracking-wider text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: nosBook.color }}
          >
            Comprar {nosBook.title}
          </button>
        </motion.div>

        {/* Alternativa: Pack/Jornada */}
        <div className="mt-8 rounded-2xl border border-sage/20 bg-sage/5 p-6 text-center">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-sage">
            Alternativa com mais valor
          </p>
          <h3 className="mt-2 font-serif text-xl text-brown-900">
            Nós incluídos no Pack ou Jornada
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-brown-600">
            O Pack 3 Espelhos ({moeda === 'MZN' ? `${(69 * 65).toLocaleString()} MZN` : '$69 USD'}) inclui 3 Nós gratuitamente.
            A Jornada Completa ({moeda === 'MZN' ? `${(149 * 65).toLocaleString()} MZN` : '$149 USD'}) inclui todos os 7 Nos.
          </p>
          <Link
            href="/comprar/espelhos"
            className="mt-5 inline-block rounded-lg border-2 border-sage bg-transparent px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-wider text-sage transition-all hover:bg-sage hover:text-white"
          >
            Ver Packs de Espelhos
          </Link>
        </div>

        {/* Voltar */}
        <div className="mt-8 text-center">
          <Link
            href="/comprar/espelhos"
            className="font-sans text-sm text-brown-400 hover:text-brown-600"
          >
            &larr; Voltar à Colecção Espelhos
          </Link>
        </div>
      </div>
    </div>
  )
}
