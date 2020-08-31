export const sizeOrDefault = (size, defaultPagination) => {
  return parseInt((size || "").toString(), 10) || defaultPagination.size
}
export const pageOrDefault = (page, defaultPagination) => {
  return parseInt((page || "").toString(), 10) - 1 || defaultPagination.page
}
