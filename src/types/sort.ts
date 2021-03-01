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

export enum ListingSortOrderParams {
  ASC = "ASC",
  DESC = "DESC",
}

export interface ListingSortParams {
  sortOrder?: ListingSortOrderParams
  sortType?: ListingSortTypeParams
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

export enum LeadSortTypeParams {
  NEWEST = "NEWEST",
}

export enum LeadSortOrderParams {
  ASC = "ASC",
  DESC = "DESC",
}

export interface LeadSortParams {
  sortOrder?: LeadSortOrderParams
  sortType?: LeadSortTypeParams
}
