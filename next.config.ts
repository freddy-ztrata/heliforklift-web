import type { NextConfig } from "next";
import legacyRedirects from "./legacy-redirects";

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
    // Canonicalizacion de host: www -> apex. Sin esto el sitio responde 200
    // en los dos hosts y Google rastrea y duplica todo el catalogo.
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.heliforklift.cl" }],
      destination: "https://heliforklift.cl/:path*",
      permanent: true,
    },
    {
      source: "/CPD25-A3LiH4-M",
      destination: "/promo/CPD25-A3LiH4-M",
      permanent: false,
    },
    // Campañas noviembre 2026: una máquina por landing. Las URLs viejas
    // que mezclaban o duplicaban el mismo equipo redirigen a la que queda.
    // statusCode 301 (y no permanent: true, que en Next responde 308).
    {
      source: "/promo/heli-diesel-k2-25t",
      destination: "/promo/heli-diesel-k2",
      statusCode: 301,
    },
    {
      source: "/promo/heli-diesel-k2-25t/gracias",
      destination: "/promo/heli-diesel-k2/gracias",
      statusCode: 301,
    },
    {
      source: "/promo/heli-gasolina-25",
      destination: "/promo/heli-combustion-h3",
      statusCode: 301,
    },
    {
      source: "/promo/heli-gasolina-25/gracias",
      destination: "/promo/heli-combustion-h3/gracias",
      statusCode: 301,
    },
    {
      source: "/promo/heli-combustion-g3",
      destination: "/promo/heli-combustion-h3",
      statusCode: 301,
    },
    {
      source: "/promo/heli-combustion-g3/gracias",
      destination: "/promo/heli-combustion-h3/gracias",
      statusCode: 301,
    },
    // La G3 4-5 TON estaba mal clasificada como Gas (GLP): la maquina es
    // electrica (CPD40-50-GD3). Cambio el slug y redirijo la URL antigua,
    // que estaba indexada en el sitemap.
    {
      source: "/productos/g3-series-gas-4-5-ton",
      destination: "/productos/g3-series-electrica-4-5-ton",
      permanent: true,
    },
    // La linea de hidrogeno verde se dio de baja del catalogo (sep 2026).
    // Las cuatro fichas estaban indexadas y en el sitemap, asi que van con 301
    // al catalogo en vez de quedar en 404.
    ...[
      "cpd20-30-hidrogeno-2-3-ton",
      "cpd30-35-hidrogeno-3-3.5-ton",
      "cpd40-50-hidrogeno-4-5-ton",
      "cpd60-70-hidrogeno-6-10-ton",
    ].map((slug) => ({
      source: `/productos/${slug}`,
      destination: "/productos",
      permanent: true,
    })),
    // Rescate del sitio WordPress anterior. Va al final para que cualquier
    // regla especifica de arriba gane sobre los comodines de /equipos.
    ...legacyRedirects,
  ],
};

export default nextConfig;
