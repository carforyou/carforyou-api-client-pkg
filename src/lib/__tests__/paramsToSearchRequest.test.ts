import paramsToSearchRequest from "../paramsToSearchRequest"

describe("#paramsToSearchRequest", () => {
  it("includes regular params", () => {
    expect(paramsToSearchRequest({ makeKey: ["bmw"] })).toEqual({
      makeKey: ["bmw"],
    })
  })

  describe("location params", () => {
    it("wrap cityId", () => {
      expect(paramsToSearchRequest({ cityId: "1001" })).toEqual({
        location: { cityId: "1001" },
      })
    })

    it("strips radius without cityId", () => {
      expect(paramsToSearchRequest({ radius: "20" })).toEqual({})
    })

    it("wrap both radius and cityId", () => {
      expect(paramsToSearchRequest({ radius: "20", cityId: "1001" })).toEqual({
        location: { radius: "20", cityId: "1001" },
      })
    })

    it("persists regular params", () => {
      expect(
        paramsToSearchRequest({
          makeKey: ["bmw"],
          radius: "20",
          cityId: "1001",
        })
      ).toEqual({
        makeKey: ["bmw"],
        location: { radius: "20", cityId: "1001" },
      })
    })
  })
})
