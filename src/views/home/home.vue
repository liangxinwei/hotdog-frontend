<template>
  <div class="has-box-tab container">
    <van-list
      v-model="loading"
      :finished="requestFinished"
      finished-text="没有更多了"
    >
      <van-cell v-for="(item) in users" :key="item.uid" :title="item.name">
        <span>{{ item.gender === 1 ? '男' : '女' }} {{ item.age }}岁</span>
      </van-cell>
    </van-list>
    <box-tab tab="home" />
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        requestFinished: true,
        loading: true,
        users: ''
      };
    },
    watch: {},
    async mounted() {
      const res = await this.$http.get('/v1/list');
      this.loading = false;
      this.users = res;
    },
    methods: {}
  };
</script>

<style scoped lang="less">
  .container {
    color: var(--text-color-normal);
  }
</style>
