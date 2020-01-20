import { Options as OptionsType } from "../../types/models"

export function Options(): OptionsType {
  return {
    standardOptions: [
      {
        id: 1,
        name: "ABS (de)",
        packageItems: [
          {
            id: 2002,
            name: "ABS package item (de)"
          }
        ]
      }
    ],
    additionalOptions: [
      {
        id: 2,
        name: "Bluetooth (de)",
        packageItems: [
          {
            id: 2102,
            name: "Bluetooth package item (de)"
          }
        ]
      }
    ]
  }
}
