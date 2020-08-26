import { PaginationParams } from "./index"
import { DealerSortParams } from "../sort"

export interface DealerLocationFilter {
  cityId?: string
  radius?: string
}

export interface DealerQueryParams {
  feature: string[]
  language?: string
  location?: DealerLocationFilter
}

export interface DealerParams {
  query: DealerQueryParams
  sort: DealerSortParams
  pagination: PaginationParams
}
