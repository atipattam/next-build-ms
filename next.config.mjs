/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  trailingSlash: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
   loader : 'custom',
   loaderFile: '/my/image/loader.js',
   domains: [process.env.NEXT_APP_FRONTDOOR]
  },
};

export default nextConfig;
