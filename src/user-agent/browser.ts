/**
 * Copy from Bowser
 * https://github.com/lancedikson/bowser/blob/master/src/parser-browsers.js
 *
 * The idea of descriptors is simple. You should know about them two simple things:
 * 1. Every descriptor has a method or property called `test` and a `describe` method.
 * 2. Order of descriptors is important.
 *
 * More details:
 * 1. Method or property `test` serves as a way to detect whether the UA string
 * matches some certain browser or not. The `describe` method helps to make a result
 * object with params that show some browser-specific things: name, version, etc.
 * 2. Order of descriptors is important because a Parser goes through them one by one
 * in course. For example, if you insert Chrome's descriptor as the first one,
 * more then a half of browsers will be described as Chrome, because they will pass
 * the Chrome descriptor's test.
 *
 * Descriptor's `test` could be a property with a RegExp
 * Or `test` could be a method. In that case it gets a Parser instance and should
 * return true/false to get the Parser know if this browser descriptor matches the UA or not.
 */

import { getFirstMatch, getSecondMatch, isAndroid } from './utils'

// 默认的版本号获取方式
const commonVersionIdentifier = /version\/(\d+(\.?_?\d+)+)/i

interface Browser {
  name: string
  version?: string
}

export const browserParser = [
  {
    test: /msie|trident/i,
    describe(ua: string) {
      const browser: Browser = {
        name: 'InternetExplorer',
      }
      const version = getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, ua)

      if (version) {
        browser.version = version
      }

      return browser
    },
  },
  {
    test: /edg([ea]|ios)/i,
    describe(ua: string) {
      const browser: Browser = {
        name: 'MicrosoftEdge',
      }

      const version = getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, ua)

      if (version) {
        browser.version = version
      }

      return browser
    },
  },
  {
    test: /firefox|iceweasel|fxios/i,
    describe(ua: string) {
      const browser: Browser = {
        name: 'Firefox',
      }

      const version = getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, ua)

      if (version) {
        browser.version = version
      }

      return browser
    },
  },
  {
    test: /micromessenger/i,
    describe(ua: string) {
      const browser: Browser = {
        name: 'WeChat',
      }
      const version = getFirstMatch(/micromessenger\/([\w.]+)/i, ua)

      if (version) {
        browser.version = version
      }

      return browser
    },
  },
  {
    test: /c3app/i,
    describe(ua: string) {
      const browser: Browser = {
        name: 'C3AppWebView',
      }
      const version = getFirstMatch(/c3app\/([\w.]+)/i, ua)

      if (version) {
        browser.version = version
      }

      return browser
    },
  },
  {
    test: /dingtalk/i,
    describe(ua: string) {
      const browser: Browser = {
        name: 'DingTalk',
      }
      const version = getFirstMatch(/dingtalk\/([\w.]+)/i, ua)

      if (version) {
        browser.version = version
      }

      return browser
    },
  },
  {
    test: /ucbrowser/i,
    describe(ua: string) {
      const browser: Browser = {
        name: 'UC',
      }
      const version =
        getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, ua) ||
        getFirstMatch(commonVersionIdentifier, ua)

      if (version) {
        browser.version = version
      }

      return browser
    },
  },
  {
    test: /chrome|crios|crmo/i,
    describe(ua: string) {
      const browser: Browser = {
        name: 'Chrome',
      }
      const version = getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, ua)

      if (version) {
        browser.version = version
      }

      return browser
    },
  },
  {
    test: isAndroid,
    describe(ua: string) {
      const browser: Browser = {
        name: 'Android',
      }
      const version = getFirstMatch(commonVersionIdentifier, ua)

      if (version) {
        browser.version = version
      }

      return browser
    },
  },
  {
    test: /safari|applewebkit/i,
    describe(ua: string) {
      const browser: Browser = {
        name: 'Safari',
      }
      const version = getFirstMatch(commonVersionIdentifier, ua)

      if (version) {
        browser.version = version
      }

      return browser
    },
  },
]
