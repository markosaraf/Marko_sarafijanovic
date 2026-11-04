import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Camera, CalendarDays, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  metadataBase: new URL('https://marko-sarafijanovic.com'),
  title: 'Tesla Cybercab @ Autoshow Zürich 2026 | Marko Sarafijanovic',
  description: 'Tesla Cybercab at Autoshow Zürich, 5–8 November 2026. Discover the gold Cybercab through photos and close-up details by Marko Sarafijanovic.',
  alternates: { canonical: '/cybercab-autoshow-zurich' },
  openGraph: {
    title: 'Tesla Cybercab @ Autoshow Zürich 2026',
    description: 'Tesla Cybercab at Autoshow Zürich, 5–8 November 2026. Discover the gold Cybercab through photos and close-up details by Marko Sarafijanovic.',
    url: '/cybercab-autoshow-zurich',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Tesla Cybercab @ Autoshow Zürich 2026', description: 'Tesla Cybercab at Autoshow Zürich, 5–8 November 2026. Discover the gold Cybercab through photos and close-up details by Marko Sarafijanovic.' },
}

export default function CybercabPage() {
  return (
    <main className="min-h-screen bg-[#111111] text-[#f7f3e9] selection:bg-[#DCA842] selection:text-[#111111]">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-12">
        <nav className="flex items-center justify-between gap-4 border-b border-white/10 pb-7 text-sm">
          <Link href="/" className="flex items-center gap-2 text-white/70 transition-colors hover:text-[#DCA842]"><ArrowLeft size={18} /> Back to home</Link>
          <span className="text-white/50">Marko Sarafijanovic</span>
        </nav>
        <style>{`@media (min-width: 1100px) { .cybercab-hero-logo { position: absolute; right: 0; top: 112px; width: 280px; height: 100px; margin: 0; } }`}</style>
        <header className="relative overflow-hidden pb-16 pt-16 md:pb-24 md:pt-24">
          <div aria-hidden="true" className="cybercab-hero-logo pointer-events-none mb-8 h-24 w-72 max-w-full bg-[#DCA842]" style={{ maskImage: "url(/cybercab/robotaxi-logo.png)", maskSize: "contain", maskPosition: "center", maskRepeat: "no-repeat", WebkitMaskImage: "url(/cybercab/robotaxi-logo.png)", WebkitMaskSize: "contain", WebkitMaskPosition: "center", WebkitMaskRepeat: "no-repeat" }} />
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#DCA842]">Zürich, Switzerland / November 2026</p>
          <h1 className="relative text-5xl font-semibold leading-[1.08] tracking-tight sm:text-7xl md:text-8xl">Cybercab<span className="mt-2 block text-[#DCA842] text-3xl sm:text-5xl md:text-6xl">@ Autoshow Zürich</span></h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/60">Up close with Tesla’s Cybercab at Autoshow Zürich.</p>
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4 text-sm text-white/75">
            <span className="flex items-center gap-2"><CalendarDays size={17} className="text-[#DCA842]" />5–8 November 2026</span>
            <span className="flex items-center gap-2"><MapPin size={17} className="text-[#DCA842]" />Autoshow Zürich</span>
          </div>
        </header>
        <section aria-labelledby="photos-heading" className="relative overflow-hidden rounded-3xl border border-[#DCA842]/25 bg-[#1E1E1E] px-7 py-16 sm:px-12 sm:py-24">
          <div aria-hidden="true" className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#DCA842] to-transparent" />
          <Camera size={34} strokeWidth={1.2} className="mb-7 text-[#DCA842]" />
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#DCA842]">The photo journal</p>
          <h2 id="photos-heading" className="text-3xl font-medium tracking-tight sm:text-4xl">The details deserve a closer look.</h2>
        </section>
        <footer className="mt-10 flex flex-col justify-between gap-5 border-t border-white/10 py-7 text-sm text-white/50 sm:flex-row">
          <span>Cybercab @ Autoshow Zürich · Marko Sarafijanovic</span>
          <a href="https://www.tesla.com/fr_ch/event/cybercab-is-on-tour-in-europe-and-zurich-is-next" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#DCA842] hover:underline">Tesla event details <ArrowUpRight size={16} /></a>
        </footer>
      </div>
    </main>
  )
}
