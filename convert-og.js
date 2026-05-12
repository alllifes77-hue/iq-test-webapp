// convert-og.js — Convert og-universal.svg to og-universal.png
// Run: node convert-og.js
// Requires: npm install sharp

const fs = require('fs');
const path = require('path');

async function convert() {
  try {
    const sharp = require('sharp');
    const svg = fs.readFileSync(path.join(__dirname, 'og-universal.svg'));
    await sharp(svg)
      .png()
      .resize(1200, 630)
      .toFile(path.join(__dirname, 'og-universal.png'));
    console.log('✓ og-universal.png generated (1200×630)');
  } catch (e) {
    console.error('Error:', e.message);
    console.log('\nAlternative: Open og-universal.svg in a browser and screenshot,');
    console.log('or use https://svgtopng.com (1200×630 size)');
  }
}

convert();
