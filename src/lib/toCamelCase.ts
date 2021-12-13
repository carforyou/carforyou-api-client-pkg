const capitalize = (string: string): string =>
  string[0].toUpperCase() + string.slice(1)

const unCapitalize = (string: string): string =>
  string[0].toLowerCase() + string.slice(1)

const toCamelCase = (snakeCase: string): string =>
  unCapitalize(snakeCase.toLowerCase().split("_").map(capitalize).join(""))

export default toCamelCase
