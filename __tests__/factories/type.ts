import { SearchType as SearchTypeType } from "../../src/types/models/type"

const commonDefaults = {
  id: 123,
  doors: 3,
  seats: 5,
  make: "Audi",
  model: "A3",
  fullName: "A3 1.8 T FSI Ambiente",
  bodyType: "saloon"
}

const overviewDefaults: SearchTypeType = {
  ...commonDefaults,
  transmissionType: "automatic",
  horsePower: 160,
  fuelType: "petrol",
  driveType: "front",
  productionStartDate: "2006-10-01",
  productionEndDate: "2018-06-30"
}

export const SearchType = (attributes = {}): SearchTypeType => ({
  ...overviewDefaults,
  ...attributes
})
