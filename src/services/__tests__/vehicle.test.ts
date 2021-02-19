import { fetchFrameNumberTypes } from "../vehicle"

import { SearchType } from "../../lib/factories/type"

const requestOptionsMock = { accessToken: "DUMMY" }

describe("#fetchTypes", () => {
  const types = SearchType()

  beforeEach(() => {
    fetchMock.mockResponse(
      JSON.stringify({
        frameNumber: "frameNumber",
        productionYear: 2020,
        types,
      })
    )
  })

  describe("when successful", () => {
    it("returns types", async () => {
      const response = await fetchFrameNumberTypes({
        query: { frameNumber: "frameNumber", dealerId: 1316 },
        options: requestOptionsMock,
      })

      expect(response.tag).toBe("success")

      if (response.tag === "success") {
        expect(response.result).toEqual({
          content: {
            ...types,
          },
          pagination: null,
        })
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
