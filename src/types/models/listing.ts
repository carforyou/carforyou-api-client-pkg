import { Dealer, Location, Date } from "./index"
import {
  BasicListingTypeCommons,
  EnergyListingTypeCommons,
  DriveListingTypeCommons,
} from "./commons"

export interface ListingImage {
  id: number
  externalUrl: string
  s3Key: string
}

export interface DealerListingImages {
  detectedCarImageId: number
  images: ListingImage[]
  listingId: number
  spinCode: string
}

export type LifecycleState = "active" | "inactive" | "gone"

export interface ListingBasicData extends BasicListingTypeCommons {
  typeId: number
  typeFull: string

  bodyColor: string
  interiorColor: string
  metallic: boolean

  conditionType: string
  productionYear: number
  firstRegistrationDate: Date
  firstRegistrationYear: number

  mileage: number
  lastInspectionDate: Date
  inspected: boolean
  price: number

  frameNumber: string
  serialNumber: string
  externalListingId: string
}

export interface ListingEnergyData extends EnergyListingTypeCommons {}

export interface ListingDriveData extends DriveListingTypeCommons {}

export interface ListingOptionsData {
  additionalOptions: number[]
  standardOptions: number[]
}

export interface ListingDescriptionData {
  description: string
  externalNote: string
}

export interface ListingExtrasData {
  directImport: boolean
  hasServiceHistory: boolean
  hasAdditionalTyres: boolean
  hasRoofRack: boolean
  hasDogGrid: boolean
  handicappedAccessible: boolean
  hadAccident: boolean
  tuned: boolean
  racingCar: boolean
}

interface Feature {
  feature: string
  endDate: string
  startDate: string
}

export interface Listing
  extends ListingBasicData,
    ListingEnergyData,
    ListingDriveData,
    ListingOptionsData,
    ListingDescriptionData,
    ListingExtrasData {
  active: boolean
  bodyColorGroup: string
  co2Emission: number
  conditionType: string
  consumptionCombined: number
  consumptionStandard: string
  createdDate: string
  deactivationDate: string
  dealerId: number
  equipmentPackage: string
  factoryCode: string
  fuelTankCapacity: number
  fuelTypeGroup: string
  gbdScore: string
  hasMbg: boolean
  hasWarranty: boolean
  id: number
  images: ListingImage[]
  interior: string
  kiloWatts: number
  lifecycleState: LifecycleState
  publishingDate: string
  publishingStatus: ListingPublishingStatus
  range: number
  source: ListingSource
  spin360Code: string
  type: string
  vehicleClass: string
  warrantyDuration: number
  warrantyName: string
  warrantyStartDate: string
  warrantyType: string
  weightTotal: number
  wheelbase: number
  enabledFeatures: Feature[]
}

type ListingSource = "DEALER_PLATFORM" | "MANUAL" | "TUTTI" | "TDA"

type ListingPublishingStatus =
  | "unpublished"
  | "published"
  | "draft"
  | "pending"
  | "invalid"

export interface SearchListingDealer {
  id: number
  name: string
  phone: string
  email: string
  address: string
  city: string
  zipCode: string
  location: Location
  country: string
  regionFull: string
  region: string
  dealerSource: string
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
  typeFull: string
  typeSlug: string
  hasMbg: boolean
  spin360Code: string
  horsePower: number
  fuelType: string
  fuelTypeGroup: string
  mileage: number
  firstRegistrationDate: Date
  firstRegistrationYear: number
  transmissionType: string
  consumptionCombined: number
  doors: number
  seats: number
  dealer: SearchListingDealer
  images: ListingImage[]
  gbdScore: string
  createdDate: string
  source: ListingSource
  publishingStatus: ListingPublishingStatus
  active: boolean
  publishingDate: string
  externalListingId: string
  enabledFeatures: Feature[]
  driveType: string
  bodyColorGroup: string
  conditionType: string
  consumptionCategory: string
}
