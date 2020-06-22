export interface ModelType {
  modelKey: string
  type: string
}

export type AutoAlarmType = "auto-alarm"

export interface DealerSavedSearchQuery {
  makeKey: string
  modelType: ModelType[]
  bodyType: string[]
  firstRegistrationYearFrom: number | null
  firstRegistrationYearTo: number | null
  mileageFrom: number | null
  mileageTo: number | null
  priceFrom: number | null
  priceTo: number | null
  horsePowerFrom: number | null
  horsePowerTo: number | null
  fuelTypeGroup: string[]
  transmissionType: string[]
}

export interface DealerSavedSearch {
  createdDate: string | null
  emails: string[]
  id: string | null
  lastModifiedDate: string | null
  query: DealerSavedSearchQuery
  type: AutoAlarmType
}
