import { postData, Service } from "../../base"

import { SearchParams } from "../../types/params"

export const fetchListingCount = async (
  query: SearchParams = {}
): Promise<number> => {
  const json = await postData(Service.SEARCH, "listings/count", {
    query
  })

  return json.count
}
