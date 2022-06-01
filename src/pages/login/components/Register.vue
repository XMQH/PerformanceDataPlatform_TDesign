<template>
  <t-form
    ref="form"
    :class="['item-container', `register-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type == 'userAccount'">
      <t-form-item name="userAccount">
        <t-input v-model="formData.userAccount" :maxlength="11" size="large" placeholder="请输入您的帐号">
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>
    </template>

    <t-form-item name="password">
      <t-input
        v-model="formData.password"
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

    <t-form-item name="checkPassword">
      <t-input
        v-model="formData.checkPassword"
        size="large"
        :type="showPsw ? 'text' : 'password'"
        clearable
        placeholder="请再次输入登录密码"
      >
        <template #prefix-icon>
          <t-icon name="lock-on" />
        </template>
        <template #suffix-icon>
          <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
        </template>
      </t-input>
    </t-form-item>

    <t-form-item class="check-container" name="checked">
      <t-checkbox v-model="formData.checked">我已阅读并同意 </t-checkbox> <span>用户 服务协议</span> 和
      <span>用户 隐私声明</span>
    </t-form-item>

    <t-form-item>
      <t-button block size="large" type="submit"> 注册 </t-button>
    </t-form-item>
  </t-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

const INITIAL_DATA = {
  userAccount: '',
  password: '',
  checkPassword: '',
  checked: false,
};
// 校验两次密码输入是否一致
const rePassword = (val) =>
  new Promise((resolve) => {
    const timer = setTimeout(() => {
      // eslint-disable-next-line no-use-before-define
      resolve(formData.value.password === val);
      clearTimeout(timer);
    });
  });

// 校验账号输入框不能有特殊字符
// eslint-disable-next-line consistent-return
const accountValidator = (val) => {
  // const validPattern = "[/`~!@#$%^&*()+=|{}':;',\\[\\].<>?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";
  const replace = val.replace(/[\u4e00-\u9fa5/\s+/]|[^a-zA-Z0-9\u4E00-\u9FA5]/g, '');
  if (!replace) {
    return { result: false, message: '只允许输入数字、字母！', type: 'error' };
  }
  return { result: true };
};

const FORM_RULES = {
  userAccount: [
    { required: true, message: '帐号必填！', type: 'error' },
    { validator: accountValidator },
    { min: 4, message: '帐号需大于4位！', type: 'error' },
    { max: 10, message: '帐号需小于10位！', type: 'error' },
  ],
  password: [
    { required: true, message: '密码必填！', type: 'error' },
    { min: 4, max: 16, message: '密码需大于4位小于16位！', type: 'error' },
  ],
  checkPassword: [
    { required: true, message: '密码必填！', type: 'error' },
    { min: 4, message: '帐号需大于4位！', type: 'error' },
    { max: 10, message: '帐号需小于10位！', type: 'error' },
    { validator: rePassword, message: '两次密码输入不一致！', type: 'error' },
  ],
};

const type = ref('userAccount');
const form = ref();
const formData = ref({ ...INITIAL_DATA });
const showPsw = ref(false);
const emit = defineEmits(['registerSuccess']);

const onSubmit = ({ validateResult }) => {
  if (validateResult === true) {
    if (!formData.value.checked) {
      MessagePlugin.error('请同意用户服务协议和用户 隐私声明');
      return;
    }
    MessagePlugin.success('注册成功');
    emit('registerSuccess');
  }
};
</script>

<style lang="less" scoped>
@import url('../index.less');
</style>
