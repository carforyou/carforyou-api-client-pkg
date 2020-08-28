interface PromotionContent {
  description?: string
  title: string
}

export interface DealerPromotionContent extends PromotionContent {
  image: string
  logo?: string
}

export interface DealerPromotion {
  dataDe?: PromotionContent
  dataEn?: PromotionContent
  dataFr?: PromotionContent
  dataIt?: PromotionContent
  image: string
  logo?: string
}

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
