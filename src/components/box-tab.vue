<template>
  <div class="tab-container">
    <van-tabbar v-model="activeTab" @change="onChange">
      <van-tabbar-item name="home" icon="home-o">
        首页
      </van-tabbar-item>
      <van-tabbar-item name="order" icon="orders-o">
        订单
      </van-tabbar-item>
      <van-tabbar-item name="my" icon="user-circle-o">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: 'BoxTab',
    props: {
      tab: {
        type: String,
        default: 'home'
      }
    },
    data() {
      return {
        activeTab: ''
      };
    },
    watch: {
      tab(val) {
        this.activeTab = val;
      }
    },
    mounted() {
    },
    methods: {
      onChange(tab) {
        this.activeTab = tab;
        let url = '';
        switch (tab) {
          case 'home':
            url = '/home/index';
            break;
          case 'order':
            url = '/order/index';
            break;
          case 'my':
            url = '/my/index';
            break;
          default:
            break;
        }
        if (!url) return;
        this.$router.push(url);
      }
    }
  };
</script>

<style scoped lang="less">
  .tab-container {
    color: var(--text-color-normal);
  }
</style>
