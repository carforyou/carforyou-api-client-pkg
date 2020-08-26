export interface DealerLocation {
  address: string
  city: string
  zipCode: string
}

export interface DealerCarouselPromotion {
  image: string
  logo: string
  title: string
}

export interface SearchDealer {
  id: number
  location: DealerLocation
  name: string
  promotion: DealerCarouselPromotion
}
