export interface MakeModelFilter {
  makeKey?: string
  modelKey?: string
  type?: string
}

export interface LocationFilter {
  zipCode?: string
  radius?: string
}

export interface QueryParams {
  lng?: string
  radius?: string
  zipCode?: string
  [key: string]:
    | string
    | number
    | string[]
    | number[]
    | MakeModelFilter[]
    | LocationFilter
}

export interface PaginationParams extends QueryParams {
  page?: number
  size?: number
}

export interface SearchParams extends QueryParams {
  priceTo?: number
  priceFrom?: number
  makeKey?: string[]
  modelKey?: string[]
  bodyType?: string | string[]
}
