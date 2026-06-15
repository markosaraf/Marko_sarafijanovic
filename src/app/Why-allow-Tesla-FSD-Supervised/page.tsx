import type { Metadata } from "next";
import FSDPage from "./fsd-page";

// SEO Metadata for Google Search Results
export const metadata: Metadata = {
  title: "Why allow Tesla FSD in Switzerland? — Marko Sarafijanovic",
  description: "Reasons to allow Tesla FSD in Switzerland: Prevent traffic deaths and traffic accidents, increase traffic safety, Stop state favorism and regulatory capture in Switzerland.",
  keywords: ["Tesla FSD", "Full Self-Driving", "Switzerland", "Traffic Safety", "Autonomous Driving", "Tesla", "FSD Supervised", "Traffic Deaths Prevention"],
  authors: [{ name: "Marko Sarafijanovic" }],
  alternates: {
    canonical: "https://marko-sarafijanovic.com/Why-allow-Tesla-FSD-Supervised",
  },
  openGraph: {
    title: "Why allow Tesla FSD in Switzerland? — Marko Sarafijanovic",
    description: "Reasons to allow Tesla FSD in Switzerland: Prevent traffic deaths and traffic accidents, increase traffic safety, Stop state favorism and regulatory capture in Switzerland.",
    url: "https://marko-sarafijanovic.com/Why-allow-Tesla-FSD-Supervised",
    siteName: "Marko Sarafijanovic",
    type: "website",
    images: ["/marko-profile.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why allow Tesla FSD in Switzerland? — Marko Sarafijanovic",
    description: "Reasons to allow Tesla FSD in Switzerland: Prevent traffic deaths and traffic accidents, increase traffic safety, Stop state favorism and regulatory capture in Switzerland.",
    creator: "@MarkoSaraf2004",
    images: ["/marko-profile.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <FSDPage />;
}
