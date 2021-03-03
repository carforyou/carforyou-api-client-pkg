export enum SortOrderParams {
  ASC = "ASC",
  DESC = "DESC",
}

export interface SortParams<T> {
  sortOrder?: SortOrderParams
  sortType?: T
}

export enum LeadSortTypeParams {
  CREATED_DATE = "CREATED_DATE",
}

export enum ListingSortTypeParams {
  NEWEST = "NEWEST",
  PRICE = "PRICE",
  REGISTATION_DATE = "REGISTRATION_DATE",
  MILEAGE = "MILEAGE",
  HORSE_POWER = "HORSE_POWER",
  MAKE_MODEL_A_Z = "MAKE_MODEL_A_Z",
  RELEVANCE = "RELEVANCE",
  PUBLISHING_DATE = "PUBLISHING_DATE",
}

export enum DealerSortTypeParams {
  ROTATION = "ROTATION",
  PREVIEW = "PREVIEW",
}

export interface DealerSortParams {
  type: DealerSortTypeParams
  seed?: number
  previewId?: number
}
