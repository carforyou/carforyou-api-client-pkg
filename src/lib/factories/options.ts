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
      },
      {
        id: 2,
        name: "Befestigungsösen im Laderaum",
        packageItems: []
      },
      {
        id: 3,
        name: "Innenraumlicht-Paket",
        packageItems: [
          {
            id: 4,
            name: "Innenraumlicht-Paket Option One"
          },
          {
            id: 5,
            name: "Innenraumlicht-Paket Option Two"
          },
          {
            id: 6,
            name: "Innenraumlicht-Paket Option Theree"
          }
        ]
      },
      {
        id: 7,
        name: "Getönte Scheiben",
        packageItems: []
      },
      {
        id: 8,
        name: "3 Kopfstützen hinten",
        packageItems: []
      }
    ],
    additionalOptions: [
      {
        id: 10,
        name: "Bluetooth (de)",
        packageItems: [
          {
            id: 11,
            name: "Bluetooth package item (de)"
          }
        ]
      },
      {
        id: 12,
        name: "8 Lautsprecher",
        packageItems: []
      },
      {
        id: 13,
        name: "Paket Proline",
        packageItems: [
          {
            id: 14,
            name: "8 Lautsprecher"
          },
          {
            id: 15,
            name: "Audi hold assist"
          },
          {
            id: 16,
            name: "Digitaler Radioempfang (DAB)"
          },
          {
            id: 17,
            name: "Innenspiegel automatisch abblendbar"
          },
          {
            id: 18,
            name:
              "Kindersitzvorrichtung ISOFIX mit Deaktivierungsschalter für Beifahrer- Airbag"
          },
          {
            id: 19,
            name: "Licht- und Regensensor"
          }
        ]
      },
      {
        id: 20,
        name: "Tempomat",
        packageItems: []
      }
    ]
  }
}
