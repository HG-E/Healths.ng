import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

const rawClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(rawClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
