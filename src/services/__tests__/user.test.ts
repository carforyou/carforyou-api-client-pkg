import { deleteUser } from "../user"

describe("deleteUser", () => {
  beforeEach(() => {
    fetchMock.mockResponse(JSON.stringify({}))
  })

  it("makes a DELETE request", async () => {
    await deleteUser({
      options: { accessToken: "TOKEN" },
    })

    expect(fetch).toHaveBeenCalledWith(
      "test.gateway/users/me",
      expect.objectContaining({
        method: "DELETE",
        headers: expect.objectContaining({
          Authorization: "Bearer TOKEN",
        }),
      })
    )
  })
})
