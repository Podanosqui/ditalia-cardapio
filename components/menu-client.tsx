'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, SearchX } from 'lucide-react'
import { buscarProdutos, produtos, produtosPorCategoria } from '@/data'
import { categorias } from '@/lib/site'
import type { CategoriaId, Produto } from '@/lib/types'
import { useFavorites } from '@/hooks/use-favorites'
import { Header } from './header'
// import { Hero } from './hero'
import { SearchBar } from './search-bar'
import { CategoryMenu } from './category-menu'
import { CategorySection } from './category-section'
import { ProductCard } from './product-card'
import { ProductModal } from './product-modal'
import { FloatingBottomNavigation } from './floating-bottom-navigation'
import { Footer } from './footer'

export function MenuClient() {
  const { favoritos } = useFavorites()
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState<CategoriaId>('tradicionais')
  const [selected, setSelected] = useState<Produto | null>(null)
  const [soFavoritos, setSoFavoritos] = useState(false)
  const [manualScroll, setManualScroll] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const sectionEls = useRef<Record<string, HTMLElement | null>>({})

  const filtrando = query.trim().length > 0 || soFavoritos

  const resultados = useMemo(() => {
    let base = query.trim() ? buscarProdutos(query) : produtos
    if (soFavoritos) base = base.filter((p) => favoritos.includes(p.id))
    return base
  }, [query, soFavoritos, favoritos])

  // Scroll spy
  useEffect(() => {
    if (filtrando) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (manualScroll) return
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          const id = visible[0].target.getAttribute('data-categoria')
          if (id) setActiveCat(id as CategoriaId)
        }
      },
      { rootMargin: '-160px 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    )
    Object.values(sectionEls.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [filtrando, manualScroll])

  const scrollToCategoria = useCallback((id: CategoriaId) => {
    setActiveCat(id)
    setManualScroll(true)
    const el = sectionEls.current[id]
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 150
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    window.setTimeout(() => setManualScroll(false), 700)
  }, [])

  const focarBusca = useCallback(() => {
    stickyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.setTimeout(() => searchRef.current?.focus(), 350)
  }, [])

  const irCategorias = useCallback(() => {
    setSoFavoritos(false)
    setQuery('')
    stickyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <>
      <Header onSelectCategoria={(id) => scrollToCategoria(id as CategoriaId)} />

      <main ref={menuRef}>
        {/* <Hero
          onVerCardapio={() =>
            stickyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        />

        {/* Sticky search + category chips */}
        <div
          ref={stickyRef}
          className="glass safe-top sticky top-0 z-30 scroll-mt-0 border-b border-border/60"
        >
          <div className="mx-auto max-w-5xl px-4 py-3">
            <div className="flex flex-col gap-3">
              <div className="pt-14">
                <SearchBar
                  inputRef={searchRef}
                  value={query}
                  onChange={setQuery}
                />
              </div>
              <CategoryMenu
                active={filtrando ? null : activeCat}
                onSelect={scrollToCategoria}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 pt-6 pb-24 md:pb-12">
          {soFavoritos && (
            <div className="mb-5 flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Heart className="size-4 fill-primary text-primary" />
                Seus favoritos
              </span>
              <button
                type="button"
                onClick={() => setSoFavoritos(false)}
                className="text-sm font-medium text-primary"
              >
                Ver tudo
              </button>
            </div>
          )}

          {filtrando ? (
            <FilteredGrid resultados={resultados} onOpen={setSelected} />
          ) : (
            <div className="flex flex-col gap-12">
              {categorias.map((cat) => (
                <CategorySection
                  key={cat.id}
                  categoria={cat}
                  produtos={produtosPorCategoria(cat.id)}
                  onOpen={setSelected}
                  sectionRef={(el) => {
                    sectionEls.current[cat.id] = el
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <Footer />
      </main>

      <FloatingBottomNavigation
        favoritosCount={favoritos.length}
        favoritosAtivo={soFavoritos}
        onSearch={focarBusca}
        onCategories={irCategorias}
        onFavorites={() => {
          setSoFavoritos((v) => !v)
          setQuery('')
          window.scrollTo({
            top: (stickyRef.current?.offsetTop ?? 0) - 20,
            behavior: 'smooth',
          })
        }}
      />

      <ProductModal produto={selected} onClose={() => setSelected(null)} />
    </>
  )
}

function FilteredGrid({
  resultados,
  onOpen,
}: {
  resultados: Produto[]
  onOpen: (p: Produto) => void
}) {
  if (resultados.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-secondary">
          <SearchX className="size-7 text-muted-foreground" />
        </span>
        <h3 className="mt-4 font-serif text-xl font-semibold">
          Nada encontrado
        </h3>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Tente buscar por outro sabor, ingrediente ou categoria.
        </p>
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="popLayout">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {resultados.map((p) => (
          <ProductCard key={p.id} produto={p} onOpen={onOpen} />
        ))}
      </div>
    </AnimatePresence>
  )
}
