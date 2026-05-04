#!/usr/bin/env node
/**
 * Edición creativa de imágenes vía Fal.ai (FLUX.1 Kontext Pro).
 * Requiere: FAL_KEY en variable de entorno.
 *
 * Uso:
 *   node scripts/edit-image.js <imagen> "<prompt>"
 *   node scripts/edit-image.js cortinas_lino.jpg "Cambia el fondo a un salón de estilo nórdico"
 *   node scripts/edit-image.js hero-curtain.jpg "Añade luz natural cálida de tarde" --output resultado.jpg
 *
 * Opciones:
 *   --output <nombre>   Nombre del archivo de salida (por defecto: <original>_edited.jpg)
 *   --strength <0-1>    Fuerza de edición, 0.7 por defecto (0=sin cambios, 1=máximo)
 */

const fs   = require('fs');
const path = require('path');
const https = require('https');

const IMAGES_DIR = path.join(__dirname, '..', 'assets', 'images');
const args = process.argv.slice(2);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getArg(flag, def) {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : def;
}

function usage() {
  console.log(`
Uso: node scripts/edit-image.js <imagen> "<prompt>" [opciones]

Opciones:
  --output <nombre>   Archivo de salida (default: <original>_edited.jpg)
  --strength <0-1>    Fuerza de edición (default: 0.7)

Requiere variable de entorno FAL_KEY con tu API key de fal.ai
Obtén una en: https://fal.ai/dashboard/keys

Ejemplo:
  $env:FAL_KEY="tu-key-aqui"
  node scripts/edit-image.js hero-curtain.jpg "Añade luz dorada de atardecer"
`);
  process.exit(1);
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(destPath);
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

function imageToBase64(filePath) {
  const ext = path.extname(filePath).toLowerCase().replace('.', '');
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg'
    : ext === 'png' ? 'image/png'
    : ext === 'webp' ? 'image/webp'
    : 'image/jpeg';
  const data = fs.readFileSync(filePath);
  return `data:${mime};base64,${data.toString('base64')}`;
}

async function falRequest(endpoint, payload, apiKey) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const options = {
      hostname: 'fal.run',
      path: `/${endpoint}`,
      method: 'POST',
      headers: {
        'Authorization': `Key ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject(new Error(`API error ${res.statusCode}: ${JSON.stringify(json)}`));
          } else {
            resolve(json);
          }
        } catch {
          reject(new Error(`Respuesta no válida: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const FAL_KEY = process.env.FAL_KEY;
  if (!FAL_KEY) {
    console.error('\n❌ FAL_KEY no configurada.\n');
    console.error('  Ejecuta: $env:FAL_KEY="tu-api-key"');
    console.error('  Obtén una en: https://fal.ai/dashboard/keys\n');
    process.exit(1);
  }

  // Filtrar args que no son flags
  const positional = args.filter((a, i) => {
    if (a.startsWith('--')) return false;
    if (i > 0 && args[i - 1].startsWith('--')) return false;
    return true;
  });

  if (positional.length < 2) usage();

  const [imageName, prompt] = positional;
  const outputName  = getArg('--output', null);
  const strength    = parseFloat(getArg('--strength', '0.7'));

  // Resolver ruta de entrada
  let inputPath = path.isAbsolute(imageName)
    ? imageName
    : path.join(IMAGES_DIR, imageName);

  if (!fs.existsSync(inputPath)) {
    console.error(`\n❌ Imagen no encontrada: ${inputPath}\n`);
    process.exit(1);
  }

  // Ruta de salida
  const baseName = path.basename(imageName, path.extname(imageName));
  const outFile  = outputName || `${baseName}_edited.jpg`;
  const outputPath = path.join(IMAGES_DIR, outFile);

  console.log(`\n🖼  Imagen:  ${imageName}`);
  console.log(`✏️  Prompt:  ${prompt}`);
  console.log(`⚡ Modelo:  FLUX.1 Kontext Pro (fal.ai)`);
  console.log(`📊 Fuerza:  ${strength}\n`);
  console.log('Enviando a la API...');

  const imageBase64 = imageToBase64(inputPath);

  // Llamada a FLUX.1 Kontext via fal.ai
  const result = await falRequest('fal-ai/flux-pro/kontext', {
    prompt,
    image_url: imageBase64,
    strength,
    output_format: 'jpeg',
    safety_tolerance: '6',
  }, FAL_KEY);

  if (!result.images || result.images.length === 0) {
    console.error('❌ La API no devolvió imágenes.');
    console.error(JSON.stringify(result, null, 2));
    process.exit(1);
  }

  const imageUrl = result.images[0].url;
  console.log('Descargando resultado...');
  await downloadFile(imageUrl, outputPath);

  const outSize = fs.statSync(outputPath).size;
  console.log(`\n✅ Guardado: images/${outFile} (${Math.round(outSize / 1024)}KB)\n`);
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
