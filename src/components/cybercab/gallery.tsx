'use client'
import { useState } from 'react'
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
 const [selected,setSelected] = useState(12)
 const [file,label] = assets[selected]
 return <section className="cybercab-gallery" style={{marginTop:32,color:pale?'#171819':'#f7f3e9'}} aria-label="Robotaxi artwork collection">
 <style>{`.cybercab-gallery .asset-stage{background:#171819;border:1px solid #ffffff20;border-radius:16px;overflow:hidden}.cybercab-gallery .asset-stage img{width:100%;height:440px;object-fit:contain;display:block}.cybercab-gallery .asset-stage figcaption{padding:16px 22px;color:#e5d79e;display:flex;justify-content:space-between;gap:16px}.cybercab-gallery .asset-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:16px}.cybercab-gallery button{background:#202224;border:2px solid transparent;border-radius:12px;padding:12px;cursor:pointer;color:#eee;text-align:left}.cybercab-gallery button[aria-pressed=true]{border-color:#DCA842}.cybercab-gallery button:focus-visible{outline:3px solid #DCA842;outline-offset:3px}.cybercab-gallery button img{width:100%;height:110px;object-fit:contain}.cybercab-gallery button span{display:block;font-size:12px;margin-top:10px}.cybercab-gallery .artwork-credit{font-size:12px;opacity:.7;margin:14px 0 28px}@media(max-width:650px){.cybercab-gallery .asset-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.cybercab-gallery .asset-stage img{height:260px}.cybercab-gallery .asset-stage figcaption{font-size:13px}}`}</style>
 <h2 style={{fontSize:26,marginBottom:16}}>Cybercab, every angle.</h2>
 <figure className="asset-stage"><img src={'/cybercab/artwork/'+file} alt={label}/><figcaption><span>{label}</span><a href={'/cybercab/artwork/'+file} target="_blank" rel="noopener noreferrer">Full size ↗</a></figcaption></figure>
 <p className="artwork-credit">Tesla Robotaxi app artwork</p>
 <div className="asset-grid">{assets.map(([f,l],i)=><button key={f} aria-pressed={i===selected} onClick={()=>setSelected(i)}><img src={'/cybercab/artwork/'+f} alt="" loading="lazy"/><span>{l}</span></button>)}</div>
 </section>
}
