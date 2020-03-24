<template>
  <div class="flex-column wx-login-view">
    <template v-if="status === 'success'">
      <i class="el-icon-check" style="font-size: 150px; color: #52c41a" />
      <div style="font-size: 18px;">
        扫码登录成功
      </div>
    </template>
    <template v-else>
      <h2 class="title">
        您确定要登录PMS吗？
      </h2>
      <mt-button type="primary" @click="handleLogin">
        登录
      </mt-button>
      <mt-button style="margin-top: 50px;" @click="handleCancel">
        取消
      </mt-button>
      <mt-button v-if="showDangerBtn" type="danger" @click="handleClear">
        清除数据并重新扫码登录
      </mt-button>
    </template>
  </div>
</template>

<script>
  import {Url, Util} from '@/utils';
  import {WeChat, closeWindow} from '@/utils/wechat';

  export default {
    name: 'WXLogin',
    data() {
      return {
        status: '',
        showDangerBtn: false
      };
    },
    watch: {},
    async created() {
      // https://m-test.spacebox.fun/#/wx-login?token=9dc1a787-a087-4d3e-adf1-ebda637b6c8d
      const param = Util.getURLHashParameter();
      this.token = param.token;
    },
    mounted() {
    },
    methods: {
      async handleLogin() {
        if (!this.$parent.unionId) {
          console.error('wx-login unionId:', this.$parent.unionId);
          this.showDangerBtn = true;
          this.$toast('请点击红色的按钮并重新扫码登录');
          return;
        }
        const param = {
          unionid: this.$parent.unionId,
          token: this.token
        };
        await this.$http.post(Url.PMS_QR_CODE_LOGIN, param);
        this.$toast('扫码登录成功');
        this.status = 'success';
      },
      handleCancel() {
        closeWindow();
      },
      handleClear() {
        localStorage.clear();
        closeWindow();
      }
    }
  };
</script>

<style scoped lang="less">
  .wx-login-view {
    padding-top: 30px;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: var(--text-color-normal);
    }

    .mint-button--normal {
      width: 90%;
      margin-top: 20px;
    }
  }
</style>
