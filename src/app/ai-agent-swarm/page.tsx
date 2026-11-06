import type { Metadata } from 'next'
import SwarmStudio from './studio'

const title = 'Marko Sarafijanovic | AI Agent Swarm – Website Rebuild Animation'
const description = 'Watch websites come together in a swarm of animated cursors. Paste a URL, choose your swarm size and speed, and enjoy a full-screen website rebuild animation.'
export const metadata: Metadata = {
  metadataBase: new URL('https://marko-sarafijanovic.com'),
  title, description, keywords: ['AI agent swarm', 'website rebuild animation', 'Marko Sarafijanovic'],
  alternates: { canonical: '/ai-agent-swarm' },
  openGraph: { title, description, type: 'website', url: '/ai-agent-swarm', images: ['/swarm/social.png'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/swarm/social.png'] },
}

export default function Page() { return <SwarmStudio /> }
