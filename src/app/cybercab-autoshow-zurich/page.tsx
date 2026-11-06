import type { Metadata } from 'next'
import Gold from '@/components/cybercab/event-gold'
import Pale from '@/components/cybercab/event-pale'
import Variant from '@/components/cybercab/variant'
export const metadata: Metadata = {
  metadataBase: new URL('https://marko-sarafijanovic.com'),
  title: 'Marko Sarafijanovic | Tesla Cybercab @ Auto Zürich 2026',
  description: 'Tesla Cybercab at Auto Zürich, 5–8 November 2026. Discover the gold Cybercab through photos and close-up details by Marko Sarafijanovic.',
  alternates: { canonical: '/cybercab-autoshow-zurich' },
  openGraph: {
    title: 'Marko Sarafijanovic | Tesla Cybercab @ Auto Zürich 2026',
    description: 'Tesla Cybercab at Auto Zürich, 5–8 November 2026. Discover the gold Cybercab through photos and close-up details by Marko Sarafijanovic.',
    url: '/cybercab-autoshow-zurich',
    type: 'website',
    images: [
      { url: '/cybercab/social/into-the-night-gold.jpg', width: 1200, height: 630, alt: 'Tesla Cybercab — Into the night', type: 'image/jpeg' },
      { url: '/cybercab/social/into-the-night-gold-square.jpg', width: 1200, height: 1200, alt: 'Tesla Cybercab — Into the night', type: 'image/jpeg' },
    ],
  },
  twitter: { card: 'summary_large_image', images: [{ url: '/cybercab/social/into-the-night-gold.jpg', alt: 'Tesla Cybercab — Into the night' }], title: 'Marko Sarafijanovic | Tesla Cybercab @ Auto Zürich 2026', description: 'Tesla Cybercab at Auto Zürich, 5–8 November 2026. Discover the gold Cybercab through photos and close-up details by Marko Sarafijanovic.' },
}

export default function Page(){return <Variant gold={<Gold/>} pale={<Pale/>}/> }
