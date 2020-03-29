<template>
  <div class="has-box-tab container">
    <div class="flex-row-center">
      order
    </div>
    <box-tab tab="order" />
  </div>
</template>

<script>
  export default {
    name: 'Order',
    data() {
      return {
      };
    },
    watch: {},
    async mounted() {
    },
    methods: {}
  };
</script>

<style scoped lang="less">
  .container {
    color: var(--text-color-normal);
  }
</style>
