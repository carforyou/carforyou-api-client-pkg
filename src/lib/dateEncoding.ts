import { Date as DateType } from "../types/models"

export const encodeDate = (date: DateType) => {
  if (!date) {
    return null
  }

  const { month, year } = date
  return year ? `${year}-${(month || 1).toString().padStart(2, "0")}-01` : null
}

export const decodeDate = (date: string) => {
  if (!date) {
    return null
  }

  try {
    const parsedDate = new Date(date)

    return {
      month: parsedDate.getMonth() + 1,
      year: parsedDate.getFullYear(),
    }
  } catch {
    return null
  }
}
