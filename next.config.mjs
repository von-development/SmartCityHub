/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placekitten.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /mapbox-gl/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          compact: false,
          cacheDirectory: true,
        },
      },
    });
    return config;
  },
};

export default nextConfig;
