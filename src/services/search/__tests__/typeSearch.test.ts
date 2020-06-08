import { fetchTypes } from "../typeSearch"

import Paginated from "../../../lib/factories/paginated"
import { SearchType } from "../../../lib/factories/type"

describe("#fetchTypes", () => {
  const types = Paginated([SearchType()])

  beforeEach(() => {
    fetchMock.mockResponse(
      JSON.stringify({
        content: types.content,
        ...types.pagination,
      })
    )
  })

  it("removes spaces from tsn", async () => {
    await fetchTypes({ firstRegistrationDate: {}, tsn: "Q W E  R   TY" })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/types\/search$/),
      expect.objectContaining({
        body: expect.stringContaining('"tsn":"QWERTY"'),
      })
    )
  })

  describe("date conversion", () => {
    it("ignores the date when not provided", async () => {
      await fetchTypes({ firstRegistrationDate: {} })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/types\/search$/),
        expect.objectContaining({
          body: expect.stringContaining('"query":{}'),
        })
      )
    })
  })

  describe("when successful", () => {
    it("returns paginated types", async () => {
      const response = await fetchTypes({
        firstRegistrationDate: {},
      })

      expect(response.tag).toBe("success")

      if (response.tag === "success") {
        const { content, pagination } = response.result
        expect(content).toEqual(types.content)
        expect(pagination).toEqual(types.pagination)
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
      const response = await fetchTypes({
        firstRegistrationDate: {},
      })

      expect(response.tag).toBe("error")

      if (response.tag === "error") {
        const { message, errors } = response
        expect(message).toEqual("validation.not-valid")
        expect(errors).toEqual([])
      }
    })
  })

  describe("pagination", () => {
    it("indexes page from 0", async () => {
      await fetchTypes({
        firstRegistrationDate: {},
        page: 5,
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/types\/search$/),
        expect.objectContaining({
          body: expect.stringContaining('"page":4'),
        })
      )
    })

    it("defaults `page` to 0 when not provided", async () => {
      await fetchTypes({
        firstRegistrationDate: {},
        size: 10,
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/types\/search$/),
        expect.objectContaining({
          body: expect.stringContaining('"page":0'),
        })
      )
    })

    it("defaults `size` to 25 when it's not provided", async () => {
      await fetchTypes({
        firstRegistrationDate: {},
        page: 5,
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/types\/search$/),
        expect.objectContaining({
          body: expect.stringContaining('"size":25'),
        })
      )
    })
  })
})
