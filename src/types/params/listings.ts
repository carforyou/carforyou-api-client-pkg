import { ListingSortTypeParams, SortParams } from "../../types/sort"

import { PaginationParams } from "./index"

export interface MakeModelFilter {
  makeKey?: string
  modelKey?: string
  type?: string
}

interface Box {
  topLeftLat: number
  topLeftLon: number
  bottomRightLat: number
  bottomRightLon: number
}

interface GeoPoint {
  lat: number
  lon: number
}

export interface LocationFilter {
  cityId?: string
  radius?: string
  box?: Box
  geoPoint?: GeoPoint
}

export interface SimilarTo {
  makeKey: string
  modelKey: string
  fuelType: string
  bodyType: string
  bodyColor: string
  conditionType: string
  price: number
}

type VariantParams = "A" | "B" | "C" | "D" | "E"
export interface ListingQueryParams extends PaginationParams {
  lng?: string
  radius?: string
  variant?: VariantParams
  cityId?: string
  [key: string]:
    | string
    | number
    | string[]
    | number[]
    | MakeModelFilter[]
    | LocationFilter
    | boolean
    | Array<{ from: string; to: string }>
    | SimilarTo
}

export interface ListingSearchParams extends ListingQueryParams {
  priceTo?: number
  priceFrom?: number
  makeKey?: string[]
  modelKey?: string[]
  bodyType?: string | string[]
  isManual?: boolean
  features?: string[]
}

export enum ConsumptionCategory {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
}

export interface ListingFilterParams {
  priceFrom?: number
  priceTo?: number
  bodyType?: string[]
  makeModelType?: MakeModelFilter[]
  conditionType?: string[]
  fuelType?: string[]
  fuelTypeGroup?: string[]
  transmissionType?: string[]
  driveType?: string[]
  seatsFrom?: number
  seatsTo?: number
  doorsFrom?: number
  doorsTo?: number
  firstRegistrationYearFrom?: number
  firstRegistrationYearTo?: number
  gbdScore?: string[]
  consumptionCategory?: ConsumptionCategory[]
  mileageFrom?: number
  mileageTo?: number
  bodyColor?: string[]
  horsePowerFrom?: number
  horsePowerTo?: number
  cityId?: string
  radius?: string
  dealerId?: string[]
  lifestyleType?: string[]
  vehicleClass?: string[]
  hasImagesOnly?: boolean
  buyNowEligibleOnly?: boolean
  searchAttributes?: string[]
  imagesCountGroup?: string[]
  hasBuyerProtectionOnly?: boolean

  [key: string]:
    | number
    | number[]
    | string[]
    | string
    | MakeModelFilter[]
    | LocationFilter
    | boolean
    | Array<{ from: string; to: string }>
    | SimilarTo
}

export interface DealerListingQueryParams
  extends PaginationParams,
    SortParams<ListingSortTypeParams> {
  manual?: boolean
  features?: string[]
}
