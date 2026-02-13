'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

type Product = {
  id: string
  tipo: 'bundle' | 'colecao' | 'veu-individual' | 'livro-digital'
  nome: string
  descricao: string
  preco_mzn: number
  preco_usd: number
  destaque?: string
  inclui: string[]
  veuNumero?: number
}

export default function ComprarPage() {
  const [moeda, setMoeda] = useState<'MZN' | 'USD'>('MZN')

  const produtos: Product[] = [
    // COLEÇÃO COMPLETA
    {
      id: 'colecao-completa',
      tipo: 'colecao',
      nome: 'Coleção Completa - 7 Experiências',
      descricao: '7 ficções literárias interativas + práticas guiadas',
      preco_mzn: 13195,
      preco_usd: 203,
      destaque: '🌈 MELHOR OFERTA - Poupa 30%!',
      inclui: [
        'As 7 experiências digitais completas',
        '7 capítulos de ficção por experiência',
        'Práticas de respiração guiada',
        'Diário de reflexão pessoal',
        'Acesso vitalício no site',
      ],
    },

    // BUNDLES
    {
      id: 'bundle-raiz',
      tipo: 'bundle',
      nome: 'Bundle Início (3 Primeiras Experiências)',
      descricao: 'Ilusão + Medo + Desejo',
      preco_mzn: 5085,
      preco_usd: 78,
      destaque: 'Poupa 10%',
      inclui: [
        'O Véu da Ilusão',
        'O Véu do Medo',
        'O Véu do Desejo',
        'Práticas guiadas',
        'Diário de reflexão',
      ],
    },
    {
      id: 'bundle-meio',
      tipo: 'bundle',
      nome: 'Bundle Transformação (Experiências 4-5)',
      descricao: 'Culpa + Pressa',
      preco_mzn: 3395,
      preco_usd: 52,
      destaque: 'Poupa 10%',
      inclui: [
        'O Véu da Culpa',
        'O Véu da Pressa',
        'Práticas guiadas',
        'Diário de reflexão',
      ],
    },
    {
      id: 'bundle-fim',
      tipo: 'bundle',
      nome: 'Bundle Integração (2 Últimas Experiências)',
      descricao: 'Comparação + Controlo',
      preco_mzn: 3395,
      preco_usd: 52,
      destaque: 'Poupa 10%',
      inclui: [
        'O Véu da Comparação',
        'O Véu do Controlo',
        'Práticas guiadas',
        'Diário de reflexão',
      ],
    },

    // EXPERIÊNCIAS INDIVIDUAIS
    {
      id: 'exp-1',
      tipo: 'veu-individual',
      nome: 'O Véu da Ilusão',
      descricao: 'Quando a vida que tens não foi a que escolheste',
      preco_mzn: 1885,
      preco_usd: 29,
      veuNumero: 1,
      inclui: [
        '7 capítulos de ficção',
        'Práticas de respiração',
        'Diário pessoal',
        'Acesso vitalício',
      ],
    },
    {
      id: 'exp-2',
      tipo: 'veu-individual',
      nome: 'O Véu do Medo',
      descricao: 'Quando o medo decide por ti',
      preco_mzn: 1885,
      preco_usd: 29,
      veuNumero: 2,
      inclui: [
        '7 capítulos de ficção',
        'Práticas de respiração',
        'Diário pessoal',
        'Acesso vitalício',
      ],
    },
    {
      id: 'exp-3',
      tipo: 'veu-individual',
      nome: 'O Véu do Desejo',
      descricao: 'Quando desejas tudo menos o que precisas',
      preco_mzn: 1885,
      preco_usd: 29,
      veuNumero: 3,
      inclui: [
        '7 capítulos de ficção',
        'Práticas de respiração',
        'Diário pessoal',
        'Acesso vitalício',
      ],
    },
    {
      id: 'exp-4',
      tipo: 'veu-individual',
      nome: 'O Véu da Culpa',
      descricao: 'Quando carregas o peso do que não é teu',
      preco_mzn: 1885,
      preco_usd: 29,
      veuNumero: 4,
      inclui: [
        '7 capítulos de ficção',
        'Práticas de respiração',
        'Diário pessoal',
        'Acesso vitalício',
      ],
    },
    {
      id: 'exp-5',
      tipo: 'veu-individual',
      nome: 'O Véu da Pressa',
      descricao: 'Quando viver se torna correr',
      preco_mzn: 1885,
      preco_usd: 29,
      veuNumero: 5,
      inclui: [
        '7 capítulos de ficção',
        'Práticas de respiração',
        'Diário pessoal',
        'Acesso vitalício',
      ],
    },
    {
      id: 'exp-6',
      tipo: 'veu-individual',
      nome: 'O Véu da Comparação',
      descricao: 'Quando a tua vida nunca é suficiente',
      preco_mzn: 1885,
      preco_usd: 29,
      veuNumero: 6,
      inclui: [
        '7 capítulos de ficção',
        'Práticas de respiração',
        'Diário pessoal',
        'Acesso vitalício',
      ],
    },
    {
      id: 'exp-7',
      tipo: 'veu-individual',
      nome: 'O Véu do Controlo',
      descricao: 'Quando tentas segurar o que sempre escapa',
      preco_mzn: 1885,
      preco_usd: 29,
      veuNumero: 7,
      inclui: [
        '7 capítulos de ficção',
        'Práticas de respiração',
        'Diário pessoal',
        'Acesso vitalício',
      ],
    },
  ]

  const handleComprar = (produto: Product) => {
    // TODO: Integrar com sistema de pagamento (Stripe, PayPal, M-Pesa)
    alert(`Comprar: ${produto.nome}\nPreço: ${moeda === 'MZN' ? `${produto.preco_mzn} MZN` : `$${produto.preco_usd} USD`}\n\nSistema de pagamento será integrado em breve!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-stone-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-stone-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-serif mb-4">Loja Digital</h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Escolhe a tua travessia. Cada compra inclui acesso vitalício no site.
            </p>
          </motion.div>

          {/* Toggle de Moeda */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex rounded-lg bg-white/10 p-1">
              <button
                onClick={() => setMoeda('MZN')}
                className={`px-6 py-2 rounded-md transition-all ${
                  moeda === 'MZN'
                    ? 'bg-white text-purple-900 font-bold'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                MZN (Metical)
              </button>
              <button
                onClick={() => setMoeda('USD')}
                className={`px-6 py-2 rounded-md transition-all ${
                  moeda === 'USD'
                    ? 'bg-white text-purple-900 font-bold'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                USD (Dólar)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Produtos */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Coleção Completa */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif text-brown-900 mb-8 text-center">
            🌈 Coleção Completa (Melhor Oferta!)
          </h2>
          <div className="max-w-2xl mx-auto">
            {produtos
              .filter((p) => p.tipo === 'colecao')
              .map((produto) => (
                <ProductCard
                  key={produto.id}
                  produto={produto}
                  moeda={moeda}
                  onComprar={handleComprar}
                  destacado
                />
              ))}
          </div>
        </section>

        {/* Bundles */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif text-brown-900 mb-8 text-center">
            🎁 Bundles (Pacotes)
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {produtos
              .filter((p) => p.tipo === 'bundle')
              .map((produto) => (
                <ProductCard
                  key={produto.id}
                  produto={produto}
                  moeda={moeda}
                  onComprar={handleComprar}
                />
              ))}
          </div>
        </section>

        {/* Véus Individuais */}
        <section>
          <h2 className="text-3xl font-serif text-brown-900 mb-8 text-center">
            ✨ Experiências Individuais
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtos
              .filter((p) => p.tipo === 'veu-individual')
              .map((produto) => (
                <ProductCard
                  key={produto.id}
                  produto={produto}
                  moeda={moeda}
                  onComprar={handleComprar}
                  compacto
                />
              ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif text-brown-900 mb-8 text-center">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-brown-900 mb-2">Como recebo acesso após comprar?</h3>
              <p className="text-brown-600">
                Após o pagamento, receberás um código de acesso por email. Usa esse código na página de registo para criar a tua conta e aceder imediatamente.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-brown-900 mb-2">O acesso é vitalício?</h3>
              <p className="text-brown-600">
                Sim! Uma vez comprado, tens acesso para sempre. Podes ler ao teu ritmo, quantas vezes quiseres.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-brown-900 mb-2">Posso comprar mais experiências depois?</h3>
              <p className="text-brown-600">
                Claro! Podes começar com um véu individual e comprar outros mais tarde. Mas a coleção completa tem 30% de desconto.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function ProductCard({
  produto,
  moeda,
  onComprar,
  destacado,
  compacto,
}: {
  produto: Product
  moeda: 'MZN' | 'USD'
  onComprar: (produto: Product) => void
  destacado?: boolean
  compacto?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all ${
        destacado ? 'ring-4 ring-purple-500 ring-offset-4' : ''
      }`}
    >
      {produto.destaque && (
        <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
          destacado
            ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white'
            : 'bg-sage/10 text-sage-dark'
        }`}>
          {produto.destaque}
        </div>
      )}

      <h3 className={`font-serif text-brown-900 mb-2 ${compacto ? 'text-lg' : 'text-2xl'}`}>
        {produto.nome}
      </h3>

      <p className={`text-brown-600 mb-4 ${compacto ? 'text-sm' : ''}`}>
        {produto.descricao}
      </p>

      {!compacto && (
        <ul className="space-y-2 mb-6">
          {produto.inclui.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-brown-600">
              <span className="text-sage mt-0.5">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-brown-500">Preço:</p>
          <p className="text-3xl font-bold text-brown-900">
            {moeda === 'MZN'
              ? `${produto.preco_mzn.toLocaleString()} MZN`
              : `$${produto.preco_usd} USD`
            }
          </p>
        </div>
      </div>

      <button
        onClick={() => onComprar(produto)}
        className={`w-full rounded-lg font-medium transition-all ${
          destacado
            ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white py-4 text-lg hover:shadow-xl'
            : 'bg-sage text-white py-3 hover:bg-sage-dark'
        }`}
      >
        Comprar Agora
      </button>
    </motion.div>
  )
}
