import type { Categoria } from './types'

export const site = {
  nome: "D' Itália",
  slogan: 'Os verdadeiros sabores da Itália.',
  whatsapp: '5511999999999', // formato internacional, sem símbolos
  instagram: 'https://instagram.com/ditaliapizzariadelivery',
  instagramHandle: '@ditalia',
  endereco: 'Av. José Prefeito Barbosa, 448 — Centro, Cambuí — MG',
  maps: 'https://maps.google.com/?q=Rua+das+Oliveiras+123+Sao+Paulo',
  horario: [
    { dia: 'Terça a Domingo', hora: '18h — 23h' },
    { dia: 'Segunda-feira', hora: 'Fechado' },
  ],
}

export const categorias: Categoria[] = [
  { id: 'tradicionais', nome: 'Tradicionais', emoji: '🍕' },
  { id: 'especiais', nome: 'Especiais', emoji: '👑' },
  { id: 'premium', nome: 'Premium', emoji: '🔥' },
  { id: 'doces', nome: 'Doces', emoji: '🍫' },
  { id: 'esfirras', nome: 'Esfirras', emoji: '🥟' },
  { id: 'bebidas', nome: 'Bebidas', emoji: '🥤' },
  { id: 'vinhos', nome: 'Vinhos', emoji: '🍷' },
]

export function precoBRL(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`
}

export function mensagemPedido(nome: string, preco?: string): string {
  const base = `Olá! Gostaria de pedir: *${nome}*`
  return preco ? `${base} (${preco}). Poderia me ajudar?` : `${base}. Poderia me ajudar?`
}
