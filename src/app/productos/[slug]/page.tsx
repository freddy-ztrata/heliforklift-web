import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollProgress from "@/components/shared/ScrollProgress";
import ProductGallery from "@/components/shared/ProductGallery";
import FuelTypeBadge from "@/components/shared/FuelTypeBadge";
import { allProducts } from "@/lib/data/all-products";
import { getProductGallery } from "@/lib/data/product-galleries";
import {
  ArrowLeft,
  Zap,
  Gauge,
  ArrowUpDown,
  Fuel,
  CheckCircle2,
  FileDown,
  MessageCircle,
} from "lucide-react";
import { contact } from "@/lib/data/company";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) return { title: "Producto no encontrado" };

  return {
    title: `${product.name} — Grúa Horquilla ${product.type}`,
    description: `${product.name}: ${product.description || product.type + " con capacidad " + product.capacityRange}. Venta y arriendo en Chile. Cotiza ahora.`,
    alternates: { canonical: `/productos/${slug}` },
    openGraph: {
      title: `${product.name} — Grúa Horquilla ${product.type}`,
      description: `${product.type} con capacidad ${product.capacityRange}. Repuestos originales y servicio técnico.`,
      images: [{ url: product.image }],
    },
  };
}

export function generateStaticParams() {
  return allProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const galleryImages = getProductGallery(product.slug, product.image);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-steel-400">
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link
              href="/productos"
              className="hover:text-white transition-colors"
            >
              Equipos
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>

        {/* Product Detail */}
        <section className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="relative">
              <ProductGallery
                images={galleryImages}
                productName={product.name}
              />
              {product.type === "Hidrógeno Verde" && (
                <div className="absolute left-4 top-4 z-10 rounded-full bg-green-500/20 px-4 py-1 text-sm font-semibold text-green-400">
                  HIDRÓGENO VERDE
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-medium uppercase tracking-widest text-heli-red">
                  {product.type}
                </span>
                <FuelTypeBadge fuelType={product.fuelType} size="md" />
              </div>
              <h1 className="font-heading mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none text-white">
                {product.name}
              </h1>

              {product.description && (
                <p className="mt-4 text-lg text-steel-300">
                  {product.description}
                </p>
              )}

              {/* Specs Grid */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-xl border border-steel-700 bg-steel-900/50 p-3 sm:p-4">
                  <div className="flex items-center gap-2 text-steel-400">
                    <Gauge className="h-4 w-4 shrink-0" />
                    <span className="text-xs uppercase">Capacidad</span>
                  </div>
                  <div className="mt-1 text-base sm:text-lg font-bold text-white">
                    {product.capacityRange}
                  </div>
                </div>
                {product.heightRange && (
                  <div className="rounded-xl border border-steel-700 bg-steel-900/50 p-3 sm:p-4">
                    <div className="flex items-center gap-2 text-steel-400">
                      <ArrowUpDown className="h-4 w-4 shrink-0" />
                      <span className="text-xs uppercase">Altura</span>
                    </div>
                    <div className="mt-1 text-base sm:text-lg font-bold text-white">
                      {product.heightRange}
                    </div>
                  </div>
                )}
                <div className="rounded-xl border border-steel-700 bg-steel-900/50 p-3 sm:p-4">
                  <div className="flex items-center gap-2 text-steel-400">
                    <Fuel className="h-4 w-4 shrink-0" />
                    <span className="text-xs uppercase">Motor</span>
                  </div>
                  <div className="mt-1 text-base sm:text-lg font-bold text-white">
                    {product.power}
                  </div>
                </div>
                <div className="rounded-xl border border-steel-700 bg-steel-900/50 p-3 sm:p-4">
                  <div className="flex items-center gap-2 text-steel-400">
                    <Zap className="h-4 w-4 shrink-0" />
                    <span className="text-xs uppercase">Categoría</span>
                  </div>
                  <div className="mt-1 text-base sm:text-lg font-bold text-white">
                    {product.category}
                  </div>
                </div>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mt-8">
                  <h2 className="mb-3 text-lg font-semibold text-white">
                    Características
                  </h2>
                  <ul className="space-y-2">
                    {product.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 text-steel-300"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-heli-red" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTAs */}
              <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`/contacto?equipo=${encodeURIComponent(product.name)}`}
                  className="glow-red inline-flex items-center justify-center rounded-xl bg-heli-red px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-white transition-all hover:bg-heli-red-dark"
                >
                  COTIZAR ESTE EQUIPO
                </a>
                <a
                  href="tel:+56958187035"
                  className="inline-flex items-center justify-center rounded-xl border border-steel-600 px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-medium text-white transition-all hover:border-white hover:bg-white/5"
                >
                  LLAMAR AHORA
                </a>
              </div>

              {/* Secondary: Catálogo + WhatsApp */}
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`/contacto?equipo=${encodeURIComponent(product.name)}&tipo=catalogo`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-steel-700 bg-steel-900/60 px-5 py-3 text-sm font-medium text-steel-200 transition-all hover:border-heli-red/40 hover:text-white"
                >
                  <FileDown className="h-4 w-4 text-heli-red" />
                  Solicitar ficha técnica / catálogo PDF
                </a>
                <a
                  href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(`Hola, me interesa el equipo ${product.name}. ¿Pueden enviarme la ficha técnica?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-green-500/5 px-5 py-3 text-sm font-medium text-green-400 transition-all hover:border-green-500/60 hover:bg-green-500/10"
                >
                  <MessageCircle className="h-4 w-4" />
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="font-heading mb-8 text-3xl text-white">
              EQUIPOS RELACIONADOS
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/productos/${rp.slug}`}
                  className="group overflow-hidden rounded-2xl border border-steel-700/50 bg-steel-900 transition-all hover:-translate-y-2 hover:border-heli-red/40 hover:shadow-xl hover:shadow-heli-red/10"
                >
                  <div className="product-img-container relative aspect-square overflow-hidden p-5">
                    <Image
                      src={rp.image}
                      alt={rp.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-contain transition-transform duration-300 group-hover:scale-105 p-5"
                      loading="lazy"
                      quality={75}
                    />
                  </div>
                  <div className="border-t border-steel-800 p-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium uppercase text-heli-red">
                        {rp.type}
                      </span>
                      <FuelTypeBadge fuelType={rp.fuelType} size="sm" />
                    </div>
                    <h3 className="mt-1 font-bold text-white">{rp.name}</h3>
                    <p className="mt-1 text-sm text-steel-400">
                      {rp.capacityRange}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Link
            href="/productos?tipo=todos"
            className="inline-flex items-center gap-2 text-steel-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al catalogo completo
          </Link>
        </div>

        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description:
              product.description ||
              `${product.type} con capacidad ${product.capacityRange}`,
            image: `https://heliforklift.cl${product.image}`,
            brand: {
              "@type": "Brand",
              name: "HELI",
            },
            category: product.category,
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              priceCurrency: "CLP",
              url: `https://heliforklift.cl/productos/${product.slug}`,
              seller: {
                "@type": "Organization",
                name: "Helifork Lift",
              },
            },
            additionalProperty: [
              {
                "@type": "PropertyValue",
                name: "Capacidad",
                value: product.capacityRange,
              },
              {
                "@type": "PropertyValue",
                name: "Motor",
                value: product.power,
              },
              {
                "@type": "PropertyValue",
                name: "Tipo de Energia",
                value: product.fuelType,
              },
              ...(product.heightRange
                ? [
                    {
                      "@type": "PropertyValue",
                      name: "Altura de elevación",
                      value: product.heightRange,
                    },
                  ]
                : []),
            ],
          }),
        }}
      />
    </>
  );
}
