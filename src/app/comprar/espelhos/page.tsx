'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { experiences, PRICING } from '@/data/experiences'
import Image from 'next/image'
import { nosCollection, NOS_PRICING } from '@/data/nos-collection'
import type { Experience } from '@/data/experiences'

type PaymentMethod = 'mpesa' | 'bank_transfer' | 'paypal'

export default function ComprarPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [moeda, setMoeda] = useState<'MZN' | 'USD'>('MZN')
  const [purchasing, setPurchasing] = useState<Experience | null>(null)
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const available = experiences.filter((e) => e.status === 'available')
  const upcoming = experiences.filter((e) => e.status !== 'available')

  function handleComprar(exp: Experience) {
    setPurchasing(exp)
    setError('')
    if (user?.email) setEmail(user.email)
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  async function handlePayment() {
    if (!purchasing || !email || !paymentMethod) {
      setError('Preenche todos os campos obrigatórios')
      return
    }

    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone,
          access_type_code: purchasing.slug,
          payment_method: paymentMethod,
          amount: purchasing.priceMT,
          currency: 'MZN',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Erro ao criar pedido')
        setLoading(false)
        return
      }

      // Redirecionar para página de pagamento com dados do produto
      const params = new URLSearchParams({
        payment_id: data.payment_id,
        amount: String(purchasing.priceMT),
        product: purchasing.title,
      })
      router.push(`/pagamento/${paymentMethod}?${params.toString()}`)
    } catch {
      setError('Erro de conexão. Tenta novamente.')
      setLoading(false)
    }
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
          <div className={`mx-auto mt-10 ${available.length === 1 ? 'max-w-lg' : 'grid gap-6 sm:grid-cols-2'}`}>
            {available.map((exp) => {
              const no = nosCollection.find((n) => n.espelhoSlug === exp.slug)
              return (
                <motion.div
                  key={exp.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border-2 border-sage/30 bg-white p-8 shadow-lg"
                >
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-sage">
                    Espelho {exp.number} de 7
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-brown-900">
                    {exp.title.replace('O Espelho ', 'Espelho ')}
                  </h3>
                  <p className="mt-1 font-serif text-sm italic text-brown-500">
                    {exp.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-brown-600">
                    {exp.description}
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

                  {/* Nó correspondente */}
                  {no && (
                    <div className="mt-5 flex items-center gap-3 rounded-lg border border-[#c9956a]/20 bg-[#c9956a]/5 px-4 py-3">
                      <Image
                        src={no.image}
                        alt={no.title}
                        width={36}
                        height={54}
                        className="shrink-0 rounded shadow-sm"
                      />
                      <div>
                        <p className="font-sans text-[0.55rem] uppercase tracking-[0.2em] text-[#c9956a]">
                          Nó correspondente · {moeda === 'MZN' ? `${NOS_PRICING.individual.mt} MZN` : `$${NOS_PRICING.individual.usd}`}
                        </p>
                        <p className="mt-0.5 font-serif text-sm text-brown-700">{no.title}</p>
                        <p className="text-xs italic text-brown-400">
                          Disponível após completar o Espelho
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-brown-900">
                      {moeda === 'MZN' ? `${exp.priceMT.toLocaleString()} MZN` : `$${exp.priceUSD} USD`}
                    </span>
                    <span className="text-sm text-brown-400">
                      {moeda === 'MZN' ? `/ $${exp.priceUSD} USD` : `/ ${exp.priceMT.toLocaleString()} MZN`}
                    </span>
                  </div>

                  <button
                    onClick={() => handleComprar(exp)}
                    className={`mt-5 w-full rounded-lg py-3.5 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors ${
                      purchasing?.slug === exp.slug
                        ? 'bg-brown-900 hover:bg-brown-800'
                        : 'bg-sage hover:bg-sage-dark'
                    }`}
                  >
                    {purchasing?.slug === exp.slug ? 'Seleccionado — preenche abaixo' : 'Comprar'}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Em preparação */}
        {upcoming.length > 0 && (
          <section className="mb-16">
            <h2 className="text-center font-serif text-2xl text-brown-900 sm:text-3xl">
              Em preparação
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-sm text-brown-500">
              Os próximos Espelhos serão publicados mensalmente de Março a Agosto de 2026
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((exp) => (
                <motion.div
                  key={exp.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-brown-200 bg-white p-6"
                >
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brown-400">
                    Espelho {exp.number} de 7
                  </p>
                  <h3 className="mt-2 font-serif text-lg text-brown-900">
                    {exp.title.replace('O Espelho ', 'Espelho ')}
                  </h3>
                  <p className="mt-1 text-sm italic text-brown-400">{exp.subtitle}</p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-serif text-xl font-bold text-brown-900">
                      {moeda === 'MZN' ? `${exp.priceMT.toLocaleString()} MZN` : `$${exp.priceUSD} USD`}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-brown-400">{exp.launchLabel}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Packs — visivel quando houver 3+ espelhos disponíveis */}
        {available.length >= 3 && (
          <section className="mb-16">
            <h2 className="text-center font-serif text-2xl text-brown-900 sm:text-3xl">
              Packs com desconto
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-sm text-brown-500">
              Quanto mais espelhos, mais valor. Os Nós estão incluídos.
            </p>
            <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
              {/* Pack 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border-2 border-sage/30 bg-white p-8 shadow-lg"
              >
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-sage">
                  Pack 3 Espelhos
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-brown-900">
                    {moeda === 'MZN' ? `${PRICING.pack3.mt.toLocaleString()} MZN` : `$${PRICING.pack3.usd} USD`}
                  </span>
                  <span className="text-sm text-brown-400">
                    {PRICING.pack3Savings}% desconto
                  </span>
                </div>
                <ul className="mt-5 space-y-2">
                  {[
                    '3 Espelhos a tua escolha',
                    '3 Nós incluídos',
                    'Acesso vitalício',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brown-600">
                      <span className="mt-0.5 text-sage">~</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  disabled
                  className="mt-6 w-full rounded-lg bg-sage/50 py-3.5 font-sans text-sm font-medium uppercase tracking-wider text-white"
                >
                  Em breve
                </button>
              </motion.div>

              {/* Jornada Completa */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative rounded-2xl border-2 border-[#c9a87c]/40 bg-white p-8 shadow-lg"
              >
                <span className="absolute -top-3 right-6 rounded-full bg-[#c9a87c] px-3 py-1 font-sans text-[0.55rem] font-bold uppercase tracking-wider text-white">
                  Melhor valor
                </span>
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-[#c9a87c]">
                  Jornada Completa · 7 Espelhos
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-brown-900">
                    {moeda === 'MZN' ? `${PRICING.journey.mt.toLocaleString()} MZN` : `$${PRICING.journey.usd} USD`}
                  </span>
                  <span className="text-sm text-brown-400">
                    {PRICING.journeySavings}% desconto
                  </span>
                </div>
                <ul className="mt-5 space-y-2">
                  {[
                    'Todos os 7 Espelhos',
                    'Todos os 7 Nós incluídos',
                    'Acesso vitalício',
                    'Early access a novos Espelhos',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brown-600">
                      <span className="mt-0.5 text-[#c9a87c]">~</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  disabled
                  className="mt-6 w-full rounded-lg bg-[#c9a87c]/50 py-3.5 font-sans text-sm font-medium uppercase tracking-wider text-white"
                >
                  Em breve
                </button>
              </motion.div>
            </div>
          </section>
        )}

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
              Nó individual: {moeda === 'MZN' ? `${NOS_PRICING.individual.mt} MZN` : `$${NOS_PRICING.individual.usd} USD`}.
            </p>
          </div>
        </section>

        {/* Checkout form */}
        {purchasing && (
          <section id="checkout" className="mb-16">
            <div className="mx-auto max-w-lg rounded-2xl border-2 border-sage/30 bg-white p-8 shadow-lg">
              <div className="text-center">
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-sage">
                  Finalizar compra
                </p>
                <h2 className="mt-2 font-serif text-2xl text-brown-900">
                  {purchasing.title.replace('O Espelho ', 'Espelho ')}
                </h2>
                <p className="mt-2 font-serif text-3xl font-bold text-brown-900">
                  {purchasing.priceMT.toLocaleString()} MZN
                  <span className="ml-2 text-base font-normal text-brown-400">
                    / ${purchasing.priceUSD} USD
                  </span>
                </p>
              </div>

              <div className="mt-8 space-y-5">
                <div>
                  <label htmlFor="checkout-email" className="font-sans text-sm font-medium text-brown-700">
                    Email *
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="o-teu@email.com"
                    className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-4 py-3 font-sans text-sm text-brown-900 placeholder:text-brown-300 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
                  />
                </div>

                <div>
                  <label htmlFor="checkout-phone" className="font-sans text-sm font-medium text-brown-700">
                    Telemóvel (opcional)
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                    placeholder="+258 ..."
                    className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-4 py-3 font-sans text-sm text-brown-900 placeholder:text-brown-300 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
                  />
                </div>

                <div>
                  <p className="font-sans text-sm font-medium text-brown-700">
                    Método de Pagamento *
                  </p>
                  <div className="mt-3 space-y-2">
                    {([
                      { key: 'mpesa' as const, label: 'MPesa', desc: 'Pagamento via telemóvel' },
                      { key: 'bank_transfer' as const, label: 'Transferência Bancária', desc: 'Millenium BIM' },
                      { key: 'paypal' as const, label: 'PayPal / Cartão', desc: 'Pagamento internacional' },
                    ]).map((pm) => (
                      <button
                        key={pm.key}
                        type="button"
                        onClick={() => setPaymentMethod(pm.key)}
                        className={`w-full rounded-lg border-2 p-3 text-left transition-all ${
                          paymentMethod === pm.key
                            ? 'border-sage bg-sage/5'
                            : 'border-brown-100 bg-white hover:border-brown-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-4 w-4 rounded-full border-2 ${
                            paymentMethod === pm.key ? 'border-sage bg-sage' : 'border-brown-200'
                          }`} />
                          <div>
                            <p className="font-sans text-sm font-medium text-brown-900">{pm.label}</p>
                            <p className="text-xs text-brown-500">{pm.desc}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={loading || !paymentMethod}
                  className={`w-full rounded-lg bg-sage px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark ${
                    loading || !paymentMethod ? 'opacity-60' : ''
                  }`}
                >
                  {loading ? 'A processar...' : 'Continuar para Pagamento'}
                </button>

                <button
                  type="button"
                  onClick={() => setPurchasing(null)}
                  className="w-full text-center font-sans text-xs text-brown-400 hover:text-brown-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </section>
        )}

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
                Sim. À medida que mais Espelhos forem publicados, disponibilizaremos pacotes com desconto. Por agora, começa pelo que mais te chama.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
