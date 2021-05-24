import { ApiCallOptions, fetchPath } from "../base"

export const fetchReferenceData = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "reference-data", options })
}
