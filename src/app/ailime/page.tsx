import type { Metadata } from 'next'
import AdminPanel from './panel'
export const metadata: Metadata = { title: 'Site controls', robots: { index: false, follow: false } }
export default function Page() { return <AdminPanel /> }
