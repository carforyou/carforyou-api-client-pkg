import { fetchFrameNumberTypes } from "../vehicle"

import { SearchType } from "../../lib/factories/type"
import { PaginatedFactory } from "../../index"

const requestOptionsMock = { accessToken: "DUMMY" }

describe("#fetchTypes", () => {
  describe("when successful", () => {
    const typeIds = [{ id: 12345 }]
    const { content, pagination } = PaginatedFactory([typeIds.map(SearchType)])

    beforeEach(() => {
      fetchMock
        .once(
          JSON.stringify({
            frameNumber: "frameNumber",
            productionYear: 2020,
            typeIds,
          })
        )
        .once(JSON.stringify({ content, ...pagination }))
    })

    it("returns types", async () => {
      const response = await fetchFrameNumberTypes({
        query: { frameNumber: "frameNumber", dealerId: 1316 },
        options: requestOptionsMock,
      })

      expect(response.tag).toBe("success")

      if (response.tag === "success") {
        expect(response.result).toEqual({ content, pagination })
      }
    })
  })

  describe("when not successful", () => {
    beforeEach(() => {
      fetchMock.mockResponse(
        JSON.stringify({
          message: "validation.not-valid",
          errors: [],
        }),
        { status: 400 }
      )
    })

    it("returns error messages", async () => {
      const response = await fetchFrameNumberTypes({
        query: { frameNumber: "", dealerId: 1316 },
        options: requestOptionsMock,
      })

      expect(response.tag).toBe("error")

      if (response.tag === "error") {
        const { message, errors } = response
        expect(message).toEqual("validation.not-valid")
        expect(errors).toEqual([])
      }
    })
  })
})
