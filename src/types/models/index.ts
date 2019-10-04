import { FilterParams } from "../params/listings"

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

export interface SavedSearch {
  email: string
  language: string
  searchQuery: FilterParams
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
