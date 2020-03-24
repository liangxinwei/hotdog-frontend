import {checkString} from './validate';

/**
 * 本地存储类，localStorage sessionStorage
 */
class Storage {
  /**
   * 设置值
   * @param key
   * @param value
   * @param type local：localStorage，其他：sessionStorage
   */
  static set(key, value = '', type = 'local') {
    if (!checkString(key)) {
      console.error('unexpected key, it should be String');
      return;
    }
    if (type === 'local') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * 获取值
   * @param key
   * @param type local：localStorage，其他：sessionStorage
   * @returns {*}
   */
  static get(key, type = 'local') {
    if (!checkString(key)) {
      console.error('unexpected key, it should be String');
      return;
    }
    let value;
    if (type === 'local') {
      value = localStorage.getItem(key);
    } else {
      value = sessionStorage.getItem(key);
    }
    if (!value || ['null', 'undefined'].includes(value)) return null;
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  /**
   * 删除值
   * @param key
   * @param type  local：localStorage，其他：sessionStorage
   */
  static clear(key, type = 'local') {
    if (!checkString(key)) {
      console.error('unexpected key, it should be String');
      return;
    }
    if (type === 'local') {
      key ? localStorage.removeItem(key) : localStorage.clear();
    } else {
      key ? sessionStorage.removeItem(key) : sessionStorage.clear();
    }
  }
}

export default Storage;
