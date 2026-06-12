import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "heliforklift.cl",
      },
    ],
  },
  headers: async () => [
    {
      source: "/assets/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
  // Landing estática de campaña (HTML en public/CPD25-A3LiH4-M/).
  // Sirve el index.html con URL limpia /CPD25-A3LiH4-M (sin /index.html).
  rewrites: async () => [
    {
      source: "/CPD25-A3LiH4-M",
      destination: "/CPD25-A3LiH4-M/index.html",
    },
  ],
};

export default nextConfig;
