import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// YOUR ACTUAL PRIMARY DOMAIN
const SITE_URL = "https://marko-sarafijanovic.com";

export const metadata: Metadata = {
  // ADDED: Canonical URL to prevent duplicate content issues
  alternates: {
    canonical: SITE_URL,
  },
  title: "Marko Sarafijanovic - Primary School Teacher | Tesla Enthusiast | FSD Advocate",
  description: "Substitute teacher in primary school passionate about teaching maths and languages. Studying at PHZH Zurich. Tesla enthusiast and Full Self-Driving advocate.",
  keywords: ["Marko Sarafijanovic", "Marko Adliswil", "Marko Zurich", "Marko Zürich", "Marko PHZH", "Marko Pädagogische Hochschule Zürich", "Marko Tesla", "Marko Tennis", "Marko TCA", "Marko Tennis Club Adliswil", "Primary School Teacher", "Substitute Teacher", "Tesla", "FSD", "Full Self-Driving", "Electric Vehicles", "Technology", "Innovation", "Zurich", "Adliswil", "PHZH"],
  authors: [{ name: "Marko Sarafijanovic" }],
  verification: {
    google: "XNdxdzJoIyaAlcZ8zYeLySFGgrZPgQA6zhD3TooUBv0",
    other: {
      "msvalidate.01": "18DD126B8F12F114B80F29FF792C5B14"
    }
  },
icons: {
  icon: [
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon.svg", type: "image/svg+xml" },
  ],
  apple: [
    { url: "/favicon-180x180.png", sizes: "180x180", type: "image/png" },
  ],
  other: [
    { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
  ],
},
  openGraph: {
    title: "Marko Sarafijanovic - Primary School Teacher | Tesla Enthusiast | FSD Advocate",
    description: "Substitute teacher in primary school passionate about teaching maths and languages. Studying at PHZH Zurich. Tesla enthusiast and Full Self-Driving advocate.",
    // FIXED: Now points to your actual website
    url: SITE_URL,
    siteName: "Marko Sarafijanovic",
    type: "website",
    images: ["/marko-profile.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marko Sarafijanovic - Primary School Teacher | Tesla Enthusiast | FSD Advocate",
    description: "Substitute teacher in primary school passionate about teaching maths and languages. Studying at PHZH Zurich. Tesla enthusiast and Full Self-Driving advocate.",
    creator: "@MarkoSaraf2004",
    images: ["/marko-profile.png"],
  },
  // ADDED: Tell robots to index this page
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ADDED: Explicit canonical link tag */}
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
