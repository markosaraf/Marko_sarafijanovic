import type { Metadata } from 'next'
import Gold from '@/components/cybercab/home-gold'
import Pale from '@/components/cybercab/home-pale'
import Variant from '@/components/cybercab/variant'
const title = 'Marko Sarafijanovic | Teaching, Tesla & Web Projects'
const description = 'Meet Marko Sarafijanovic, a substitute primary teacher in Zurich. Discover Quizlet Gravity, AI agent swarm animations and his passion for Tesla and technology.'
export const metadata: Metadata = {
  metadataBase: new URL('https://marko-sarafijanovic.com'),
  title, description,
  alternates: { canonical: '/' },
  openGraph: { title, description, url: '/', type: 'website', images: ['/opengraph-image-homepage.png'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image-homepage.png'] },
}
export default function Home(){return <Variant gold={<Gold/>} pale={<Pale/>}/> }
