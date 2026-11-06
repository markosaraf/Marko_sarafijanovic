import Gallery from './gallery'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'

export default function CybercabPage() {
  return (
    <main className="gold-event min-h-screen bg-[#111111] text-[#f7f3e9] selection:bg-[#DCA842] selection:text-[#111111]">
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
          @media(max-width:650px){
            .gold-event>div{padding:12px 18px;}
            .event-corner-nav{position:absolute;top:12px;left:18px;right:18px;width:auto;margin:0;font-size:10px;align-items:start;}
            .event-corner-nav a{gap:4px;}.event-corner-nav svg{width:12px;}.event-corner-nav>span{width:80px;text-align:right;}
            .compact-gold-hero{position:relative;display:block;padding:0;}
            .compact-gold-hero h1{margin-left:90px;font-size:clamp(24px,7.7vw,30px);line-height:1.12;pointer-events:none;}
            .compact-gold-hero h1 span{margin-left:-90px;margin-top:16px;font-size:18px;}
            .cybercab-hero-logo{position:absolute;right:0;top:40px;width:clamp(100px,30.7vw,120px);height:44px;}
            .compact-gold-hero>p{margin-top:18px;font-size:13px;line-height:1.4;}
            .compact-gold-hero>.event-details{margin-top:10px;font-size:11px;gap:10px;}
          }
        `}</style>
        <header className="compact-gold-hero">
          <div aria-hidden="true" className="cybercab-hero-logo pointer-events-none bg-[#DCA842]" style={{ maskImage: "url(/cybercab/robotaxi-logo.png)", maskSize: "contain", maskPosition: "center", maskRepeat: "no-repeat", WebkitMaskImage: "url(/cybercab/robotaxi-logo.png)", WebkitMaskSize: "contain", WebkitMaskPosition: "center", WebkitMaskRepeat: "no-repeat" }} />
          <h1 className="relative text-5xl font-semibold leading-[1.08] tracking-tight sm:text-7xl md:text-8xl">Cybercab<span className="mt-2 block text-[#DCA842] text-3xl sm:text-5xl md:text-6xl">@ Auto Zürich</span></h1>
          <p className="mt-4 text-base leading-relaxed text-white/60">Up close with Tesla’s Cybercab at Auto Zürich.</p>
          <div className="event-details mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/75">
            <span className="flex items-center gap-2"><CalendarDays size={17} className="text-[#DCA842]" />5–8 November 2026</span>
            <span className="flex items-center gap-2"><MapPin size={17} className="text-[#DCA842]" />Auto Zürich</span>
          </div>
        </header>
        <Gallery photos />
        <Gallery />
        <footer className="mt-10 flex flex-col justify-between gap-5 border-t border-white/10 py-7 text-sm text-white/50 sm:flex-row">
          <span>Cybercab @ Auto Zürich · Marko Sarafijanovic</span>
          <a href="https://www.tesla.com/fr_ch/event/cybercab-is-on-tour-in-europe-and-zurich-is-next" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#DCA842] hover:underline">Tesla event details <ArrowUpRight size={16} /></a>
        </footer>
      </div>
    </main>
  )
}
