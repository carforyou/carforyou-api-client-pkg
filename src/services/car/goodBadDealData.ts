import { fetchPath, Service } from "../../base"

export const featchDealScores = (): Promise<string[]> => {
  return fetchPath(Service.CAR, "gbd/scores")
}
