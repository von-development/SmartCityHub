export interface SearchResult {
  id: string
  type: string
  score: number
  address: {
    streetName?: string
    municipality?: string
    countrySubdivision?: string
    country?: string
    freeformAddress?: string
  }
  position: {
    lat: number
    lon: number
  }
  poi?: {
    name: string
    categorySet: Array<{
      id: number
    }>
    categories: string[]
  }
} 