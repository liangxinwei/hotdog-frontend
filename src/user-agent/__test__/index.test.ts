import { UserAgent } from '../index'

import devices from './user-agent.json'

describe('user agent', () => {
  devices.forEach(device => {
    const ua = new UserAgent(device.value)

    describe(device.name, () => {
      test('device', () => {
        expect(ua.device).toBe(device.device)
      })

      test('os', () => {
        expect(ua.os.name).toBe(device.os.name)
        expect(ua.os.version).toBe(device.os.version)
      })

      test('browser', () => {
        expect(ua.browser.name).toBe(device.browser.name)
        expect(ua.browser.version).toBe(device.browser.version)
      })

      test('isIncompatible', () => {
        expect(ua.isIncompatible).toBe(!!device.isIncompatible)
      })

      test('isMobile', () => {
        expect(ua.isMobile).toBe(!!device.isMobile)
      })

      test('isTablet', () => {
        expect(ua.isTablet).toBe(!!device.isTablet)
      })

      test('isWeChat', () => {
        expect(ua.isWeChat).toBe(!!device.isWeChat)
      })

      test('isSafari', () => {
        expect(ua.isSafari).toBe(!!device.isSafari)
      })

      test('isIOS', () => {
        expect(ua.isIOS).toBe(!!device.isIOS)
      })

      test('isAndroid', () => {
        expect(ua.isAndroid).toBe(!!device.isAndroid)
      })

      test('isDingTalk', () => {
        expect(ua.isDingTalk).toBe(!!device.isDingTalk)
      })

      test('isC3AppWebView', () => {
        expect(ua.isC3AppWebView).toBe(!!device.isC3AppWebView)
      })
    })
  })
})
