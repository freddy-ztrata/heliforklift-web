/**
 * Gallery images for products, keyed by product slug from all-products.ts.
 * Each entry maps to an array of additional image paths (beyond the main featured image).
 */

const IMG = "/assets/legacy/products";

export const productGalleries: Record<string, string[]> = {
  // === ELECTRIC FORKLIFTS ===
  "g-series-electrica-1-3.5-ton": [
    `${IMG}/g-series-1-3-5-ton-gallery-1.jpg`,
    `${IMG}/g-series-1-3-5-ton-gallery-2.jpg`,
    `${IMG}/g-series-1-3-5-ton-gallery-3.jpg`,
  ],
  "g-series-electrica-tres-ruedas-1.25-1.5-ton": [
    `${IMG}/g-series-1-25-1-5-ton-gallery-1.jpg`,
  ],
  "g2-series-electrica-1.3-1.5-ton": [
    `${IMG}/g2-series-1-3-1-5-ton-gallery-1.png`,
    `${IMG}/g2-series-1-3-1-5-ton-gallery-2.png`,
  ],
  "h4-series-electrica-0.8-1.2-ton": [
    `${IMG}/g-series-0-8-1-2-ton-g-series-1-2-ton-gallery-1.jpg`,
    `${IMG}/g-series-0-8-1-2-ton-g-series-1-2-ton-gallery-2.png`,
    `${IMG}/g-series-0-8-1-2-ton-g-series-1-2-ton-gallery-3.png`,
  ],
  "h4-series-electrica-1.5-3.8-ton": [
    `${IMG}/h4-series-1-5-3-8-ton-gallery-1.png`,
    `${IMG}/h4-series-1-5-3-8-ton-gallery-2.png`,
  ],
  "g2-series-electrica-4-5-ton-alto-voltaje": [
    `${IMG}/g2-series-4-5-ton-grua-de-alto-voltaje-gallery-1.png`,
  ],
  "g3-series-electrica-6-7-ton": [
    `${IMG}/g-series-6-7-ton-gallery-1.png`,
    `${IMG}/g-series-6-7-ton-gallery-2.jpg`,
  ],
  "g2-series-electrica-6-10-ton": [
    `${IMG}/g-series-10-ton-2-gallery-1.png`,
  ],
  "g-series-electrica-12-18-ton": [
    `${IMG}/g-series-12-18-tons-gallery-1.png`,
  ],
  "h3-series-electrica-antiexplosion-2-3.5-ton": [
    `${IMG}/h3-series-2-3-5-ton-grua-de-bateria-a-prueba-de-explosiones-gallery-1.png`,
    `${IMG}/h3-series-2-3-5-ton-grua-de-bateria-a-prueba-de-explosiones-gallery-2.png`,
  ],

  // === COMBUSTION FORKLIFTS ===
  "g3-series-combustion-gas-2-3.5-ton": [
    `${IMG}/g3-series-2-0-3-5-ton-gallery-1.jpg`,
  ],
  "h3-series-combustion-2-3.5-ton": [
    `${IMG}/serie-h3-2-0-3-5-ton-gallery-1.png`,
  ],
  "k2-series-combustion-2-3.5-ton": [
    `${IMG}/k2-series-2-0-3-5-ton-gallery-1.jpg`,
    `${IMG}/k2-series-2-0-3-5-ton-gallery-2.jpg`,
  ],
  "k2-series-combustion-tier-4-5-2-3.5-ton": [
    `${IMG}/k2-series-2-0-3-5-ton-2-gallery-1.jpg`,
    `${IMG}/k2-series-2-0-3-5-ton-2-gallery-2.png`,
    `${IMG}/k2-series-2-0-3-5-ton-2-gallery-3.jpg`,
    `${IMG}/k2-series-2-0-3-5-ton-2-gallery-4.png`,
  ],
  "g3-series-combustion-4-5.5-ton": [
    `${IMG}/g3-series-4-0-5-0-ton-gallery-1.png`,
  ],
  "g3-series-combustion-gas-4-5-ton": [
    `${IMG}/g3-series-4-5-ton-2-gallery-1.png`,
    `${IMG}/g3-series-4-5-ton-2-gallery-2.png`,
    `${IMG}/g3-series-4-5-ton-2-gallery-3.jpg`,
  ],
  "g3-series-combustion-5-10-ton": [
    `${IMG}/g3-series-5-0-10-tons-gallery-1.jpg`,
  ],
  "g3-series-combustion-tier-v-5-10-ton": [
    `${IMG}/2-0-3-5-tons-gallery-1.png`,
    `${IMG}/2-0-3-5-tons-gallery-2.png`,
  ],
  "h3-series-combustion-1-3.5-ton": [
    `${IMG}/h3-series-1-3-5-ton-gallery-1.jpg`,
    `${IMG}/h3-series-1-3-5-ton-gallery-2.jpg`,
    `${IMG}/h3-series-1-3-5-ton-gallery-3.jpg`,
  ],

  // === HYDROGEN ===
  "cpd20-30-hidrogeno-2-3-ton": [
    `${IMG}/3-3-5-ton-pneumatic-gallery-1.png`,
  ],
  "cpd30-35-hidrogeno-3-3.5-ton": [
    `${IMG}/2-3-ton-cushion-gallery-1.png`,
  ],
  "cpd40-50-hidrogeno-4-5-ton": [
    `${IMG}/4-5-ton-pneumatic-gallery-1.png`,
  ],
  "cpd60-70-hidrogeno-6-10-ton": [
    `${IMG}/6-10-ton-pneumatic-gallery-1.png`,
  ],

  // === ALL TERRAIN ===
  "g3-series-todo-terreno-2-3.5-ton": [
    `${IMG}/g3-series-todo-terreno-gallery-1.png`,
    `${IMG}/g3-series-todo-terreno-gallery-2.png`,
    `${IMG}/g3-series-todo-terreno-gallery-3.png`,
  ],

  // === PALLET JACKS ===
  "cbd15-20-transpaleta-electrica": [
    `${IMG}/cbd15-20-a-blih-gallery-1.png`,
    `${IMG}/cbd15-20-a-blih-gallery-2.png`,
  ],
  "ctd16-960h-transpaleta": [
    `${IMG}/ctd16-960h-gallery-1.jpg`,
    `${IMG}/ctd16-960h-gallery-2.jpg`,
  ],

  // === STACKERS ===
  "ops15-order-picker": [
    `${IMG}/ops15-gallery-1.png`,
    `${IMG}/ops15-gallery-2.png`,
  ],
  "cbs05j-d-s-apilador": [
    `${IMG}/cbs05j-d-s-gallery-1.jpg`,
    `${IMG}/cbs05j-d-s-gallery-2.jpg`,
    `${IMG}/cbs05j-d-s-gallery-3.jpg`,
  ],

  // === REACH TRUCKS ===
  "g-series-reach-truck-1.5-2-ton": [
    `${IMG}/g-series-1-5-2-0-ton-cpdsr15-18-gallery-1.png`,
  ],
  "g2-reach-truck-1.6-2-ton": [
    `${IMG}/g2-series-1-6-2-ton-modelo-cqd16-20-gallery-1.jpg`,
  ],

  // === TRACTORS ===
  "qyd80-150-tractor-electrico": [
    `${IMG}/qyd80-150-a2lig2-gallery-1.jpg`,
  ],
};

/**
 * Get gallery images for a product by its slug.
 * Returns the main image + gallery images combined.
 */
export function getProductGallery(slug: string, mainImage: string): string[] {
  const gallery = productGalleries[slug];
  if (!gallery || gallery.length === 0) return [mainImage];
  return [mainImage, ...gallery];
}
