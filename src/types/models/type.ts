import {
  BasicListingTypeCommons,
  DriveListingTypeCommons,
  EnergyListingTypeCommons,
} from "./commons"

export interface SearchType {
  id: number
  make: string
  model: string
  fullName: string
  bodyType: string
  transmissionType: string
  horsePower: number
  kiloWatts: number
  seats: number
  fuelType: string
  driveType: string
  doors: number
  productionStartDate: string
  productionEndDate: string
}

export interface Type
  extends BasicListingTypeCommons,
    EnergyListingTypeCommons,
    DriveListingTypeCommons {
  id: number
  fullName: string
}
