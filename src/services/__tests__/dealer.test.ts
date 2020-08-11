import {
  fetchDealerSuggestions,
  fetchDealerProfile,
  putDealerProfile,
} from "../dealer"
import { ResponseError } from "../../responseError"
import { DealerType, DealerSourceGroup } from "../../types/models/index"

describe("Dealer", () => {
  describe("#fetchDealerSuggestions", () => {
    it("encodes the query", async () => {
      const query = "k+k"
      await fetchDealerSuggestions(query)

      expect(fetch).toHaveBeenCalledWith(
        `dealer.service.test/dealers/suggestions?q=${encodeURIComponent(
          query
        )}`,
        expect.any(Object)
      )
    })
  })

  describe("Dealer Profile", () => {
    const dealerIdMock = 12
    const profileMock = {
      name: "Heiter Weit",
      address: "Heiterweit",
      city: "SW",
      dealerType: DealerType.professional,
      dealerSourceGroup: DealerSourceGroup.carforyou,
      id: dealerIdMock,
      phone: "12-13-65",
      zipCode: "345",
    }

    describe("#fetchDealerProfile", () => {
      beforeEach(() => {
        fetchMock.mockResponse(JSON.stringify(profileMock))
      })

      it("returns the dealer data form the api", async () => {
        const profile = await fetchDealerProfile(dealerIdMock)

        expect(profile).toEqual(profileMock)
      })
    })

    describe("#putDealerProfile", () => {
      it("successfully puts data to the api", async () => {
        fetchMock.mockResponse(JSON.stringify(profileMock))

        const profileResponse = await putDealerProfile({
          dealerId: dealerIdMock,
          profile: profileMock,
        })

        expect(profileResponse.tag).toBe("success")
      })

      it("fails to put data to the api", async () => {
        fetchMock.mockResponse(() => {
          throw new ResponseError({
            status: 500,
          })
        })

        const profileResponse = await putDealerProfile({
          dealerId: dealerIdMock,
          profile: profileMock,
        })

        expect(profileResponse.tag).toBe("error")
      })
    })
  })
})
