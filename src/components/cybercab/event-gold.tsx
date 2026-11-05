import Gallery from './gallery'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'

export default function CybercabPage() {
  return (
    <main className="min-h-screen bg-[#111111] text-[#f7f3e9] selection:bg-[#DCA842] selection:text-[#111111]">
      <div className="mx-auto max-w-6xl px-6 py-5 md:px-10">
        <nav className="event-corner-nav flex items-center justify-between gap-4 text-sm">
          <Link href="/" className="flex items-center gap-2 text-white/70 transition-colors hover:text-[#DCA842]"><ArrowLeft size={18} /> Back to home</Link>
          <span className="text-white/50">Marko Sarafijanovic</span>
        </nav>
        <style>{`
          .event-corner-nav {width:calc(100vw - 48px);margin-left:calc(50% - 50vw + 24px);}
          .compact-gold-hero {padding:28px 0 0;display:grid;grid-template-columns:minmax(0,1fr) 225px;align-items:center;column-gap:32px;}
          .compact-gold-hero h1 {grid-column:1;grid-row:1;font-size:64px;}
          .compact-gold-hero h1 span {font-size:38px;}
          .cybercab-hero-logo {grid-column:2;grid-row:1;width:225px;height:80px;}
          .compact-gold-hero>p,.compact-gold-hero>.event-details {grid-column:1/-1;}
          @media(min-width:1280px) and (max-width:1399px){.compact-gold-hero{margin-inline:90px;}}
          @media(min-width:1280px){.event-corner-nav{position:absolute;top:20px;left:24px;right:24px;width:auto;margin:0;}.compact-gold-hero{padding-top:0;}}
          @media(max-width:650px){.compact-gold-hero{grid-template-columns:minmax(0,1fr) 95px;gap:12px;padding-top:24px;}.compact-gold-hero h1{font-size:40px;}.compact-gold-hero h1 span{font-size:23px;}.cybercab-hero-logo{width:95px;height:40px;}.event-corner-nav{font-size:12px;}}
        `}</style>
        <header className="compact-gold-hero">
          <div aria-hidden="true" className="cybercab-hero-logo pointer-events-none bg-[#DCA842]" style={{ maskImage: "url(/cybercab/robotaxi-logo.png)", maskSize: "contain", maskPosition: "center", maskRepeat: "no-repeat", WebkitMaskImage: "url(/cybercab/robotaxi-logo.png)", WebkitMaskSize: "contain", WebkitMaskPosition: "center", WebkitMaskRepeat: "no-repeat" }} />
          <h1 className="relative text-5xl font-semibold leading-[1.08] tracking-tight sm:text-7xl md:text-8xl">Cybercab<span className="mt-2 block text-[#DCA842] text-3xl sm:text-5xl md:text-6xl">@ Autoshow Zürich</span></h1>
          <p className="mt-4 text-base leading-relaxed text-white/60">Up close with Tesla’s Cybercab at Autoshow Zürich.</p>
          <div className="event-details mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/75">
            <span className="flex items-center gap-2"><CalendarDays size={17} className="text-[#DCA842]" />5–8 November 2026</span>
            <span className="flex items-center gap-2"><MapPin size={17} className="text-[#DCA842]" />Autoshow Zürich</span>
          </div>
        </header>
        <Gallery />
        <footer className="mt-10 flex flex-col justify-between gap-5 border-t border-white/10 py-7 text-sm text-white/50 sm:flex-row">
          <span>Cybercab @ Autoshow Zürich · Marko Sarafijanovic</span>
          <a href="https://www.tesla.com/fr_ch/event/cybercab-is-on-tour-in-europe-and-zurich-is-next" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#DCA842] hover:underline">Tesla event details <ArrowUpRight size={16} /></a>
        </footer>
      </div>
    </main>
  )
}
