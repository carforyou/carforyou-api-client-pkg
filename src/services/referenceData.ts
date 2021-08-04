import { ApiCallOptions, fetchPath } from "../base"

export const fetchReferenceData = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<{
  [key: string]: number | string[] | number[]
}> => {
  return fetchPath({ path: "reference-data", options })
}
