import { ListingFilterParams } from "../params/listings"
import { FeatureBooking } from "./product"
import { DealerPromotionContent } from "./dealerPromotion"

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

export interface LeasingInterest {
  email?: string
  language?: string
  message?: string
  name?: string
  phone?: string
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
  makeKey?: string
  type?: string
  conditionType?: string
}
