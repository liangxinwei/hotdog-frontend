// import Vue from 'vue';
// import store from '@/store/store';
// import user from '@/store/module/user';
// import http from '@/store/module/http';
import {getRandomKey, getUrlSearchParameter} from './index';
// import axiosInstance from './request';
// import Url from './url';

const APP_ID = '';

const DEFAULT_DATA = {
  appId: APP_ID,
  apiList: [
    'checkJsApi',
    'closeWindow',
    'hideAllNonBaseMenuItem'
  ],
  errorType: [
    {code: '1', msg: '分享成功'},
    {code: '2', msg: '微信客户端版本过低，请升级最新版本'},
    {code: '3', msg: '获取接口的签名失效，请重新调用方法获取API授权签名'},
    {code: '4', msg: '微信分享失败，请重新分享'},
    {code: '5', msg: '接口访问失败'},
    {code: '6', msg: 'jsApi配置成功'}
  ]
};

/**
 * 微信 api 全局管理器
 */
let instance;

class WeChat {
  constructor() {
    if (!instance) {
      instance = this;
    }
    this.hasInit = false;
    return instance;
  }

  init() {
    return new Promise(async (resolve, reject) => {
      if (this.hasInit) {
        resolve({msg: 'success'});
        return;
      }
      try {
        // const config = await axiosInstance.post(Url.SIGNATURE, {url: location.origin});
        const config = {};
        const registerData = {
          debug: false,
          appId: DEFAULT_DATA.appId,
          timestamp: config.timestamp,
          nonceStr: config.noncestr,
          signature: config.signature,
          jsApiList: DEFAULT_DATA.apiList
        };
        wx.config(registerData);
        wx.ready(() => {
          console.log('wx.ready');
          wx.hideAllNonBaseMenuItem && wx.hideAllNonBaseMenuItem();
          if (!localStorage.getItem('userUnionId')) {
            closeWindow();
            throw new Error('unionid is null');
          }
          this.hasInit = true;
          resolve({msg: 'success'});
        });
        wx.error(res => {
          wx.hideAllNonBaseMenuItem && wx.hideAllNonBaseMenuItem();
          // Vue.$toast('请退出去重新进入');
          // closeWindow();
          // throw res;
        });
      } catch (e) {
        throw e;
      }
    });
  }
}

function closeWindow() {
  typeof wx !== 'undefined' && wx.closeWindow && wx.closeWindow();
}

/**
 * 获取 code
 */
function getCode() {
  const url = encodeURIComponent(location.href);
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&connect_redirect=1&state=${getRandomKey()}#wechat_redirect`;
}

/**
 * 获取 user unionId
 */
function getUnionId() {
  return new Promise(async (resolve, reject) => {
    const existedUnionId = localStorage.getItem('userUnionId');
    if (existedUnionId) {
      console.log('缓存中的 onion_id:', existedUnionId, ', 不发请求');
      // http.actions.setLoading(store, {status: false});
      // user.actions.setOpenId(store, existedUnionId);
      resolve({msg: 'success'});
      return;
    }
    try {
      const code = getUrlSearchParameter().code;
      console.log('code:', code);
      if (code) {
        // const result = await axiosInstance.get(Url.USER_INFO, {params: {code}}).catch(e => {
        //   throw e;
        // });
        // result.telephone && user.actions.setTelephoneNumber(store, result.telephone);
        // result.openid && user.actions.setOpenId(store, result.openid);
        // result.unionid && user.actions.setUnionId(store, result.unionid);
        // result.nickname && user.actions.setNickname(store, result.nickname);
        // result.headimgurl && user.actions.setHeadImgUrl(store, result.headimgurl);
        resolve({msg: 'success'});
      } else {
        console.log('没有 code，微信即将重定向···');
        getCode();
      }
    } catch (e) {
      console.error('getUnionId', e);
      // Vue.$toast('您的授权信息有误，请退出之后重新进入');
      // closeWindow();
      throw e;
    }
  });
}

export {
  WeChat,
  getUnionId,
  closeWindow
};
