import { defineStore } from 'pinia';
import { TOKEN_NAME } from '@/config/global';
import { store } from '@/store';
import request from '@/utils/request';

const InitUserInfo = {
  roles: [],
  msg: '',
  // userId: 0,
  // username: '',
  // avatar: '',
  // gender: 0,
  // phone: '',
  // email: '',
  // nickname: '',
  // description: '',
};

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME) || 'main_token', // 默认token不走权限
    userInfo: InitUserInfo,
  }),
  getters: {
    roles: (state) => {
      return state.userInfo?.roles;
    },
    message: (state) => {
      return state.userInfo?.msg;
    },
    // userId: (state) => {
    //   return state.userInfo?.userId;
    // },
    // username: (state) => {
    //   return state.userInfo?.username;
    // },
    // avatar: (state) => {
    //   return state.userInfo?.avatar;
    // },
    // gender: (state) => {
    //   return state.userInfo?.gender;
    // },
    // phone: (state) => {
    //   return state.userInfo?.phone;
    // },
    // email: (state) => {
    //   return state.userInfo?.email;
    // },
    // nickname: (state) => {
    //   return state.userInfo?.nickname;
    // },
    // description: (state) => {
    //   return state.userInfo?.description;
    // },
  },
  actions: {
    async login(userInfo: Record<string, unknown>) {
      const Login = async (userInfo: Record<string, unknown>) => {
        // 登录请求流程
        return request.post('/api/logins/login', userInfo);
      };
      const res = await Login(userInfo);
      const { data } = res;
      // 权限 data.permission === 1
      if (data.code === 10001 && data.data.permission === 1) {
        this.token = 'main_token';
      } else {
        throw res;
      }
    },
    async getUserInfo() {
      const RemoteUserInfo = async (token: string) => {
        if (token === 'main_token') {
          return {
            // 需添加user信息
            roles: ['all'],
          };
        }
        return {
          roles: ['UserIndex', 'DashboardBase', 'login'],
        };
      };
      const res = await RemoteUserInfo(this.token);
      this.userInfo = res;
    },
    async logout() {
      localStorage.removeItem(TOKEN_NAME);
      this.token = '';
      this.userInfo = InitUserInfo;
    },
    async removeToken() {
      this.token = '';
    },
  },
});

export function getUserStore() {
  return useUserStore(store);
}
