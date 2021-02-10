import { toSpringSortParams } from "../convertParams"

import { ListingSortOrderParams, ListingSortTypeParams } from "../../types/sort"

describe("toSpringParams", () => {
  const sortParams = {
    [ListingSortTypeParams.PRICE]: "price",
    [ListingSortTypeParams.REGISTATION_DATE]: "registrationDate",
    [ListingSortTypeParams.MILEAGE]: "mileage",
    [ListingSortTypeParams.HORSE_POWER]: "horsePower",
    [ListingSortTypeParams.PUBLISHING_DATE]: "publishingDate",
  }

  Object.entries(sortParams).forEach(([sortType, converted]) => {
    it(`converts the ${sortType} name to ${converted}`, () => {
      expect(
        toSpringSortParams({
          sortOrder: ListingSortOrderParams.ASC,
          sortType: sortType as ListingSortTypeParams,
        })
      ).toEqual(`${converted},asc`)
    })
  })
})
