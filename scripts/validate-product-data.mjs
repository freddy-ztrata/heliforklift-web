/**
 * Valida que las keys de productGalleries y productDatasheets calcen con un slug
 * real de all-products.ts. Una key huerfana no rompe nada visible: el lookup
 * falla en silencio y las fotos/datasheets nunca se muestran.
 *
 * Corre como prebuild (npm run build) y tambien a mano: npm run validate:data
 *
 * Node puro, sin dependencias (parsea los .ts como texto) para que funcione
 * dentro del build de Docker sin agregar devDependencies.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

// slug: "algo" o slug: 'algo'
const slugs = new Set(
  [...read("src/lib/data/all-products.ts").matchAll(/slug:\s*["']([^"']+)["']/g)].map(
    (m) => m[1],
  ),
);

/**
 * Keys de primer nivel de un Record<string, ...>, con la indentacion de 2 espacios
 * que usan estos archivos. Cubre tanto `  "key": [` (galerias) como
 * `  "key": \`...\`` (datasheets).
 */
const topLevelKeys = (src) =>
  [...src.matchAll(/^ {2}["']([^"']+)["']:\s*[[`"']/gm)].map((m) => m[1]);

const targets = [
  { label: "productGalleries", file: "src/lib/data/product-galleries.ts" },
  { label: "productDatasheets", file: "src/lib/data/product-datasheets.ts" },
];

let orphansFound = 0;

// Si no pudimos parsear, avisamos pero NO bloqueamos el build: preferimos un
// deploy que pase a un deploy roto por un regex desactualizado.
if (slugs.size === 0) {
  console.warn(
    "[validate-product-data] No se pudo extraer ningun slug de all-products.ts — se omite la validacion.",
  );
  process.exit(0);
}

for (const { label, file } of targets) {
  let src;
  try {
    src = read(file);
  } catch {
    continue; // el archivo puede no existir (productDatasheets es opcional)
  }

  const keys = topLevelKeys(src);
  if (keys.length === 0) {
    console.warn(`[validate-product-data] ${label}: no se pudo extraer ninguna key — se omite.`);
    continue;
  }

  const orphans = keys.filter((k) => !slugs.has(k));
  if (orphans.length > 0) {
    orphansFound += orphans.length;
    console.error(
      `\n[validate-product-data] ${label} (${file}) tiene ${orphans.length} key(s) que no calzan con ningun slug de all-products.ts:`,
    );
    for (const k of orphans) console.error(`  - "${k}"`);
  } else {
    console.log(`[validate-product-data] ${label}: ${keys.length} keys, 0 huerfanas.`);
  }
}

if (orphansFound > 0) {
  console.error(
    "\nEsas entradas nunca se muestran en el sitio. Corrige la key al slug exacto del producto.\n" +
      `Slugs disponibles: ${slugs.size} (ver src/lib/data/all-products.ts)\n`,
  );
  process.exit(1);
}
