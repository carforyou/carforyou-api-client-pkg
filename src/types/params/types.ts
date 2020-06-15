import { PaginationParams } from "./index"

import { Date } from "../../types/models"

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
  productionYear?: number
}
export interface SearchTypeQueryParams
  extends PaginationParams,
    TypeFiltersParams {
  conditionType?: string
  firstRegistrationDate?: Date
}
