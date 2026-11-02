import type { NextConfig } from "next";

function mediaPatterns(): URL[] {
  const base = process.env.MAGENTO_MEDIA_URL || (process.env.NEXT_PUBLIC_BASE_URL && new URL("media/", process.env.NEXT_PUBLIC_BASE_URL).href);
  if (!base) return [];
  return [new URL(`${base.replace(/\/?$/, "/")}**`)];
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: ['192.168.15.165'],
  images: {
    remotePatterns: mediaPatterns(),
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_SERVER_MAGENTO_ENDPOINT: process.env.NEXT_SERVER_MAGENTO_ENDPOINT,
    DEFAULT_STORE_CODE: process.env.DEFAULT_STORE_CODE || "default",
  },
  cacheComponents: true,
  partialPrefetching: false,
  experimental: {
    optimizePackageImports: ["@apollo/client"],
  },
};

export default nextConfig;
