import Vue from 'vue';
import DayJS from 'dayjs';
import Vant from 'vant';
import 'vant/lib/index.css';
import App from './App';
import store from './store';
import router from './router';
import * as filters from './filters';
import axios from './utils/request';
import BoxTab from './components/box-tab';

Vue.use(Vant);
Vue.component('box-tab', BoxTab);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

DayJS.prototype.boxFormat = function () {
  return this.format('YYYY-MM-DD');
};


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
