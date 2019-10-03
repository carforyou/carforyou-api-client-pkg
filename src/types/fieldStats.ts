export interface FieldStat {
  min: number
  max: number
  p25: number
  p75: number
}

export interface FieldsStats {
  [key: string]: FieldStat
}

export type WithFieldStats<T extends {}> = T & {
  fieldsStats?: FieldsStats
}
