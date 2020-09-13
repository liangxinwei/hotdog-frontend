import { getFirstMatch, isAndroid } from './utils'

export const osParser = [
  {
    test: /windows/i,
    describe(ua: string) {
      const version = getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, ua)

      return {
        name: 'Windows',
        version,
      }
    },
  },
  {
    test: /macintosh/i,
    describe(ua: string) {
      const version = getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, ua).replace(/[_\s]/g, '.')
      return {
        name: 'macOS',
        version,
      }
    },
  },
  {
    test: /(ipod|iphone|ipad)/i,
    describe(ua: string) {
      const version = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, ua).replace(/[_\s]/g, '.')

      return {
        name: 'iOS',
        version,
      }
    },
  },
  {
    test: isAndroid,
    describe(ua: string) {
      const version = getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, ua)
      return {
        name: 'Android',
        version,
      }
    },
  },
]
