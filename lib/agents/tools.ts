import { z } from 'zod'

type UrlParameters = Record<string, string | number | boolean | undefined | null>

function buildUrl<P extends UrlParameters>(
  path: string,
  parameters: P,
  baseUrl: string,
): string {
  const nonUndefinedParams: [string, string][] = Object.entries(parameters)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => [key, `${value}`])
  const searchParams = new URLSearchParams(nonUndefinedParams)
  return `${baseUrl}/${path}?${searchParams}`
}

export async function images(input: { query: string }) {
  const baseUrl = 'https://serpapi.com'
  const response = await fetch(
    buildUrl(
      'search',
      {
        api_key: process.env.NEXT_SERP_API_KEY,
        q: input.query,
        engine: 'google_images',
        location: 'Aveiro,Portugal',
      },
      baseUrl,
    ),
  )

  const res = await response.json()

  if (res.error) {
    throw new Error(`Got error from serpAPI: ${res.error}`)
  }

  return z
    .object({
      images_results: z.array(
        z.object({
          original: z.string(),
          thumbnail: z.string(),
        }),
      ),
    })
    .parse(res)
}

export async function search(input: { query: string }) {
  const baseUrl = 'https://serpapi.com'
  const response = await fetch(
    buildUrl(
      'search',
      { 
        api_key: process.env.NEXT_SERP_API_KEY, 
        q: input.query,
        location: 'Aveiro,Portugal',
        hl: 'pt-pt',
      },
      baseUrl,
    ),
  )

  const res = await response.json()

  if (res.error) {
    throw new Error(`Got error from serpAPI: ${res.error}`)
  }

  return JSON.stringify(res.organic_results?.slice(0, 5) || 'No results found')
} 