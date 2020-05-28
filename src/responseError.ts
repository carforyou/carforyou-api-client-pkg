import CustomResponse from "./types/customResponse"

export class ResponseError extends Error {
  code?: string
  status: number
  statusCode: number
  response: CustomResponse

  constructor(response: CustomResponse) {
    super()
    this.name = "ResponseError"
    this.message = "API ResponseError: " + response.statusText
    this.response = response

    this.code = response.status === 404 ? "ENOENT" : null
    this.status = this.statusCode = response.status || 500
  }
}
