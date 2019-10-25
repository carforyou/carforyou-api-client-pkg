import { ResponseError } from "../responseError"

describe("ResponseError", () => {
  it("sets status codes", () => {
    const error = new ResponseError({ status: 400 })
    expect(error.status).toEqual(400)
    expect(error.statusCode).toEqual(400)
    expect(error.code).toEqual(null)
  })

  it("sets code to ENOENT on 404", () => {
    const error = new ResponseError({ status: 404 })
    expect(error.code).toEqual("ENOENT")
  })

  describe("defaults status codes to 500", () => {
    it("when status is 0", () => {
      const error = new ResponseError({ status: 0 })
      expect(error.status).toEqual("500")
      expect(error.statusCode).toEqual("500")
    })

    it("when status is null", () => {
      const error = new ResponseError({ status: undefined })
      expect(error.status).toEqual("500")
      expect(error.statusCode).toEqual("500")
    })

    it("when status is empty", () => {
      const error = new ResponseError({ status: "" })
      expect(error.status).toEqual("500")
      expect(error.statusCode).toEqual("500")
    })
  })
})
