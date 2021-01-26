import { createApiPathWithValidate } from "../path"

describe("path", () => {
  it("should return the passed path if validation is not needed", () => {
    const path = createApiPathWithValidate("some/path", false)
    expect(path).toEqual("some/path")
  })

  it("should return the passed path if validation is not passed", () => {
    const path = createApiPathWithValidate("some/path")
    expect(path).toEqual("some/path")
  })

  it("should append validate if validation is needed", () => {
    const path = createApiPathWithValidate("some/path", true)
    expect(path).toEqual("some/path/validate")
  })
})
