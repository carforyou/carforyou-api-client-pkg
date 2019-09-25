import { fetchPath, Service } from "../base"

import { Paginated } from "../types/pagination"
import { Dealer, DealerSuggestion } from "../types/models"

export const fetchDealer = async (id: number): Promise<Dealer> => {
  return fetchPath(Service.DEALER, `dealers/${id}`)
}

export const fetchDealerSuggestions = async (
  query: string
): Promise<Paginated<DealerSuggestion>> => {
  return this.fetchPath(Service.DEALER, `dealers/suggestions?q=${query}`)
}
