import { Date } from "../models"

interface PaginationParams {
  page?: number
  size?: number
}

export interface SearchTypeQueryParams extends PaginationParams {
  tsn?: string
  makeKey?: string
  modelKey?: string
  firstRegistrationDate: Date
}
