/**
 * @util
 * 是否在 react native 环境中
 */
export const isReactNative =
  typeof window !== 'undefined' &&
  window.navigator &&
  window.navigator.product &&
  window.navigator.product === 'ReactNative'
