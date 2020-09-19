import { Dispatch } from '@/stores'

import cnMsg from './locale/cn.json'
import enMsg from './locale/en.json'
import { Locale } from './types'

export type LocaleMessages = {
  [key in Locale]: {
    [key: string]: string
  }
}

export interface LocaleState {
  locale: Locale
  msg: LocaleMessages
}

const defaultState: LocaleState = {
  locale: Locale.CN,
  msg: {
    [Locale.CN]: { ...cnMsg },
    [Locale.EN]: { ...enMsg },
  },
}

const reducers = {
  setLocale(prevState: LocaleState, locale: Locale) {
    return {
      ...prevState,
      locale,
    }
  },
  addMsg(prevState: LocaleState, msg: LocaleMessages) {
    const newState = { ...prevState }
    Object.keys(msg).forEach(k => {
      const locale = k as Locale
      const prevMsg = prevState.msg[locale] || {}
      Object.entries(msg[locale]).forEach(([id, value]) => {
        const hasOldTranslation = Object.prototype.hasOwnProperty.call(prevState, id)
        const isNewTranslationUseful = id !== value
        // 即非 "中文": "中文" 的情况
        if (!hasOldTranslation || !isNewTranslationUseful) {
          prevMsg[id] = value
        }
      })
      newState.msg[locale] = {
        ...prevMsg,
      }
    })
    return newState
  },
}

const effects = (dispatch: Dispatch) => ({
  async toggleLocale(payload: void, { locale }: { locale: LocaleState }) {
    dispatch.locale.setLocale(locale.locale === Locale.EN ? Locale.CN : Locale.EN)
  },
})

export const localeStore = { state: defaultState, reducers, effects }
