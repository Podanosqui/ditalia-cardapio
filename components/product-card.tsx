'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import type { Produto } from '@/lib/types'
import { linkWhatsApp, mensagemPedido, precoBRL } from '@/lib/site'
import { useFavorites } from '@/hooks/use-favorites'
import { cn } from '@/lib/utils'
// import { WhatsAppIcon } from './whatsapp-icon'

export function ProductCard({
  produto,
  onOpen,
}: {
  produto: Produto
  onOpen: (p: Produto) => void
}) {
  const { isFavorito, toggleFavorito } = useFavorites()
  const fav = isFavorito(produto.id)
  const indisponivel = !produto.disponivel

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileTap={{ scale: indisponivel ? 1 : 0.98 }}
      onClick={() => onOpen(produto)}
      className={cn(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl hover:shadow-black/5',
        indisponivel && 'opacity-70',
      )}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={produto.imagem || '/placeholder.svg'}
          alt={produto.nome}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 50vw, 320px"
          className={cn(
            'object-cover transition-transform duration-500 group-hover:scale-105',
            indisponivel && 'grayscale',
          )}
        />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {produto.destaque && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent-foreground shadow">
              Mais Pedida
            </span>
          )}
          {produto.novo && (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground shadow">
              Novo
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorito(produto.id)
          }}
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md transition-transform active:scale-90"
        >
          <Heart
            className={cn('size-4 transition-colors', fav && 'fill-primary text-primary')}
          />
        </button>

        {indisponivel && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-foreground">
              Indisponível
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-base font-semibold leading-tight text-card-foreground">
          {produto.nome}
        </h3>
        {/* <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {produto.descricao}
        </p> */}

        <div className="mt-4 flex items-end justify-between gap-2">
          <div className="flex flex-col">
            {produto.tamanhos && (
              <span className="text-[11px] text-muted-foreground">a partir de</span>
            )}
            <span className="font-serif text-lg font-semibold text-foreground">
              {precoBRL(produto.preco)}
            </span>
          </div>

          {/* <a
            href={linkWhatsApp(mensagemPedido(produto.nome, precoBRL(produto.preco)))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-disabled={indisponivel}
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:brightness-110 active:scale-90',
              indisponivel && 'pointer-events-none opacity-40',
            )}
          >
            <WhatsAppIcon className="size-[18px]" />
          </a> */}
        </div>
      </div>
    </motion.article>
  )
}
