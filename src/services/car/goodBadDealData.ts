import { fetchPath, Service } from "../../base"

export const fetchGBDScores = (): Promise<string[]> => {
  return fetchPath(Service.CAR, "gbd/scores")
}
