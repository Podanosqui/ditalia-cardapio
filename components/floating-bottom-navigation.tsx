'use client'

import { Heart, LayoutGrid, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FloatingBottomNavigation({
  favoritosCount,
  favoritosAtivo,
  onSearch,
  onCategories,
  onFavorites,
}: {
  favoritosCount: number
  favoritosAtivo: boolean
  onSearch: () => void
  onCategories: () => void
  onFavorites: () => void
}) {
  return (
    <div className="safe-bottom pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 md:hidden">
      <nav className="glass pointer-events-auto flex w-full max-w-sm items-center justify-around gap-1 rounded-full border border-border/70 p-1.5 shadow-xl shadow-black/10">
        <NavButton label="Buscar" onClick={onSearch}>
          <Search className="size-5" />
        </NavButton>
        <NavButton label="Categorias" onClick={onCategories}>
          <LayoutGrid className="size-5" />
        </NavButton>
        <NavButton
          label="Favoritos"
          onClick={() => {
            onFavorites()
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }}
          active={favoritosAtivo}
        >
          <span className="relative">
            <Heart className={cn('size-5', favoritosAtivo && 'fill-current')} />
            {favoritosCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {favoritosCount}
              </span>
            )}
          </span>
        </NavButton>
      </nav>
    </div>
  )
}

function NavButton({
  label,
  onClick,
  active,
  children,
}: {
  label: string
  onClick: () => void
  active?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'flex h-13 flex-1 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-colors active:scale-90',
        active ? 'text-primary' : 'text-muted-foreground',
      )}
    >
      {children}
      <span>{label}</span>
    </button>
  )
}
