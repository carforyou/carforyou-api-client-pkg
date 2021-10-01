import {
  fetchDealer,
  fetchDealerEntitlements,
  fetchDealerProfile,
  fetchDealerPromotion,
  fetchDealerSuggestions,
  postDealerProfile,
  postDealerPromotion,
  putDealerDescription,
  putDealerProfile,
  putDealerPromotion,
  putUserAccount,
  setImage,
  setLogo,
} from "../dealer"
import { DealerSourceGroup, DealerType } from "../../types/models/index"
import { UserAccount } from "../../types/models/account"
import { ResponseError } from "../../responseError"

describe("Dealer", () => {
  const requestOptionsMock = {
    accessToken: "DUMMY TOKEN",
  }

  describe("#fetchDealerSuggestions", () => {
    it("encodes the query", async () => {
      const query = "k+k"
      await fetchDealerSuggestions({ query })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          `dealers/suggestions?q=${encodeURIComponent(query)}`
        ),
        expect.any(Object)
      )
    })

    it("queries the association", async () => {
      const association = "association123"
      await fetchDealerSuggestions({ association })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          `dealers/suggestions?association=${association}`
        ),
        expect.any(Object)
      )
    })
  })

  describe("#fetchDealer", () => {
    it("accepts language option", async () => {
      await fetchDealer({ id: 123, language: "de" })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("dealers/123?language=de"),
        expect.any(Object)
      )
    })

    it("works without the language option", async () => {
      await fetchDealer({ id: 123 })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("dealers/123"),
        expect.any(Object)
      )
    })
  })

  describe("#fetchDealerEntitlements", () => {
    const entitlements = {
      listings: { limit: 3 },
    }

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(entitlements))
    })

    it("fetches the entitlements", async () => {
      const fetched = await fetchDealerEntitlements({
        dealerId: 123,
        options: requestOptionsMock,
      })

      expect(fetched).toEqual(entitlements)
      expect(fetch).toHaveBeenCalled()
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
      matelsoPhone: "12-13-65",
      whatsAppNumber: "00000",
      website: "https://carforyou.ch",
    }

    describe("#fetchDealerProfile", () => {
      beforeEach(() => {
        fetchMock.mockResponse(JSON.stringify(profileMock))
      })

      it("returns the dealer data form the api", async () => {
        const profile = await fetchDealerProfile({
          dealerId: dealerIdMock,
          options: requestOptionsMock,
        })

        expect(profile).toEqual(profileMock)
      })
    })

    describe("#postDealerProfile", () => {
      it("successfully post data to the api", async () => {
        fetchMock.mockResponse(JSON.stringify(profileMock))

        const profileResponse = await postDealerProfile({
          profile: profileMock,
          options: requestOptionsMock,
        })

        expect(profileResponse.tag).toBe("success")
      })

      it("fails to put data to the api", async () => {
        fetchMock.mockResponse(() => {
          throw new ResponseError({
            status: 500,
          })
        })

        const profileResponse = await postDealerProfile({
          profile: profileMock,
        })

        expect(profileResponse.tag).toBe("error")
      })
    })

    describe("#putDealerProfile", () => {
      it("successfully puts data to the api", async () => {
        fetchMock.mockResponse(JSON.stringify(profileMock))

        const profileResponse = await putDealerProfile({
          dealerId: dealerIdMock,
          profile: profileMock,
          options: requestOptionsMock,
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
          options: requestOptionsMock,
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
        const profile = await fetchDealerPromotion({
          dealerId: dealerIdMock,
          options: requestOptionsMock,
        })

        expect(profile).toEqual(promotionMock)
      })
    })

    describe("#postDealerPromotion", () => {
      it("successfully puts data to the api", async () => {
        fetchMock.mockResponse(JSON.stringify(promotionMock))

        const promotionResponse = await postDealerPromotion({
          dealerId: dealerIdMock,
          promotion: promotionMock,
          options: requestOptionsMock,
        })

        expect(promotionResponse.tag).toBe("success")
      })

      it("fails to put data to the api", async () => {
        fetchMock.mockResponse(() => {
          throw new ResponseError({
            status: 500,
          })
        })

        const promotionResponse = await postDealerPromotion({
          dealerId: dealerIdMock,
          promotion: promotionMock,
        })

        expect(promotionResponse.tag).toBe("error")
      })
    })

    describe("#putDealerPromotion", () => {
      it("successfully puts data to the api", async () => {
        fetchMock.mockResponse(JSON.stringify(promotionMock))

        const promotionResponse = await putDealerPromotion({
          dealerId: dealerIdMock,
          promotion: promotionMock,
          options: requestOptionsMock,
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
          options: requestOptionsMock,
        })

        expect(promotionResponse.tag).toBe("error")
      })
    })

    describe("#setLogo", () => {
      it("successfully sets dealer logo", async () => {
        fetchMock.mockResponse(JSON.stringify({}))

        const response = await setLogo({
          dealerId: dealerIdMock,
          logo: "s3key..",
          options: requestOptionsMock,
        })

        expect(response.tag).toBe("success")
      })

      it("fails to set dealers logo", async () => {
        fetchMock.mockResponse(() => {
          throw new ResponseError({
            status: 500,
          })
        })

        const response = await setLogo({
          dealerId: dealerIdMock,
          logo: null,
          options: requestOptionsMock,
        })

        expect(response.tag).toBe("error")
      })
    })

    describe("#setImage", () => {
      it("successfully sets dealer image", async () => {
        fetchMock.mockResponse(JSON.stringify({}))

        const response = await setImage({
          dealerId: dealerIdMock,
          image: "s3key..",
          options: requestOptionsMock,
        })

        expect(response.tag).toBe("success")
      })

      it("fails to set dealers image", async () => {
        fetchMock.mockResponse(() => {
          throw new ResponseError({
            status: 500,
          })
        })

        const response = await setImage({
          dealerId: dealerIdMock,
          image: null,
          options: requestOptionsMock,
        })

        expect(response.tag).toBe("error")
      })
    })

    describe("#putDealerDescription", () => {
      it("successfully sets dealer description", async () => {
        fetchMock.mockResponse(JSON.stringify({}))

        const response = await putDealerDescription({
          dealerId: dealerIdMock,
          description: "Best deals",
          options: requestOptionsMock,
        })

        expect(response.tag).toBe("success")
      })

      it("fails to set dealers description", async () => {
        fetchMock.mockResponse(() => {
          throw new ResponseError({
            status: 500,
          })
        })

        const response = await putDealerDescription({
          dealerId: dealerIdMock,
          description: null,
          options: requestOptionsMock,
        })

        expect(response.tag).toBe("error")
      })
    })
  })

  describe("#putUserAccount", () => {
    const accountMock: UserAccount = {
      firstName: "accountMock firstName",
      lastName: "accountMock lastName",
      address: "accountMock address",
      zipCode: 1234,
      city: "accountMock city",
      phone: "079 hetisi gseit",
      salutation: "other",
    }

    it("successfully updates account data", async () => {
      fetchMock.mockResponse(JSON.stringify({}))

      const response = await putUserAccount({
        userAccount: accountMock,
        options: requestOptionsMock,
      })

      expect(response.tag).toBe("success")
    })

    it("fails to set dealers description", async () => {
      fetchMock.mockResponse(() => {
        throw new ResponseError({
          status: 500,
        })
      })

      const response = await putUserAccount({
        userAccount: accountMock,
        options: requestOptionsMock,
      })

      expect(response.tag).toBe("error")
    })
  })
})
