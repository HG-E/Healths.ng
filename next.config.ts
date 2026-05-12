import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Sanity CDN
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // Cloudinary
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      // Placeholder images
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  // Enable React strict mode for better development warnings
  reactStrictMode: true,
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['lucide-react', '@portabletext/react'],
  },
}

export default nextConfig
