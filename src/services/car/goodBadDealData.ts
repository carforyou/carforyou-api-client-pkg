import { fetchPath, ApiCallOptions } from "../../base"

export const fetchDealScores = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "gbd/scores", options })
}
