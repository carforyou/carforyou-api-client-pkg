import { Date } from "../../types/models"

import { PaginationParams } from "./index"

export enum PowerUnit {
  HorsePower = "horsePower",
  KiloWatts = "kiloWatts",
}

export interface TypeFiltersParams {
  tsn?: string
  frameNumber?: string
  makeKey?: string
  modelKey?: string
  fuelType?: string[]
  transmissionType?: string[]
  gears?: number
  bodyType?: string[]
  power?: { unit?: PowerUnit; value?: number }
  fullName?: string
  productionYear?: number
  imagesCountGroup?: string[]
}
export interface SearchTypeQueryParams
  extends PaginationParams,
    TypeFiltersParams {
  id?: number[]
  conditionType?: string
  firstRegistrationDate?: Date
}
