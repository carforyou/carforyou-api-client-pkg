import { DealerSourceGroup, DealerType } from "./index"

export interface DealerProfile {
  name: string
  address: string
  city: string
  dealerSourceGroup: DealerSourceGroup
  dealerType: DealerType
  id: number
  phone: string
  zipCode: string
  email: string
}
