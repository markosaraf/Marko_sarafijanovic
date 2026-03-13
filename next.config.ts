import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  
  // ADDED: Prevent trailing slash redirects that cause "Page with redirect" issues
  trailingSlash: false,
  
  // ADDED: Explicit redirect handling to avoid redirect chains
  async redirects() {
    return [
      // Redirect www to non-www (or vice versa - choose ONE pattern)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.marko-sarafijanovic.space.z.ai' }],
        destination: 'https://marko-sarafijanovic.space.z.ai/:path*',
        permanent: true, // 301 redirect
      },
    ];
  },
  
  // ADDED: Headers for better SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
