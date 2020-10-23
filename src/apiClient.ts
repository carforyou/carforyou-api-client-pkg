export interface ApiClientConfiguration {
  host: string
  debug?: boolean
}

interface ApiClientConfig {
  host?: string
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

  public configure(configuration: ApiClientConfiguration): void {
    if (Object.keys(this.configuration).length) {
      throw new Error("Overwriting API client configuration")
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
