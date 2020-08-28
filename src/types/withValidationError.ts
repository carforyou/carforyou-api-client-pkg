export interface FieldError {
  param: string
  message: string
}

export interface ValidationError {
  tag: "error"
  message: string
  errors: FieldError[]
}

export interface Success<T> {
  tag: "success"
  result: T
}

export type WithValidationError<T = Record<string, unknown>> =
  | ValidationError
  | Success<T>
