'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        // Login com Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (error) {
          setError('Email ou password incorretos')
          console.error('Login error:', error)
        } else if (data.user) {
          console.log('Login success:', data.user.email)
          // Aguardar um pouco para garantir que a sessão está salva
          await new Promise(resolve => setTimeout(resolve, 500))
          window.location.href = '/livro'
        }
      } else {
        // Registro com Supabase
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
            }
          }
        })

        if (error) {
          setError(error.message)
          console.error('Signup error:', error)
        } else if (data.user) {
          console.log('Signup success:', data.user.email)
          // Aguardar um pouco para garantir que a sessão está salva
          await new Promise(resolve => setTimeout(resolve, 500))
          window.location.href = '/livro'
        }
      }
    } catch (err) {
      console.error('Auth error:', err)
      setError('Erro de conexão. Tenta novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-stone-100 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo/Título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-stone-900 mb-2">
            Os 7 Véus do Despertar
          </h1>
          <p className="text-stone-600 italic">
            {isLogin ? 'Entra para continuar a tua travessia' : 'Começa a tua travessia'}
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome (só no registro) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
                minLength={6}
              />
            </div>

            {/* Erro */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-900 to-stone-800 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Aguarda...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </button>
          </form>

          {/* Toggle Login/Registro */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
              className="text-sm text-purple-700 hover:underline"
            >
              {isLogin ? 'Ainda não tens conta? Regista-te' : 'Já tens conta? Entra'}
            </button>
          </div>
        </div>

        {/* Voltar */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-stone-600 hover:underline">
            ← Voltar ao site
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
