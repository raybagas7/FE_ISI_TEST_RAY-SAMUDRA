/** @type {import('next').NextConfig} */
const nextConfig = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // Check for file changes every second
      aggregateTimeout: 300, // Delay before rebuilding
    };
    return config;
  },
  output: 'standalone',
};

export default nextConfig;
