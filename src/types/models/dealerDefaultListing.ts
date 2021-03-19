export interface DealerDefaultListingAdditionalServices {
  deliveryFeeIncluded: boolean
  expertInstructionIncluded: boolean
  fullTankIncluded: boolean
  nextInspectionIncluded: boolean
  otherServices: string
  vignetteIncluded: boolean
}

export interface DealerDefaultListingWarranty {
  warrantyDetails: string
  warrantyDuration: number
  warrantyMileage: number
  warrantyStartDate: string
  warrantyType: string
}

export interface DealerDefaultListingDescription {
  description: string
}

export interface DealerDefaultListingGeneralExternalNote {
  generalExternalNote: string
}

export interface DealerDefaultListingData
  extends DealerDefaultListingAdditionalServices,
    DealerDefaultListingWarranty,
    DealerDefaultListingGeneralExternalNote,
    DealerDefaultListingDescription {}
