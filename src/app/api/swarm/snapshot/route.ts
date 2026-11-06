import { resolve4 } from 'node:dns/promises'
import { request as httpsRequest } from 'node:https'
import { isIP } from 'node:net'

export const runtime = 'nodejs'
export const maxDuration = 30

// Fetch only public HTTPS documents. Pin the validated address for each request,
// including redirects, so DNS changes cannot turn this into an internal proxy.
function publicAddress(ip: string) {
  if (isIP(ip) !== 4) return false
  const [a, b, c] = ip.split('.').map(Number)
  return !(a === 0 || a === 10 || a === 127 || a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) || (a === 192 && (b === 0 || b === 168)) ||
    (a === 192 && b === 88 && c === 99) || (a === 198 && (b === 18 || b === 19)) ||
    (a === 198 && b === 51 && c === 100) || (a === 203 && b === 0 && c === 113))
}

async function getDocument(url: URL, depth = 0): Promise<{ html: string; url: string }> {
  if (depth > 4) throw new Error('This website redirects too many times.')
  if (url.protocol !== 'https:' || (url.port && url.port !== '443') || url.username || url.password)
    throw new Error('Please use a public HTTPS website URL.')
  if (url.hostname.length > 253 || !url.hostname.includes('.') || isIP(url.hostname))
    throw new Error('Please use a public website domain, not an IP address.')
  const addresses = await resolve4(url.hostname)
  if (!addresses.length || addresses.some(ip => !publicAddress(ip)))
    throw new Error('Only public websites can be loaded.')

  const result = await new Promise<{ html: string; redirect?: string }>((resolve, reject) => {
    const req = httpsRequest(url, {
      method: 'GET', agent: false, family: 4, autoSelectFamily: false,
      headers: { 'User-Agent': 'SwarmVisualPreview/1.0', Accept: 'text/html', 'Accept-Encoding': 'identity' },
      lookup: (_hostname, _options, callback) => callback(null, addresses[0], 4),
    }, res => {
      const code = res.statusCode || 500
      if (code >= 300 && code < 400 && res.headers.location) {
        res.resume(); resolve({ html: '', redirect: res.headers.location }); return
      }
      if (code !== 200 || !res.headers['content-type']?.includes('text/html')) {
        res.resume(); reject(new Error('This website did not provide a public HTML page. Try another URL.')); return
      }
      if (res.headers['content-encoding'] && res.headers['content-encoding'] !== 'identity') {
        res.resume(); reject(new Error('This website requires a format this preview cannot load.')); return
      }
      let size = 0
      const chunks: Buffer[] = []
      res.on('data', (chunk: Buffer) => {
        size += chunk.length
        if (size > 2_000_000) { req.destroy(new Error('This page is too large. Try a shorter page.')); return }
        chunks.push(chunk)
      })
      res.on('end', () => resolve({ html: Buffer.concat(chunks).toString('utf8') }))
      res.on('error', reject)
    })
    const timeout = setTimeout(() => req.destroy(new Error('This website took too long to respond.')), 6000)
    req.on('close', () => clearTimeout(timeout))
    req.on('error', reject)
    req.end()
  })
  return result.redirect ? getDocument(new URL(result.redirect, url), depth + 1) : { html: result.html, url: url.href }
}

export async function GET(request: Request) {
  const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
  const raw = new URL(request.url).searchParams.get('url')?.trim()
  if (!raw || raw.length > 2048) return Response.json({ error: 'Enter a website URL.' }, { status: 400, headers })
  try {
    const result = await getDocument(new URL(raw.includes('://') ? raw : `https://${raw}`))
    return Response.json(result, { headers })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    const safe = /^(Please |Only public|This website|This page)/.test(message)
    return Response.json({ error: safe ? message : 'Could not load this website. Check the URL or try another site.' }, { status: 400, headers })
  }
}
