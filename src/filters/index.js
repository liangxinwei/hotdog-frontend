/**
 * Upper case first char
 * @param string
 * @returns {string}
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * 0.85 -> 85.00%
 * @param num
 * @returns {string}
 */
export function formatPercent(num = 0) {
  return typeof num === 'number' && !isNaN(num) ? `${(num * 100).toFixed(2)}%` : num;
}

/**
 * 123456.23456 -> 123,456
 * @param num
 * @returns {string}
 */
export function formatNumber(num = 0) {
  return typeof num === 'number' && !isNaN(num) ? num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : num;
}

/**
 * 123456.23456 -> 123,456.23
 * @param num
 * @returns {string}
 */
export function formatDigit(num = 0) {
  return typeof num === 'number' && !isNaN(num) ? num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : num;
}
