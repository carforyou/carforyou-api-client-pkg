import { Language } from "../params"

export interface LeasingInterest {
  downPayment: number
  duration: number
  email: string
  estimatedKmPerYear: number
  firstName: string
  language: Language
  lastName: string
  phone: string
  residualValue: number
}

export interface LeasingCalculation {
  amount: number
  interestAnnualCost: number
  interestRate: number
  interestTotalCost: number
  leasingCostWithoutBuying: number
  leasingMonthlyRate: number
  leasingTotalCost: number
  ratesTotalCost: number
  residualValueMax: number
}
