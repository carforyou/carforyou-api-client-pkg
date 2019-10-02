export interface MakeModelFilter {
  makeKey?: string
  modelKey?: string
  type?: string
}

export interface LocationFilter {
  zipCode?: string
  radius?: string
}

export interface QueryParams {
  lng?: string
  radius?: string
  zipCode?: string
  [key: string]:
    | string
    | number
    | string[]
    | number[]
    | MakeModelFilter[]
    | LocationFilter
}

export interface PaginationParams extends QueryParams {
  page?: number
  size?: number
}

export interface SearchParams extends QueryParams {
  priceTo?: number
  priceFrom?: number
  makeKey?: string[]
  modelKey?: string[]
  bodyType?: string | string[]
}

export interface FilterParams {
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
  hasMbgOnly?: string
  consumptionCategory?: string[]
  mileageFrom?: number
  mileageTo?: number
  bodyColorGroup?: string[]
  horsePowerFrom?: number
  horsePowerTo?: number
  zipCode?: string
  radius?: string
  dealerId?: string[]
  lifestyleType?: string[]
  vehicleClass?: string[]
  includeWithoutImages?: string

  [key: string]: number | string[] | string | MakeModelFilter[] | LocationFilter
}
