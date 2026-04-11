/**
 * Run this script once to generate branded app icons and splash screen:
 *   node scripts/generate-assets.js
 *
 * Requires: npm install jimp (already in package.json)
 */
const { Jimp } = require('jimp');
const path = require('path');

const BRAND_DARK = 0x2C3E50FF;  // #2C3E50
const BRAND_ACCENT = 0xE67E22FF; // #E67E22
const WHITE = 0xFFFFFFFF;

async function generateIcon() {
  const size = 1024;
  const img = new Jimp({ width: size, height: size, color: BRAND_DARK });

  // Accent circle
  const cx = size / 2;
  const cy = size / 2;
  const r = 320;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      if (dist <= r) {
        img.setPixelColor(BRAND_ACCENT, x, y);
      }
    }
  }

  // Inner white circle
  const ir = 240;
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      if (dist <= ir) {
        img.setPixelColor(BRAND_DARK, x, y);
      }
    }
  }

  await img.write(path.join(__dirname, '../assets/icon.png'));
  await img.resize({ w: 1024, h: 1024 });
  await img.write(path.join(__dirname, '../assets/adaptive-icon.png'));
  console.log('✓ Generated icon.png and adaptive-icon.png');
}

async function generateSplash() {
  const width = 1284;
  const height = 2778;
  const img = new Jimp({ width, height, color: BRAND_DARK });

  // Center accent circle
  const cx = width / 2;
  const cy = height / 2;
  const r = 200;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      if (dist <= r) {
        img.setPixelColor(BRAND_ACCENT, x, y);
      }
      if (dist <= r * 0.7) {
        img.setPixelColor(WHITE, x, y);
      }
    }
  }

  await img.write(path.join(__dirname, '../assets/splash-icon.png'));
  console.log('✓ Generated splash-icon.png');
}

async function generateFavicon() {
  const size = 48;
  const img = new Jimp({ width: size, height: size, color: BRAND_DARK });
  await img.write(path.join(__dirname, '../assets/favicon.png'));
  console.log('✓ Generated favicon.png');
}

async function main() {
  console.log('Generating mfFurniture branded assets...');
  await Promise.all([generateIcon(), generateSplash(), generateFavicon()]);
  console.log('Done! Restart your Expo server to see changes.');
}

main().catch(console.error);
