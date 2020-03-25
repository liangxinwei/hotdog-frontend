/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}

/**
 * 获取 URL 的 search 参数值
 */
export function getUrlSearchParameter() {
  const search = window.location.search.replace('?', '');
  const searchList = search.split('&');
  let searchObj = {};
  searchList.length > 0 && searchList.forEach(v => {
    const list = v.split('=');
    if (list.length === 2) {
      searchObj[list[0]] = list[1];
    }
  });
  return searchObj;
}

/**
 * 获取 hash 中的参数
 */
export function getURLHashParameter() {
  window.location.hash = window.location.hash.replace('#//', '#/');
  const hash = window.location.hash || '';
  const hashArray = hash.split('?');
  const hashSearchParamStr = hashArray[1];
  let hashObj = {};
  hashSearchParamStr && hashSearchParamStr.split('&').forEach(v => {
    const list = v.split('=');
    if (list.length === 2) {
      hashObj[list[0]] = list[1];
    }
  });
  return hashObj;
}

/**
 * 生成模拟的 uuid
 */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * 生成唯一的 key
 */
export function getRandomKey(len = 6, radix = 36) {
  len = Object.prototype.toString.call(len) === '[object Number]' ? len : 2;
  len = Math.abs(len) || 6;
  radix = radix < 2 ? 2 : radix;
  radix = radix > 36 ? 35 : radix;
  return Math.random().toString(radix).substr(-len);
}
