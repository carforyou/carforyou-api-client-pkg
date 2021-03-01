import { LeadSortParams } from "../../types/sort"

import { PaginationParams } from "./index"

export interface LeadQueryParams extends PaginationParams {
  sort: LeadSortParams
}
