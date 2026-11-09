import { Clock, MapPin } from 'lucide-react'
import { linkWhatsApp, site } from '@/lib/site'
import { InstagramIcon, WhatsAppIcon } from './whatsapp-icon'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto max-w-5xl px-6 py-12 pb-32 md:pb-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                D
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-xl font-semibold">D&apos; Itália</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-accent">
                  Pizzaria
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              Ingredientes selecionados, receitas tradicionais e muito amor em
              cada fatia. Desde sempre, a verdadeira Itália na sua mesa.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
              Onde estamos
            </h3>
            <a
              href={site.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              {site.endereco}
            </a>
            <div className="mt-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Clock className="size-4 text-accent" />
                Horário de funcionamento
              </div>
              <ul className="mt-2 space-y-1 pl-6 text-sm text-muted-foreground">
                {site.horario.map((h) => (
                  <li key={h.dia} className="flex justify-between gap-4">
                    <span>{h.dia}</span>
                    <span className="text-foreground">{h.hora}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
              Fale conosco
            </h3>
            <div className="mt-3 flex flex-col gap-3">
              {/* <a
                href={linkWhatsApp('Olá! Gostaria de fazer um pedido.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform hover:brightness-110 active:scale-95"
              >
                <WhatsAppIcon className="size-4" />
                Pedir pelo WhatsApp
              </a> */}
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-foreground transition-colors hover:border-accent/60"
              >
                <InstagramIcon className="size-4 text-accent" />
                {site.instagramHandle}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} D&apos; Itália Pizzaria. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  )
}
