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
  // /promo/CPD25-A3LiH4-M. Redirigimos la URL estática antigua (raíz) para
  // no romper enlaces/campañas que apunten a /CPD25-A3LiH4-M.
  redirects: async () => [
    {
      source: "/CPD25-A3LiH4-M",
      destination: "/promo/CPD25-A3LiH4-M",
      permanent: false,
    },
    // La G3 4-5 TON estaba mal clasificada como Gas (GLP): la maquina es
    // electrica (CPD40-50-GD3). Cambio el slug y redirijo la URL antigua,
    // que estaba indexada en el sitemap.
    {
      source: "/productos/g3-series-gas-4-5-ton",
      destination: "/productos/g3-series-electrica-4-5-ton",
      permanent: true,
    },
  ],
};

export default nextConfig;
