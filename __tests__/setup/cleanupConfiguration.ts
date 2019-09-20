import apiClient from "../../src/apiClient"

beforeEach(() => {
  Object.keys(apiClient.configuration).forEach(key => {
    delete apiClient.configuration[key]
  })
})
