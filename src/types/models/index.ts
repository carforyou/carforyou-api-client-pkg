import { ListingFilterParams } from "../params/listings"

export interface MappedValue {
  id: number
  name: string
  key: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Make = MappedValue

export interface Model extends MappedValue {
  currentBodyTypes?: string[]
}

export interface Region {
  name: string
  key: string
}

interface OpeningHour {
  dayOfWeek: string
  time: string
}
export interface OpeningHours {
  open: OpeningHour
  close: OpeningHour
}

export enum DealerSource {
  SALESFORCE = "SALESFORCE",
  TUTTI = "TUTTI",
  PRIVATE = "SELF_REGISTRATION",
}

export enum DealerType {
  private = "private",
  professional = "professional",
}

export enum DealerSourceGroup {
  carforyou = "carforyou",
  external = "external",
}

export enum DealerEntitlements {
  AUTOALARM = "auto-alarm",
  LISTING = "listing",
}

export interface Location {
  country: string
  lat: number
  lon: number
  region: string
  regionFull: string
}

export interface Dealer {
  active: boolean
  id: number
  name: string
  nameSlug?: string
  phone: string
  email: string
  zipCode: string
  dealerSource: DealerSource
  dealerSourceGroup: DealerSourceGroup
  dealerType: DealerType
  address?: string
  city?: string
  location?: Location
  website?: string
  whatsAppNumber?: string
  openingHours?: OpeningHours[]
  badges: string[]
}

export interface ZipCode {
  zipCode: string
  de: string
  fr: string
  it: string
}

export interface PackageItem {
  id: number
  name: string
}

export interface Option {
  id: number
  name: string
  packageItems: PackageItem[]
}

export interface Options {
  standardOptions: Option[]
  additionalOptions: Option[]
}

export interface ImageEnrichment {
  imageId: number
  enrichment: object
}

export interface DealerSuggestion {
  id: number
  name: string
  nameSlug: string
}

export interface City {
  id: number
  zipCode: string
  name: string
}

export interface SavedSearch {
  email: string
  language: string
  searchQuery: ListingFilterParams
  uiMetadata: object
}

export interface MessageLead {
  email?: string
  language?: string
  message?: string
  name?: string
  phone?: string
  videoCallPreference?: {
    available?: boolean
    services?: string[]
    otherService?: string
  }
}

export interface MoneybackApplication {
  email?: string
  language?: string
  firstName?: string
  lastName?: string
  birthdate: string
  street: string
  streetNumber: string
  city: string
  zipCode: string
  serialNumber: string
  gender: string
  phone: string
  contractStartDate: string
  sellingPrice: number
  vehicleConditionsConfirmation: boolean
  termsAndConditionsConfirmation: boolean
}

export interface Date {
  month?: number
  year?: number
}

export interface PresignedUrl {
  presignedUrl: string
  s3Key: string
}

export interface ListingAnalyticsStats {
  callLeads: number
  messageLeads: number
  pdpViews: number
}
export interface ListingAnalyticsData {
  id: number
  stats: ListingAnalyticsStats
}

export interface DealerListingsAnalyticsData {
  listings: ListingAnalyticsData[]
}

export interface Entitlements {
  [key: string]: {
    limit: number
  }
}
