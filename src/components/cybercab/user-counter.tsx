'use client'
import { useEffect, useState } from 'react'
import styles from './project-cards.module.css'
export function UserCounter() {
  const [total, setTotal] = useState<number | null>(null)
  useEffect(() => {
    const controller = new AbortController()
    async function refresh() {
      try {
        const response = await fetch('/api/quizlet-users', { cache: 'no-store', signal: controller.signal })
        const data = await response.json()
        setTotal(response.ok && data.enabled && Number.isInteger(data.total) ? data.total : null)
      } catch { if (!controller.signal.aborted) setTotal(null) }
    }
    void refresh()
    const interval = setInterval(refresh, 60000)
    const onFocus = () => void refresh()
    window.addEventListener('focus', onFocus)
    return () => { controller.abort(); clearInterval(interval); window.removeEventListener('focus', onFocus) }
  }, [])
  return total === null ? null : <span className={styles.userCounter}>Users: {total.toLocaleString('en-US')}</span>
}
