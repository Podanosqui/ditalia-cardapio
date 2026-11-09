// 'use client'

// import Image from 'next/image'
// import { motion } from 'framer-motion'
// import { ArrowRight } from 'lucide-react'
// import { linkWhatsApp } from '@/lib/site'
// // import { WhatsAppIcon } from './whatsapp-icon'

// export function Hero({ onVerCardapio }: { onVerCardapio?: () => void }) {
//   return (
//     <section id="top" className="relative min-h-[92svh] w-full overflow-hidden">
//       <div className="absolute inset-0">
//         <Image
//           src="/images/hero-pizza.png"
//           alt="Pizza artesanal D' Itália recém-saída do forno"
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/85" />
//         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
//       </div>

//       <div className="safe-top relative z-10 mx-auto flex min-h-[92svh] max-w-5xl flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
//         {/* <motion.span
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md"
//         >
//           <span className="h-1.5 w-1.5 rounded-full bg-accent" />
//           Autêntica Pizzeria Italiana
//         </motion.span> */}

//         <motion.h1
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.08 }}
//           className="max-w-2xl text-balance font-serif text-4xl font-semibold leading-[1.05] text-white sm:text-6xl"
//         >
//           Os verdadeiros sabores da Itália.
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.18 }}
//           className="mt-5 max-w-md text-pretty text-base leading-relaxed text-white/80 sm:text-lg"
//         >
//           Ingredientes selecionados. Receitas tradicionais. Muito amor em cada
//           fatia.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.28 }}
//           className="mt-9 flex w-full max-w-xs flex-col items-center gap-3 sm:max-w-none sm:flex-row sm:justify-center"
//         >
//           <button
//             type="button"
//             onClick={onVerCardapio}
//             className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95 sm:w-auto"
//           >
//             Ver Cardápio
//             <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
//           </button>
//           {/* <a
//             href={linkWhatsApp('Olá! Gostaria de fazer um pedido.')}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 text-base font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20 active:scale-95 sm:w-auto"
//           >
//             <WhatsAppIcon className="size-5" />
//             WhatsApp
//           </a> */}
//         </motion.div>
//       </div>
//     </section>
//   )
// }
