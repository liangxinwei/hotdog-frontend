export enum ErrorAction {
  None = 'none',
  Toast = 'toast',
  Alert = 'alert',
  AlertAndReport = 'alertAndReport',
  AlertAndLogout = 'loginAndLogout',
  AlertAndReload = 'alertAndReload',
}

/**
 * @util
 * 判断一个错误是否是 Axios 抛出的错误，可进一步添加状态码和 Http 动作的判断条件
 * @param error 错误
 * @param status 状态码，-1 代表网络错误
 * @param method Http 动作
 * @return 是否是符合条件的 Axios 错误
 */
export const isAxiosError = (
  error: any,
  status?: number,
  method?: 'post' | 'get' | 'put' | 'delete' | 'patch',
) => {
  if (!error || !error.isAxiosError) return false
  if (status != null) {
    if (status === -1 && error.response) return false
    if (status !== -1 && !error.response) return false
    if (status !== -1 && error.response.status !== status) return false
  }
  if (method != null && error.config?.method !== method) return false

  return true
}

/**
 * 常见于新版本上线后清除了旧版本的所有资源文件，
 * 而用户继续使用已打开的旧版本网页时，
 * 尝试下载旧版本的资源文件时就会报 ChunkLoadError。
 * 只适用于 web。
 *
 * @param error
 */
export function isChunkLoadError(error: any) {
  return error instanceof Error && error.name === 'ChunkLoadError'
}

/**
 * regex 集合，用于过滤 web 上通常由外部代码（比如浏览器插件）引起的错误
 * 概率较低，由用户上报后添加
 */
export const webErrorsToIgnore = [/^MyAppGetLink/, /ucbrowser/]
