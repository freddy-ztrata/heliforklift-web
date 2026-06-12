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
  // La landing CPD25-A3LiH4-M ahora vive como promo Next en
  // /promo/heli-h4-electrica-25t. Redirigimos la URL antigua para no
  // romper enlaces/campañas que apunten a /CPD25-A3LiH4-M.
  redirects: async () => [
    {
      source: "/CPD25-A3LiH4-M",
      destination: "/promo/heli-h4-electrica-25t",
      permanent: false,
    },
    {
      source: "/CPD25-A3LiH4-M/:path*",
      destination: "/promo/heli-h4-electrica-25t",
      permanent: false,
    },
  ],
};

export default nextConfig;
