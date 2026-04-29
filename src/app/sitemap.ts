import type { MetadataRoute } from "next";
import { allProducts } from "@/lib/data/all-products";
import { news } from "@/lib/data/news";
import { services } from "@/lib/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://heliforklift.cl";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/productos`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/servicios`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/equipo`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/noticias`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/catalogo`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/trabaja-con-nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/ley-karin`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const productPages: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${baseUrl}/productos/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/servicios/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const newsPages: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${baseUrl}/noticias/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...servicePages, ...productPages, ...newsPages];
}
