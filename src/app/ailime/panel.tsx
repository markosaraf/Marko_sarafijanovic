'use client'
import { useEffect, useState } from 'react'
import styles from './panel.module.css'
export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(true)
  const [message, setMessage] = useState('')
  useEffect(() => {
    fetch('/api/ailime', { cache: 'no-store' }).then(r => r.json()).then(data => {
      setAuthenticated(!!data.authenticated); setEnabled(!!data.enabled)
      if (data.error) setMessage(data.error)
    }).catch(() => setMessage('Unable to connect. Please reload.')).finally(() => setBusy(false))
  }, [])
  async function submit(action: string, value?: boolean) {
    setBusy(true); setMessage('')
    try {
      const response = await fetch('/api/ailime', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, ...(action === 'login' ? { password } : {}), enabled: value }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to save.')
      setAuthenticated(!!data.authenticated); setEnabled(!!data.enabled); setPassword('')
      if (action === 'toggle') setMessage(data.enabled ? 'User counter is visible.' : 'User counter is hidden.')
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to save.') }
    finally { setBusy(false) }
  }
  return <main className={styles.page}><section className={styles.panel}>
    <a href="/">Back to home</a><h1>Site controls</h1>
    {authenticated ? <><h2>Quizlet Gravity user counter</h2><label className={styles.toggle}><input type="checkbox" checked={enabled} disabled={busy} onChange={event => void submit('toggle', event.target.checked)} />Show user count on the homepage</label><p>Includes active accounts and guests. Applies to both homepage themes.</p><button disabled={busy} onClick={() => void submit('logout')}>Sign out</button></> : <form onSubmit={event => { event.preventDefault(); void submit('login') }}><label htmlFor="admin-password">Password</label><input id="admin-password" type="password" autoComplete="current-password" required maxLength={256} value={password} onChange={event => setPassword(event.target.value)} /><button disabled={busy}>{busy ? 'Please wait…' : 'Sign in'}</button></form>}
    <p role="status">{message}</p>
  </section></main>
}
