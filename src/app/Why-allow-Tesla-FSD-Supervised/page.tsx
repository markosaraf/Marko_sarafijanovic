import type { Metadata } from 'next'
import FSDPage from './fsd-page'

const PAGE_URL = 'https://marko-sarafijanovic.com/Why-allow-Tesla-FSD-Supervised'

export const metadata: Metadata = {
  title: 'Marko Sarafijanovic | Why approve FSD (Supervised) from Tesla?',
  description:
    'Why Switzerland should approve Tesla FSD (Supervised): prevent traffic deaths, increase safety by 5.2x. Tesla engineering fleet drove 1.6M km across 22 EU countries with a 92% pass rate on 230,000+ scenario tests.',
  keywords: [
    'Tesla FSD',
    'Tesla Full Self-Driving',
    'FSD Supervised',
    'Tesla Switzerland',
    'FSD approval Switzerland',
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
    title: 'Marko Sarafijanovic | Why approve FSD (Supervised) from Tesla?',
    description:
      'Why Switzerland should approve Tesla FSD (Supervised): prevent traffic deaths, increase safety by 5.2x. Tesla engineering fleet drove 1.6M km across 22 EU countries with a 92% pass rate on 230,000+ scenario tests.',
    url: PAGE_URL,
    siteName: 'Marko Sarafijanovic',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marko Sarafijanovic | Why approve FSD (Supervised) from Tesla?',
    description:
      'Why Switzerland should approve Tesla FSD (Supervised): prevent traffic deaths, increase safety by 5.2x. Tesla engineering fleet drove 1.6M km across 22 EU countries with a 92% pass rate on 230,000+ scenario tests.',
    creator: '@MarkoSaraf2004',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <FSDPage />
}
