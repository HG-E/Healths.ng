import sharp from 'sharp'
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const pub = join(root, 'public')
const logosDir = join(pub, 'logos')

// 1. Create logos folder
mkdirSync(logosDir, { recursive: true })
console.log('Created public/logos/')

// 2. Copy source SVGs and PNGs into logos folder
for (const name of ['logo-icon.svg', 'logo-full.svg', 'logo-full.png']) {
  try {
    copyFileSync(join(pub, name), join(logosDir, name))
    console.log(`Copied ${name} → logos/`)
  } catch {
    console.log(`Skipping ${name} (not found)`)
  }
}

// 3. Render the SVG directly (preserves masking, clipping, compositing)
//    then trim whitespace to get the actual visible logo bounds
const svgBuf = readFileSync(join(pub, 'logo-icon.svg'))

// Render at 2048px wide for high quality, then trim
const renderedPng = await sharp(svgBuf, { density: 300 })
  .resize(2048, null)
  .png()
  .toBuffer()

// 4. Trim whitespace/transparency from the rendered output
const trimmedPng = await sharp(renderedPng)
  .trim({ threshold: 15 })
  .png()
  .toBuffer()

const meta = await sharp(trimmedPng).metadata()
const tw = meta.width
const th = meta.height
console.log(`Rendered+trimmed size: ${tw}x${th}`)

// Square canvas = max dimension + 8% padding each side
const side = Math.round(Math.max(tw, th) * 1.08)
const xOffset = Math.round((side - tw) / 2)
const yOffset = Math.round((side - th) / 2)

const squareBuf = await sharp({
  create: { width: side, height: side, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([{ input: trimmedPng, left: xOffset, top: yOffset }])
  .png()
  .toBuffer()

// Save master icon to logos folder (high-res, for favicon generation)
const masterPath = join(logosDir, 'logo-icon-clean.png')
writeFileSync(masterPath, squareBuf)
console.log(`Saved logos/logo-icon-clean.png (${side}x${side})`)


// 5. Regenerate all favicon / PWA assets from the clean square icon
const bg = { r: 0, g: 0, b: 0, alpha: 0 }

// Also write the navbar icon now that bg is defined
const navbarIconBuf2 = await sharp(squareBuf)
  .resize(512, 512, { fit: 'contain', background: bg })
  .png()
  .toBuffer()
writeFileSync(join(pub, 'logo-icon-trimmed.png'), navbarIconBuf2)
console.log('Wrote public/logo-icon-trimmed.png (512×512, for navbar)')

const sizes = [
  { size: 512, dest: join(pub, 'icon-512.png') },
  { size: 192, dest: join(pub, 'icon-192.png') },
  { size: 180, dest: join(pub, 'apple-touch-icon.png') },
  { size: 32,  dest: join(pub, 'favicon-32.png') },
  { size: 512, dest: join(root, 'app', 'icon.png') },
  { size: 180, dest: join(root, 'app', 'apple-icon.png') },
]

for (const { size, dest } of sizes) {
  await sharp(squareBuf)
    .resize(size, size, { fit: 'contain', background: bg })
    .png()
    .toFile(dest)
  console.log(`Generated ${dest.replace(root, '').replace(/\\/g, '/')} (${size}x${size})`)
}

console.log('\nAll done. Favicon assets regenerated from clean icon.')
