import { supportCases } from "../emailDelivery"
import { ResponseError } from "../../responseError"

describe("Email delivery service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("supportCases", () => {
    const requestOptionsMock = {
      accessToken: "DUMMY TOKEN",
    }
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify({}))
    })

    it("successfully posts data to the api", async () => {
      const response = await supportCases({
        dealerId: 12355,
        subject: "email subject",
        details: "email details",
        options: requestOptionsMock,
      })

      expect(response.tag).toBe("success")
    })

    it("calls endpoint", async () => {
      await supportCases({
        dealerId: 12355,
        subject: "email subject",
        details: "email details",
        options: requestOptionsMock,
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/support-cases$/),
        expect.any(Object)
      )
    })

    it("fails to post data to the api", async () => {
      fetchMock.mockResponse(() => {
        throw new ResponseError({
          status: 500,
        })
      })

      const response = await supportCases({
        dealerId: 12355,
        subject: "email subject",
        details: "email details",
        options: requestOptionsMock,
      })

      expect(response.tag).toBe("error")
    })
  })
})
