interface MappedValue {
  id: number
  name: string
  key: string
}

export interface Make extends MappedValue {}

export interface ZipCode {
  zipCode: string
  de: string
  fr: string
  it: string
}
