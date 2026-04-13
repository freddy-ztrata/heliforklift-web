import {
  allProducts,
  electricForklifts,
  combustionForklifts,
  hydrogenForklifts,
  reachTrucks,
  palletJacks,
  stackers,
  containerHandlers,
  type FullProduct,
} from "./all-products";

// Re-export the FullProduct type and allProducts for convenience
export type { FullProduct };
export { allProducts };

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
 * Picks representative models from key categories.
 */
export const featuredProducts: Product[] = [
  // Electric -- G Series flagship
  toProduct(electricForklifts[0]),
  // Combustion -- K2 Series
  toProduct(combustionForklifts[0]),
  // Combustion -- heavy duty
  toProduct(combustionForklifts[5]),
  // Hydrogen -- flagship green tech
  toProduct(hydrogenForklifts[0]),
];

/**
 * Get Product[] for a given category (simple interface for components).
 */
export function getCategoryProducts(categorySlug: string): Product[] {
  return allProducts
    .filter((p) => p.categorySlug === categorySlug)
    .map(toProduct);
}
