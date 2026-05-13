import sharp from 'sharp'
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const pub = join(root, 'public')
const appDir = join(root, 'app')
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
const svgBuf = readFileSync(join(pub, 'logo-icon.svg'))

const renderedPng = await sharp(svgBuf, { density: 300 })
  .resize(2048, null)
  .png()
  .toBuffer()

// 4. Trim whitespace/transparency and make a square with 8% padding
const trimmedPng = await sharp(renderedPng)
  .trim({ threshold: 15 })
  .png()
  .toBuffer()

const meta = await sharp(trimmedPng).metadata()
const tw = meta.width
const th = meta.height
console.log(`Rendered+trimmed size: ${tw}x${th}`)

const side = Math.round(Math.max(tw, th) * 1.08)
const xOffset = Math.round((side - tw) / 2)
const yOffset = Math.round((side - th) / 2)

const bg = { r: 0, g: 0, b: 0, alpha: 0 }

const squareBuf = await sharp({
  create: { width: side, height: side, channels: 4, background: bg },
})
  .composite([{ input: trimmedPng, left: xOffset, top: yOffset }])
  .png()
  .toBuffer()

// Save master icon to logos folder
writeFileSync(join(logosDir, 'logo-icon-clean.png'), squareBuf)
console.log(`Saved logos/logo-icon-clean.png (${side}x${side})`)

// 5. Write optimized 512×512 navbar icon
const navbarBuf = await sharp(squareBuf)
  .resize(512, 512, { fit: 'contain', background: bg })
  .png()
  .toBuffer()
writeFileSync(join(pub, 'logo-icon-trimmed.png'), navbarBuf)
console.log('Wrote public/logo-icon-trimmed.png (512×512, for navbar)')

// 6. Generate all PNG favicon / PWA sizes
const pngSizes = [
  { size: 512, dest: join(pub, 'icon-512.png') },
  { size: 192, dest: join(pub, 'icon-192.png') },
  { size: 180, dest: join(pub, 'apple-touch-icon.png') },
  { size: 32,  dest: join(pub, 'favicon-32.png') },
  { size: 512, dest: join(appDir, 'icon.png') },
  { size: 180, dest: join(appDir, 'apple-icon.png') },
]

for (const { size, dest } of pngSizes) {
  await sharp(squareBuf)
    .resize(size, size, { fit: 'contain', background: bg })
    .png()
    .toFile(dest)
  console.log(`Generated ${dest.replace(root, '').replace(/\\/g, '/')} (${size}x${size})`)
}

// 7. Build a multi-resolution favicon.ico (16, 32, 48px) with embedded PNGs
//    ICO format: ICONDIR header + ICONDIRENTRY per image + raw PNG data
const icoSizes = [48, 32, 16]
const pngBuffers = await Promise.all(
  icoSizes.map(sz =>
    sharp(squareBuf)
      .resize(sz, sz, { fit: 'contain', background: bg })
      .png()
      .toBuffer()
  )
)

function buildIco(buffers) {
  const count = buffers.length
  const headerSize = 6 + count * 16
  const totalSize = headerSize + buffers.reduce((sum, b) => sum + b.length, 0)
  const out = Buffer.alloc(totalSize)

  // ICONDIR
  out.writeUInt16LE(0, 0)      // reserved
  out.writeUInt16LE(1, 2)      // type: 1 = icon
  out.writeUInt16LE(count, 4)  // image count

  let dataOffset = headerSize
  buffers.forEach((png, i) => {
    // Read width/height from PNG IHDR chunk (bytes 16–23)
    const w = png.readUInt32BE(16)
    const h = png.readUInt32BE(20)
    const entry = 6 + i * 16
    out.writeUInt8(w >= 256 ? 0 : w, entry)      // width (0 = 256)
    out.writeUInt8(h >= 256 ? 0 : h, entry + 1)  // height
    out.writeUInt8(0, entry + 2)                  // color count
    out.writeUInt8(0, entry + 3)                  // reserved
    out.writeUInt16LE(1, entry + 4)               // color planes
    out.writeUInt16LE(32, entry + 6)              // bits per pixel
    out.writeUInt32LE(png.length, entry + 8)      // image data size
    out.writeUInt32LE(dataOffset, entry + 12)     // offset to image data
    png.copy(out, dataOffset)
    dataOffset += png.length
  })
  return out
}

const icoBuf = buildIco(pngBuffers)
writeFileSync(join(appDir, 'favicon.ico'), icoBuf)
console.log(`Generated /app/favicon.ico (${icoSizes.join('/')+'px'}, ${(icoBuf.length/1024).toFixed(1)}KB)`)

console.log('\nAll done.')
