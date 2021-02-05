import toCamelCase from "../toCamelCase"

describe("toCamelCase", () => {
  it("converts snake case to camel case", () => {
    expect(toCamelCase("SNAKE_CASE_STRING")).toEqual("snakeCaseString")
  })
})
