import { Language } from "../../types/params"

export interface WhatsappEntry {
  firstName: string
  lastName: string
  language: boolean
  phone: string
}

export interface CallTrackingEntry {
  language: Language
}
