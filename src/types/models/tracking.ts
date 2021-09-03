import { Language } from "../../types/params"

export interface WhatsappEntry {
  firstName: string
  lastName: string
  language: string
  phone: string
  type: "default" | "request-video"
}

export interface CallTrackingEntry {
  language: Language
}
