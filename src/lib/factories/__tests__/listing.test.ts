import { Type } from "../type"
import { ListingFromType } from "../listing"

describe("listing", () => {
  describe("ListingFromType", () => {
    const mapping = {
      bodyType: "bodyType",
      makeKey: "makeKey",
      make: "make",
      modelKey: "modelKey",
      model: "model",
      doors: "doors",
      seats: "seats",
      fullName: "typeFull",
      id: "typeId",
      fuelType: "fuelType",
      consumptionCategory: "consumptionCategory",
      euroStandard: "euroStandard",
      consumptionCombined: "consumptionCombined",
      consumptionExtraUrban: "consumptionExtraUrban",
      consumptionUrban: "consumptionUrban",
      systemPerformanceKiloWatts: "systemPerformanceKiloWatts",
      batteryCapacity: "batteryCapacity",
      powerConsumption: "powerConsumption",
      range: "range",
      rangeExtraUrban: "rangeExtraUrban",
      rangeUrban: "rangeUrban",
      chargePort: "chargePort",
      chargePower: "chargePower",
      chargeSpeed: "chargeSpeed",
      fastChargePort: "fastChargePort",
      fastChargePower: "fastChargePower",
      fastChargeSpeed: "fastChargeSpeed",
      transmissionType: "transmissionType",
      horsePower: "horsePower",
      driveType: "driveType",
      cubicCapacity: "cubicCapacity",
      cylinders: "cylinders",
      gears: "gears",
      weight: "weight",
      payload: "payload",
      towingCapacity: "towingCapacity",
    }

    const type = Type()
    const listing = ListingFromType(type)

    Object.keys(mapping).forEach((typeKey) => {
      const listingKey = mapping[typeKey]

      it(`maps ${typeKey} on type to ${listingKey} on listing`, () => {
        expect(listing[listingKey]).toEqual(type[typeKey])
      })
    })

    const numericValues = [
      "consumptionCombined",
      "consumptionExtraUrban",
      "consumptionUrban",
      "systemPerformanceKiloWatts",
      "horsePower",
      "cubicCapacity",
      "cylinders",
      "gears",
      "weight",
      "payload",
      "towingCapacity",
    ]

    numericValues.forEach((value) => {
      it(`skips 0 for ${value}`, () => {
        expect(ListingFromType(Type({ [value]: 0 }))[value]).toEqual(undefined)
      })
    })
  })
})
