import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const iconBuf = readFileSync(join(root, 'public', 'logo-icon-trimmed.png'))
const bg = { r: 255, g: 255, b: 255, alpha: 0 }

async function run() {
  // apple-touch-icon 180x180
  await sharp(iconBuf)
    .resize(180, 180, { fit: 'contain', background: bg })
    .png()
    .toFile(join(root, 'public', 'apple-touch-icon.png'))
  console.log('apple-touch-icon.png done')

  // 512x512 for manifest / app icon
  await sharp(iconBuf)
    .resize(512, 512, { fit: 'contain', background: bg })
    .png()
    .toFile(join(root, 'public', 'icon-512.png'))
  console.log('icon-512.png done')

  // 192x192 for manifest
  await sharp(iconBuf)
    .resize(192, 192, { fit: 'contain', background: bg })
    .png()
    .toFile(join(root, 'public', 'icon-192.png'))
  console.log('icon-192.png done')

  // 32x32 PNG for favicon fallback
  const png32 = await sharp(iconBuf)
    .resize(32, 32, { fit: 'contain', background: bg })
    .png()
    .toBuffer()
  writeFileSync(join(root, 'public', 'favicon-32.png'), png32)
  console.log('favicon-32.png done')

  // app/icon.png at 512x512 — Next.js App Router picks this up automatically
  await sharp(iconBuf)
    .resize(512, 512, { fit: 'contain', background: bg })
    .png()
    .toFile(join(root, 'app', 'icon.png'))
  console.log('app/icon.png done')

  // app/apple-icon.png — Next.js serves this as /apple-touch-icon.png automatically
  await sharp(iconBuf)
    .resize(180, 180, { fit: 'contain', background: bg })
    .png()
    .toFile(join(root, 'app', 'apple-icon.png'))
  console.log('app/apple-icon.png done')

  console.log('\nAll icons generated successfully.')
}

run().catch(err => { console.error(err); process.exit(1) })
