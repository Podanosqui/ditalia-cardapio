'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      aria-label={
        !mounted
          ? 'Alternar tema'
          : isDark
            ? 'Ativar tema claro'
            : 'Ativar tema escuro'
      }
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition-colors hover:border-accent/60 active:scale-95',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ y: -12, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 12, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute"
          >
            {isDark ? (
              <Moon className="size-[18px] text-accent" />
            ) : (
              <Sun className="size-[18px] text-accent" />
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
