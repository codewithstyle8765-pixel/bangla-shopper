import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

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
  /* Off: Cache Components hangs on Cloudflare Workers (setTimeout semantics). */
  cacheComponents: false,
  experimental: {
    optimizePackageImports: ["@apollo/client"],
  },
};

export default nextConfig;

if (process.env.NODE_ENV === 'development') {
  initOpenNextCloudflareForDev();
}
