import { sendSupportCase } from "../emailDelivery"
import { ResponseError } from "../../responseError"

describe("Email delivery service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("sendSupportCase", () => {
    const requestOptionsMock = {
      accessToken: "DUMMY TOKEN",
    }
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify({}))
    })

    it("successfully posts data to the api", async () => {
      const response = await sendSupportCase({
        dealerId: 12355,
        subject: "email subject",
        message: "email message",
        options: requestOptionsMock,
      })

      expect(response.tag).toBe("success")
    })

    it("calls endpoint", async () => {
      await sendSupportCase({
        dealerId: 12355,
        subject: "email subject",
        message: "email message",
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

      const response = await sendSupportCase({
        dealerId: 12355,
        subject: "email subject",
        message: "email message",
        options: requestOptionsMock,
      })

      expect(response.tag).toBe("error")
    })
  })
})
