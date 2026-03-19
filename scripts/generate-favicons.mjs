import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const publicDir = join(process.cwd(), "public");

// App brand colors
const BG = "#2a2420"; // warm dark brown
const GOLD = "#c9a87c"; // gold accent
const GOLD_LIGHT = "#d4b896";

// Create SVG with a elegant "~" tilde on brown background with subtle gold border
function createFaviconSvg(size) {
  const padding = Math.round(size * 0.08);
  const borderWidth = Math.max(1, Math.round(size * 0.04));
  const borderRadius = Math.round(size * 0.22);

  // The tilde should be prominent and centered
  const fontSize = Math.round(size * 0.55);
  const tildeY = Math.round(size * 0.58);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${borderRadius}" fill="${BG}"/>
  <rect x="${padding}" y="${padding}" width="${size - padding * 2}" height="${size - padding * 2}" rx="${borderRadius - padding / 2}" fill="none" stroke="${GOLD}" stroke-width="${borderWidth}" opacity="0.35"/>
  <text x="${size / 2}" y="${tildeY}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" font-weight="400" font-style="italic" fill="${GOLD_LIGHT}">~</text>
</svg>`;
}

// Create apple-touch-icon SVG (more padding, rounded by OS)
function createAppleSvg(size) {
  const fontSize = Math.round(size * 0.5);
  const tildeY = Math.round(size * 0.56);
  const borderRadius = Math.round(size * 0.18);
  const borderWidth = Math.round(size * 0.025);
  const inset = Math.round(size * 0.06);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${borderRadius}" fill="${BG}"/>
  <rect x="${inset}" y="${inset}" width="${size - inset * 2}" height="${size - inset * 2}" rx="${borderRadius - inset / 2}" fill="none" stroke="${GOLD}" stroke-width="${borderWidth}" opacity="0.3"/>
  <text x="${size / 2}" y="${tildeY}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" font-weight="400" font-style="italic" fill="${GOLD_LIGHT}">~</text>
</svg>`;
}

// Create PWA icon (larger, with more detail)
function createPwaSvg(size) {
  const fontSize = Math.round(size * 0.4);
  const tildeY = Math.round(size * 0.48);
  const subtitleSize = Math.round(size * 0.07);
  const subtitleY = Math.round(size * 0.68);
  const borderRadius = Math.round(size * 0.18);
  const borderWidth = Math.round(size * 0.015);
  const inset = Math.round(size * 0.05);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${borderRadius}" fill="${BG}"/>
  <rect x="${inset}" y="${inset}" width="${size - inset * 2}" height="${size - inset * 2}" rx="${borderRadius - inset / 2}" fill="none" stroke="${GOLD}" stroke-width="${borderWidth}" opacity="0.25"/>
  <text x="${size / 2}" y="${tildeY}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" font-weight="400" font-style="italic" fill="${GOLD_LIGHT}">~</text>
  <text x="${size / 2}" y="${subtitleY}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${subtitleSize}" font-weight="400" letter-spacing="0.15em" fill="${GOLD}" opacity="0.7">SETE VÉUS</text>
</svg>`;
}

// Maskable icon — safe zone is center 80%, so push content inward
function createMaskableSvg(size) {
  const fontSize = Math.round(size * 0.3);
  const tildeY = Math.round(size * 0.42);
  const subtitleSize = Math.round(size * 0.055);
  const subtitleY = Math.round(size * 0.58);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${BG}"/>
  <text x="${size / 2}" y="${tildeY}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" font-weight="400" font-style="italic" fill="${GOLD_LIGHT}">~</text>
  <text x="${size / 2}" y="${subtitleY}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${subtitleSize}" font-weight="400" letter-spacing="0.15em" fill="${GOLD}" opacity="0.7">SETE VÉUS</text>
</svg>`;
}

async function generate() {
  console.log("Generating favicons...");

  // favicon-16x16.png
  const svg16 = Buffer.from(createFaviconSvg(16));
  await sharp(svg16).png().toFile(join(publicDir, "favicon-16x16.png"));
  console.log("  favicon-16x16.png");

  // favicon-32x32.png
  const svg32 = Buffer.from(createFaviconSvg(32));
  await sharp(svg32).png().toFile(join(publicDir, "favicon-32x32.png"));
  console.log("  favicon-32x32.png");

  // apple-touch-icon.png (180x180)
  const svgApple = Buffer.from(createAppleSvg(180));
  await sharp(svgApple).png().toFile(join(publicDir, "apple-touch-icon.png"));
  console.log("  apple-touch-icon.png");

  // icon-192.png (PWA)
  const svg192 = Buffer.from(createPwaSvg(192));
  await sharp(svg192).png().toFile(join(publicDir, "icon-192.png"));
  console.log("  icon-192.png");

  // icon-512.png (PWA)
  const svg512 = Buffer.from(createPwaSvg(512));
  await sharp(svg512).png().toFile(join(publicDir, "icon-512.png"));
  console.log("  icon-512.png");

  // Also save the SVG favicon for browsers that support it
  writeFileSync(join(publicDir, "favicon.svg"), createFaviconSvg(32));
  console.log("  favicon.svg");

  // Generate favicon.ico replacement for src/app/
  const svg48 = Buffer.from(createFaviconSvg(48));
  await sharp(svg48).resize(48, 48).png().toFile(join(process.cwd(), "src", "app", "favicon.ico"));
  console.log("  src/app/favicon.ico (replaced)");

  // Generate maskable icon (extra padding for Android safe zone — content in center 80%)
  const maskSvg512 = Buffer.from(createMaskableSvg(512));
  await sharp(maskSvg512).png().toFile(join(publicDir, "icon-512-maskable.png"));
  console.log("  icon-512-maskable.png");

  console.log("Done!");
}

generate().catch(console.error);
