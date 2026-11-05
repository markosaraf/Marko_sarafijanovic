import Gallery from './gallery'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin, ChevronRight } from 'lucide-react'


export default function RobotaxiPreview() {
  return (
    <main className="robotaxi-comparison">
      <style>{`
        @font-face {font-family: RobotaxiText;src:url('/cybercab/artwork/UniversalSans-Text-Regular-430.ttf') format('truetype');font-display:swap;}
        @font-face {font-family: RobotaxiDisplay;src:url('/cybercab/artwork/UniversalSans-Display-Medium-540.ttf') format('truetype');font-weight:500;font-display:swap;}
        .robotaxi-comparison {min-height:100vh;background:#e5e5e7;color:#171819;font-family:RobotaxiText,Arial,sans-serif;padding:20px 24px;}
        .robotaxi-shell {max-width:1120px;margin:auto;}
        .robotaxi-nav {display:flex;align-items:center;justify-content:space-between;gap:20px;padding:0 0 24px;width:calc(100vw - 48px);margin-left:calc(50% - 50vw + 24px);font-size:14px;color:#595b5e;}
        .robotaxi-nav a {display:flex;align-items:center;gap:8px;}
        .robotaxi-hero {background:#171819;border-radius:14px;padding:20px 30px;color:#f4f4f4;display:grid;grid-template-columns:1fr 225px;gap:12px 28px;align-items:center;}
        .robotaxi-eyebrow {font-size:13px;letter-spacing:.08em;color:#ddce94;margin:0 0 24px;}
        .robotaxi-hero h1 {font-family:RobotaxiDisplay,Arial,sans-serif;font-weight:500;font-size:56px;line-height:1.12;letter-spacing:-2px;margin:0;}
        .robotaxi-hero h1 span {display:block;color:#e5d79e;font-size:34px;letter-spacing:-1px;margin-top:12px;}
        .robotaxi-intro {grid-column:1/-1;color:#aaaeb1;font-size:16px;line-height:1.7;margin:0;max-width:400px;}
        .robotaxi-wordmark {width:225px;height:80px;object-fit:contain;margin:0;}
        .robotaxi-vehicle {width:100%;height:230px;object-fit:contain;}
        .robotaxi-artwork {margin-top:32px;}
        .robotaxi-artwork>figure {margin:0;overflow:hidden;border-radius:14px;background:#171819;}
        .robotaxi-artwork>figure>img {display:block;width:100%;max-height:500px;object-fit:cover;}
        .robotaxi-artwork figcaption {font-size:12px;color:#64666a;padding:12px 0;}
        .robotaxi-artwork>figure>figcaption {padding:14px 20px;color:#b7b8ba;}
        .robotaxi-views {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:16px;}
        .robotaxi-views a {display:block;border-radius:12px;background:#f6f6f6;padding:22px;}
        .robotaxi-views img {height:190px;width:100%;object-fit:contain;}
        .robotaxi-views figure {margin:0;}
        @media(max-width:650px){.robotaxi-views{grid-template-columns:1fr;}.robotaxi-vehicle{height:210px;}.robotaxi-artwork>figure>img{height:260px;}}

        .robotaxi-details {display:flex;flex-wrap:wrap;gap:16px;grid-column:1/-1;margin-top:0;}
        .robotaxi-detail {display:flex;gap:8px;align-items:center;padding:0;}
        .robotaxi-detail + .robotaxi-detail {border:0;}
        .robotaxi-detail svg {color:#b7b8ba;flex-shrink:0;width:16px;height:16px;}
        .robotaxi-detail small {display:block;font-size:12px;color:#b7b8ba;margin-bottom:2px;}
        .robotaxi-detail p {font-size:13px;margin:0;}
        .robotaxi-journal {margin-top:48px;}
        .robotaxi-journal h2 {font-family:RobotaxiDisplay,Arial,sans-serif;font-weight:500;font-size:26px;margin:0 0 10px;}
        .robotaxi-journal p {color:#626467;font-size:15px;line-height:1.6;margin:0;}
        .robotaxi-event {display:flex;align-items:center;gap:16px;margin-top:28px;border-radius:12px;background:#f6f6f6;padding:22px 26px;transition:background .2s;}
        .robotaxi-event:hover {background:white;}
        .robotaxi-event span {flex:1;font-size:15px;}
        .robotaxi-footer {display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-top:56px;font-size:12px;color:#74767a;}
        .robotaxi-comparison a:focus-visible {outline:2px solid #9a782c;outline-offset:6px;}
        @media(min-width:1280px) and (max-width:1399px){.robotaxi-hero{margin-inline:90px;}}
          @media(min-width:1280px){.robotaxi-nav{position:absolute;top:20px;left:24px;right:24px;width:auto;margin:0;padding:0;}.robotaxi-hero{padding-top:0;padding-bottom:12px;}}
        @media(max-width:760px){.robotaxi-comparison{padding:20px 18px;}.robotaxi-hero{padding:20px 16px;grid-template-columns:minmax(0,1fr) 95px;gap:12px;}.robotaxi-hero h1{font-size:36px;}.robotaxi-hero h1 span{font-size:22px;}.robotaxi-wordmark{width:95px;height:40px;margin:0;}.robotaxi-details{grid-template-columns:1fr 1fr;}.robotaxi-detail+.robotaxi-detail{border:0;}.robotaxi-detail{padding:0;}.robotaxi-nav{font-size:12px;}}
      `}</style>
      <div className="robotaxi-shell">
        <nav className="robotaxi-nav"><Link href="/"><ArrowLeft size={18}/>Back to home</Link><span>Marko Sarafijanovic</span></nav>
        <header className="robotaxi-hero">
          <div><h1>Cybercab<span>@ Autoshow Zürich</span></h1></div>
          <div><img className="robotaxi-wordmark" src="/cybercab/artwork/robotaxi-gold-logo.png" alt="Robotaxi" width="348" height="123" /></div>
        <p className="robotaxi-intro">Up close with Tesla’s Cybercab at Autoshow Zürich.</p>
        <div className="robotaxi-details">
          <div className="robotaxi-detail"><CalendarDays size={22}/><div><small>Date</small><p>5–8 November 2026</p></div></div>
          <div className="robotaxi-detail"><MapPin size={22}/><div><small>Event</small><p>Autoshow Zürich</p></div></div>
        </div>
        </header>
        <Gallery pale />
        <a className="robotaxi-event" href="https://www.tesla.com/fr_ch/event/cybercab-is-on-tour-in-europe-and-zurich-is-next" target="_blank" rel="noopener noreferrer"><ArrowUpRight size={22}/><span>Tesla event details</span><ChevronRight size={20}/></a>
        <footer className="robotaxi-footer"><span>Cybercab @ Autoshow Zürich</span><span>Marko Sarafijanovic</span></footer>
      </div>
    </main>
  )
}
