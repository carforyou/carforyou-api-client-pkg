import { fetchPath, Service } from "../../base"

export const featchDealScores = (): Promise<string[]> => {
  return fetchPath({ service: Service.CAR, path: "gbd/scores" })
}
