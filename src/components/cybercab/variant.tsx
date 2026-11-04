'use client'
import { useEffect, useState, type ReactNode } from 'react'
let documentVariant: 'gold' | 'pale' | undefined
function selectVariant() {
  if (documentVariant) return documentVariant
  try {
    const previous = sessionStorage.getItem('cybercab-design')
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    documentVariant = navigation?.type === 'reload'
      ? (previous === 'pale' ? 'gold' : 'pale')
      : (previous === 'gold' ? 'gold' : 'pale')
    sessionStorage.setItem('cybercab-design', documentVariant)
  } catch { documentVariant = 'pale' }
  return documentVariant
}
export default function Variant({ gold, pale }: { gold: ReactNode; pale: ReactNode }) {
  const [variant, setVariant] = useState<'gold' | 'pale'>('gold')
  useEffect(() => { setVariant(selectVariant()) }, [])
  return <div data-site-design={variant}>{variant === 'pale' ? pale : gold}</div>
}
