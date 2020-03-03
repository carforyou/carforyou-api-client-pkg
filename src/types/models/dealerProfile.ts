import { DealerSource } from "./index"

export interface DealerProfile {
  address: string
  city: string
  dealerSource: DealerSource
  id: number
  phone: string
  zipCode: string
}
