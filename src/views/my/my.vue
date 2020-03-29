<template>
  <div class="has-box-tab my-container">
    <van-form @submit="onSubmit">
      <van-field
        v-model="name"
        name="name"
        label="姓名"
        placeholder="姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        v-model="age"
        type="digit"
        name="age"
        label="年龄"
        placeholder="年龄"
        max="120"
        :rules="[{ required: true, message: '请填写年龄' }]"
      />
      <van-field name="gender" label="性别">
        <template #input>
          <van-radio-group v-model="gender" direction="horizontal">
            <van-radio name="1">
              男
            </van-radio>
            <van-radio name="2">
              女
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <box-tab tab="my" />
  </div>
</template>

<script>
  export default {
    name: 'My',
    data() {
      return {
        name: '',
        age: null,
        gender: '1'
      };
    },
    watch: {},
    async mounted() {
    },
    methods: {
      async onSubmit(values) {
        await this.$http.post('/v1/list/add', values);
        this.$toast.success('添加成功');
        this.$router.push('/home/index');
      },
    }
  };
</script>

<style scoped lang="less">
  .my-container {
    padding-top: 15px;
    color: var(--text-color-normal);
  }
</style>
