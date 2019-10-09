import { Paginated } from "../../src/types/pagination"
import { WithFieldStats } from "../../src/types/fieldStats"
import { WithFacets } from "../../src/types/facets"

export default function<T>(
  content: T[],
  options = {}
): WithFacets<WithFieldStats<Paginated<T>>> {
  const { currentPage, totalPages } = {
    currentPage: 0,
    totalPages: 1,
    ...options
  }
  const perPage = content.length

  return {
    content,
    facets: {},
    fieldsStats: { price: { min: 80, max: 1500000, p25: 14900, p75: 39943 } },
    pagination: {
      number: currentPage,
      totalPages,
      size: perPage,
      totalElements: totalPages * perPage,
      numberOfElements: perPage,
      first: currentPage === 0,
      last: currentPage === totalPages - 1
    }
  }
}
