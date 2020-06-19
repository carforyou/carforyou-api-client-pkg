export interface ModelType {
  modelKey: string
  type: string
}

export type AutoAlarmType = "auto-alarm"

export interface DealerSavedSearch {
  createdDate: string | Date
  emails: string[]
  id: string | null
  lastModifiedDate: string | Date
  query: {
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
  type: AutoAlarmType
}
