import unfetch from "isomorphic-unfetch"

class ResponseError extends Error {
  code?: string
  status: string
  statusCode: string
  response: unfetch.IsomorphicResponse

  constructor(response) {
    super()
    this.name = "ResponseError"
    this.message = "API ResponseError: " + response.statusText
    this.response = response

    this.code = response.status === 404 ? "ENOENT" : null
    this.status = this.statusCode = response.status
  }
}

export default ResponseError
