import Link from 'next/link'
import { siteConfig } from '@/lib/site'

export function Header() {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="container-shell py-3">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">Production Starter</p>
            <Link href="/" className="text-3xl font-black tracking-tight text-brand-ink">
              {siteConfig.name}
            </Link>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm font-semibold text-brand-ink/80">
            {siteConfig.nav.map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="rounded-full px-3 py-1 transition hover:bg-brand-red hover:text-white">
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="bg-brand-red text-white">
        <div className="container-shell flex items-center gap-3 py-2 text-sm">
          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-red">Breaking</span>
          <p>Wire your live ticker feed here from Payload or a dedicated breaking news collection.</p>
        </div>
      </div>
    </header>
  )
}
