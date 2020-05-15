import { DealerSource } from "./index"

export interface DealerProfile {
  name: string
  address: string
  city: string
  dealerSource: DealerSource
  id: number
  phone: string
  zipCode: string
}
