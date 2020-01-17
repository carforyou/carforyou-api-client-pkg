export interface Pagination {
  number: number
  numberOfElements: number
  size: number
  totalPages: number
  totalElements: number
  first: boolean
  last: boolean
}

export interface Paginated<T> {
  content: T[]
  pagination: Pagination
}
