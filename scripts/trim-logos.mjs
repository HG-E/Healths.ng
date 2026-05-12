import sharp from 'sharp'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

/** Find bounding box of non-white, non-transparent pixels */
async function contentBounds(buf, renderWidth) {
  const { data, info } = await sharp(buf, { density: 150 })
    .resize(renderWidth, null, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  let top = height, bottom = 0, left = width, right = 0

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels
      const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3]
      // Skip transparent or near-white pixels
      if (a < 30) continue
      if (r > 240 && g > 240 && b > 240) continue
      if (y < top) top = y
      if (y > bottom) bottom = y
      if (x < left) left = x
      if (x > right) right = x
    }
  }

  const pad = 20
  return {
    left: Math.max(0, left - pad),
    top: Math.max(0, top - pad),
    width: Math.min(width, right - left + pad * 2 + 1),
    height: Math.min(height, bottom - top + pad * 2 + 1),
    srcWidth: width,
    srcHeight: height,
  }
}

async function cropAndSave(svgPath, outputPath, renderWidth, label) {
  const buf = readFileSync(svgPath)
  const bounds = await contentBounds(buf, renderWidth)
  console.log(`${label} content at:`, bounds)

  await sharp(buf, { density: 150 })
    .resize(bounds.srcWidth, bounds.srcHeight, { fit: 'inside' })
    .extract({ left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height })
    .png({ compressionLevel: 9 })
    .toFile(outputPath)

  console.log(`${label}: saved ${outputPath}`)
}

await cropAndSave(
  join(root, 'public', 'logo-full.svg'),
  join(root, 'public', 'logo-full-trimmed.png'),
  1200,
  'logo-full'
)

await cropAndSave(
  join(root, 'public', 'logo-icon.svg'),
  join(root, 'public', 'logo-icon-trimmed.png'),
  800,
  'logo-icon'
)

console.log('\nAll done.')
