/**
 * UserAgent detector
 */
import { find, isFunction } from 'lodash'

import { browserParser } from './browser'
import BLACKLIST from './browser-blacklist.json'
import { osParser } from './os'
import { compareVersions, getIncompatibleHtml } from './utils'

export interface OsInfo {
  name: string
  version: string
}

export interface BrowserInfo {
  name: string
  version?: string
}

export class UserAgent {
  ua: string

  /**
   * create UserAgent
   * @param {param} ua - ua string
   */
  constructor(ua?: string) {
    const result = ua || navigator.userAgent || ''
    this.ua = result.toLocaleLowerCase()
  }

  /**
   * get device
   * @return {string} device name, includes phone/tablet/destop
   */
  get device(): string {
    /*
     * This following two regexp copy from
     * https://github.com/PoeHaH/devicedetector/blob/master/devicedetector-production.js
     */
    const mobileReg = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i
    const tabletReg = /(ipad|tablet|(android\s(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i
    const isMobile = mobileReg.test(this.ua)
    const isTablet = tabletReg.test(this.ua)

    if (isTablet) {
      return 'tablet'
    }
    if (isMobile && !isTablet) {
      return 'phone'
    }

    return 'desktop'
  }

  /**
   * get os
   * @return {Object} os
   *         {string} os.name - default value is 'other'
   *         {string} os.version - default value is '0'
   */
  get os(): OsInfo {
    const { ua } = this
    const result = find(osParser, os => {
      if (isFunction(os.test)) {
        return os.test(ua)
      }

      return os.test.test(ua)
    })

    if (result) {
      return result.describe(ua)
    }

    return {
      name: 'other',
      version: '0',
    }
  }

  /**
   * get browser
   * @return {Object} browser
   *         {string} browser.name - default value is 'other'
   *         {string} browser.version - default value is '0'
   */
  get browser(): BrowserInfo {
    const { ua } = this
    const result = find(browserParser, browser => {
      if (isFunction(browser.test)) {
        return browser.test(ua)
      }

      return browser.test.test(ua)
    })

    if (result) {
      return result.describe(ua)
    }

    return {
      name: 'other',
      version: '0',
    }
  }

  get isMobile() {
    return this.device === 'phone'
  }

  get isIncompatible() {
    const { name: browserName, version: browserVersion } = this.browser
    const { name: osName, version: osVersion } = this.os

    /*
     * Only check iOS version when phone system is iOS
     * because the browsers in iOS always use safary browser engine.
     * iOS safari version is same as iOS System version, now we support iOS Safari 10 (> 9).
     */
    if (osName === 'iOS' && osVersion) {
      return compareVersions('9', osVersion) > 0
    }

    // if browser version is undetected, just pass it
    if (!browserVersion) return false

    return !!find(BLACKLIST, item => {
      const { name, value } = item

      return name === browserName && compareVersions(value, browserVersion) > 0
    })
  }

  /**
   * Replace origin page to incompatible page
   */
  blockIncompatibleBrowsers() {
    if (this.isIncompatible) {
      if (!window.document) {
        throw new Error('[user-agent] Cannot locate window.document')
      }
      window.document.body.innerHTML = getIncompatibleHtml(this)

      // remove head
      const headHTML = `
        <title>浏览器不支持</title>
        <meta charset="utf-8">
      `
      window.document.head.innerHTML =
        this.device === 'phone'
          ? `
        ${headHTML}
        <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="screen-orientation" content="portrait">
        <meta name="x5-orientation" content="portrait">
        <meta name="format-detection" content="telephone=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
      `
          : headHTML

      throw new Error('[user-agent] Incompatible browser detected.')
    }
  }

  /**
   * The following are backward compatible interfaces.
   *
   * So you should should use new way to check user agent now.
   * Just like use `this.device === 'phone'` instead of `isPhone`
   */

  get isTablet() {
    return this.device === 'tablet'
  }

  get isDingTalk() {
    return this.browser.name === 'DingTalk'
  }

  get isWeChat() {
    return this.browser.name === 'WeChat'
  }

  get isSafari() {
    return this.browser.name === 'Safari'
  }

  get isIOS() {
    return this.os.name === 'iOS'
  }

  get isAndroid() {
    return this.os.name === 'Android'
  }

  get isC3AppWebView() {
    return this.browser.name === 'C3AppWebView'
  }
}

// export a singleton because browser user agent hardly changes
export const userAgent = new UserAgent()
