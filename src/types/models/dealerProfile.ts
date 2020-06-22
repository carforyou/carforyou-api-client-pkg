import { DealerSource } from "./index"

export interface DealerProfile {
  name: string
  address: string
  city: string
  dealerSource: DealerSource
  dealerSourceGroup: string
  dealerType: string
  id: number
  phone: string
  zipCode: string
}
