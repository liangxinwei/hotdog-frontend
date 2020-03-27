// 地址
let url = 'https://hotdog.liangxinwei.cn/';

if (location.hostname === 'localhost') {
  url = 'http://localhost:5000/';
}

export default {
  API_BASE_URL: url,
};
