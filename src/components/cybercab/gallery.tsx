'use client'
import { useState, useRef, useEffect } from 'react'
import { photoAssets } from './photos'
const baseAssets = [
 ['refer_details_background_landscape.jpg','Into the night'],
 ['CybercabTop.png','From above'],
 ['cybercab_and_my.png','Cybercab and Model Y'],
 ['CybercabSide.png','Cybercab'],
 ['accessibility_vehicle.png','Robovan'],
 ['CybercabSideNoGlow.png','Silhouette'],
 ['CybercabHeadlights.png','Headlights'],
 ['cybercab_back.png','Rear view'],
 ['cybercab_back_both_doors_open.png','Doors open'],
 ['coin_spritesheet.png','Robotaxi coins'],
 ['robotaxi_logo.png','Robotaxi — white'],
 ['robotaxi-gold-logo.png','Robotaxi — champagne'],
 ['tips_cybercab_door.png','Door detail'],
 ['cybercab_obstruction_left_door.svg','Door clearance'],
 ['tips_trunk_storage_cybercab.png','Boot space'],
 ['tips_arrival_lights_cybercab.png','Arrival lights'],
]
const lightAssets: Record<string,string> = {
 'cybercab_obstruction_left_door.svg':'cybercab_obstruction_left_door_light.svg',
 'CybercabSide.png':'CybercabSide_light.png',
 'CybercabSideNoGlow.png':'CybercabSideNoGlow_Light.png',
 'cybercab_and_my.png':'cybercab_and_my_light.png',
 'tips_cybercab_door.png':'tips_cybercab_door_light.png',
 'tips_trunk_storage_cybercab.png':'tips_trunk_storage_cybercab_light.png',
 'tips_arrival_lights_cybercab.png':'tips_arrival_lights_cybercab_light.png',
}
export default function Gallery({ pale = false, photos = false }: { pale?: boolean; photos?: boolean }) {
 const assetPath = photos ? '/cybercab/photos/' : '/cybercab/artwork/'
 const heading = photos ? 'Cybercab, my photo dump.' : 'Cybercab, every angle.'
 const assets = photos ? photoAssets : baseAssets.map(([file,label],i)=>[i===0 && !pale?'refer_details_background_duo_landscape.jpg':pale?(lightAssets[file] || file):file,label])
 const rail = useRef<HTMLDivElement>(null)
 const [selected,setSelected] = useState(0)
 const animation = useRef<number | null>(null)
 const targetIndex = useRef<number | null>(null)
 const cancelMotion = () => {
   if(animation.current !== null) cancelAnimationFrame(animation.current)
   animation.current = null
   targetIndex.current = null
   if(rail.current) rail.current.style.scrollSnapType = ''
 }
 useEffect(()=>()=>{if(animation.current !== null) cancelAnimationFrame(animation.current)},[])
 const go = (index:number) => {
   const viewport=rail.current
   const bounded=Math.max(0,Math.min(assets.length-1,index))
   const item=viewport?.children[bounded] as HTMLElement | undefined
   if(!viewport || !item) return
   cancelMotion()
   const start=viewport.scrollLeft
   const end=Math.max(0,Math.min(viewport.scrollWidth-viewport.clientWidth,item.offsetLeft-(viewport.clientWidth-item.clientWidth)/2))
   if(matchMedia('(prefers-reduced-motion: reduce)').matches){viewport.scrollLeft=end;return}
   targetIndex.current=bounded
   viewport.style.scrollSnapType='none'
   const began=performance.now()
   const duration=Math.min(1100,650+Math.abs(end-start)/6)
   const frame=(now:number)=>{
     const t=Math.min(1,(now-began)/duration)
     const eased=t*t*t*(t*(t*6-15)+10)
     viewport.scrollLeft=start+(end-start)*eased
     if(t<1){animation.current=requestAnimationFrame(frame)}
     else {animation.current=null;targetIndex.current=null;viewport.style.scrollSnapType='';setSelected(bounded)}
   }
   animation.current=requestAnimationFrame(frame)
 }

 return <section className="cybercab-gallery" style={{marginTop:24,color:pale?'#171819':'#f7f3e9'}} aria-label={photos ? "Cybercab photos by Marko Sarafijanovic" : "Robotaxi artwork collection"} aria-roledescription="carousel">
 <style>{`
 .cybercab-gallery .gallery-heading{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:12px}
 .cybercab-gallery .gallery-heading>span{white-space:nowrap;flex-shrink:0}
 .cybercab-gallery h2{font-size:clamp(26px,4vw,42px);letter-spacing:-.04em;margin:0}
 .cybercab-gallery .gallery-viewport{--card-radius:22px;border-radius:var(--card-radius);display:flex;position:relative;gap:24px;overflow-x:auto;scroll-snap-type:x mandatory;padding:12px 10% 28px;scrollbar-width:thin;scrollbar-color:#DCA842 transparent;perspective:1600px;overscroll-behavior-x:contain}
 .cybercab-gallery .gallery-slide{flex:0 0 100%;min-width:0;background:#fff;color:#171819;border-radius:var(--card-radius);clip-path:inset(0 round var(--card-radius));isolation:isolate;margin:0;scroll-snap-align:center;box-shadow:0 18px 30px #0002;transition:transform .45s,opacity .45s;transform:scale(.92) rotateY(var(--angle));transform-origin:center;opacity:.65;overflow:hidden}
 .cybercab-gallery .gallery-slide[data-active=true]{transform:scale(1) rotateY(0deg);opacity:1}
 .cybercab-gallery .gallery-slide img{width:100%;height:clamp(260px,calc(100svh - 440px),530px);object-fit:contain;display:block;user-select:none;padding:28px}
 .cybercab-gallery .gallery-slide img.night-art{padding:0;object-fit:cover;object-position:center}
 .cybercab-gallery .gallery-slide img.photo-art{padding:0;object-fit:contain}
 .cybercab-gallery .contrast-art{filter:brightness(0) opacity(.8)}
 .cybercab-gallery figcaption{border-top:1px solid #eee;padding:20px 26px;display:flex;justify-content:space-between;gap:16px;font-size:15px}
 .cybercab-gallery .gallery-controls{display:flex;align-items:center;justify-content:space-between;margin:22px 0;gap:16px}
 .cybercab-gallery .gallery-arrows{display:flex;gap:10px}
 .cybercab-gallery button{border:1px solid #aaa5;background:transparent;color:inherit;cursor:pointer}
 .cybercab-gallery .gallery-arrows button{border-radius:50%;width:48px;height:48px;font-size:24px}
 .cybercab-gallery button:disabled{opacity:.25;cursor:default}
 .cybercab-gallery button:focus-visible,.cybercab-gallery .gallery-viewport:focus-visible{outline:3px solid #DCA842;outline-offset:3px}
 .cybercab-gallery .gallery-progress{display:flex;gap:5px;flex:1;max-width:360px}
 .cybercab-gallery .gallery-progress button{height:24px;flex:1;border:0;position:relative;padding:0}
 .cybercab-gallery .gallery-progress button:after{content:'';height:3px;position:absolute;top:10px;left:0;right:0;background:#8885;border-radius:3px}
 .cybercab-gallery .gallery-progress button[aria-current=true]:after{background:#DCA842;height:5px;top:9px}
 .cybercab-gallery .artwork-credit{font-size:12px;opacity:.65;margin-top:18px}
 @media(max-width:650px){.cybercab-gallery{margin-top:16px!important}.cybercab-gallery .gallery-viewport{--card-radius:16px;gap:12px;padding:20px 4% 28px}.cybercab-gallery .gallery-slide{border-radius:16px}.cybercab-gallery .gallery-slide img{height:clamp(160px,calc(100svh - 330px),530px);padding:16px}.cybercab-gallery figcaption{font-size:12px;padding:16px}.cybercab-gallery .gallery-controls{flex-wrap:wrap}.cybercab-gallery .gallery-progress{max-width:none}.cybercab-gallery .gallery-slide{transform:scale(.95);opacity:.8}}
 @media(max-width:340px){.cybercab-gallery .gallery-slide img{height:clamp(140px,calc(100svh - 380px),480px)}}
 @media(prefers-reduced-motion:reduce){.cybercab-gallery .gallery-slide{transition:none}}
 `}</style>
 <div className="gallery-heading"><h2>{heading}</h2><span aria-live="polite">{String(selected+1).padStart(2,'0')} / {assets.length}</span></div>
 <div className="gallery-viewport" ref={rail} onWheel={cancelMotion} onPointerDown={cancelMotion} tabIndex={0} aria-label="Scroll sideways or use arrow keys to browse" onScroll={()=>{if(!rail.current)return;const el=rail.current;const center=el.scrollLeft+el.clientWidth/2;let closest=0;let distance=Infinity;Array.from(el.children).forEach((child,i)=>{const c=child as HTMLElement;const d=Math.abs(c.offsetLeft+c.clientWidth/2-center);if(d<distance){distance=d;closest=i}});setSelected(closest)}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();go((targetIndex.current ?? selected)+1)}if(e.key==='ArrowLeft'){e.preventDefault();go((targetIndex.current ?? selected)-1)}}}>
 {assets.map(([file,label],i)=><figure className="gallery-slide" style={{'--angle':i<selected?'12deg':'-12deg',background:file==='CybercabHeadlights.png'?'#000000':!pale?'#DCA842':undefined,color:file==='CybercabHeadlights.png'?'#f7f3e9':undefined} as React.CSSProperties} data-active={i===selected} key={label} role="group" aria-roledescription="slide" aria-label={`${i+1} of ${assets.length}`}><img className={photos?'photo-art':file==='robotaxi_logo.png'?'contrast-art':(file.startsWith('refer_details_background') || file==='accessibility_vehicle.png')?'night-art':undefined} src={assetPath+file} srcSet={photos ? `${assetPath+file.replace('.webp','-small.webp')} 800w, ${assetPath+file} 1600w` : undefined} sizes={photos ? '(max-width:650px) 90vw, 900px' : undefined} alt={label} draggable={false} loading={i<2?'eager':'lazy'}/><figcaption style={{borderTopColor:pale?undefined:'#111111'}}><span>{label}</span><a href={assetPath+(photos ? file.replace('.webp','.jpg') : file)} target="_blank" rel="noopener noreferrer">Full size ↗</a></figcaption></figure>)}
 </div>
 <div className="gallery-controls"><div className="gallery-progress">{assets.map(([,label],i)=><button key={label} aria-label={'Show '+label} aria-current={selected===i} onClick={()=>go(i)}/>)}</div><div className="gallery-arrows"><button aria-label="Previous image" disabled={selected===0} onClick={()=>go((targetIndex.current ?? selected)-1)}>←</button><button aria-label="Next image" disabled={selected===assets.length-1} onClick={()=>go((targetIndex.current ?? selected)+1)}>→</button></div></div>
 <p className="artwork-credit">{photos ? 'Photos by Marko Sarafijanovic · Auto Zürich, 5 November 2026' : 'Tesla Robotaxi app artwork'}</p>
 </section>
}
