/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... your other config
  webpack: (config, { isServer }) => {
    config.ignoreWarnings = [
      { module: /node_modules\/node-fetch\/lib\/index\.js/ },
      { module: /node_modules\/punycode\/punycode\.js/ },
    ];
    return config;
  },
}

module.exports = nextConfig 