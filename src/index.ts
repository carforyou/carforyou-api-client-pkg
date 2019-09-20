import apiClient from "./apiClient"

import { ResponseError } from "./responseError"
export { fetchBodyTypes } from "./calls/car/inventoryData"

export default {
  configure: configuration => apiClient.configure(configuration),
  getConfiguration: () => ({
    ...apiClient.configuration,
    version: apiClient.version
  })
}
