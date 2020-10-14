import {
  fetchDealer,
  fetchDealerSuggestions,
  fetchDealerProfile,
  putDealerProfile,
  fetchDealerPromotion,
  putDealerPromotion,
} from "../dealer"
import { ResponseError } from "../../responseError"
import { DealerType, DealerSourceGroup } from "../../types/models/index"

describe("Dealer", () => {
  describe("#fetchDealerSuggestions", () => {
    it("encodes the query", async () => {
      const query = "k+k"
      await fetchDealerSuggestions({ query })

      expect(fetch).toHaveBeenCalledWith(
        `dealer.service.test/dealers/suggestions?q=${encodeURIComponent(
          query
        )}`,
        expect.any(Object)
      )
    })
  })

  describe("#fetchDealer", () => {
    it("accepts language option", async () => {
      await fetchDealer({ id: 123, language: "de" })

      expect(fetch).toHaveBeenCalledWith(
        `dealer.service.test/dealers/123?language=de`,
        expect.any(Object)
      )
    })

    it("works without the language option", async () => {
      await fetchDealer({ id: 123 })

      expect(fetch).toHaveBeenCalledWith(
        "dealer.service.test/dealers/123",
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
      email: "dealer@gmail.com",
    }

    describe("#fetchDealerProfile", () => {
      beforeEach(() => {
        fetchMock.mockResponse(JSON.stringify(profileMock))
      })

      it("returns the dealer data form the api", async () => {
        const profile = await fetchDealerProfile({ dealerId: dealerIdMock })

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

  describe("Dealer Garage Promotion", () => {
    const dealerIdMock = 12
    const data = {
      title: "test",
      description: "test",
    }
    const promotionMock = {
      image: "s3/image.jpg",
      logo: "s3/logo.jpg",
      dataDe: data,
      dataEn: data,
      dataIt: data,
      dataFr: data,
    }

    describe("#fetchDealerPromotion", () => {
      beforeEach(() => {
        fetchMock.mockResponse(JSON.stringify(promotionMock))
      })

      it("returns the dealer promotion form the api", async () => {
        const profile = await fetchDealerPromotion({ dealerId: dealerIdMock })

        expect(profile).toEqual(promotionMock)
      })
    })

    describe("#putDealerPromotion", () => {
      it("successfully puts data to the api", async () => {
        fetchMock.mockResponse(JSON.stringify(promotionMock))

        const promotionResponse = await putDealerPromotion({
          dealerId: dealerIdMock,
          promotion: promotionMock,
        })

        expect(promotionResponse.tag).toBe("success")
      })

      it("fails to put data to the api", async () => {
        fetchMock.mockResponse(() => {
          throw new ResponseError({
            status: 500,
          })
        })

        const promotionResponse = await putDealerPromotion({
          dealerId: dealerIdMock,
          promotion: promotionMock,
        })

        expect(promotionResponse.tag).toBe("error")
      })
    })
  })
})
