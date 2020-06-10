interface ModelType {
  modelKey: string
  type: string
}

export type AutoAlarmType = "auto-alarm"

export interface DealerSavedSearch {
  createdDate: string
  emails: string[]
  id: number
  lastModifiedDate: string
  query: {
    makeKey: string
    modelType: ModelType[]
    bodyType: string[]
    firstRegistrationYearFrom: number
    firstRegistrationYearTo: number
    mileageFrom: number
    mileageTo: number
    priceFrom: number
    priceTo: number
    horsePowerFrom: number
    horsePowerTo: number
    fuelTypeGroup: string[]
    transmissionType: string[]
  }
  type: AutoAlarmType
}
