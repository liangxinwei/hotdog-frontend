import { Locale } from '@/locales/types'

import { InitFeatureParams } from '../types'

import cnMsg from './locales/cn.json'
import enMsg from './locales/en.json'
import { routes } from './routes'

export const initMy = ({ addLocal, addRoutes }: InitFeatureParams) => {
  addLocal({
    [Locale.EN]: enMsg,
    [Locale.CN]: cnMsg,
  })

  addRoutes(routes)
}
