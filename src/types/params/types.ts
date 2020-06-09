import { PaginationParams } from "./index"
import { Date } from "../models"

export interface TypeFiltersParams {
  tsn?: string
  makeKey?: string
  modelKey?: string
  fuelType?: string[]
  transmissionType?: string[]
  gears?: string[]
  bodyType?: string[]
  horsePower?: number
  firstRegistrationDate?: Date
  conditionType?: string
}
export interface SearchTypeQueryParams
  extends PaginationParams,
    TypeFiltersParams {}
