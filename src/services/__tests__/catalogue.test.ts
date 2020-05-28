import { fetchMakes, fetchModels, fetchTypes, fetchType } from "../catalogue"

import Paginated from "../../lib/factories/paginated"
import { SearchType, Type } from "../../lib/factories/type"

describe("CATALOGUE service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("#fetchMakes", () => {
    const makes = [
      { id: 1, name: "Audi", key: "audi" },
      { id: 2, name: "BMW", key: "bmw" },
      { id: 3, name: "Chevrolet", key: "chevrolet" },
    ]

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(makes))
    })

    it("returns data", async () => {
      const fetched = await fetchMakes()

      expect(fetched).toEqual(makes)
      expect(fetch).toHaveBeenCalled()
    })
  })

  describe("#fetchModels", () => {
    const models = [
      { id: 1, name: "A4", key: "a4" },
      { id: 2, name: "A5", key: "a5" },
      { id: 4, name: "A6", key: "a6" },
    ]

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(models))
    })

    it("returns data", async () => {
      const fetched = await fetchModels("audi")

      expect(fetched).toEqual(models)
      expect(fetch).toHaveBeenCalled()
    })
  })

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
        expect.stringMatching(/types\?tsn=QWERTY/),
        expect.any(Object)
      )
    })

    describe("date conversion", () => {
      it("ignores the date when not provided", async () => {
        await fetchTypes({ firstRegistrationDate: {} })

        expect(fetch).toHaveBeenCalledWith(
          expect.stringMatching(/types\?page=0&size=25$/),
          expect.any(Object)
        )
      })
    })

    describe("when successfull", () => {
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

    describe("when not successfull", () => {
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
          expect.stringMatching(new RegExp("types?(.*)page=4")),
          expect.any(Object)
        )
      })

      it("defaults `page` to 0 when not provided", async () => {
        await fetchTypes({
          firstRegistrationDate: {},
          size: 10,
        })

        expect(fetch).toHaveBeenCalledWith(
          expect.stringMatching(new RegExp("types?(.*)page=0")),
          expect.any(Object)
        )
      })

      it("defaults `size` to 25 when it's not provided", async () => {
        await fetchTypes({
          firstRegistrationDate: {},
          page: 5,
        })

        expect(fetch).toHaveBeenCalledWith(
          expect.stringMatching(new RegExp("types?(.*)size=25")),
          expect.any(Object)
        )
      })
    })
  })

  describe("#fetchType", () => {
    const type = Type({ id: 123 })

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(type))
    })

    it("returns type", async () => {
      const fetchedType = await fetchType(123)

      expect(fetchedType).toEqual(type)
      expect(fetch).toHaveBeenCalled()
    })

    it("fetches the correct type", async () => {
      await fetchType(123)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/types/123"),
        expect.any(Object)
      )
    })
  })
})
