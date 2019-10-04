import { Dealer } from "./index"

export interface ListingImage {
  id: number
  externalUrl: string
  s3Key: string
}

export type LifecycleState = "active" | "inactive" | "gone"

export interface Listing {
  active: boolean
  additionalOptions: string[]
  bodyColor: string
  bodyColorGroup: string
  bodyType: string
  co2Emission: number
  conditionType: string
  consumption: number
  consumptionCategory: string
  consumptionUrban: number
  consumptionExtraUrban: number
  consumptionStandard: string
  createdDate: string
  cubicCapacity: number
  cylinders: number
  dealer: Dealer
  description: string
  doors: number
  driveType: string
  equipmentPackage: string
  euroStandard: string
  externalNote: string
  factoryCode: string
  firstRegistrationDate: string
  fuelTankCapacity: number
  fuelType: string
  fuelTypeGroup: string
  gears: number
  hadAccident: boolean
  hasMbg: boolean
  spin360Code: string
  hasServiceHistory: boolean
  hasWarranty: boolean
  horsePower: number
  id: number
  images: ListingImage[]
  inspected: boolean
  interiorColor: string
  interior: string
  kiloWatts: number
  lastInspectionDate: string
  make: string
  makeId: number
  makeKey: string
  metallic: boolean
  mileage: number
  model: string
  modelId: number
  modelKey: string
  payload: number
  price: number
  productionEndDate: string
  productionStartDate: string
  productionYear: number
  range: number
  registrationDocumentNumber: string
  standardOptions: string[]
  seats: number
  systemKw: number
  towingCapacity: number
  transmissionType: string
  type: string
  typeFull: string
  vehicleClass: string
  warrantyDate: string
  warrantyDuration: number
  warrantyName: string
  warrantyType: string
  weight: number
  weightTotal: number
  wheelbase: number
  gbdScore: string
  lifecycleState: LifecycleState
  deactivationDate: string
  externalListingId: string
}

export interface SearchListing {
  id: number
  bodyType: string
  make: string
  model: string
  makeId: number
  makeKey: string
  modelId: number
  modelKey: string
  price: number
  type: string
  hasMbg: boolean
  spin360Code: string
  horsePower: number
  fuelType: string
  fuelTypeGroup: string
  mileage: number
  firstRegistrationDate: string
  transmissionType: string
  consumption: number
  doors: number
  seats: number
  dealer: {
    name: string
    city: string
    address: string
    zipCode: string
  }
  images: ListingImage[]
  gbdScore: string
}
