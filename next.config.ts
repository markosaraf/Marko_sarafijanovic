import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    localPatterns: [
      { pathname: "/**", search: "" },
      { pathname: "/marko-profile.png", search: "?v=20261107" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  
  // Prevent trailing slash redirects
  trailingSlash: false,
  // Preview frames intentionally have an opaque origin. Their bundled fonts
  // need CORS permission; content hashes make these assets safe to cache.
  async headers() {
    return [{
      source: '/swarm/assets/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    }];
  },
  
  // Redirect www to non-www (consolidate to one canonical URL)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.marko-sarafijanovic.com' }],
        destination: 'https://marko-sarafijanovic.com/:path*',
        permanent: true, // 301 redirect
      },
    ];
  },
};

export default nextConfig;
