import { fetchTypes, fetchTypeFacets } from "../typeSearch"

import { PowerUnit } from "../../../types/params/types"
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
    await fetchTypes({ tsn: "Q W E  R   TY" })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/types\/search$/),
      expect.objectContaining({
        body: expect.stringContaining('"tsn":"QWERTY"'),
      })
    )
  })

  describe("filtering by power", () => {
    it("converts exact horsePower to range", async () => {
      await fetchTypes({ power: { unit: PowerUnit.HorsePower, value: 75 } })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/types\/search$/),
        expect.objectContaining({
          body: expect.stringContaining(
            '"horsePowerFrom":75,"horsePowerTo":75'
          ),
        })
      )
    })

    it("converts exact kiloWatts to range", async () => {
      await fetchTypes({ power: { unit: PowerUnit.KiloWatts, value: 75 } })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/types\/search$/),
        expect.objectContaining({
          body: expect.stringContaining('"kiloWattsFrom":75,"kiloWattsTo":75'),
        })
      )
    })

    it("ignores power value without a unit", async () => {
      await fetchTypes({ power: { value: 75 } })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/types\/search$/),
        expect.objectContaining({
          body: expect.stringContaining('"query":{}'),
        })
      )
    })

    it("ignores power unit without a value", async () => {
      await fetchTypes({ power: { unit: PowerUnit.HorsePower } })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/types\/search$/),
        expect.objectContaining({
          body: expect.stringContaining('"query":{}'),
        })
      )
    })
  })

  it("converts exact gears to range", async () => {
    await fetchTypes({ gears: 5 })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/types\/search$/),
      expect.objectContaining({
        body: expect.stringContaining('"gearsFrom":5,"gearsTo":5'),
      })
    )
  })

  describe("when successful", () => {
    it("returns paginated types", async () => {
      const response = await fetchTypes({})

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
      const response = await fetchTypes({})

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
      await fetchTypes({ page: 5 })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/types\/search$/),
        expect.objectContaining({
          body: expect.stringContaining('"page":4'),
        })
      )
    })

    it("defaults `page` to 0 when not provided", async () => {
      await fetchTypes({ size: 10 })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/types\/search$/),
        expect.objectContaining({
          body: expect.stringContaining('"page":0'),
        })
      )
    })

    it("defaults `size` to 25 when it's not provided", async () => {
      await fetchTypes({ page: 5 })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/types\/search$/),
        expect.objectContaining({
          body: expect.stringContaining('"size":25'),
        })
      )
    })
  })
})

describe("#fetchTypeFacets", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it("unwraps facets from json", async () => {
    const facets = { makeKey: 312 }
    fetchMock.mockResponse(JSON.stringify({ facets }))

    const fetched = await fetchTypeFacets()

    expect(fetch).toHaveBeenCalled()
    expect(fetched.tag).toEqual("success")
    if (fetched.tag === "success") {
      expect(fetched.result).toEqual(facets)
    }
  })
})
