import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  
  // Prevent trailing slash redirects
  trailingSlash: false,
  
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
