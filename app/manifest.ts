import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "D' Itália — Pizzaria",
    short_name: "D' Itália",
    description:
      "Cardápio digital da pizzaria D' Itália. Os verdadeiros sabores da Itália.",
    start_url: '/',
    display: 'standalone',
    background_color: '#111111',
    theme_color: '#9e1b32',
    orientation: 'portrait',
    categories: ['food', 'lifestyle'],
    lang: 'pt-BR',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
