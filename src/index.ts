import apiClient from "./apiClient"

export default {
  configure: apiClient.configure,
  getConfiguration: () => ({
    ...apiClient.configuration,
    version: apiClient.version
  })
}
