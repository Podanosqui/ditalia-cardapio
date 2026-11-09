'use client'

import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SearchBar({
  value,
  onChange,
  className,
  inputRef,
}: {
  value: string
  onChange: (v: string) => void
  className?: string
  inputRef?: React.RefObject<HTMLInputElement | null>
}) {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
      <input
        ref={inputRef}
        type="search"
        inputMode="search"
        enterKeyHint="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar pizzas, ingredientes..."
        aria-label="Buscar no cardápio"
        className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-11 text-base text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/70 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          aria-label="Limpar busca"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary active:scale-90"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
