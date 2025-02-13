/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... your other config
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  images: {
    domains: [
      // Add your image domains here
    ],
    unoptimized: false,
  },
  experimental: {
    scrollRestoration: true,
  },
  webpack: (config, { isServer }) => {
    config.ignoreWarnings = [
      { module: /node_modules\/node-fetch\/lib\/index\.js/ },
      { module: /node_modules\/punycode\/punycode\.js/ },
    ];
    return config;
  },
}

module.exports = nextConfig 