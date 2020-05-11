import { Paginated } from "../../types/pagination"
import { WithFieldStats } from "../../types/fieldStats"
import { WithTopListing } from "../../types/topListing"
import { SearchListing } from "./listing"

export default function <T>(
  content: T[],
  options = {}
): WithTopListing<WithFieldStats<Paginated<T>>> {
  const { currentPage, totalPages } = {
    currentPage: 0,
    totalPages: 1,
    ...options,
  }
  const perPage = content.length

  return {
    content,
    fieldsStats: { price: { min: 80, max: 1500000, p25: 14900, p75: 39943 } },
    pagination: {
      number: currentPage,
      totalPages,
      size: perPage,
      totalElements: totalPages * perPage,
      numberOfElements: perPage,
      first: currentPage === 0,
      last: currentPage === totalPages - 1,
    },
    topListing: SearchListing({ id: 1 }),
  }
}
