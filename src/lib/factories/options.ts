import { Options as OptionsType } from "../../types/models"

export function Options(): OptionsType {
  return {
    standardOptions: [
      {
        id: 1,
        name: "ABS (de)"
      }
    ],
    additionalOptions: [
      {
        id: 2,
        name: "Bluetooth (de)"
      }
    ]
  }
}
