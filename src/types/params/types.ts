import { PaginationParams } from "./index"

import { Date } from "../../types/models"

export enum PowerUnit {
  HorsePower = "horsePower",
  KiloWatts = "kiloWatts",
}

export interface TypeFiltersParams {
  tsn?: string
  makeKey?: string
  modelKey?: string
  fuelType?: string[]
  transmissionType?: string[]
  gears?: number
  bodyType?: string[]
  power?: { unit?: PowerUnit; value?: number }
  fullName?: string
  productionYear?: number
}
export interface SearchTypeQueryParams
  extends PaginationParams,
    TypeFiltersParams {
  conditionType?: string
  firstRegistrationDate?: Date
}
