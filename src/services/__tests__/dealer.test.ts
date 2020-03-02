import {
  fetchDealerSuggestions,
  fetchDealerProfile,
  putDealerProfile
} from "../dealer"

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

  describe("#fetchDealerProfile", () => {
    const dealerIdMock = 12
    const profileMock = {
      address: "Heiterweit",
      city: "SW",
      dealerSource: "dealer",
      id: dealerIdMock,
      phone: "12-13-65",
      zipCode: "345"
    }
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(profileMock))
    })
    it("fetch dealer data", async () => {
      const profile = await fetchDealerProfile(dealerIdMock)

      expect(profile).toEqual(profileMock)
    })

    it("put dealer data", async () => {
      fetchMock.mockResponse(JSON.stringify(profileMock))
      const profileRespone = await putDealerProfile({
        dealerId: dealerIdMock,
        profile: profileMock
      })

      expect(profileRespone.tag).toBe("success")
    })
  })
})
