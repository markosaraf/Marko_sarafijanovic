import { NextResponse } from 'next/server'
import { counterDb, settings } from '@/lib/portfolio-counter'
export const dynamic = 'force-dynamic'
export async function GET() {
  try {
    const enabled = (await settings()).counter_visible
    const total = enabled ? (await counterDb().query('SELECT total FROM portfolio.user_total')).rows[0].total : undefined
    return NextResponse.json({ enabled, ...(enabled ? { total } : {}) }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ enabled: false }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
}
