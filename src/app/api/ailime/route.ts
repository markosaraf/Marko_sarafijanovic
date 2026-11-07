import { NextRequest, NextResponse } from 'next/server'
import { allowLogin, counterDb, isAdmin, settings, signIn, signOut, validPassword } from '@/lib/portfolio-counter'
export const dynamic = 'force-dynamic'
const reply = (body: object, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } })
export async function GET() {
  try {
    if (!await isAdmin()) return reply({ authenticated: false }, 401)
    return reply({ authenticated: true, enabled: (await settings()).counter_visible })
  } catch { return reply({ error: 'Temporarily unavailable. Please try again.' }, 503) }
}
export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin) return reply({ error: 'Request not allowed.' }, 403)
  if (Number(request.headers.get('content-length')) > 2048) return reply({ error: 'Invalid request.' }, 400)
  try {
    const body = await request.json()
    if (body.action === 'login') {
      const ip = request.headers.get('x-vercel-forwarded-for') ?? request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'local'
      if (!await allowLogin(ip)) return reply({ error: 'Too many attempts. Try again in 15 minutes.' }, 429)
      if (typeof body.password !== 'string' || !await validPassword(body.password)) return reply({ error: 'Incorrect password.' }, 401)
      await signIn()
      return reply({ authenticated: true, enabled: (await settings()).counter_visible })
    }
    if (!await isAdmin()) return reply({ error: 'Please sign in.' }, 401)
    if (body.action === 'logout') {
      await signOut()
      return reply({ authenticated: false })
    }
    if (body.action !== 'toggle' || typeof body.enabled !== 'boolean') return reply({ error: 'Invalid request.' }, 400)
    await counterDb().query('UPDATE portfolio.settings SET counter_visible = $1 WHERE id = true', [body.enabled])
    return reply({ authenticated: true, enabled: body.enabled })
  } catch { return reply({ error: 'Unable to save. Please try again.' }, 503) }
}
