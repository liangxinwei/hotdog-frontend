import Vue from 'vue';
import DayJS from 'dayjs';
import App from './App';
import store from './store';
import router from './router';
import * as filters from './filters';
import axios from './utils/request';

DayJS.prototype.boxFormat = function () {
  return this.format('YYYY-MM-DD');
};

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
