import type { CategoriaId, Produto } from '@/lib/types'
import { pizzas } from './pizzas'
import { esfirras } from './esfirras'
import { bebidas } from './bebidas'
import { vinhos } from './vinhos'

export const produtos: Produto[] = [
  ...pizzas,
  ...esfirras,
  ...bebidas,
  ...vinhos,
]

export function produtosPorCategoria(id: CategoriaId): Produto[] {
  return produtos.filter((p) => p.categoria === id)
}

export function buscarProdutos(termo: string): Produto[] {
  const q = termo.trim().toLowerCase()
  if (!q) return produtos
  return produtos.filter((p) => {
    return (
      p.nome.toLowerCase().includes(q) ||
      p.categoria.toLowerCase().includes(q) ||
      p.ingredientes.some((i) => i.toLowerCase().includes(q))
    )
  })
}
