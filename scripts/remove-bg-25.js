/* eslint-disable */
// Remueve fondo blanco de las imagenes 59.png y 61.png de la campana 1
// y las guarda como PNGs transparentes en public/assets/promo/

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "public", "assets", "Campañas", "1");
const OUT_DIR = path.join(ROOT, "public", "assets", "promo");

const FILES = [
  { input: "59.png", output: "heli-gasolina-25-hero.png" },
  { input: "61.png", output: "heli-gasolina-25-side.png" },
];

const THRESHOLD_HIGH = 245;
const THRESHOLD_LOW = 220;

async function processOne(inputName, outputName) {
  const inputPath = path.join(SRC_DIR, inputName);
  const outputPath = path.join(OUT_DIR, outputName);

  console.log(`\nProcesando: ${inputName} -> ${outputName}`);

  const image = sharp(inputPath);
  const { width, height } = await image.metadata();
  console.log(`  Dimensiones: ${width}x${height}`);

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let processed = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const minRGB = Math.min(r, g, b);

    if (minRGB >= THRESHOLD_HIGH) {
      data[i + 3] = 0;
      processed++;
    } else if (minRGB >= THRESHOLD_LOW) {
      const range = THRESHOLD_HIGH - THRESHOLD_LOW;
      const factor = (THRESHOLD_HIGH - minRGB) / range;
      data[i + 3] = Math.round(255 * factor);
    }
  }

  console.log(
    `  Pixels transparentes: ${processed} (${(
      (processed / (width * height)) *
      100
    ).toFixed(1)}%)`
  );

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  await sharp(data, {
    raw: { width, height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  const stat = fs.statSync(outputPath);
  console.log(`  Listo: ${outputName} (${(stat.size / 1024).toFixed(1)} KB)`);
}

async function main() {
  for (const f of FILES) {
    await processOne(f.input, f.output);
  }
  console.log("\nTodas las imagenes procesadas.");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
