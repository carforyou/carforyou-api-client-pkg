interface PromotionContent {
  description?: string
  title: string
}

export interface  DealerPromotionContent extends PromotionContent {
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
