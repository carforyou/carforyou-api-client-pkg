import { ApiCallOptions, fetchPath } from "../../base"

interface SearchSuggestion {
  suggestions: string[]
}

export const fetchSearchSuggestions = async ({
  query,
  options = {},
}: {
  query: string
  options?: ApiCallOptions
}): Promise<SearchSuggestion> => {
  return fetchPath({
    path: `listings/search-suggestions?q=${query}`,
    options,
  })
}
