interface MappedValue {
  id: number
  name: string
  key: string
}

export interface Make extends MappedValue {}

export interface Model extends MappedValue {
  currentBodyTypes?: string[]
}

export interface Dealer {
  id: number
  name: string
  phone: string
  email: string
  address: string
  zipCode: string
  city: string
  location: {
    lat: number
    lon: number
  }
}

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

export interface ZipCode {
  zipCode: string
  de: string
  fr: string
  it: string
}

interface TranslatedValue {
  de: string
  fr: string
  it: string
}

export interface ListingOptions {
  standardOptions: TranslatedValue[]
  additionalOptions: TranslatedValue[]
}

export interface ImageEnrichment {
  imageId: number
  enrichment: object
}

export interface DealerSuggestion {
  id: number
  name: string
}
