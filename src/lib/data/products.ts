import {
  allProducts,
  deriveFuelType,
  electricForklifts,
  combustionForklifts,
  hydrogenForklifts,
  reachTrucks,
  palletJacks,
  stackers,
  containerHandlers,
  type FullProduct,
  type FuelType,
} from "./all-products";

// Re-export the FullProduct type and allProducts for convenience
export type { FullProduct, FuelType };
export { allProducts, deriveFuelType };

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured?: boolean;
  highlight?: boolean;
  productCount?: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
  fuelType: FuelType;
  capacityRange: string;
  heightRange?: string;
  power: string;
  image: string;
  features?: string[];
  slug: string;
}

const IMG = "/assets/legacy/products";

export const productCategories: ProductCategory[] = [
  {
    id: "gruas-electricas",
    name: "Gruas Electricas",
    slug: "gruas-horquillas-electricas",
    description:
      "Energia limpia a bajo costo. Sin costos de mantenimiento. Eficiencia energetica superior.",
    image: `${IMG}/g-series-1-3.5t-electric.jpg`,
    featured: true,
    productCount: electricForklifts.length,
  },
  {
    id: "gruas-combustion",
    name: "Gruas Combustion",
    slug: "gruas-horquillas-combustion",
    description:
      "Potencia y rendimiento para las operaciones mas exigentes. Diesel y GLP disponibles.",
    image: `${IMG}/k2-series-2-3.5t-combustion.jpg`,
    featured: true,
    productCount: combustionForklifts.length,
  },
  {
    id: "gruas-hidrogeno",
    name: "Gruas Hidrogeno Verde",
    slug: "gruas-hidrogeno-verde",
    description:
      "PIONEROS EN HIDROGENO VERDE -- Tecnologia de celda de combustible, cero emisiones.",
    image: `${IMG}/cpd20-25-hidrogeno.png`,
    highlight: true,
    productCount: hydrogenForklifts.length,
  },
  {
    id: "gruas-todo-terreno",
    name: "Gruas Todo Terreno",
    slug: "gruas-horquillas-todo-terreno",
    description:
      "Disenadas para terrenos dificiles, construccion y operaciones en exteriores.",
    image: `${IMG}/g3-5t-todo-terreno.jpg`,
    productCount: 2,
  },
  {
    id: "transpaletas",
    name: "Transpaletas",
    slug: "transpaletas",
    description:
      "Transpaletas electricas y manuales para movimiento eficiente de carga en bodega.",
    image: `${IMG}/cbd20-25-transpaleta.jpg`,
    productCount: palletJacks.length,
  },
  {
    id: "apiladores",
    name: "Apiladores",
    slug: "apiladores",
    description:
      "Apiladores electricos para almacenamiento vertical eficiente y seguro.",
    image: `${IMG}/cdd16-20jk-apilador.jpg`,
    productCount: stackers.length,
  },
  {
    id: "reach-truck",
    name: "Reach Truck",
    slug: "reach-truck",
    description:
      "Para pasillos angostos y maxima altura de almacenamiento en bodegas.",
    image: `${IMG}/g-series-reach-truck.png`,
    productCount: reachTrucks.length,
  },
  {
    id: "manipuladores-telescopicos",
    name: "Manipuladores Telescopicos",
    slug: "manipuladores-telescopicos",
    description:
      "Alcance extendido y versatilidad para construccion y logistica.",
    image: `${IMG}/telehandler-40h130-170s.jpg`,
    productCount: 1,
  },
  {
    id: "porta-contenedores",
    name: "Porta Contenedores",
    slug: "porta-contenedores",
    description:
      "Equipos de alto tonelaje para manejo de contenedores en puertos.",
    image: `${IMG}/cpcd250-porta-contenedor.png`,
    productCount: containerHandlers.length,
  },
  {
    id: "tractores-de-tiro",
    name: "Tractores de Tiro",
    slug: "tractores-de-tiro",
    description:
      "Tractores electricos y de combustion para arrastre de cargas en planta.",
    image: `${IMG}/qyd-tractor-electrico.jpg`,
    productCount: 7,
  },
  {
    id: "plataformas-elevadoras",
    name: "Plataformas Elevadoras",
    slug: "plataformas-elevadoras",
    description:
      "Trabajo en altura seguro y eficiente para todo tipo de industrias.",
    image: `${IMG}/platform-js07.jpg`,
    productCount: 1,
  },
  {
    id: "accesorios",
    name: "Accesorios",
    slug: "accesorios",
    description:
      "Implementos y accesorios hidraulicos para maximizar la versatilidad de tu grua.",
    image: `${IMG}/accessory-paper-roll-clamp.jpg`,
    productCount: 18,
  },
];

/** Convert a FullProduct to the simpler Product interface used in components */
function toProduct(fp: FullProduct): Product {
  return {
    id: fp.id,
    name: fp.name,
    category: fp.categorySlug,
    type: fp.type,
    fuelType: fp.fuelType,
    capacityRange: fp.capacityRange,
    heightRange: fp.heightRange,
    power: fp.power,
    image: fp.image,
    features: fp.features,
    slug: fp.slug,
  };
}

/**
 * Featured products shown on the homepage grid.
 * Picks representative models from key categories by ID.
 */
const featuredIds = [
  "g-series-1-3.5t-electric",     // Electric -- G Series flagship
  "k2-series-2-3.5t-combustion",  // Combustion -- K2 Series
  "g3-series-5-10t-combustion",   // Combustion -- heavy duty
  "cpd20-25-hidrogeno",           // Hydrogen -- flagship green tech
];
export const featuredProducts: Product[] = featuredIds
  .map((id) => allProducts.find((p) => p.id === id))
  .filter((p): p is FullProduct => p !== undefined)
  .map(toProduct);

/**
 * Get Product[] for a given category (simple interface for components).
 */
export function getCategoryProducts(categorySlug: string): Product[] {
  return allProducts
    .filter((p) => p.categorySlug === categorySlug)
    .map(toProduct);
}

// =============================================================================
// FUEL TYPE CATEGORIES — For the /productos landing page
// =============================================================================

export interface FuelTypeCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  color: "emerald" | "amber" | "sky" | "teal";
}

function countByFuel(slug: string): number {
  return allProducts.filter((p) => {
    switch (slug) {
      case "electrica":
        return p.fuelType === "Electrica";
      case "diesel":
        return p.fuelType === "Diesel" || p.fuelType === "Diesel / GLP";
      case "glp":
        return p.fuelType === "GLP" || p.fuelType === "Diesel / GLP";
      case "hidrogeno":
        return p.fuelType === "Hidrogeno";
      default:
        return false;
    }
  }).length;
}

export const fuelTypeCategories: (FuelTypeCategory & { productCount: number })[] = [
  {
    id: "electrica",
    name: "Electrica",
    slug: "electrica",
    description:
      "Energia limpia, cero emisiones y bajo costo operativo. Litio-ion de ultima generacion para operaciones en interiores y exteriores.",
    icon: "Zap",
    image: `${IMG}/g-series-1-3.5t-electric.jpg`,
    color: "emerald",
    productCount: countByFuel("electrica"),
  },
  {
    id: "diesel",
    name: "Diesel",
    slug: "diesel",
    description:
      "Potencia y rendimiento para las operaciones mas exigentes. Motores certificados TIER IV/V con maxima eficiencia de combustible.",
    icon: "Fuel",
    image: `${IMG}/g3-series-5-10t-combustion.jpg`,
    color: "amber",
    productCount: countByFuel("diesel"),
  },
  {
    id: "glp",
    name: "Gas (GLP)",
    slug: "glp",
    description:
      "Gas licuado de petroleo: menor costo que diesel, apta para uso interior/exterior. Ideal para operaciones mixtas.",
    icon: "Flame",
    image: `${IMG}/g3-series-4-5t-gas.png`,
    color: "sky",
    productCount: countByFuel("glp"),
  },
  {
    id: "hidrogeno",
    name: "Hidrogeno Verde",
    slug: "hidrogeno",
    description:
      "Tecnologia de celda de combustible: cero emisiones, recarga en 3 minutos y operacion continua 24/7. El futuro es hoy.",
    icon: "Atom",
    image: `${IMG}/cpd20-25-hidrogeno.png`,
    color: "teal",
    productCount: countByFuel("hidrogeno"),
  },
];

/** Filter products by fuel type slug */
export function getProductsByFuelType(tipo: string): FullProduct[] {
  return allProducts.filter((p) => {
    switch (tipo) {
      case "electrica":
        return p.fuelType === "Electrica";
      case "diesel":
        return p.fuelType === "Diesel" || p.fuelType === "Diesel / GLP";
      case "glp":
        return p.fuelType === "GLP" || p.fuelType === "Diesel / GLP";
      case "hidrogeno":
        return p.fuelType === "Hidrogeno";
      default:
        return true;
    }
  });
}

/** Map a fuel type slug to its display name */
export function getFuelTypeName(slug: string): string {
  const map: Record<string, string> = {
    electrica: "Electrica",
    diesel: "Diesel",
    glp: "Gas (GLP)",
    hidrogeno: "Hidrogeno Verde",
  };
  return map[slug] || "Todos";
}
