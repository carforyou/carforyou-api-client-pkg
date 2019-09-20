# CAR FOR YOU API Client

## Usage
```
npm install @carforyou/api-client
```

Initialize the API client:

```
import ApiClient from "@carforyou/api-client"

ApiClient.configure(<your_configuration_object>)
```

Import the `fetchXYZ` call you need and use in your code:

```
import { fetchBodyTypes } from "@carforyou/api-client"

fetchBodyTypes()
```

## Configuration

| Option Name | Meaning |
| ----------- | ------- |
| `carServiceUrl` | URL to [Car Service](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html) |
| `searchServiceUrl` | URL to [Search Service](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html) |
| `catalogueServiceUrl` | URL to [Catalogue Service](https://catalogue-service.preprod.carforyou.ch/swagger-ui.html#/Product_Catalogue) |
| `dealerServiceUrl` | URL to [Dealer Service](https://dealer-service.preprod.carforyou.ch/swagger-ui.html) |
| `debug` | Set to `true` to `console.log` requests and API responses. |

## Development
```
npm run build
```

You can link your local npm package to integrate it with any local project:
```
cd carforyou-api-client-pkg
npm run build

cd carforyou-listings-web
npm link ../carforyou-api-client-pkg/pkg
```

## Release a new version
```
npm run release
```
