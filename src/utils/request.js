import axios from 'axios';
import Url from '@/utils/url';

const service = axios.create({
  baseURL: Url.API_BASE_URL,
  withCredentials: true,
  timeout: 15000
});
const codeMessage = {
  400: '发出的请求有错误，服务器没有进行操作。',
  403: '服务器拒绝访问！',
  404: '请求资源的路径不存在！',
  406: '请求的格式不可得。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

// 请求拦截
service.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});
// 回应拦截
service.interceptors.response.use((response) => {
  const res = response.data;
  if (res.status === 200 || res.status === true) {
    return Promise.resolve(res.data || res);
  }
  return Promise.reject(res);
}, (error) => {
  return Promise.reject(error);
});

export default service;
