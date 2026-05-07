import type { MetadataRoute } from "next";
import { allProducts } from "@/lib/data/all-products";
import { news } from "@/lib/data/news";
import { services } from "@/lib/data/services";
import { productCategories } from "@/lib/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://heliforklift.cl";
  const now = new Date();

  // Helper para construir URLs absolutas de imagenes
  const absoluteImg = (path: string) =>
    path.startsWith("http") ? path : `${baseUrl}${path}`;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        absoluteImg("/og-image.jpg"),
        absoluteImg("/assets/legacy/banners/heli-fleet-delivery.jpg"),
      ],
    },
    {
      url: `${baseUrl}/productos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/equipo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/catalogo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/trabaja-con-nosotros`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ley-karin`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Productos: cada uno con su imagen principal en el sitemap (Image Sitemap)
  const productPages: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${baseUrl}/productos/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: [absoluteImg(product.image)],
  }));

  // Servicios: con imagen
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/servicios/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: [absoluteImg(service.image)],
  }));

  // Noticias: con imagen + lastModified real (basado en date del articulo)
  const newsPages: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${baseUrl}/noticias/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
    images: [absoluteImg(item.image)],
  }));

  const categoryPages: MetadataRoute.Sitemap = productCategories.map((cat) => ({
    url: `${baseUrl}/productos?categoria=${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: [absoluteImg(cat.image)],
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...categoryPages,
    ...productPages,
    ...newsPages,
  ];
}
