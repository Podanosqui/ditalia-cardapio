'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const STORAGE_KEY = 'ditalia:favoritos'

interface FavoritesContextValue {
  favoritos: string[]
  isFavorito: (id: string) => boolean
  toggleFavorito: (id: string) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoritos, setFavoritos] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setFavoritos(JSON.parse(raw))
    } catch {
      // ignore
    }
  }, [])

  const toggleFavorito = useCallback((id: string) => {
    setFavoritos((prev) => {
      const next = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  const isFavorito = useCallback(
    (id: string) => favoritos.includes(id),
    [favoritos],
  )

  const value = useMemo(
    () => ({ favoritos, isFavorito, toggleFavorito }),
    [favoritos, isFavorito, toggleFavorito],
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites deve ser usado dentro de FavoritesProvider')
  return ctx
}
