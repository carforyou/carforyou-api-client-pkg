export interface DealerLocation {
  address: string
  city: string
  zipCode: string
}

export interface SearchDealer {
  id: number
  location: DealerLocation
  name: string
}
