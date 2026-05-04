#!/usr/bin/env node
/**
 * Batch image optimizer — convierte imágenes del book a WebP optimizado.
 * Uso: node scripts/optimize-images.js [--quality 85] [--width 1920] [--file nombre.jpg]
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'assets', 'images');
const OUTPUT_DIR = path.join(IMAGES_DIR, 'webp');

// Parsear args
const args = process.argv.slice(2);
const getArg = (flag, def) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : def;
};
const QUALITY   = parseInt(getArg('--quality', '85'), 10);
const MAX_WIDTH = parseInt(getArg('--width',   '1920'), 10);
const ONLY_FILE = getArg('--file', null);

const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

function formatBytes(b) {
  return b >= 1_000_000
    ? `${(b / 1_000_000).toFixed(1)}MB`
    : `${Math.round(b / 1024)}KB`;
}

async function optimizeImage(inputPath, outputPath) {
  const inSize = fs.statSync(inputPath).size;

  const image = sharp(inputPath);
  const meta  = await image.metadata();

  let pipeline = image;
  if (meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await pipeline
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(outputPath);

  const outSize = fs.statSync(outputPath).size;
  const savings = Math.round((1 - outSize / inSize) * 100);
  const arrow   = savings > 0 ? '↓' : '↑';

  console.log(
    `  ${path.basename(inputPath).padEnd(40)} ${formatBytes(inSize).padStart(7)} → ${formatBytes(outSize).padStart(7)}  ${arrow}${Math.abs(savings)}%`
  );

  return { inSize, outSize };
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const files = ONLY_FILE
    ? [ONLY_FILE]
    : fs.readdirSync(IMAGES_DIR).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return SUPPORTED.has(ext) && !fs.statSync(path.join(IMAGES_DIR, f)).isDirectory();
      });

  if (files.length === 0) {
    console.log('No hay imágenes que procesar.');
    process.exit(0);
  }

  console.log(`\nOptimizando ${files.length} imagen(es) → WebP q${QUALITY} max${MAX_WIDTH}px\n`);
  console.log(`  ${'Archivo'.padEnd(40)} ${'Original'.padStart(7)}   ${'WebP'.padStart(7)}  Ahorro`);
  console.log('  ' + '─'.repeat(66));

  let totalIn = 0, totalOut = 0, errors = 0;

  for (const file of files) {
    const inputPath  = path.join(IMAGES_DIR, file);
    const baseName   = path.basename(file, path.extname(file));
    const outputPath = path.join(OUTPUT_DIR, `${baseName}.webp`);

    if (!fs.existsSync(inputPath)) {
      console.error(`  ERROR: no encontrado — ${file}`);
      errors++;
      continue;
    }

    try {
      const { inSize, outSize } = await optimizeImage(inputPath, outputPath);
      totalIn  += inSize;
      totalOut += outSize;
    } catch (err) {
      console.error(`  ERROR procesando ${file}: ${err.message}`);
      errors++;
    }
  }

  const totalSavings = totalIn > 0 ? Math.round((1 - totalOut / totalIn) * 100) : 0;
  console.log('  ' + '─'.repeat(66));
  console.log(
    `  ${'TOTAL'.padEnd(40)} ${formatBytes(totalIn).padStart(7)} → ${formatBytes(totalOut).padStart(7)}  ↓${totalSavings}%`
  );
  if (errors > 0) console.log(`\n  ⚠️  ${errors} error(es) durante el proceso.`);
  console.log(`\n  WebP guardados en: images/webp/\n`);
}

main().catch(err => {
  console.error('Error fatal:', err.message);
  process.exit(1);
});
