import type { Metadata } from "next";
import FSDPage from "./fsd-page";

// opengraph-image.tsx in this folder auto-generates og:image + twitter:image.
// No need to specify images manually — Next.js wires it automatically.

export const metadata: Metadata = {
  title:
    "Marko Sarafijanovic: Why approve Tesla FSD (Supervised) in Switzerland?",
  description:
    "Reasons to allow Tesla FSD in Switzerland: Prevent traffic deaths and traffic accidents, increase traffic safety, Stop state favorism and regulatory capture in Switzerland.",
  keywords: [
    "Tesla FSD",
    "Full Self-Driving",
    "Switzerland",
    "Traffic Safety",
    "Autonomous Driving",
    "Tesla",
    "FSD Supervised",
    "Traffic Deaths Prevention",
  ],
  authors: [{ name: "Marko Sarafijanovic" }],
  alternates: {
    canonical:
      "https://marko-sarafijanovic.com/Why-allow-Tesla-FSD-Supervised",
  },
  openGraph: {
    title: "Why approve Tesla FSD (Supervised) in Switzerland?",
    description:
      "Reasons to allow Tesla FSD in Switzerland: Prevent traffic deaths and traffic accidents, increase traffic safety.",
    url: "https://marko-sarafijanovic.com/Why-allow-Tesla-FSD-Supervised",
    siteName: "Marko Sarafijanovic",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why approve Tesla FSD (Supervised) in Switzerland?",
    description:
      "Reasons to allow Tesla FSD in Switzerland: Prevent traffic deaths and traffic accidents, increase traffic safety.",
    creator: "@MarkoSaraf2004",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <FSDPage />;
}
