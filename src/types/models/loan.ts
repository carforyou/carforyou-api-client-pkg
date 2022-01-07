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
  workPermit?: "l" | "b" | "c" | "g"
  workPermitIssueDate?: string
  zipCode: string
}

export interface LoanCalculation {
  downPayment: number
  interestMonthlyCostFrom: number
  interestMonthlyCostTo: number
  interestRateFrom: number
  interestRateTo: number
  loanMonthlyRateFrom: number
  loanMonthlyRateTo: number
  loanTotalCostFrom: number
  loanTotalCostTo: number
  purchaseTotalCostFrom: number
  purchaseTotalCostTo: number
  interestTotalCostFrom: number
  interestTotalCostTo: number
}
