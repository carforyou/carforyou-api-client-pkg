import { PaginationParams } from "./index"
import { Date } from "../models"

export interface TypeFiltersParams {
  tsn?: string
  makeKey?: string
  modelKey?: string
  fuelType?: string[]
  transmissionType?: string[]
  gears?: number
  bodyType?: string[]
  horsePower?: number
  firstRegistrationDate?: Date
  conditionType?: string
}
export interface SearchTypeQueryParams
  extends PaginationParams,
    TypeFiltersParams {}
