'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { categorias } from '@/lib/site'
import type { CategoriaId } from '@/lib/types'
import { cn } from '@/lib/utils'

export function CategoryMenu({
  active,
  onSelect,
}: {
  active: CategoriaId | null
  onSelect: (id: CategoriaId) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    if (!active) return
    const el = refs.current[active]
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [active])

  return (
    <div
      ref={containerRef}
      className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4"
    >
      {categorias.map((c) => {
        const isActive = active === c.id
        return (
          <button
            key={c.id}
            type="button"
            ref={(el) => {
              refs.current[c.id] = el
            }}
            onClick={() => onSelect(c.id)}
            className={cn(
              'relative flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'border-transparent text-primary-foreground'
                : 'border-border bg-card text-foreground hover:border-accent/60',
            )}
          >
            {isActive && (
              <motion.span
                layoutId="chip-highlight"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                className="absolute inset-0 rounded-full bg-primary"
              />
            )}
            <span className="relative z-10 text-base" aria-hidden="true">
              {c.emoji}
            </span>
            <span className="relative z-10 whitespace-nowrap">{c.nome}</span>
          </button>
        )
      })}
    </div>
  )
}
