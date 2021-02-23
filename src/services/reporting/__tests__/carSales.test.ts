import {
  deleteCarSalesRejection,
  fetchCarSales,
  rejectCarSales,
} from "../carSales"
import PaginatedFactory from "../../../lib/factories/paginated"
import { CarSaleRejection } from "index"

const carSales = (attributes = {}) => ({
  buyer: {
    email: "person@email.com",
    firstName: "John",
    lastName: "Peroni",
    phone: "0792222222",
  },
  carSaleDate: "2021-02-16T15:56:01.322Z",
  id: 1234,
  listing: {
    externalListingId: "456",
    firstRegistrationDate: "2021-02-16",
    id: 897,
    image: "s3/image.jpg",
    make: "Audi",
    mileage: 1234098,
    model: "A3",
    price: 125000,
    type: "sport",
  },
  ...attributes,
})

describe("Car Sales", () => {
  beforeEach(fetchMock.resetMocks)

  describe("#fetchCarSales", () => {
    const { content, pagination } = PaginatedFactory([
      carSales({ id: "qwer" }),
      carSales({ id: "tyu" }),
      carSales({ id: "iop" }),
    ])

    beforeEach(() => {
      fetchMock.mockResponse(
        JSON.stringify({
          content,
          ...pagination,
        })
      )
    })

    it("unwraps content from json", async () => {
      const data = await fetchCarSales({
        dealerId: 123,
        status: "confirmed",
        options: { accessToken: "DUMMY TOKEN" },
      })

      expect(data.content).toEqual(content)
    })

    it("unwraps pagination from json", async () => {
      const data = await fetchCarSales({
        dealerId: 123,
        status: "confirmed",
        options: { accessToken: "DUMMY TOKEN" },
      })

      expect(data.pagination).toEqual(pagination)
    })

    it("passes query in query string", async () => {
      await fetchCarSales({
        dealerId: 123,
        status: "confirmed",
        page: 5,
        size: 25,
        options: { accessToken: "DUMMY TOKEN" },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "/dealers/123/car-sales?status=confirmed&page=5&size=25"
        ),
        expect.any(Object)
      )
    })
  })

  describe("rejectCarSales", () => {
    const carSaleRejectionMock: CarSaleRejection = {
      comment: "Motor kaputt",
      reason: "car-not-sold",
    }
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify({}))
    })

    it("makes a PUT request to the endpoint", async () => {
      await rejectCarSales({
        dealerId: 111,
        carSaleId: 222,
        body: carSaleRejectionMock,
        options: { accessToken: "DUMMY TOKEN" },
      })

      expect(fetch).toHaveBeenCalledWith(
        "test.gateway/dealers/111/care-sales/222/rejection",
        expect.objectContaining({
          body: '{"comment":"Motor kaputt","reason":"car-not-sold"}',
          method: "PUT",
          headers: expect.objectContaining({
            Authorization: "Bearer DUMMY TOKEN",
          }),
        })
      )
    })

    it("envelops the response", async () => {
      const response = await rejectCarSales({
        dealerId: 111,
        carSaleId: 222,
        body: carSaleRejectionMock,
        options: { accessToken: "DUMMY TOKEN" },
      })

      expect(response).toEqual({
        tag: "success",
        result: null,
      })
    })
  })

  describe("deleteCarSalesRejection", () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify({}))
    })

    it("makes a DELETE request to the endpoint", async () => {
      await deleteCarSalesRejection({
        dealerId: 333,
        carSaleId: 444,
        options: { accessToken: "DUMMY TOKEN" },
      })

      expect(fetch).toHaveBeenCalledWith(
        "test.gateway/dealers/333/care-sales/444/rejection",
        expect.objectContaining({
          method: "DELETE",
          headers: expect.objectContaining({
            Authorization: "Bearer DUMMY TOKEN",
          }),
        })
      )
    })

    it("envelops the response", async () => {
      const response = await deleteCarSalesRejection({
        dealerId: 333,
        carSaleId: 444,
        options: { accessToken: "DUMMY TOKEN" },
      })

      expect(response).toEqual({
        tag: "success",
        result: null,
      })
    })
  })
})
