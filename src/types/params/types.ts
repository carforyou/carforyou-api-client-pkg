import { PaginationParams } from "./index"
import { Date } from "../models"

export interface TypeFiltersParams {
  tsn?: string
  makeKey?: string
  modelKey?: string
  firstRegistrationDate?: Date
  conditionType?: string
}
export interface SearchTypeQueryParams
  extends PaginationParams,
    TypeFiltersParams {}
