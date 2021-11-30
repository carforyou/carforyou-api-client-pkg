import { ApiCallOptions, fetchPath } from "../../base"

interface SearchSuggestion {
  suggestions: string[]
}

export const fetchSearchSuggestions = async ({
  query,
  size,
  options = {},
}: {
  query: string
  size: number
  options?: ApiCallOptions
}): Promise<SearchSuggestion> => {
  return fetchPath({
    path: `listings/search-suggestions?q=${query}&size=${size}`,
    options,
  })
}
