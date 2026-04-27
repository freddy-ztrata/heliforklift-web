/**
 * Maps internal product slugs to their datasheet PDF paths.
 * PDFs were scraped from heliforklift.cl and stored in /public/assets/legacy/datasheets/
 */

const DATASHEET_DIR = "/assets/legacy/datasheets";

export const productDatasheets: Record<string, string> = {
  // ─── ELECTRIC FORKLIFTS ───
  "h4-series-electrica-0.8-1.2-ton": `${DATASHEET_DIR}/g-series-0-8-1-2-ton-g-series-1-2-ton.pdf`,
  "g-series-electrica-tres-ruedas-1.25-1.5-ton": `${DATASHEET_DIR}/g-series-1-25-1-5-ton.pdf`,
  "g2-series-electrica-1.3-1.5-ton": `${DATASHEET_DIR}/g2-series-1-3-1-5-ton.pdf`,
  "g-series-electrica-1-3.5-ton": `${DATASHEET_DIR}/g-series-1-3-5-ton.pdf`,
  "g-series-electrica-1.5-2-ton": `${DATASHEET_DIR}/g-series-1-5-2-ton.pdf`,
  "h4-series-electrica-1.5-3.8-ton": `${DATASHEET_DIR}/h4-series-1-5-3-8-ton.pdf`,
  "g2-series-electrica-alto-voltaje-4-5-ton": `${DATASHEET_DIR}/g2-series-4-5-ton-grua-de-alto-voltaje.pdf`,
  "g3-series-electrica-6-7-ton": `${DATASHEET_DIR}/g-series-6-7-ton.pdf`,
  "g2-series-electrica-6-10-ton": `${DATASHEET_DIR}/g-series-10-ton-2.pdf`,
  "g-series-electrica-12-18-ton": `${DATASHEET_DIR}/g-series-12-18-tons.pdf`,
  "h3-series-electrica-explosion-proof": `${DATASHEET_DIR}/h3-series-2-3-5-ton-grua-de-bateria-a-prueba-de-explosiones.pdf`,

  // ─── COMBUSTION FORKLIFTS ───
  "g3-series-combustion-2-3.5-ton": `${DATASHEET_DIR}/g3-series-2-0-3-5-ton.pdf`,
  "h3-series-combustion-2-3.5-ton": `${DATASHEET_DIR}/serie-h3-2-0-3-5-ton.pdf`,
  "k2-series-combustion-2-3.5-ton": `${DATASHEET_DIR}/k2-series-2-0-3-5-ton.pdf`,
  "k2-series-combustion-tier4-5-2-3.5-ton": `${DATASHEET_DIR}/k2-series-2-0-3-5-ton-2.pdf`,
  "g3-series-combustion-4-5.5-ton": `${DATASHEET_DIR}/g3-series-4-0-5-0-ton.pdf`,
  "g3-series-gas-4-5-ton": `${DATASHEET_DIR}/g3-series-4-5-ton-2.pdf`,
  "g3-series-combustion-5-10-ton": `${DATASHEET_DIR}/g3-series-5-0-10-tons.pdf`,
  "g3-series-combustion-tier5-5-10-ton": `${DATASHEET_DIR}/2-0-3-5-tons.pdf`,
  "h3-series-combustion-1-3.5-ton": `${DATASHEET_DIR}/h3-series-1-3-5-ton.pdf`,
  "grua-combustion-12-13.5-ton": `${DATASHEET_DIR}/g-series-12-13-5-ton.pdf`,
  "grua-combustion-15-16-ton": `${DATASHEET_DIR}/15-16-ton.pdf`,
  "grua-combustion-20-25-ton": `${DATASHEET_DIR}/20-25-ton.pdf`,
  "grua-combustion-28-32-ton": `${DATASHEET_DIR}/28-32-ton.pdf`,
  "grua-combustion-42-46-ton": `${DATASHEET_DIR}/42-46-ton.pdf`,

  // ─── HYDROGEN ───
  "cpd20-30-hidrogeno-2-3-ton": `${DATASHEET_DIR}/3-3-5-ton-pneumatic.pdf`,
  "cpd30-35-hidrogeno-3-3.5-ton": `${DATASHEET_DIR}/2-3-ton-cushion.pdf`,
  "cpd40-50-hidrogeno-4-5-ton": `${DATASHEET_DIR}/4-5-ton-pneumatic.pdf`,

  // ─── ALL TERRAIN ───
  "g3-todo-terreno-5-ton": `${DATASHEET_DIR}/serie-g3-5t.pdf`,
  "g3-series-todo-terreno-2-3.5-ton": `${DATASHEET_DIR}/g3-series-todo-terreno.pdf`,

  // ─── PALLET JACKS ───
  "cbd15-20-transpaleta-electrica": `${DATASHEET_DIR}/cbd15-20-a-blih.pdf`,
  "ctd16-20-transpaleta-electrica": `${DATASHEET_DIR}/ctd16-20.pdf`,
  "ctd16-960h-transpaleta-electrica": `${DATASHEET_DIR}/ctd16-960h.pdf`,

  // ─── STACKERS ───
  "ops15-order-picker": `${DATASHEET_DIR}/ops15.pdf`,
  "cpd12-apilador-electrico": `${DATASHEET_DIR}/cpd12-970-910.pdf`,
  "cdd06-apilador-peatonal": `${DATASHEET_DIR}/cdd06-970.pdf`,
  "cdd15j-apilador-electrico": `${DATASHEET_DIR}/cdd15j-zsm.pdf`,

  // ─── REACH TRUCKS ───
  "g-series-reach-truck-1.5-2-ton": `${DATASHEET_DIR}/g-series-1-5-2-0-ton-cpdsr15-18.pdf`,
  "g2-series-reach-truck-1.6-2-ton": `${DATASHEET_DIR}/g2-series-1-6-2-ton-modelo-cqd16-20.pdf`,
  "g2-series-reach-truck-2-2.5-ton": `${DATASHEET_DIR}/g2-series-2-2-5-ton-cqd20-25-gc2r.pdf`,

  // ─── TRACTORS ───
  "qyd80-150-tractor-electrico": `${DATASHEET_DIR}/qyd80-150-a2lig2.pdf`,

  // ─── PLATFORMS ───
  "js07-plataforma-elevadora-tijera": `${DATASHEET_DIR}/js07.pdf`,
};

/**
 * Get the datasheet PDF path for a product slug, or null if not available.
 */
export function getDatasheet(slug: string): string | null {
  return productDatasheets[slug] || null;
}
