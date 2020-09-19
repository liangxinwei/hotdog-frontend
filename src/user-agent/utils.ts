/**
 * Get version precisions count
 * @example
 *   getVersionPrecision("1.10.3") // 3
 * @param  {string} version - version
 * @return {number}
 */
function getVersionPrecision(version: string) {
  return version.split('.').length
}

/**
 * get browser recommendation
 * @param {UserAgent} ua - userAgent
 * @return {string}
 */
function getBrowserRecommendation(ua: any) {
  const { name: browserName } = ua.browser
  const deviceName = ua.device
  const { name: osName } = ua.os

  if (deviceName === 'phone' || deviceName === 'tablet') {
    if (osName === 'iOS') {
      if (browserName === 'WeChat' || browserName === 'Safari') {
        return '请升级设备的系统版本。'
      }

      return '推荐使用最新版的谷歌浏览器或 QQ 浏览器，请到 App Store 下载。'
    }

    if (osName === 'Android' && browserName === 'WeChat') {
      return '请到应用商店升级微信至最新版。'
    }

    return '推荐使用最新版的谷歌浏览器或 QQ 浏览器，请到应用商店下载。'
  }

  let browserRecommendation = ''

  if (browserName === 'Safari') {
    browserRecommendation += `
      请升级你的操作系统版本
      <br />
      或者
      <br />
    `
  } else if (browserName !== 'InternetExplorer' && browserName !== 'Chrome') {
    browserRecommendation += `
      请升级你的<a style="color: #4482e8;margin-left: 5px;" target="_blank" href="https://www.baidu.com/s?wd=${browserName}"> ${browserName} 浏览器</a>
      <br />
      或者
      <br />
    `
  }

  browserRecommendation += `
    你可以试试<a style="color: #4482e8;margin-left: 5px;" target="_blank" href="https://www.baidu.com/s?wd=chrome">谷歌浏览器</a>。
    <br />
  `

  return browserRecommendation
}

/**
 * Get first matched item for a string
 */
export function getFirstMatch(regexp: RegExp, ua: string) {
  const match = ua.match(regexp)
  return (match && match.length > 0 && match[1]) || ''
}

/**
 * Get second matched item for a string
 */
export function getSecondMatch(regexp: RegExp, ua: string) {
  const match = ua.match(regexp)
  return (match && match.length > 1 && match[2]) || ''
}

/**
 * The browser is android but isn't like android
 */
export function isAndroid(ua: string) {
  const notLikeAndroid = !/like android/i.test(ua)
  const butAndroid = /android/i.test(ua)
  return notLikeAndroid && butAndroid
}

/**
 * Calculate browser version weight
 *
 * @example
 *   compareVersions('1.10.2.1',  '1.8.2.1.90')    // 1
 *   compareVersions('1.010.2.1', '1.09.2.1.90');  // 1
 *   compareVersions('1.10.2.1',  '1.10.2.1');     // 0
 *   compareVersions('1.10.2.1',  '1.0800.2');     // -1
 *   compareVersions('1.10.2.1',  '1.10',  true);  // 0
 *
 * @param {string} versionA versions versions to compare
 * @param {string} versionB versions versions to compare
 * @param {boolean} [isLoose] enable loose comparison
 * @return {number} comparison result: -1 when versionA is lower,
 * 1 when versionA is bigger, 0 when both equal
 */
export function compareVersions(versionA: string, versionB: string, isLoose = false): number {
  // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
  const versionAPrecision = getVersionPrecision(versionA)
  const versionBPrecision = getVersionPrecision(versionB)

  let precision = Math.max(versionAPrecision, versionBPrecision)
  let lastPrecision = 0

  const chunks = [versionA, versionB].map(version => {
    const delta = precision - getVersionPrecision(version)

    // 2) "9" -> "9.0" (for precision = 2)
    const _version = version + new Array(delta + 1).join('.0')

    // 3) "9.0" -> ["000000000", "000000009"]
    return _version
      .split('.')
      .map(chunk => new Array(20 - chunk.length).join('0') + chunk)
      .reverse()
  })

  // adjust precision for loose comparison
  if (isLoose) {
    lastPrecision = precision - Math.min(versionAPrecision, versionBPrecision)
  }

  // iterate in reverse order by reversed chunks array
  precision -= 1
  while (precision >= lastPrecision) {
    // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
    if (chunks[0][precision] > chunks[1][precision]) {
      return 1
    }

    if (chunks[0][precision] === chunks[1][precision]) {
      if (precision === lastPrecision) {
        // all version chunks are same
        return 0
      }

      precision -= 1
    } else if (chunks[0][precision] < chunks[1][precision]) {
      return -1
    }
  }

  return 0
}

/**
 * get the incompatible html string
 * @param {UserAgent} userAgent - ua
 * @return {string}
 */
export function getIncompatibleHtml(userAgent: any) {
  const desktopHtml = `
    <div style="font-weight: 500; position: relative; font-size: 14px;display: flex; width: 680px; margin: 120px auto;font-family: Helvetica Neue,Roboto,Arial,PingFang SC,Source Han Sans SC,Microsoft YaHei,SimSun,sans-serif;">
      <img style="position: absolute;z-index: -1; left: 0; top: 0; width: 371.5px; height: 268px;" src="http://seiue-chalkng.oss-cn-qingdao.aliyuncs.com/misc_assets/seiue_user_agent/incompatible_desktop.png"/>
      <div style="flex: 0 0 256px;"></div>
      <div style="text-align: left; flex: 1; color: #61646E;">
        <h1 style="font-size: 24px; line-height: 34px;">
          对不起，
          <br/>
          我们暂不支持您当前使用的浏览器。
        </h1>
        <div style="margin-top: 30px;">
          <p style="font-size: 16px; line-height: 22px">
            您当前的浏览器 ${`${userAgent.browser.name} ${userAgent.browser.version}`}
            <br />
            将会在系统中遇到兼容性问题。
          </p>
          <p style="font-weight: 400; font-size: 14px; line-height: 20px; margin-top: 15px">
            ${getBrowserRecommendation(userAgent)}
          </p>
        </div>
      </div>
    </div>
  `
  const mobileHtml = `
    <div style="font-weight: 500; color: #61646E;position: relative; font-size: 14px; padding: 35px; margin: 120px auto;font-family: Helvetica Neue,Roboto,Arial,PingFang SC,Source Han Sans SC,Microsoft YaHei,SimSun,sans-serif;">
      <div style="background-image: url(http://seiue-chalkng.oss-cn-qingdao.aliyuncs.com/misc_assets/seiue_user_agent/incompatible_mobile.png);background-repeat: no-repeat;background-size: 100%;padding: 80px 5%">
        <h1 style="font-size: 22px; line-height: 30px;">
          对不起，
          <br/>
          我们暂不支持您当前使用的浏览器。
        </h1>
        <div style="margin-top: 10px;">
          <p style="font-size: 13px; line-height: 18px">
            您当前的浏览器 ${`${userAgent.browser.name} ${userAgent.browser.version}`}
            <br />
            将会在系统中遇到兼容性问题。
          </p>
          <p style="font-size: 12px; line-height: 17px; margin-top: 23px">
            ${getBrowserRecommendation(userAgent)}
          </p>
        </div>
      </div>
    </div>
  `
  return userAgent.device === 'phone' ? mobileHtml : desktopHtml
}
