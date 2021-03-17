import { LeadSortTypeParams, SortParams } from "../../types/sort"

import { PaginationParams } from "./index"
export interface LeadQueryParams extends PaginationParams {
  sort: SortParams<LeadSortTypeParams>
  searchQuery: string
}
