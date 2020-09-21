export interface MoneybackApplication {
  email?: string
  language?: string
  firstName?: string
  lastName?: string
  birthdate: string
  street: string
  streetNumber: string
  city: string
  zipCode: string
  serialNumber: string
  gender: string
  phone: string
  contractStartDate: string
  sellingPrice: number
  vehicleConditionsConfirmation: boolean
  termsAndConditionsConfirmation: boolean
}

export interface BuyNowApplication {
  firstName: string
  lastName: string
  address: string
  zipCode: string
  city: string
  email: string
  language: string
  phone: string
  generalTermsAndConditionsConfirmation: boolean
  onlinePurchaseTermsAndConditionsConfirmation: boolean
}
