import {
  BasicListingTypeCommons,
  DriveListingTypeCommons,
  EnergyListingTypeCommons,
} from "./commons"

import { Date, DealerSourceGroup, DealerType, Location } from "./index"

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
  inspectedEffective: boolean
  price: number
  listPrice: number

  frameNumber: string
  serialNumber: string
  externalListingId: string
}

export type ListingEnergyData = EnergyListingTypeCommons

export type ListingDriveData = DriveListingTypeCommons

export interface ListingOptionsData {
  standard: number[]
  optional: number[]
}

export interface ListingDescriptionData {
  description: string
  externalNote: string
  generalExternalNote: string
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
  lastServiceDate: Date
  hasFullServiceHistory: boolean
  minOneYearFreeServiceIncluded: boolean
  priceNegotiable: boolean
  firstOwner: boolean
  hasRefundPolicy: boolean
  breakdownServiceIncluded: boolean
  damaged: boolean
}

export interface OtherServices {
  nextInspectionIncluded: boolean
  deliveryFeeIncluded: boolean
  vignetteIncluded: boolean
  fullTankIncluded: boolean
  expertInstructionIncluded: boolean
  otherServices: string
}

interface Feature {
  feature: string
  endDate: string
  startDate: string
}

export type WarrantyTypes =
  | "from-date"
  | "from-delivery"
  | "from-first-registration"
  | "none"

export interface Listing
  extends ListingBasicData,
    ListingEnergyData,
    ListingDriveData,
    ListingOptionsData,
    ListingDescriptionData,
    OtherServices,
    ListingExtrasData {
  typeSlug: string
  active: boolean
  bodyColor: string
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
  hasBuyerProtection: boolean
  hasWarranty: boolean
  id: number
  images: ListingImage[]
  interior: string
  kiloWatts: number
  leasingMonthlyRate: number
  loanMonthlyRateFrom: number
  loanMonthlyRateTo: number
  lifecycleState: LifecycleState
  publishingDate: string
  publishingStatus: ListingPublishingStatus
  range: number
  source: ListingSource
  sourceGroup: ListingSourceGroup
  spin360Code: string
  type: string
  vehicleClass: string
  warrantyDuration: number
  warrantyName: string
  warrantyStartDate: string
  warrantyType: WarrantyTypes
  warrantyDetails: string
  warrantyMileage: number
  weightTotal: number
  wheelbase: number
  enabledFeatures: Feature[]
  buyNowEligible: boolean
  buyNowInProgress: boolean
  transferredToManual: boolean
  hidden: boolean
  useDefaultAdditionalServices: boolean
  useDefaultDescription: boolean
  useDefaultWarranty: boolean
  useDefaultGeneralExternalNote: boolean
  verified: boolean
  vehicleUniverse: "car"
  referenceId: string
  firstStablePrice: number
  priceReductionPercentage: number
  hasReducedPrice: boolean
}

export type ListingSource = "DEALER_PLATFORM" | "MANUAL" | "TUTTI" | "TDA"
export type ListingSourceGroup = "manual" | "imported"

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
  dealerSourceGroup: DealerSourceGroup
  dealerType: DealerType
}

interface BaseSearchListing {
  id: number
  bodyType: string
  make: string
  model: string
  makeKey: string
  modelKey: string
  price: number
  leasingMonthlyRate: number
  loanMonthlyRateFrom: number
  loanMonthlyRateTo: number
  type: string
  typeFull: string
  typeSlug: string
  hasBuyerProtection: boolean
  spin360Code: string
  horsePower: number
  fuelType: string
  fuelTypeGroup: string
  mileage: number
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
  sourceGroup: ListingSourceGroup
  publishingStatus: ListingPublishingStatus
  active: boolean
  hidden: boolean
  publishingDate: string
  externalListingId: string
  referenceId: string
  enabledFeatures: Feature[]
  driveType: string
  bodyColor: string
  conditionType: string
  consumptionCategory: string
  buyNowEligible: boolean
  buyNowInProgress: boolean
  description: string
  verified: boolean
  firstStablePrice: number
  priceReductionPercentage: number
  hasReducedPrice: boolean
}

export interface ApiSearchListing extends BaseSearchListing {
  firstRegistrationDate: string
}
export interface SearchListing extends BaseSearchListing {
  firstRegistrationDate: Date
}

export interface SimpleSearchListing
  extends Pick<
    ApiSearchListing,
    | "id"
    | "make"
    | "model"
    | "type"
    | "firstRegistrationDate"
    | "firstRegistrationYear"
    | "mileage"
    | "transmissionType"
    | "fuelType"
    | "price"
    | "buyNowEligible"
    | "verified"
    | "hasBuyerProtection"
    | "leasingMonthlyRate"
    | "gbdScore"
    | "referenceId"
  > {
  images: Array<{ s3Key: string }>
}
