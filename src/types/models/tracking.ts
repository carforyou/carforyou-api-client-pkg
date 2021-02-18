import { Language } from "../../types/params"

export type WhatsappEntry = Record<
  "firstName" | "language" | "lastName" | "phone",
  string
>

export type CallTrackingEntry = Record<"language", Language>
