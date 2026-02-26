/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // REQUIRED for Cloudflare Pages static
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
