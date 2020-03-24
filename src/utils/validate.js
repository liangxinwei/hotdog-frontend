/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  return str && str.length > 2;
}

/**
 * 检验密码是否合法
 * 规则：最少8位，包括至少1个大写字母，1个小写字母, 1个数字
 */
export function validatePassword(str = '') {
  // const regex = (/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/);
  // return regex.test(str);
  return !!str;
}

/**
 * 检测类型
 */
export function checkType(param) {
  return Object.prototype.toString.call(param);
}

export function checkString(param) {
  return param && checkType(param) === '[object String]';
}

export function checkArray(param) {
  return param && checkType(param) === '[object Array]';
}

export function checkObject(param) {
  return param && checkType(param) === '[object Object]';
}

export function checkNumber(param) {
  return param && checkType(param) === '[object Number]';
}

/**
 * 校验手机号
 */
export function validateCellPhoneNumber(tel) {
  return tel && /^1([3-9])\d{9}$/.test(tel.replace(/\s/g, ''));
}

/**
 * 校验固定电话
 */
export function validateFixedPhoneNumber(tel) {
  return tel && /^(([0]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(tel.replace(/\s/g, ''));
}

/**
 * 校验手机号和固定电话
 */
export function validatePhoneNumber(tel) {
  return tel && (validateCellPhoneNumber(tel) || validateFixedPhoneNumber(tel));
}
