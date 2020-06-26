import { DealerSource, DealerSourceGroup, DealerType } from "./index"

export interface DealerProfile {
  name: string
  address: string
  city: string
  dealerSource: DealerSource
  dealerSourceGroup: DealerSourceGroup
  dealerType: DealerType
  id: number
  phone: string
  zipCode: string
}
