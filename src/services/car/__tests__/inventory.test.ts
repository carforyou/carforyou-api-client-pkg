import { fetchListing, fetchDealerListings } from "../inventory"

import {
  DealerListingSortTypeParams,
  DealerListingSortOrderParams
} from "../../../types/sort"

import Paginated from "../../../../__tests__/factories/paginated"
import { Listing } from "../../../../__tests__/factories/listing"
import { encodeDate } from "../../../lib/dateEncoding"

const dealerId = 123

describe("CAR service", () => {
  describe("#fetchListing", () => {
    const listing = Listing({ id: 10 })

    beforeEach(() => {
      fetchMock.mockResponse(
        JSON.stringify({
          ...listing,
          firstRegistrationDate: encodeDate(listing.firstRegistrationDate),
          lastInspectionDate: encodeDate(listing.lastInspectionDate)
        })
      )
    })

    it("returns ListingAttributes", async () => {
      const fetchedListing = await fetchListing(10)

      expect(fetch).toHaveBeenCalled()
      expect(fetchedListing).toEqual(listing)
    })
  })

  describe("#fetchDealerListings", () => {
    const { content, pagination } = Paginated([Listing()])

    beforeEach(() => {
      fetchMock.mockResponse(
        JSON.stringify({
          content: content.map(listing => ({
            ...listing,
            firstRegistrationDate: encodeDate(listing.firstRegistrationDate),
            lastInspectionDate: encodeDate(listing.lastInspectionDate)
          })),
          ...pagination
        })
      )
    })

    it("unwraps the content from json", async () => {
      const paginatedListings = await fetchDealerListings(dealerId)
      const listings = paginatedListings.content

      expect(listings.length).toEqual(1)
      expect(listings).toEqual(content)
      expect(fetch).toHaveBeenCalled()
    })

    describe("Pagination", () => {
      it("is unwraped from json", async () => {
        const paginatedListings = await fetchDealerListings(dealerId)

        expect(paginatedListings.pagination).toEqual(pagination)
        expect(fetch).toHaveBeenCalled()
      })
    })

    describe("query formatting", () => {
      describe("pagination", () => {
        it("indexes page from 0", async () => {
          await fetchDealerListings(dealerId, { page: 5 })

          expect(fetchMock).toHaveBeenCalledWith(
            expect.stringMatching(
              new RegExp(`dealers/${dealerId}/listings?(.*)page=4`)
            ),
            expect.any(Object)
          )
        })

        it("defaults `page` to 0 when not provided", async () => {
          await fetchDealerListings(dealerId, {
            size: 10
          })

          expect(fetchMock).toHaveBeenCalledWith(
            expect.stringMatching(
              new RegExp(`dealers/${dealerId}/listings?(.*)page=0`)
            ),
            expect.any(Object)
          )
        })

        it("defaults `size` to 25 when it's not provided", async () => {
          await fetchDealerListings(dealerId, { page: 5 })

          expect(fetchMock).toHaveBeenCalledWith(
            expect.stringMatching(
              new RegExp(`dealers/${dealerId}/listings?(.*)size=25`)
            ),
            expect.any(Object)
          )
        })
      })

      describe("sort", () => {
        it("can sort by creation date", async () => {
          await fetchDealerListings(dealerId, {
            sortType: DealerListingSortTypeParams.CREATED_DATE,
            sortOrder: DealerListingSortOrderParams.ASC
          })

          expect(fetchMock).toHaveBeenCalledWith(
            expect.stringMatching(
              new RegExp(
                `dealers/${dealerId}/listings?(.*)sort=createdDate%2Casc`
              )
            ),
            expect.any(Object)
          )
        })

        it("defaults to sorting by creation date, descending", async () => {
          await fetchDealerListings(dealerId)

          expect(fetchMock).toHaveBeenCalledWith(
            expect.stringMatching(
              new RegExp(
                `dealers/${dealerId}/listings?(.*)sort=createdDate%2Cdesc`
              )
            ),
            expect.any(Object)
          )
        })
      })
    })
  })
})
