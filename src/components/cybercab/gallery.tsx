'use client'
import { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
const assets = [
 ['CybercabSide.png','Cybercab — illuminated'],
 ['CybercabSide_light.png','Cybercab — light study'],
 ['CybercabSideNoGlow.png','Cybercab — clean silhouette'],
 ['CybercabHeadlights.png','Signature headlights'],
 ['CybercabTop.png','Cybercab from above'],
 ['cybercab_and_my.png','Cybercab and Model Y'],
 ['cybercab_back.png','Rear view'],
 ['cybercab_back_both_doors_open.png','Doors open'],
 ['cybercab_topdown_seats_with_floor.png','Inside the cabin'],
 ['robotaxi_coin.png','Robotaxi emblem'],
 ['robotaxi_logo.png','Robotaxi — white'],
 ['robotaxi-gold-logo.png','Robotaxi — champagne'],
 ['refer_details_background_landscape.jpg','Into the night'],
 ['tips_cybercab_door.png','The door detail'],
 ['tips_trunk_storage_cybercab.png','Room for the ride'],
 ['tips_arrival_lights_cybercab.png','Arrival lights'],
]
export default function Gallery({ pale = false }: { pale?: boolean }) {
 const [viewport, api] = useEmblaCarousel({align:'start',containScroll:'trimSnaps'})
 const [selected,setSelected] = useState(0)
 useEffect(()=>{
   if (!api) return
   const update=()=>setSelected(api.selectedScrollSnap())
   update()
   api.on('select',update).on('reInit',update)
   return ()=>{api.off('select',update).off('reInit',update)}
 },[api])
 return <section className="cybercab-gallery" style={{marginTop:32,color:pale?'#171819':'#f7f3e9'}} aria-label="Robotaxi artwork collection" aria-roledescription="carousel">
 <style>{`.cybercab-gallery .gallery-viewport{overflow:hidden;cursor:grab}.cybercab-gallery .gallery-viewport:active{cursor:grabbing}.cybercab-gallery .gallery-track{display:flex;touch-action:pan-y pinch-zoom;gap:20px}.cybercab-gallery .gallery-slide{flex:0 0 88%;min-width:0;background:#171819;border:1px solid #ffffff20;border-radius:16px;overflow:hidden;margin:0}.cybercab-gallery .gallery-slide img{width:100%;height:500px;object-fit:contain;display:block;user-select:none}.cybercab-gallery figcaption{padding:18px 24px;color:#e5d79e;display:flex;justify-content:space-between;gap:16px}.cybercab-gallery .gallery-controls{display:flex;align-items:center;justify-content:space-between;margin:20px 0;gap:16px}.cybercab-gallery button{background:#202224;border:1px solid #777;border-radius:50%;width:48px;height:48px;cursor:pointer;color:#e5d79e;font-size:24px}.cybercab-gallery button:disabled{opacity:.3;cursor:default}.cybercab-gallery button:focus-visible,.cybercab-gallery .gallery-viewport:focus-visible{outline:3px solid #DCA842;outline-offset:3px}.cybercab-gallery .artwork-credit{font-size:12px;opacity:.7}@media(max-width:650px){.cybercab-gallery .gallery-slide{flex-basis:92%}.cybercab-gallery .gallery-slide img{height:330px}.cybercab-gallery figcaption{font-size:13px;padding:16px}.cybercab-gallery .gallery-track{gap:12px}}`}</style>
 <h2 style={{fontSize:26,marginBottom:16}}>Cybercab, every angle.</h2>
 <div className="gallery-viewport" ref={viewport} tabIndex={0} aria-label="Swipe or use arrow keys to browse" onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();api?.scrollNext()}if(e.key==='ArrowLeft'){e.preventDefault();api?.scrollPrev()}}}>
 <div className="gallery-track">{assets.map(([file,label],i)=><figure className="gallery-slide" key={file} role="group" aria-roledescription="slide" aria-label={`${i+1} of ${assets.length}`}><img src={'/cybercab/artwork/'+file} alt={label} draggable={false} loading={i<2?'eager':'lazy'}/><figcaption><span>{label}</span><a href={'/cybercab/artwork/'+file} target="_blank" rel="noopener noreferrer">Full size ↗</a></figcaption></figure>)}</div>
 </div>
 <div className="gallery-controls"><span className="artwork-credit">Tesla Robotaxi app artwork</span><div style={{display:'flex',alignItems:'center',gap:16}}><span aria-live="polite">{selected+1} / {assets.length}</span><button aria-label="Previous image" disabled={selected===0} onClick={()=>api?.scrollPrev()}>←</button><button aria-label="Next image" disabled={selected===assets.length-1} onClick={()=>api?.scrollNext()}>→</button></div></div>
 </section>
}
