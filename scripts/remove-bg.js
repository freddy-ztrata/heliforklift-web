/* eslint-disable */
// Remueve fondo blanco de una imagen JPG y la guarda como PNG transparente.
// Usa Sharp para procesar pixel por pixel: convierte a transparente cualquier
// pixel "blanco" (RGB > threshold) con una zona de feathering en los bordes
// para evitar halo. Compatible con productos sobre fondo blanco.
//
// Uso: node scripts/remove-bg.js

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const INPUT = path.join(
  __dirname,
  "..",
  "public",
  "assets",
  "legacy",
  "products",
  "g3-series-2-3.5t-gas.jpg"
);
const OUTPUT = path.join(
  __dirname,
  "..",
  "public",
  "assets",
  "legacy",
  "products",
  "g3-series-2-3.5t-gas-nobg.png"
);

// Threshold: cuán blanco debe ser un pixel para considerarlo fondo.
// 240 = bastante estricto (capta blancos puros y casi-blancos).
// 230 = más agresivo (puede empezar a comer detalles claros del producto).
const THRESHOLD_HIGH = 245; // 100% transparente arriba de esto
const THRESHOLD_LOW = 220;  // 100% opaco bajo esto, feather entre ambos

async function removeWhiteBackground() {
  console.log(`Procesando: ${INPUT}`);

  const image = sharp(INPUT);
  const { width, height } = await image.metadata();

  console.log(`  Dimensiones: ${width}x${height}`);

  // Extraer raw pixels en RGBA
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(`  Canales: ${info.channels}`);

  // Procesar pixel por pixel
  let processed = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // "Whiteness" = mínimo de los 3 canales (un pixel blanco tiene los 3 cerca de 255)
    const minRGB = Math.min(r, g, b);

    if (minRGB >= THRESHOLD_HIGH) {
      // Pixel blanco puro -> totalmente transparente
      data[i + 3] = 0;
      processed++;
    } else if (minRGB >= THRESHOLD_LOW) {
      // Zona de feathering: alpha proporcional al "no-blancura"
      const range = THRESHOLD_HIGH - THRESHOLD_LOW;
      const factor = (THRESHOLD_HIGH - minRGB) / range; // 0..1
      data[i + 3] = Math.round(255 * factor);
    }
    // else: pixel opaco, mantener alpha = 255
  }

  console.log(`  Pixels transparentes: ${processed} (${((processed / (width * height)) * 100).toFixed(1)}%)`);

  // Guardar como PNG con transparencia
  await sharp(data, {
    raw: { width, height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(OUTPUT);

  const stat = fs.statSync(OUTPUT);
  console.log(`Listo: ${OUTPUT}`);
  console.log(`  Tamano: ${(stat.size / 1024).toFixed(1)} KB`);
}

removeWhiteBackground().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
