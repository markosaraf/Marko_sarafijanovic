import type { Metadata } from 'next'
import TADPage from './tad-page'

const PAGE_URL = 'https://marko-sarafijanovic.com/Why-allow-Tesla-Assisted-Driving-TAD'

export const metadata: Metadata = {
  metadataBase: new URL('https://marko-sarafijanovic.com'),
  title: 'Marko Sarafijanovic | Why approve Tesla Assisted Driving (TAD)?',
  description:
    'Why approve Tesla Assisted Driving (TAD) in Switzerland? Explore safety evidence, Swiss traffic-death reports and the case for regulatory approval.',
  keywords: [
    'Tesla Assisted Driving',
    'Tesla Assisted Driving (TAD)',
    'TAD',
    'Tesla Switzerland',
    'Tesla Assisted Driving approval Switzerland',
    'VAF Verordnung automatisiertes Fahren',
    'ASTRA',
    'traffic safety',
    'autonomous driving',
    'Marko Sarafijanovic',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Marko Sarafijanovic | Why approve Tesla Assisted Driving (TAD)?',
    description:
      'Why approve Tesla Assisted Driving (TAD) in Switzerland? Explore safety evidence, Swiss traffic-death reports and the case for regulatory approval.',
    url: PAGE_URL,
    siteName: 'Marko Sarafijanovic',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marko Sarafijanovic | Why approve Tesla Assisted Driving (TAD)?',
    description:
      'Why approve Tesla Assisted Driving (TAD) in Switzerland? Explore safety evidence, Swiss traffic-death reports and the case for regulatory approval.',
    creator: '@MarkoSaraf2004',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <TADPage />
}
