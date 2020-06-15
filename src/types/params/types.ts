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
  fullName?: string
  firstRegistrationDate?: Date
}
export interface SearchTypeQueryParams
  extends PaginationParams,
    TypeFiltersParams {}
