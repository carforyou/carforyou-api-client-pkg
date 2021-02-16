export interface Buyer {
  email: string
  firstName: string
  lastName: string
  phone: string
}

export interface ListingQuery {
  externalListingId: string
  firstRegistrationDate: string
  id: number
  image: string
  make: string
  mileage: number
  model: string
  price: number
  type: string
}

export interface DealerCarSales {
  buyer: Buyer
  carSaleDate: string
  id: number
  listing: ListingQuery
}
