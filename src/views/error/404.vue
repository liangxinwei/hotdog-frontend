<template>
  <div class="box-flex-column-start page-404-container">
    <h1>页面不存在</h1>
    <p>SORRY!网页不见了...</p>
    <el-button type="primary" @click="goHome">
      回到首页
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'Page404',
    computed: {},
    mounted() {
      // this.goHome();
    },
    methods: {
      goHome() {
        this.$router.push('/');
      }
    }
  };
</script>

<style lang="less" scoped>
  .page-404-container {
    width: 100vw;
    height: 100vh;
    background-color: #2d3a4b;
    color: #fff;
    padding-top: 20vh;
  }
</style>
