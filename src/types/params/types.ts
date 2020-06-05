import { PaginationParams } from "./index"
import { Date } from "../models"

export interface SearchTypeQueryParams extends PaginationParams {
  tsn?: string
  makeKey?: string
  modelKey?: string
  firstRegistrationDate?: Date
  conditionType?: string
}
