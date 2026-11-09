'use client'

import { motion } from 'framer-motion'
import type { Categoria, Produto } from '@/lib/types'
import { ProductCard } from './product-card'

export function CategorySection({
  categoria,
  produtos,
  onOpen,
  sectionRef,
}: {
  categoria: Categoria
  produtos: Produto[]
  onOpen: (p: Produto) => void
  sectionRef?: (el: HTMLElement | null) => void
}) {
  if (produtos.length === 0) return null

  return (
    <section
      id={`cat-${categoria.id}`}
      ref={sectionRef}
      data-categoria={categoria.id}
      className="scroll-mt-40"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-4 flex items-center gap-3"
      >
        <span className="text-2xl" aria-hidden="true">
          {categoria.emoji}
        </span>
        <h2 className="font-serif text-2xl font-semibold tracking-tight">
          {categoria.nome}
        </h2>
        <span className="ml-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {produtos.length}
        </span>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {produtos.map((p) => (
          <ProductCard key={p.id} produto={p} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}
