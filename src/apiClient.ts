export interface ApiClientConfig {
  carServiceUrl?: string
  searchServiceUrl?: string
  catalogueServiceUrl?: string
  dealerServiceUrl?: string
  debug?: boolean
}

class ApiClient {
  static instance: ApiClient
  configuration: ApiClientConfig
  version: string

  constructor() {
    this.version = "v1"
    this.configuration = {}
    ApiClient.instance = this
  }

  public configure(configuration: ApiClientConfig) {
    if (Object.keys(this.configuration).length) {
      throw new Error("Owerwriting API client configuration")
    }

    Object.keys(configuration).forEach(key => {
      this.configuration[key] = configuration[key]
    })
  }
}

const instance = new ApiClient()
Object.freeze(instance)

export default instance
