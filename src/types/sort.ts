export enum SortTypeParams {
  NEWEST = "NEWEST",
  PRICE = "PRICE",
  REGISTATION_DATE = "REGISTRATION_DATE",
  MILEAGE = "MILEAGE",
  HORSE_POWER = "HORSE_POWER",
  MAKE_MODEL_A_Z = "MAKE_MODEL_A_Z",
  RELEVANCE = "RELEVANCE"
}

export enum SortOrderParams {
  ASC = "ASC",
  DESC = "DESC"
}

export interface SortParams {
  sortOrder?: SortOrderParams
  sortType?: SortTypeParams
}
