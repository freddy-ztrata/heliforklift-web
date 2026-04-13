import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollProgress from "@/components/shared/ScrollProgress";
import ProductCatalog from "@/components/sections/ProductCatalog";

export const metadata: Metadata = {
  title: "Equipos y Grúas Horquillas — Catálogo Completo",
  description:
    "Catálogo completo de grúas horquillas HELI: eléctricas, diésel, GLP, hidrógeno verde, transpaletas, apiladores y más. Venta y arriendo en Chile. Cotiza hoy.",
  alternates: { canonical: "/productos" },
};

export default function ProductosPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-24">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
              Catálogo completo
            </p>
            <h1 className="font-heading mt-2 text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
              NUESTROS EQUIPOS
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-steel-400">
              Más de 1,700 modelos de vehículos industriales para cada necesidad.
              Grúas horquillas eléctricas, combustión, hidrógeno verde y mucho más.
            </p>
          </div>
          <ProductCatalog />
        </section>
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
