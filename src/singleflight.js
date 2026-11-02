/**
 * Coalesce concurrent work for the same key.
 * See PROBLEM.md for the required behavior.
 *
 * @returns {(key: unknown, fn: () => unknown) => Promise<unknown>}
 */
export function createSingleflight() {
  return function flight() {
    return Promise.reject(new Error("Not implemented"));
  };
}
