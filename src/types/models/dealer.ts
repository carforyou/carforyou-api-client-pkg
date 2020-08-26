import { DealerLocationFilter } from "types/params/dealer"

interface DealerLocation {
  address: string
  city: string
  zipCode: string
}

interface DealerPromotion {
  image: string
  logo: string
  title: string
}

export interface SearchDealer {
  id: number
  location: DealerLocation
  name: string
  promotion: DealerPromotion
}
