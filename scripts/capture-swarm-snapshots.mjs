// Run against the public, rendered sites whenever a featured preview changes.
// Keep styles and their assets together: deployment-specific Next.js CSS URLs
// disappear after releases and must never be dependencies of saved snapshots.
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'

const sites = [
  ['marko', 'https://marko-sarafijanovic.com/?design=gold'],
  ['gravity', 'https://www.quizletgravity.com/'],
  ['cybercab', 'https://marko-sarafijanovic.com/cybercab-autoshow-zurich?design=gold'],
]
const output = path.resolve('public/swarm')
await mkdir(path.join(output, 'assets'), { recursive: true })
const browser = await chromium.launch()
try {
  for (const [name, url] of sites) {
    if (process.argv[2] && process.argv[2] !== name) continue
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
    const page = await context.newPage()
    const response = await page.goto(url, { waitUntil: 'networkidle' })
    if (!response?.ok()) throw new Error(`Could not capture ${url}`)
    await page.locator(name === 'gravity' ? '.d-game' : '[data-site-design]').first().waitFor()
    await page.evaluate(() => document.fonts.ready)
    // Freeze entrance animations at their visible state before saving the DOM.
    await page.evaluate(() => {
      document.querySelectorAll('[style]').forEach(el => {
        if (el.style.opacity === '0' && el.style.transform) {
          el.style.opacity = '1'; el.style.transform = 'none'
        }
      })
    })
    const captured = await page.evaluate(() => {
      const css = [...document.styleSheets].map(sheet => ({
        base: sheet.href || location.href,
        text: [...sheet.cssRules].map(rule => rule.cssText).join('\n'),
      }))
      const doc = document.documentElement.cloneNode(true)
      doc.querySelectorAll('script,style,link,base,iframe,noscript,meta[http-equiv]').forEach(el => el.remove())
      doc.querySelectorAll('*').forEach(el => {
        for (const attr of [...el.attributes]) if (/^on/i.test(attr.name)) el.removeAttribute(attr.name)
        for (const attr of ['src', 'poster']) {
          if (el.hasAttribute(attr)) el.setAttribute(attr, new URL(el.getAttribute(attr), location.href).href)
        }
        el.removeAttribute('srcset')
        el.removeAttribute('loading')
      })
      return { css, html: '<!doctype html>' + doc.outerHTML }
    })
    const assets = new Map()
    async function asset(value, base) {
      if (value.startsWith('data:') || value.startsWith('#')) return value
      const url = new URL(value, base)
      if (url.protocol !== 'https:') throw new Error(`Unsupported asset: ${url}`)
      const key = url.href
      if (!assets.has(key)) assets.set(key, (async () => {
        const response = await page.evaluate(async url => {
          const response = await fetch(url)
          return { status: response.status, type: response.headers.get('content-type'), bytes: response.ok ? [...new Uint8Array(await response.arrayBuffer())] : [] }
        }, key)
        if (response.status !== 200) throw new Error(`Missing asset (${response.status}): ${key}`)
        const type = response.type?.split(';')[0]
        const extensions = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp', 'image/avif': '.avif', 'image/svg+xml': '.svg', 'image/gif': '.gif', 'font/woff2': '.woff2', 'font/woff': '.woff', 'font/ttf': '.ttf', 'application/font-sfnt': '.ttf', 'application/octet-stream': path.extname(url.pathname) }
        const ext = extensions[type]
        if (!ext) throw new Error(`Unexpected asset type ${type}: ${key}`)
        const bytes = Buffer.from(response.bytes)
        const file = createHash('sha256').update(bytes).digest('hex').slice(0, 20) + ext
        await writeFile(path.join(output, 'assets', file), bytes)
        return '/swarm/assets/' + file
      })())
      return assets.get(key)
    }
    async function cssAssets(text, base) {
      const pattern = /url\(\s*(["']?)(.*?)\1\s*\)/g
      const matches = [...text.matchAll(pattern)]
      for (const match of matches) text = text.replace(match[0], `url("${await asset(match[2], base)}")`)
      return text
    }
    let html = captured.html
    for (const match of [...html.matchAll(/\b(src|poster)="([^"]+)"/g)]) {
      const value = match[2].replaceAll('&amp;', '&')
      html = html.replace(match[0], `${match[1]}="${await asset(value, url)}"`)
    }
    // Inline style attributes also contain masks and background images.
    for (const match of [...html.matchAll(/style="([^"]*)"/g)]) {
      const value = match[1].replaceAll('&quot;', '"').replaceAll('&amp;', '&')
      const rewritten = await cssAssets(value, url)
      html = html.replace(match[0], `style="${rewritten.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`)
    }
    const styles = []
    for (const sheet of captured.css) styles.push(await cssAssets(sheet.text, sheet.base))
    const css = styles.join('\n').replaceAll('</style', '<\\/style')
    html = html.replace('</head>', `<style>${css}</style></head>`)
    await writeFile(path.join(output, 'snapshots', name + '.html'), html.replace(/[\t ]+\n/g, '\n'))
    console.log(`${name}: ${html.length} characters, ${assets.size} bundled assets`)
    await context.close()
  }
} finally {
  await browser.close()
}
