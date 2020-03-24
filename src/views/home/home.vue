<template>
  <div class="container">
    hello
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        telephone: '',
        password: ''
      };
    },
    watch: {},
    methods: {}
  };
</script>

<style scoped lang="less">
  .container {
    color: var(--text-color-normal);
    display: flex;
    justify-content: center;
    padding-top: 30px;
    font-size: 30px;
  }
</style>
