'use client'
import { useEffect, useState, type ReactNode } from 'react'
type Design = 'gold' | 'pale'
let documentVariant: Design | undefined
function selectVariant(): Design {
  if (documentVariant) return documentVariant
  const fixed = new URLSearchParams(location.search).get('design')
  if (fixed === 'gold' || fixed === 'pale') return documentVariant = fixed
  let previous = document.cookie.match(/(?:^|; )cybercab-design=(gold|pale)/)?.[1]
  try { previous = localStorage.getItem('cybercab-design') || previous } catch {}
  let next: Design = previous === 'pale' ? 'gold' : 'pale'
  try {
    const pending = JSON.parse(sessionStorage.getItem('cybercab-navigation') || 'null')
    sessionStorage.removeItem('cybercab-navigation')
    if (pending?.path === location.pathname && Date.now() - pending.time < 5000 && ['gold','pale'].includes(pending.design)) next = pending.design
  } catch {}
  try { localStorage.setItem('cybercab-design', next) } catch {}
  document.cookie = `cybercab-design=${next}; Path=/; Max-Age=31536000; SameSite=Lax`
  return documentVariant = next
}
export default function Variant({ gold, pale }: { gold: ReactNode; pale: ReactNode }) {
  const [variant, setVariant] = useState<Design | null>(null)
  useEffect(() => {
    const selected = selectVariant()
    setVariant(selected)
    function preserveOnNavigation(event: MouseEvent) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
      const link = (event.target as Element).closest('a')
      if (!link || link.target === '_blank') return
      const target = new URL(link.href, location.href)
      if (target.origin !== location.origin || !['/','/cybercab-autoshow-zurich'].includes(target.pathname) || target.pathname === location.pathname) return
      try { sessionStorage.setItem('cybercab-navigation', JSON.stringify({path:target.pathname,time:Date.now(),design:selected})) } catch {}
    }
    document.addEventListener('click',preserveOnNavigation,true)
    return ()=>document.removeEventListener('click',preserveOnNavigation,true)
  }, [])
  if (!variant) return <div style={{minHeight:'100vh',background:'#171819'}} aria-busy="true"><noscript>{gold}</noscript></div>
  return <div data-site-design={variant}>{variant === 'pale' ? pale : gold}</div>
}
