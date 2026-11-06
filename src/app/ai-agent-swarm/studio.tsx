'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './studio.module.css'

const presets = [
  ['Marko Sarafijanovic', 'https://marko-sarafijanovic.com', 'marko'],
  ['Quizlet Gravity', 'https://quizletgravity.com', 'gravity'],
  ['Swiss FSD', 'https://swiss-fsd.ch', 'swiss-fsd'],
]

// Remote markup never joins the application's DOM. The sandbox has an opaque
// origin, no forms/popups/top navigation, and permits only our nonce-tagged script.
function makePreview(html: string, url: string, agents: number, speed: number, follow: boolean) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  doc.querySelectorAll('script,iframe,frame,frameset,object,embed,portal,base,meta[http-equiv],form,template,noscript,foreignObject').forEach(e => e.remove())
  doc.querySelectorAll('*').forEach(el => {
    for (const attr of [...el.attributes]) {
      if (/^on/i.test(attr.name) || ['srcdoc', 'nonce', 'autofocus', 'action', 'formaction', 'is', 'ping'].includes(attr.name)) el.removeAttribute(attr.name)
    }
    for (const key of ['src', 'href', 'xlink:href', 'poster']) {
      const value = el.getAttribute(key)
      if (!value) continue
      try {
        const dest = new URL(value, url)
        if (dest.protocol !== 'https:' && !(key === 'src' && /^data:image\/(png|jpeg|webp|gif);base64,/i.test(value))) el.removeAttribute(key)
        else el.setAttribute(key, dest.href)
      } catch { el.removeAttribute(key) }
    }
    if (el.tagName === 'IMG') { el.removeAttribute('srcset'); el.setAttribute('loading', 'eager') }
    if (el.tagName === 'LINK' && el.getAttribute('rel') !== 'stylesheet') el.remove()
    if (el.tagName === 'A') { el.removeAttribute('href'); el.removeAttribute('target') }
  })
  const base = doc.createElement('base'); base.href = url; doc.head.prepend(base)
  const nonce = crypto.randomUUID().replaceAll('-', '')
  const policy = doc.createElement('meta'); policy.httpEquiv = 'Content-Security-Policy'
  policy.content = `default-src 'none'; script-src 'nonce-${nonce}'; style-src https: 'unsafe-inline'; img-src https: data:; font-src https: data:; media-src 'none'; connect-src 'none'; form-action 'none'; base-uri https:;`
  doc.head.prepend(policy)
  const meta = doc.createElement('meta'); meta.name = 'referrer'; meta.content = 'no-referrer'; doc.head.prepend(meta)
  const style = doc.createElement('style')
  style.textContent = 'html{scroll-behavior:auto!important}body{overflow-x:hidden!important}*,*::before,*::after{animation:none!important;transition:none!important}input,button,select,textarea,a{pointer-events:none!important}'
  doc.head.append(style)
  const script = doc.createElement('script'); script.setAttribute('nonce', nonce)
  script.src = `${location.origin}/swarm/engine.js`
  script.dataset.agents = String(agents); script.dataset.speed = String(speed); script.dataset.follow = String(follow)
  doc.body.append(script)
  return '<!doctype html>' + doc.documentElement.outerHTML
}

export default function SwarmStudio() {
  const [url, setUrl] = useState('https://marko-sarafijanovic.com')
  const [agents, setAgents] = useState(4)
  const [speed, setSpeed] = useState(1)
  const [follow, setFollow] = useState(true)
  const [paused, setPaused] = useState(false)
  const [source, setSource] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [controlsOpen, setControlsOpen] = useState(false)
  const [quiet, setQuiet] = useState(false)
  const root = useRef<HTMLElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const cached = useRef<{ html: string; url: string } | null>(null)
  const abort = useRef<AbortController | null>(null)
  const send = (data: object) => frame.current?.contentWindow?.postMessage({ type: 'swarm-control', ...data }, '*')

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow || event.data?.type !== 'swarm-status') return
      setStatus(String(event.data.message).slice(0, 100))
    }
    window.addEventListener('message', handler)
    return () => { window.removeEventListener('message', handler); abort.current?.abort() }
  }, [])

  useEffect(() => {
    if (!source) return
    const id = setTimeout(() => setQuiet(true), 2500)
    return () => clearTimeout(id)
  }, [source])

  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else if (root.current?.requestFullscreen) await root.current.requestFullscreen()
      else setError('Use your browser’s full-screen command on this device.')
    } catch { setError('Use your browser’s full-screen command on this device.') }
  }

  async function load(value = url) {
    abort.current?.abort()
    const controller = new AbortController(); abort.current = controller
    setBusy(true); setError(''); setStatus('Loading website…'); setUrl(value)
    try {
      const parsed = new URL(value.includes('://') ? value : `https://${value}`)
      if (parsed.protocol !== 'https:') throw new Error('Please use an HTTPS website URL.')
      const preset = presets.find(p => new URL(p[1]).hostname === parsed.hostname.replace(/^www\./, '') && parsed.pathname === '/')
      let result: { html: string; url: string }
      if (preset) {
        const response = await fetch(`/swarm/snapshots/${preset[2]}.html`, { signal: controller.signal })
        if (!response.ok) throw new Error('Could not load this preview.')
        result = { html: await response.text(), url: preset[1] }
      } else {
        const response = await fetch(`/api/swarm/snapshot?url=${encodeURIComponent(parsed.href)}`, { signal: controller.signal })
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || 'Could not load this website.')
        result = data
      }
      cached.current = result
      setSource(makePreview(result.html, result.url, agents, speed, follow)); setPaused(false); setControlsOpen(false); setQuiet(false); setStatus('Preparing the canvas…')
    } catch (e) {
      if (controller.signal.aborted) return
      setError(e instanceof Error ? e.message : 'Could not load this website.'); setStatus('')
    } finally { if (!controller.signal.aborted) setBusy(false) }
  }

  function replay() {
    const saved = cached.current
    if (saved) { setSource(makePreview(saved.html, saved.url, agents, speed, follow)); setPaused(false); setStatus('Preparing the canvas…') }
  }

  return <main ref={root} className={`${styles.studio} ${source ? styles.playing : ''} ${controlsOpen ? styles.controlsOpen : ''}`}>
    <header className={styles.header}>
      <a href="/" className={styles.back}>← Marko Sarafijanovic</a>
      <h1>Your sites, rebuilt by an AI agent swarm.</h1>
      {!source && <p>Pick a site. Set the pace. Watch it come together.</p>}
    </header>
    <form className={styles.controls} onSubmit={e => { e.preventDefault(); void load() }}>
      <label className={styles.url}>Website URL<input type="text" inputMode="url" aria-label="Website URL" required value={url} onChange={e => setUrl(e.target.value)} placeholder="Paste a website URL" /></label>
      <label>Agents<input type="number" min="1" max="48" value={agents} onChange={e => { const n = Math.min(48, Math.max(1, Number(e.target.value))); setAgents(n); send({ agents: n }) }} /></label>
      <label>Speed ×<input type="number" min="0.05" max="10" step="0.05" value={speed} onChange={e => { const n = Math.min(10, Math.max(.05, Number(e.target.value))); setSpeed(n); send({ speed: n }) }} /></label>
      <button className={styles.start} disabled={busy} type="submit">{busy ? 'Loading…' : source ? 'Load site' : 'Start swarm'} ↗</button>
      {source && <>
        <button type="button" onClick={() => { setPaused(!paused); send({ paused: !paused }) }}>{paused ? 'Resume' : 'Pause'}</button>
        <button type="button" onClick={replay}>Replay</button>
        <button type="button" onClick={() => void fullscreen()}>Full screen</button>
        <button type="button" onClick={() => { setSource(''); setStatus(''); setError('') }}>Change website</button>
      </>}
      <label className={styles.check}><input type="checkbox" checked={follow} onChange={e => { setFollow(e.target.checked); send({ follow: e.target.checked }) }} />Follow build</label>
    </form>
    {error && <p className={styles.error} role="alert">{error}</p>}
    {!source && <>
      <nav className={styles.presets} aria-label="Your websites">{presets.map(([name, link], i) => <button key={link} type="button" disabled={busy} onClick={() => void load(link)}><span className={styles.number}>0{i + 1}</span><strong>{name}</strong><span>{new URL(link).hostname} ↗</span></button>)}</nav>
      <p className={styles.note}>A visual rebuild animation. Choose 1–48 cursors and 0.05–10× speed.<br />Public pages only. Sites requiring sign-in or JavaScript may appear incomplete. The three featured sites use prepared snapshots.</p>
    </>}
    {source && <><button className={`${styles.toggle} ${quiet && !controlsOpen ? styles.quiet : ''}`} type="button" aria-expanded={controlsOpen} onClick={() => setControlsOpen(!controlsOpen)}>{controlsOpen ? 'Hide controls ×' : 'Controls ⚙'}</button><section className={styles.stage} aria-label="Website rebuild preview">
      <div className={styles.status} role="status">{status}<span>Visual preview</span></div>
      <iframe ref={frame} title="Swarm website rebuild" sandbox="allow-scripts" referrerPolicy="no-referrer" srcDoc={source} />
    </section></>}
  </main>
}
