import { createClient } from 'next-sanity'

function makeSanityClient(useCdn = true) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) {
    // Return a no-op client during build when env vars are not set
    return null
  }
  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
    useCdn,
    token: process.env.SANITY_API_TOKEN,
    stega: { enabled: false },
  })
}

const _client = makeSanityClient(process.env.NODE_ENV === 'production')
const _previewClient = makeSanityClient(false)

type SanityFetchOptions = { next?: { tags?: string[]; revalidate?: number }; cache?: RequestCache }

async function safeFetch<T>(
  client: ReturnType<typeof makeSanityClient>,
  query: string,
  params: Record<string, unknown>,
  options: SanityFetchOptions
): Promise<T> {
  if (!client) return [] as unknown as T
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return client.fetch(query, params, options as any) as Promise<T>
}

// Proxy object that returns empty results gracefully when Sanity is not configured
export const sanityClient = {
  fetch: <T>(
    query: string,
    params: Record<string, unknown> = {},
    options: SanityFetchOptions = {}
  ): Promise<T> => safeFetch<T>(_client, query, params, options),
}

export const previewClient = {
  fetch: <T>(
    query: string,
    params: Record<string, unknown> = {},
    options: SanityFetchOptions = {}
  ): Promise<T> => safeFetch<T>(_previewClient, query, params, options),
}
