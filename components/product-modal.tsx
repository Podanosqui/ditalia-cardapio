'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import type { Produto } from '@/lib/types'
import { linkWhatsApp, mensagemPedido, precoBRL } from '@/lib/site'
import { useFavorites } from '@/hooks/use-favorites'
import { cn } from '@/lib/utils'
// import { WhatsAppIcon } from './whatsapp-icon'

export function ProductModal({
  produto,
  onClose,
}: {
  produto: Produto | null
  onClose: () => void
}) {
  const { isFavorito, toggleFavorito } = useFavorites()

  useEffect(() => {
    document.body.style.overflow = produto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [produto])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {produto && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: '100%', opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.6 }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="safe-bottom relative z-10 flex max-h-[92svh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-card sm:rounded-3xl"
          >
            <div className="relative aspect-16/10 w-full shrink-0">
              <Image
                src={produto.imagem || '/placeholder.svg'}
                alt={produto.nome}
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent" />
              <button
                type="button"
                aria-label="Fechar"
                onClick={onClose}
                className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-transform active:scale-90"
              >
                <X className="size-5" />
              </button>
              <div className="absolute left-4 top-4 flex gap-1.5">
                {produto.destaque && (
                  <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent-foreground">
                    Mais Pedida
                  </span>
                )}
                {produto.novo && (
                  <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                    Novo
                  </span>
                )}
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-serif text-2xl font-semibold text-card-foreground">
                  {produto.nome}
                </h2>
                <button
                  type="button"
                  aria-label={
                    isFavorito(produto.id)
                      ? 'Remover dos favoritos'
                      : 'Adicionar aos favoritos'
                  }
                  onClick={() => toggleFavorito(produto.id)}
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border transition-transform active:scale-90"
                >
                  <Heart
                    className={cn(
                      'size-5',
                      isFavorito(produto.id) && 'fill-primary text-primary',
                    )}
                  />
                </button>
              </div>

              {/* <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                {produto.descricao}
              </p> */}

              <div className="mt-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Ingredientes
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {produto.ingredientes.map((ing) => (
                    <span
                      key={ing}
                      className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {produto.tamanhos && produto.tamanhos.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Tamanhos
                  </h3>
                  <ul className="mt-2 divide-y divide-border overflow-hidden rounded-2xl border border-border">
                    {produto.tamanhos.map((t) => (
                      <li
                        key={t.nome}
                        className="flex items-center justify-between px-4 py-3"
                      >
                        <span className="text-sm text-card-foreground">{t.nome}</span>
                        <span className="font-serif font-semibold text-foreground">
                          {precoBRL(t.preco)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="safe-bottom shrink-0 border-t border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  {produto.tamanhos && (
                    <span className="text-[11px] text-muted-foreground">
                      a partir de
                    </span>
                  )}
                  <span className="font-serif text-xl font-semibold text-foreground">
                    {precoBRL(produto.preco)}
                  </span>
                </div>
                {/* {produto.disponivel ? (
                  <a
                    href={linkWhatsApp(
                      mensagemPedido(produto.nome, precoBRL(produto.preco)),
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground transition-transform hover:brightness-110 active:scale-95"
                  >
                    <WhatsAppIcon className="size-5" />
                    Pedir pelo WhatsApp
                  </a>
                ) : (
                  <span className="inline-flex h-13 flex-1 items-center justify-center rounded-full bg-secondary text-base font-medium text-muted-foreground">
                    Indisponível no momento
                  </span>
                )} */}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
