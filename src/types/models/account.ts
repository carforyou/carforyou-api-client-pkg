export type Salutation = "mr" | "mrs" | "other"

export interface UserAccount {
  firstName: string
  lastName: string
  address: string
  zipCode: number
  city: string
  phone: string
  salutation: Salutation
}
