export function sleep(ms) {
  return new Promise((res) => setTimeout(() => res(), ms))
}

export const nameKey = Symbol('key for the provided "name" value')