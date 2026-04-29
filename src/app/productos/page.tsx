import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollProgress from "@/components/shared/ScrollProgress";
import ProductCatalog from "@/components/sections/ProductCatalog";
import FuelTypeLanding from "@/components/sections/FuelTypeLanding";
import ProductCategoriesGrid from "@/components/sections/ProductCategoriesGrid";
import {
  getFuelTypeName,
  productCategories,
} from "@/lib/data/products";

type Props = {
  searchParams: Promise<{ tipo?: string; categoria?: string }>;
};

const VALID_TIPOS = ["electrica", "diesel", "glp", "hidrogeno", "todos"];
const VALID_CATEGORIAS = productCategories.map((c) => c.slug);

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { tipo, categoria } = await searchParams;

  // Filtro por categoría de equipo
  if (categoria && VALID_CATEGORIAS.includes(categoria)) {
    const cat = productCategories.find((c) => c.slug === categoria);
    if (cat) {
      return {
        title: `${cat.name} — Catálogo HELI`,
        description: `${cat.description} Catálogo de ${cat.name.toLowerCase()} HELI en Chile. Cotiza hoy.`,
        alternates: { canonical: `/productos?categoria=${categoria}` },
        openGraph: {
          title: `${cat.name} — Catálogo HELI`,
          description: cat.description,
        },
      };
    }
  }

  // Filtro por tipo de energía
  if (tipo && VALID_TIPOS.includes(tipo) && tipo !== "todos") {
    const name = getFuelTypeName(tipo);
    return {
      title: `Grúas ${name} — Catálogo de Equipos`,
      description: `Catálogo de grúas horquillas ${name.toLowerCase()} HELI. Venta en Chile. Cotiza hoy.`,
      alternates: { canonical: `/productos?tipo=${tipo}` },
      openGraph: {
        title: `Grúas ${name} — Catálogo de Equipos`,
        description: `Grúas horquillas ${name.toLowerCase()} HELI: venta y servicio técnico en Chile.`,
      },
    };
  }

  return {
    title: "Equipos y Grúas Horquillas — Catálogo Completo",
    description:
      "Catálogo completo de grúas horquillas HELI: eléctricas, diésel, GLP, hidrógeno verde, transpaletas, apiladores, reach truck, todoterreno, manipuladores telescópicos, porta contenedores, tractores de tiro, plataformas elevadoras y accesorios.",
    alternates: { canonical: "/productos" },
    openGraph: {
      title: "Equipos y Grúas Horquillas — Catálogo Completo",
      description:
        "Catálogo completo de grúas horquillas HELI: eléctricas, diésel, GLP, hidrógeno verde, transpaletas, apiladores, reach truck y más.",
    },
  };
}

export default async function ProductosPage({ searchParams }: Props) {
  const { tipo, categoria } = await searchParams;
  const validTipo = tipo && VALID_TIPOS.includes(tipo);
  const validCategoria = categoria && VALID_CATEGORIAS.includes(categoria);
  const showCatalog = validTipo || validCategoria;

  // Header dinamico segun filtro activo
  let headerTitle = "NUESTROS EQUIPOS";
  let headerSubtitle =
    "Más de 1,700 modelos de vehículos industriales para cada necesidad.";
  if (validCategoria) {
    const cat = productCategories.find((c) => c.slug === categoria);
    if (cat) {
      headerTitle = cat.name.toUpperCase();
      headerSubtitle = cat.description;
    }
  } else if (validTipo && tipo !== "todos") {
    const name = getFuelTypeName(tipo);
    headerTitle = `GRÚAS ${name.toUpperCase()}`;
  }

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
                  Catálogo
                </p>
                <h1 className="font-heading mt-2 text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
                  {headerTitle}
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-steel-400">
                  {headerSubtitle}
                </p>
              </div>
              <Suspense>
                <ProductCatalog
                  defaultFuelType={validTipo ? tipo : undefined}
                  defaultCategory={validCategoria ? categoria : undefined}
                />
              </Suspense>
            </>
          ) : (
            <>
              {/* Landing: tipo de energia + categorias de equipo */}
              <div className="mb-8 sm:mb-12 text-center">
                <p className="text-sm font-medium uppercase tracking-widest text-steel-400">
                  Catálogo de equipos
                </p>
                <h1 className="font-heading mt-2 text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
                  NUESTROS EQUIPOS
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-steel-400">
                  Encuentra la grúa horquilla ideal para tu operación. Elige el
                  tipo de energía o explora por tipo de equipo.
                </p>
              </div>
              <FuelTypeLanding />
              <ProductCategoriesGrid />
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
