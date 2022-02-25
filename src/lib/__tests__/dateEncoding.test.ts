import { decodeDate, encodeDate } from "../dateEncoding"

describe("dateEncoding", () => {
  describe("#encodeDate", () => {
    it("returs null without a year", () => {
      expect(encodeDate({ year: null, month: null })).toBe(null)
    })

    it("defaults month to january if only year is provided", () => {
      expect(encodeDate({ year: 1988, month: 1 })).toEqual("1988-01-01")
    })

    it("converts date to YYYY-MM-DD format", () => {
      expect(encodeDate({ year: 1988, month: 12 })).toEqual("1988-12-01")
    })

    it("zero pads short months", () => {
      expect(encodeDate({ year: 1988, month: 2 })).toEqual("1988-02-01")
    })
  })

  describe("#decodeDate", () => {
    it("splits year and month from the date", () => {
      expect(decodeDate("1988-01-22")).toEqual({ year: 1988, month: 1 })
    })
  })
})
