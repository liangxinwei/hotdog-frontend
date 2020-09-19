# @util

#### [`isReactNative`](../src/utils/env.ts)

 - 是否在 react native 环境中

#### [`isAxiosError`](../src/utils/errors.ts)

 - 判断一个错误是否是 Axios 抛出的错误，可进一步添加状态码和 Http 动作的判断条件
 - `@param` error 错误
 - `@param` status 状态码，-1 代表网络错误
 - `@param` method Http 动作
 - `@return` 是否是符合条件的 Axios 错误
