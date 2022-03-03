export interface BasicListingTypeCommons {
  bodyType: string
  makeKey: string
  modelKey: string
  make: string
  model: string

  doors: number
  seats: number

  tsn: string

  productionEndDate: string
  productionStartDate: string
}

export interface EnergyListingTypeCommons {
  fuelType: string
  consumptionCategory: string
  euroStandard: string

  consumptionCombined: number
  consumptionExtraUrban: number
  consumptionUrban: number

  batteryCapacity: number
  powerConsumption: number
  range: number
  rangeExtraUrban: number
  rangeUrban: number
  chargePort: string
  chargePower: number
  chargeSpeed: number
  fastChargePort: string
  fastChargePower: number
  fastChargeSpeed: number
}

export interface DriveListingTypeCommons {
  transmissionType: string
  horsePower: number
  driveType: string

  cubicCapacity: number
  cylinders: number
  gears: number

  weight: number
  payload: number
  towingCapacity: number
}
