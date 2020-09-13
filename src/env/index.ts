/* eslint-disable no-process-env */
import { isReactNative } from '@/utils/env'

export const envList = ['ENV', 'SERVER'] as const

export type Env = typeof envList[number]

const envMap = { ...(process.env as { [key: string]: string }) }

export const env = (key: Env): string => {
  const fullKey = `${isReactNative ? '' : 'REACT_APP_'}${key}`

  if (!envList.includes(key)) {
    throw new Error(`${fullKey} 不是一个合法的环境变量`)
  }

  if (!envMap[fullKey]) {
    throw new Error(`${fullKey} 未在 envfile 中定义，也未通过 setEnv 设置`)
  }

  return envMap[fullKey]
}

export const isProduction = () => {
  return env('ENV') === 'production'
}
