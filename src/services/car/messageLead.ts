import { WithValidationError } from "../../types/withValidationError"
import { Paginated } from "../../types/pagination"
import { MessageLead, MessageLeadsListItem } from "../../types/models"
import { createApiPathWithValidate } from "../../lib/path"
import { ApiCallOptions, ignoreServerSideErrors, postData } from "../../base"

export const sendMessageLead = async ({
  listingId,
  messageLead,
  options = {},
}: {
  listingId: number
  messageLead: MessageLead
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<WithValidationError<MessageLead>> => {
  const {
    videoCallPreference: {
      available = false,
      services = [],
      otherService = null,
    },
    ...messageLeadBase
  } = { ...{ videoCallPreference: {} }, ...messageLead }
  const { validateOnly, ...otherOptions } = options

  const path = createApiPathWithValidate(
    `listings/${listingId}/message-leads`,
    validateOnly
  )

  try {
    await postData({
      path,
      body: {
        ...messageLeadBase,
        videoCallPreference: {
          available,
          services: [...services, otherService].filter(Boolean),
        },
      },
      options: {
        ...otherOptions,
        apiVersion: "v2",
      },
    })

    return {
      tag: "success",
      result: messageLead,
    }
  } catch (error) {
    return ignoreServerSideErrors({
      error,
      errorHandlerOptions: { swallowErrors: true },
      returnValue: messageLead,
    })
  }
}

export const fetchDealerMessageLeads = async ({
  dealerId,
  page = 0,
  size = 7,
  options = {},
}: {
  dealerId: number
  page: number
  size?: number
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<Paginated<MessageLeadsListItem>> => {
  /* const { validateOnly, ...otherOptions } = options

  const path = createApiPathWithValidate(
    `dealers/${dealerId}/message-leads`,
    validateOnly
  )

  const result = await postData({
    path,
    body: {
      number: page,
      size,
    },
    options: {
      ...otherOptions,
      apiVersion: "v2",
    },
  })

  return {
    content,
    pagination,
  }*/

  // MOCK DATA HERE
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  return sleep(1000).then(() => {
    const result = mockData
    const { content, ...pagination } = result

    // MOCK PAGINATION
    const totalElements = content.length
    const cutStart = page * size
    const cutEnd =
      cutStart + size < totalElements ? cutStart + size : totalElements - 1
    const totalPages = (totalElements % size) + 1
    const pageContent = content.slice(cutStart, cutEnd)

    return {
      content: pageContent,
      pagination: {
        ...pagination,
        totalElements: totalElements,
        totalPages: totalPages,
        last: totalPages === page + 1,
        size: size,
        number: page,
        first: page === 0,
        numberOfElements: pageContent.length,
      },
    }
  })
}

const mockData = {
  content: [
    {
      id: 501,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 502,
      listingId: 501,
      listing: {
        externalListingId: "cSD9VW2i",
        make: "BMW",
        model: "2 2er 225i",
        type: "xDrive grand coupe Sport 3TL Automatic",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Frederic",
      lastName: "Berghmans",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 503,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 504,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 505,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 506,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 507,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 508,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 509,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 510,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 511,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 512,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 513,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 514,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 515,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 516,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 517,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 518,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 519,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 520,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 521,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 522,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 523,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 524,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 525,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 526,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 527,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 528,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 529,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 530,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 531,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
    {
      id: 532,
      listingId: 501,
      listing: {
        externalListingId: "1234567",
        make: "Ford",
        model: "Fiesta",
        type: "1.0 EcoB 125 Titanium X",
      },
      phone: "0792222222",
      email: "person@email.com",
      firstName: "Birra",
      lastName: "Peroni",
      createdDate: "2021-01-01T12:34:56.000Z",
      message: "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X."
    },
  ],
  last: true,
  totalPages: 4,
  totalElements: 32,
  size: 10,
  number: 0,
  numberOfElements: 10,
  first: true,
}
