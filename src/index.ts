import apiClient from "./apiClient"

export { fetchBodyTypes } from "./calls/car/inventoryData"

export default {
  configure: apiClient.configure,
  getConfiguration: () => ({
    ...apiClient.configuration,
    version: apiClient.version
  })
}
