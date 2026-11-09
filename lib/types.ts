export type CategoriaId =
  | 'tradicionais'
  | 'especiais'
  | 'premium'
  | 'doces'
  | 'esfirras'
  | 'bebidas'
  | 'vinhos'

export interface Tamanho {
  nome: string
  preco: number
}

export interface Produto {
  id: string
  nome: string
  categoria: CategoriaId
  // descricao: string
  ingredientes: string[]
  preco: number
  /** Optional multiple sizes with prices */
  tamanhos?: Tamanho[]
  imagem: string
  novo?: boolean
  destaque?: boolean
  disponivel: boolean
}

export interface Categoria {
  id: CategoriaId
  nome: string
  emoji: string
}
