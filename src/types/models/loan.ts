import { Language } from "../params"

import { EmploymentType, Gender } from "./index"

export interface LoanInterest {
  address: string
  amount: number
  birthdate: string
  citizenshipCountryCode: string
  duration: number
  email: string
  employmentType: EmploymentType
  firstName: string
  gender: Gender
  hasOngoingDebtEnforcements: boolean
  language: Language
  lastName: string
  monthlyIncome: number
  phone: string
  zipCode: string
}

export interface LoanCalculation {
  downPayment: number
  interestMonthlyCost: number
  interestRate: number
  loanMonthlyRate: number
  loanTotalCost: number
  purchaseTotalCost: number
  interestTotalCost: number
}