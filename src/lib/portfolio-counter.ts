import 'server-only'
import { Pool } from 'pg'
import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { cookies } from 'next/headers'

const globalDb = globalThis as unknown as { portfolioPool?: Pool }
export function counterDb() {
  if (!process.env.PORTFOLIO_DATABASE_URL) throw new Error('Counter database unavailable')
  return globalDb.portfolioPool ??= new Pool({ connectionString: process.env.PORTFOLIO_DATABASE_URL, max: 2, idleTimeoutMillis: 10000, connectionTimeoutMillis: 10000 })
}
const cookieName = 'portfolio_admin'
const hash = (value: string) => createHash('sha256').update(value).digest('hex')

export async function settings() {
  return (await counterDb().query('SELECT counter_visible FROM portfolio.settings WHERE id = true')).rows[0]
}
export async function isAdmin() {
  const token = (await cookies()).get(cookieName)?.value
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return false
  return (await counterDb().query('SELECT 1 FROM portfolio.sessions WHERE token_hash = $1 AND expires_at > now()', [hash(token)])).rowCount === 1
}
export async function allowLogin(ip: string) {
  // A shared database limit also protects across serverless instances.
  for (const [key, limit] of [[hash(ip), 8], ['global', 100]] as const) {
    const result = await counterDb().query(`INSERT INTO portfolio.login_limits(key, attempts, expires_at)
      VALUES($1, 1, now() + interval '15 minutes') ON CONFLICT(key) DO UPDATE SET
      attempts = CASE WHEN portfolio.login_limits.expires_at <= now() THEN 1 ELSE portfolio.login_limits.attempts + 1 END,
      expires_at = CASE WHEN portfolio.login_limits.expires_at <= now() THEN now() + interval '15 minutes' ELSE portfolio.login_limits.expires_at END
      RETURNING attempts`, [key])
    if (result.rows[0].attempts > limit) return false
  }
  return true
}
export async function validPassword(password: string) {
  const [salt, expected] = (process.env.AILIME_PASSWORD_HASH ?? '').split(':')
  if (!salt || !expected || password.length > 256) return false
  const actual = await promisify(scrypt)(password, salt, 64) as Buffer
  const target = Buffer.from(expected, 'hex')
  return target.length === actual.length && timingSafeEqual(actual, target)
}
export async function signIn() {
  const token = randomBytes(32).toString('hex')
  await counterDb().query('DELETE FROM portfolio.sessions WHERE expires_at <= now()')
  await counterDb().query("INSERT INTO portfolio.sessions VALUES($1, now() + interval '8 hours')", [hash(token)])
  ;(await cookies()).set(cookieName, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 28800 })
}
export async function signOut() {
  const jar = await cookies()
  const token = jar.get(cookieName)?.value
  if (token) await counterDb().query('DELETE FROM portfolio.sessions WHERE token_hash = $1', [hash(token)])
  jar.delete(cookieName)
}
