import { defineStore } from 'pinia';
import { TOKEN_NAME } from '@/config/global';
import { store } from '@/store';
import request from '@/utils/request';

// type UserType = {
//   userId: number;
//   username: string;
//   avatar: string;
//   gender: number;
//   phone: string;
//   email: string;
//   state: number;
//   permission: number;
//   nickname: string;
//   description: string;
// };
// interface LoginResponse {
//   data: UserType;
//   code: number;
//   message: string;
//   description: string;
// }

const InitUserInfo = {
  userId: 0,
  username: '',
  avatar: '',
  gender: 0,
  phone: '',
  email: '',
  nickname: '',
  description: '',
};
const InitMessage = {
  roles: [],
  message: '',
  description: '',
};

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME) || 'main_token', // 默认token不走权限
    userInfo: InitUserInfo,
    msg: InitMessage,
  }),
  // 开启持久化 浏览器刷新后页面数据会丢失
  persist: {
    enabled: true, // 启用
    strategies: [
      // storage 可选localStorage或sessionStorage(默认)
      // paths 给指定数据持久化
      { key: 'user', paths: ['token', 'userInfo'] },
    ],
  },
  getters: {
    roles: (state) => {
      return state.msg?.roles;
    },
    message: (state) => {
      return state.msg?.message;
    },
    description: (state) => {
      return state.msg?.description;
    },
    users: (state) => {
      return state.userInfo;
    },
  },
  actions: {
    async login(userInfo: Record<string, unknown>) {
      const Login = async (userInfo: Record<string, unknown>) => {
        // 登录请求流程
        return request.post('/api/logins/login', userInfo);
      };
      const { data } = await Login(userInfo);
      // 权限 data.permission === 1
      if (data.code === 10001 && data.data.permission === 1) {
        this.token = 'main_token';
        this.msg.message = data.message;
        this.msg.description = data.description;
        this.userInfo = data.data;
      } else {
        throw data;
      }
    },
    async getUserInfo() {
      const RemoteUserInfo = async (token: string) => {
        if (token === 'main_token') {
          return {
            roles: ['all'],
          };
        }
        return {
          roles: ['UserIndex', 'DashboardBase', 'login'],
        };
      };
      const roles = await RemoteUserInfo(this.token);
      this.msg = roles;
    },
    async logout() {
      localStorage.removeItem(TOKEN_NAME);
      this.token = '';
      this.userInfo = InitUserInfo;
      this.msg = InitMessage;
    },
    async removeToken() {
      this.token = '';
    },
  },
});

export function getUserStore() {
  return useUserStore(store);
}
