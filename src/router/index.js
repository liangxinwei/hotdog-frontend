import Vue from 'vue';
import Router from 'vue-router';
import {checkUnionId} from '@/hoc';

Vue.use(Router);

const dynamicImport = (path) => async (resolve) => {
  const module = await import(`../views/${path}`);
  resolve(module);
};

/**
 * 设置项：
 *
 * meta:
 *    title:                页面标题
 *    checkUnionId:         如果需要一进入页面就发请求并携带参数 unionid，则接入 checkUnionId
 *
 * 注意：以下的 component 为 dynamicImport 类型的，dynamicImport 的参数都有 ../pages/ 前缀，
 */
const routerList = [
  {
    path: '/',
    component: dynamicImport('home/home'),
    meta: {
      // needUnionId: true
    },
  },
  // 微信扫码登录PMS
  {
    path: '/wx-login',
    name: 'WXLogin',
    meta: {
      needUnionId: true
    },
    component: dynamicImport('login/wx-login')
  },
  // 404 模块
  {
    path: '*',
    name: 'Page404',
    component: dynamicImport('error/404'),
    meta: {}
  }
];

function machiningRouter(arr) {
  arr.forEach(v => {
    const needUnionId = (v.meta || {}).needUnionId === true;
    if (v.component && needUnionId) {
      v.component = checkUnionId(v.component);
    }
    if (!needUnionId && v.children) {
      machiningRouter(v.children);
    }
  });
}

machiningRouter(routerList);

const router = new Router({
  // mode: 'history',
  // base: '/',
  routes: routerList
});

router.beforeEach((to, from, next) => {
  // const metaData = to.meta || {};
  // !metaData.hidden && http.actions.setLoading(store, {status: true});
  // metaData.title && Util.setDocumentTitle(metaData.title);
  next();
});
router.afterEach(route => {
  // const metaData = route.meta || {};
  // !metaData.hidden && http.actions.setLoading(store, {status: false});
});

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
