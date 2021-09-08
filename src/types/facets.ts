export interface Facet {
  [key: string]: number
}

export type Facets = { [key: string]: Facet } & { topFacets: Facets }
