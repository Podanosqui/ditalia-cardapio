'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { categorias, linkWhatsApp, site } from '@/lib/site'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'
import { WhatsAppIcon } from './whatsapp-icon'

export function Header({
  onSelectCategoria,
}: {
  onSelectCategoria?: (id: string) => void
}) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'safe-top fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'glass border-b border-border/60' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-sm">
            D
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold tracking-tight">
              D&apos; Itália
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-accent">
              Pizzaria
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* <a
            href={linkWhatsApp('Olá! Gostaria de fazer um pedido.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-transform hover:brightness-110 active:scale-95 sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Pedir
          </a> */}
          {/* <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition-colors hover:border-accent/60 active:scale-95 md:hidden"
          >
            <Menu className="size-[18px]" />
          </button> */}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="safe-top fixed inset-y-0 right-0 z-50 flex w-[82%] max-w-xs flex-col bg-card p-6 md:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-serif text-xl font-semibold">Cardápio</span>
                <button
                  type="button"
                  aria-label="Fechar menu"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border active:scale-95"
                >
                  <X className="size-[18px]" />
                </button>
              </div>

              <ul className="flex flex-col gap-1">
                {categorias.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCategoria?.(c.id)
                        setOpen(false)
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-base font-medium transition-colors hover:bg-secondary"
                    >
                      <span className="text-xl" aria-hidden="true">
                        {c.emoji}
                      </span>
                      {c.nome}
                    </button>
                  </li>
                ))}
              </ul>

              {/* <a
                href={linkWhatsApp('Olá! Gostaria de fazer um pedido.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground active:scale-95"
              >
                <WhatsAppIcon className="size-5" />
                Pedir pelo WhatsApp
              </a> */}
              <p className="mt-4 text-center text-xs text-muted-foreground">
                {site.endereco}
              </p>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
