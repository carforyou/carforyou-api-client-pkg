const wait = (ms): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const withRetries = <T>(
  retryFunction: (...args) => Promise<T>,
  callback: (result, { ...args }) => boolean,
  { retries, delay }: { retries: number; delay: number }
): ((...args) => Promise<T>) => {
  return async (...args) => {
    if (delay) {
      await wait(delay)
    }
    const result = await retryFunction(...args)
    if (retries === 0 || callback(result, args)) {
      return result
    }

    return withRetries(retryFunction, callback, {
      retries: retries - 1,
      delay,
    })(...args)
  }
}
