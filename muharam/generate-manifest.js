const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const manifestPath = path.join(__dirname, 'manifest.json');
const extensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.svg']);

const files = fs.readdirSync(imagesDir).filter(f =>
  extensions.has(path.extname(f).toLowerCase())
);

const images = files.map(file => {
  let name = path.basename(file, path.extname(file));
  name = name.replace(/[-_]?\d+$/, '').replace(/[-_]/g, ' ').trim();
  return { name, url: 'images/' + file };
});

const manifest = JSON.stringify({ images }, null, 2);
fs.writeFileSync(manifestPath, manifest, 'utf8');
console.log(`manifest.json generated with ${images.length} images.`);
