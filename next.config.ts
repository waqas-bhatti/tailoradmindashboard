// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ⚠️ WARNING: This allows production builds to successfully complete
    // even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⚠️ WARNING: This allows production builds to complete
    // even if there are type errors.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
