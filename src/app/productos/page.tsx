import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollProgress from "@/components/shared/ScrollProgress";
import ProductCatalog from "@/components/sections/ProductCatalog";
import FuelTypeLanding from "@/components/sections/FuelTypeLanding";
import { getFuelTypeName } from "@/lib/data/products";

type Props = {
  searchParams: Promise<{ tipo?: string }>;
};

const VALID_TIPOS = ["electrica", "diesel", "glp", "hidrogeno", "todos"];

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { tipo } = await searchParams;

  if (tipo && VALID_TIPOS.includes(tipo) && tipo !== "todos") {
    const name = getFuelTypeName(tipo);
    return {
      title: `Grúas ${name} — Catálogo de Equipos`,
      description: `Catálogo de grúas horquillas ${name.toLowerCase()} HELI. Venta y arriendo en Chile. Cotiza hoy.`,
      alternates: { canonical: `/productos?tipo=${tipo}` },
      openGraph: {
        title: `Grúas ${name} — Catálogo de Equipos`,
        description: `Grúas horquillas ${name.toLowerCase()} HELI: venta, arriendo y servicio técnico en Chile.`,
      },
    };
  }

  return {
    title: "Equipos y Grúas Horquillas — Catálogo Completo",
    description:
      "Catálogo completo de grúas horquillas HELI: eléctricas, diésel, GLP, hidrógeno verde, transpaletas, apiladores y más. Venta y arriendo en Chile. Cotiza hoy.",
    alternates: { canonical: "/productos" },
    openGraph: {
      title: "Equipos y Grúas Horquillas — Catálogo Completo",
      description:
        "Catálogo completo de grúas horquillas HELI: eléctricas, diésel, GLP, hidrógeno verde y más. Venta y arriendo en Chile.",
    },
  };
}

export default async function ProductosPage({ searchParams }: Props) {
  const { tipo } = await searchParams;
  const showCatalog = tipo && VALID_TIPOS.includes(tipo);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-24">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {showCatalog ? (
            <>
              {/* Header for catalog view */}
              <div className="mb-8 sm:mb-12 text-center">
                <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
                  Catálogo completo
                </p>
                <h1 className="font-heading mt-2 text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
                  NUESTROS EQUIPOS
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-steel-400">
                  Más de 1,700 modelos de vehículos industriales para cada
                  necesidad. Grúas horquillas eléctricas, combustión, hidrógeno
                  verde y mucho más.
                </p>
              </div>
              <Suspense>
                <ProductCatalog defaultFuelType={tipo} />
              </Suspense>
            </>
          ) : (
            <>
              {/* Header for landing view */}
              <div className="mb-8 sm:mb-12 text-center">
                <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
                  Catálogo de equipos
                </p>
                <h1 className="font-heading mt-2 text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
                  NUESTROS EQUIPOS
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-steel-400">
                  Encuentra la grúa horquilla ideal para tu operación. Elige el
                  tipo de energía que necesitas.
                </p>
              </div>
              <FuelTypeLanding />
            </>
          )}
        </section>
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
