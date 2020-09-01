export enum ListingSortTypeParams {
  NEWEST = "NEWEST",
  PRICE = "PRICE",
  REGISTATION_DATE = "REGISTRATION_DATE",
  MILEAGE = "MILEAGE",
  HORSE_POWER = "HORSE_POWER",
  MAKE_MODEL_A_Z = "MAKE_MODEL_A_Z",
  RELEVANCE = "RELEVANCE",
}

export enum ListingSortOrderParams {
  ASC = "ASC",
  DESC = "DESC",
}

export interface ListingSortParams {
  sortOrder?: ListingSortOrderParams
  sortType?: ListingSortTypeParams
}

export enum DealerListingSortOrderParams {
  ASC = "asc",
  DESC = "desc",
}

export enum DealerListingSortTypeParams {
  PRICE = "price",
  CREATED_DATE = "createdDate",
  STANDING_DAYS = "publishingDate",
}

export interface DealerListingSortParams {
  sortOrder?: DealerListingSortOrderParams
  sortType?: DealerListingSortTypeParams
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
