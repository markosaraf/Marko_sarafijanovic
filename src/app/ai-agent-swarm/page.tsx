import type { Metadata } from 'next'
import SwarmStudio from './studio'

const title = 'Your sites, rebuilt by an AI agent swarm.'
const description = 'Watch a swarm of cursors rebuild a website. Paste a URL, choose your agent count and adjust the speed from 0.05× to 10×.'
export const metadata: Metadata = {
  metadataBase: new URL('https://marko-sarafijanovic.com'),
  title, description, keywords: ['AI agent swarm', 'website rebuild animation', 'Marko Sarafijanovic'],
  alternates: { canonical: '/ai-agent-swarm' },
  openGraph: { title, description, type: 'website', url: '/ai-agent-swarm', images: ['/swarm/social.png'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/swarm/social.png'] },
}

export default function Page() { return <SwarmStudio /> }
