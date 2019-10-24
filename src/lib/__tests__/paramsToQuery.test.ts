import paramsToQuery from "../paramsToQuery"

describe("#paramsToQuery", () => {
  it("includes regular params", () => {
    expect(paramsToQuery({ makeKey: ["bmw"] })).toEqual({
      makeKey: ["bmw"]
    })
  })

  describe("location params", () => {
    it("wrap cityId", () => {
      expect(paramsToQuery({ cityId: "1001" })).toEqual({
        location: { cityId: "1001" }
      })
    })

    it("strips radius without cityId", () => {
      expect(paramsToQuery({ radius: "20" })).toEqual({})
    })

    it("wrap both radius and cityId", () => {
      expect(paramsToQuery({ radius: "20", cityId: "1001" })).toEqual({
        location: { radius: "20", cityId: "1001" }
      })
    })

    it("persists regular params", () => {
      expect(
        paramsToQuery({ makeKey: ["bmw"], radius: "20", cityId: "1001" })
      ).toEqual({
        makeKey: ["bmw"],
        location: { radius: "20", cityId: "1001" }
      })
    })
  })
})
