import { PaginationParams } from "./index"
import { DealerSortParams } from "../sort"
import { Feature } from "../../types/models/product"

export interface DealerLocationFilter {
  cityId?: string
  radius?: string
}

export interface DealerQueryParams {
  feature: Feature[]
  language?: string
  location?: DealerLocationFilter
}

export interface DealerParams {
  query: DealerQueryParams
  sort: DealerSortParams[]
  pagination: PaginationParams
}
