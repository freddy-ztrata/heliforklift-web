#!/usr/bin/env node

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "../public");
const QUALITY = 85;

async function findImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findImages(fullPath)));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function convert(filePath) {
  const webpPath = filePath.replace(/\.(jpe?g|png)$/i, ".webp");
  if (fs.existsSync(webpPath)) return { skipped: true, path: webpPath };

  await sharp(filePath).webp({ quality: QUALITY }).toFile(webpPath);

  const original = fs.statSync(filePath).size;
  const converted = fs.statSync(webpPath).size;
  const saving = (((original - converted) / original) * 100).toFixed(1);

  return { skipped: false, path: webpPath, saving };
}

(async () => {
  console.log("Buscando imágenes en /public...\n");
  const images = await findImages(PUBLIC_DIR);
  console.log(`Encontradas: ${images.length} imágenes\n`);

  let converted = 0;
  let skipped = 0;
  let totalSaving = 0;

  for (const img of images) {
    const rel = path.relative(PUBLIC_DIR, img);
    try {
      const result = await convert(img);
      if (result.skipped) {
        skipped++;
        console.log(`⏭  ${rel} (ya existe)`);
      } else {
        converted++;
        totalSaving += parseFloat(result.saving);
        console.log(`✓  ${rel} → -${result.saving}%`);
      }
    } catch (err) {
      console.error(`✗  ${rel}: ${err.message}`);
    }
  }

  console.log(`\nListo: ${converted} convertidas, ${skipped} omitidas`);
  if (converted > 0) {
    console.log(`Ahorro promedio: ${(totalSaving / converted).toFixed(1)}%`);
  }
})();
