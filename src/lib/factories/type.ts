import {
  SearchType as SearchTypeType,
  Type as TypeType,
} from "../../types/models/type"

const commonDefaults = {
  id: 123,
  doors: 3,
  seats: 5,
  make: "Audi",
  model: "A3",
  fullName: "A3 1.8 T FSI Ambiente",
  bodyType: "saloon",
}

const overviewDefaults: SearchTypeType = {
  ...commonDefaults,
  transmissionType: "automatic",
  horsePower: 160,
  kiloWatts: 118,
  fuelType: "petrol",
  driveType: "front",
  productionStartDate: "2006-10-01",
  productionEndDate: "2018-06-30",
}

export const SearchType = (attributes = {}): SearchTypeType => ({
  ...overviewDefaults,
  ...attributes,
})

const detailsDefaults: TypeType = {
  ...commonDefaults,
  makeKey: "audi",
  modelKey: "a3",
  tsn: "1VE966",
  fuelType: "petrol",
  consumptionCategory: "A",
  euroStandard: "1",
  consumptionCombined: 8.4,
  consumptionExtraUrban: 6.6,
  consumptionUrban: 11.6,
  systemPerformanceKiloWatts: 13.4,
  batteryCapacity: 100,
  powerConsumption: 90,
  range: 153,
  rangeExtraUrban: 100,
  rangeUrban: 53,
  transmissionType: "automatic",
  horsePower: 200,
  driveType: "front",
  cubicCapacity: 1984,
  cylinders: 4,
  gears: 6,
  weight: 1665,
  payload: 1970,
  towingCapacity: 1500,
  productionStartDate: "2011-01-01",
  productionEndDate: "2019-01-01",
}

export const Type = (attributes = {}): TypeType => ({
  ...detailsDefaults,
  ...attributes,
})
