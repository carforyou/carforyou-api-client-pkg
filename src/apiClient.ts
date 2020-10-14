export interface ApiClientConfig {
  carServiceUrl?: string
  searchServiceUrl?: string
  catalogueServiceUrl?: string
  dealerServiceUrl?: string
  optionServiceUrl?: string
  analyticsServiceUrl?: string
  userNotificationServiceUrl?: string
  debug?: boolean
}

class ApiClient {
  private static instance: ApiClient

  configuration: ApiClientConfig
  version: string

  constructor() {
    if (ApiClient.instance) return ApiClient.instance

    this.configuration = {}
    this.version = "v1"
    ApiClient.instance = this
    return ApiClient.instance
  }

  public configure(configuration: ApiClientConfig): void {
    if (Object.keys(this.configuration).length) {
      throw new Error("Owerwriting API client configuration")
    }

    Object.keys(configuration).forEach((key) => {
      this.configuration[key] = configuration[key]
    })
  }

  public getConfiguration() {
    return {
      ...this.configuration,
      configured: Object.keys(this.configuration).length > 0,
      version: this.version,
    }
  }
}

export default new ApiClient()
export const Constructor = ApiClient
