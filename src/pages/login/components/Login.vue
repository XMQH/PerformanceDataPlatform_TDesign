<template>
  <t-form
    ref="form"
    :class="['item-container', `login-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type == 'password'">
      <t-form-item name="userAccount">
        <t-input v-model="formData.userAccount" size="large" placeholder="请输入账号">
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="userPassword">
        <t-input
          v-model="formData.userPassword"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          placeholder="请输入登录密码"
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
          <template #suffix-icon>
            <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
          </template>
        </t-input>
      </t-form-item>

      <!--      <div class="check-container remember-pwd">-->
      <!--        <t-checkbox>记住账号</t-checkbox>-->
      <!--        <span class="tip">忘记账号？</span>-->
      <!--      </div>-->
    </template>
    <t-form-item v-if="type !== 'qrcode'" class="btn-container">
      <t-button block size="large" type="submit"> 登录 </t-button>
    </t-form-item>
  </t-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { MessagePlugin } from 'tdesign-vue-next';
import { useUserStore } from '@/store';

const userStore = useUserStore();

const INITIAL_DATA = {
  userAccount: 'admin',
  userPassword: '123456',
};

const FORM_RULES = {
  userAccount: [
    { required: true, message: '账号必填', type: 'error' },
    { min: 4, message: '帐号需大于4位', type: 'error' },
    { max: 10, message: '帐号需小于10位', type: 'error' },
  ],
  userPassword: [
    { required: true, message: '密码必填', type: 'error' },
    { min: 4, message: '帐号需大于4位', type: 'error' },
    { max: 10, message: '帐号需小于10位', type: 'error' },
  ],
};

const type = ref('password');
const formData = ref({ ...INITIAL_DATA });
const showPsw = ref(false);
const router = useRouter();

console.log(formData);
const onSubmit = async ({ validateResult }) => {
  if (validateResult === true) {
    try {
      await userStore.login(formData.value);
      MessagePlugin.success('登录成功');
      router.push({
        path: '/dashboard/base',
      });
    } catch (e) {
      MessagePlugin.error(e.message);
    }
  }
};
</script>

<style lang="less" scoped>
@import url('../index.less');
</style>
