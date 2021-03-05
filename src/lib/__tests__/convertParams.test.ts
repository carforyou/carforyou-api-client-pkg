import { toSpringSortParams } from "../convertParams"

import { ListingSortTypeParams, SortOrderParams } from "../../types/sort"

describe("toSpringParams", () => {
  it("converts newest to createdDate", () => {
    expect(
      toSpringSortParams({
        sortOrder: SortOrderParams.ASC,
        sortType: ListingSortTypeParams.NEWEST,
      })
    ).toEqual("createdDate,desc")
  })

  it("converts make model to two fields sort", () => {
    expect(
      toSpringSortParams({
        sortOrder: SortOrderParams.DESC,
        sortType: ListingSortTypeParams.MAKE_MODEL_A_Z,
      })
    ).toEqual(["make,desc", "model,desc"])
  })

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
          sortOrder: SortOrderParams.ASC,
          sortType: sortType as ListingSortTypeParams,
        })
      ).toEqual(`${converted},asc`)
    })
  })
})
