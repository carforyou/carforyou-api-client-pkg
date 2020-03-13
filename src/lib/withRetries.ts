const wait = (ms): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms))

export const withRetries = (
  retryFunction: (...args: any) => Promise<any>,
  callback: (result: any, { ...args }) => boolean,
  { retries, delay }: { retries: number; delay: number }
): ((...args: any) => Promise<any>) => {
  return async (...args: any) => {
    if (delay) {
      await wait(delay)
    }
    const result = await retryFunction(...args)
    if (retries === 0 || callback(result, args)) {
      return result
    }

    return withRetries(retryFunction, callback, {
      retries: retries - 1,
      delay
    })(...args)
  }
}
