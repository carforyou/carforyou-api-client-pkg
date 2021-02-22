export interface ModelType {
  modelKey: string
  type: string
}

export interface DealerSavedSearchQuery {
  makeKey: string
  modelType: ModelType[]
  bodyType: string[]
  firstRegistrationYearFrom?: number
  firstRegistrationYearTo?: number
  mileageFrom?: number
  mileageTo?: number
  priceFrom?: number
  priceTo?: number
  horsePowerFrom?: number
  horsePowerTo?: number
  fuelTypeGroup: string[]
  transmissionType: string[]
}

export interface DealerSavedSearch {
  createdDate?: string
  emails: string[]
  id?: string
  lastModifiedDate?: string
  query: DealerSavedSearchQuery
}
