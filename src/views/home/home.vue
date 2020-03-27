<template>
  <div class="container">
    <h1 style="text-align: center; margin: 20px 0;">
      hello
    </h1>
    <h2 style="text-align: center; margin: 20px 0;">
      test webhooks
    </h2>
    <div style="padding: 15px;">
      <div>测试数据：</div>
      <div>{{ testData }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        testData: ''
      };
    },
    watch: {},
    async mounted() {
      const res = await this.$http.get('/v1/list');
      console.log(res);
      this.testData = JSON.stringify(res);
    },
    methods: {}
  };
</script>

<style scoped lang="less">
  .container {
    color: var(--text-color-normal);
  }
</style>
