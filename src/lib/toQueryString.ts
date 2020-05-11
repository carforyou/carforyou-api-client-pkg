const toQueryString = (params: object): string => {
  return Object.keys(params)
    .filter(
      (key) =>
        typeof params[key] !== undefined &&
        typeof params[key] !== null &&
        params[key] !== ""
    )
    .reduce((query, key) => {
      const value = params[key]
      if (Array.isArray(value)) {
        for (const val of value) {
          query.push(toQueryString({ [key]: val }))
        }
        return query
      }

      query.push(`${key}=${encodeURIComponent(value)}`)
      return query
    }, [])
    .join("&")
}

export default toQueryString
