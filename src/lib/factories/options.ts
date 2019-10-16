import { Options as OptionsType } from "../../types/models"

export function Options(): OptionsType {
  return {
    standardOptions: [
      {
        de: "ABS (de)",
        fr: "abs (fr)",
        it: "abs (it)",
        id: 1,
        name: "ABS (de)"
      }
    ],
    additionalOptions: [
      {
        de: "Bluetooth (de)",
        fr: "Bluetooth (fr)",
        it: "Bluetooth (it)",
        id: 2,
        name: "Bluetooth (de)"
      }
    ]
  }
}
