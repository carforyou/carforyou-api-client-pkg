import { ListingFilterParams } from "../params/listings"

interface MappedValue {
  id: number
  name: string
  key: string
}

export interface Make extends MappedValue {}

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

export interface Dealer {
  id: number
  name: string
  nameSlug?: string
  phone: string
  email: string
  address: string
  zipCode: string
  city: string
  location: {
    lat: number
    lon: number
  }
  website?: string
  openingHours?: OpeningHours[]
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

export interface Option extends TranslatedValue {
  id: number
  name: string
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
  searchPath: string
  uiMetadata: object
}

export interface MessageLead {
  email?: string
  language?: string
  message?: string
  name?: string
  phone?: string
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
