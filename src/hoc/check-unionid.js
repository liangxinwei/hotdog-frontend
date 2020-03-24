import {mapActions, mapGetters} from 'vuex';
import {getUnionId, WeChat} from '@/utils/wechat';

/**
 * 校验 openId 是否为 null
 */
export default (component) => ({
  computed: {
    ...mapGetters(['unionId'])
  },
  props: component.props,
  render(h) {
    return h(component, {
      on: this.$listeners,
      attrs: this.$attrs,
      props: this.$props
    });
  },
  mounted() {
    this.requestUnionId();
  },
  methods: {
    ...mapActions(['setLoading']),
    async requestUnionId() {
      try {
        if (this.unionId) {
          console.log('local unionId:', this.unionId);
          this.afterRequestUnionId();
        } else {
          this.$toast('获取信息中···');
          await getUnionId();
          await new WeChat().init();
          this.afterRequestUnionId();
        }
      } catch (e) {
        console.error('check-unionid requestUnionId:', e);
      }
    },
    afterRequestUnionId() {
      // todo mounted 先于 子组件的 mounted 执行，所以不在 setTimeout 里执行的话，this.$children 获取不到
      setTimeout(() => {
        this.$children.forEach(v => {
          if (!v.requestData || Object.prototype.toString.call(v) !== '[object Function]') {
            console.warn('用 checkUnionId 装饰的页面中，如果需要一进入页面就立即发送带 union_id 的请求，那么 methods 中必须有 requestData function 用于获取初始数据，否则，请忽略此条。');
          } else {
            v.requestData();
          }
        });
      }, 200);
    }
  }
});
