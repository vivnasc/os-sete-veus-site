'use client'

import { useState, useEffect, useCallback } from 'react'

export type NivelLeitura = 'semente' | 'raiz' | 'arvore'

const STORAGE_KEY = 'livro-nivel-leitura'

export function useNivelLeitura() {
  const [nivel, setNivelState] = useState<NivelLeitura | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as NivelLeitura | null
      if (saved && ['semente', 'raiz', 'arvore'].includes(saved)) {
        setNivelState(saved)
      }
    } catch {
      // Ignore
    }
    setLoaded(true)
  }, [])

  const setNivel = useCallback((n: NivelLeitura) => {
    setNivelState(n)
    try {
      localStorage.setItem(STORAGE_KEY, n)
    } catch {
      // Ignore
    }
  }, [])

  return {
    nivel: nivel ?? 'arvore',
    setNivel,
    isFirstVisit: loaded && nivel === null,
    loaded,
  }
}
