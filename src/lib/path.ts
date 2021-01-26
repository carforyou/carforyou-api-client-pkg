export const createApiPathWithValidate = (
  path: string,
  validateOnly?: boolean
) => {
  return `${path}${validateOnly ? "/validate" : ""}`
}
