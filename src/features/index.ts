import { initHome } from './home'
import { initMy } from './my'
import { InitFeatureParams } from './types'

export const initFeatures = (params: InitFeatureParams) => {
  initHome(params)
  initMy(params)
}
