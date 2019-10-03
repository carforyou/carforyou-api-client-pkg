export interface Facet {
  [key: string]: number
}

export interface Facets {
  [key: string]: Facet
}

export type WithFacets<T extends {}> = T & {
  facets?: Facets
}
