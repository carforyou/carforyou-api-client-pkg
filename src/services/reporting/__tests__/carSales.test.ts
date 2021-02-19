import { fetchCarSales } from "../carSales"
import PaginatedFactory from "../../../lib/factories/paginated"

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
        options: { accessToken: "DUMMY TOKEN" },
      })

      expect(data.content).toEqual(content)
    })

    it("unwraps pagination from json", async () => {
      const data = await fetchCarSales({
        dealerId: 123,
        options: { accessToken: "DUMMY TOKEN" },
      })

      expect(data.pagination).toEqual(pagination)
    })

    it("passes query in query string", async () => {
      await fetchCarSales({
        dealerId: 123,
        page: 5,
        size: 25,
        options: { accessToken: "DUMMY TOKEN" },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/123/car-sales?page=5&size=25"),
        expect.any(Object)
      )
    })
  })
})
