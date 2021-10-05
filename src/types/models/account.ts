export type Salutation = "mr" | "mrs" | "other"

export interface UserAccount {
  firstName: string
  lastName: string
  address: string
  zipCode: string
  city: string
  phone: string
  salutation: Salutation
}
