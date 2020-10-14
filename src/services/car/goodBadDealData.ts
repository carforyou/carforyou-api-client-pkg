import { fetchPath, RequestOptions } from "../../base"

export const fetchDealScores = ({
  options = {},
}: { options?: RequestOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "gbd/scores", options })
}
