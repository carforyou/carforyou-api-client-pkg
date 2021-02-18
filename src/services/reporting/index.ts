import { createApiPathWithValidate } from "../../lib/path"
import { WithValidationError } from "../../index"
import { ApiCallOptions, ignoreServerSideErrors, postData } from "../../base"

// eslint-disable-next-line @typescript-eslint/ban-types
export const postTrackingData = async <T extends {}>({
  listingId,
  pathSegment,
  body,
  options = {},
}: {
  listingId: number
  pathSegment: string
  body: T
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<WithValidationError<T>> => {
  const { validateOnly, ...otherOptions } = options

  const path = createApiPathWithValidate(
    `listings/${listingId}/${pathSegment}`,
    validateOnly
  )

  try {
    await postData({
      path,
      body,
      options: {
        ...otherOptions,
        apiVersion: "v1",
      },
    })
    return {
      tag: "success",
      result: body,
    }
  } catch (error) {
    return ignoreServerSideErrors({
      error,
      errorHandlerOptions: { swallowErrors: true },
      returnValue: body,
    })
  }
}
