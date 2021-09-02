import { FeatureBooking } from "./product"
import { DealerPromotionContent } from "./dealerPromotion"
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

export interface MakeWithModels extends MappedValue {
  models?: MappedValue[]
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
  LEADS = "leads",
  PRINTCENTER = "print-center",
}

export interface GoogleReviewSummary {
  count: number
  rating: number
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
  dealerSourceGroup: DealerSourceGroup
  dealerType: DealerType
  defaultLanguage: string
  enabledFeatures: FeatureBooking[]
  address?: string
  city?: string
  location?: Location
  website?: string
  whatsAppNumber?: string
  openingHours?: OpeningHours[]
  badges: string[]
  promotion?: DealerPromotionContent
  logo?: string
  googleReviewSummary?: GoogleReviewSummary
  googlePlaceId?: number
  image?: string
  description?: string
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
  standard: Option[]
  optional: Option[]
}

export interface ImageEnrichment {
  imageId: number
  enrichment: Record<string, unknown>
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
  uiMetadata: Record<string, unknown>
}

export interface MessageLead {
  language?: string
  email: string
  message: string
  firstName: string
  lastName: string
  phone: string
  videoCallPreference?: {
    available?: boolean
    services?: string[]
    otherService?: string
  }
  testDrive?: {
    requested?: boolean
    proposedDate?: string
  }
}

export interface MessageLeadListing {
  externalListingId: string
  firstRegistrationDate?: string
  id?: number
  image: string
  make: string
  mileage: number
  model: string
  price: number
  type: string
  referenceId: string
}

export interface SearchLeads {
  id: number
  listingId: number
  listing: MessageLeadListing
  createdDate: string
}

export interface SearchMessageLead extends SearchLeads, MessageLead {}

export interface SearchCallLead extends SearchLeads {
  callerNumber: string
  duration: number
}
export interface SearchWhatsappLead extends SearchLeads {
  firstName: string
  lastName: string
  phone: string
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
  pdpViewsByFeature: {
    [key: string]: number
  }
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

export interface CockpitAnalytics {
  count: number
  [key: string]: string | number
}

export interface DealerAnalytics {
  dimensions: {
    [key: string]: string | number
  }
  metrics: {
    name: string
    value: number
  }[]
}
export interface BuyNowConfiguration {
  paymentAvailable: boolean
}
