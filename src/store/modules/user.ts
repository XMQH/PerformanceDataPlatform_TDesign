import { defineStore } from 'pinia';
import { TOKEN_NAME } from '@/config/global';
import { store } from '@/store';
import request from '@/utils/request';

const InitUserInfo = {
  roles: [],
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
  },
  actions: {
    async login(userInfo: Record<string, unknown>) {
      const Login = async (userInfo: Record<string, unknown>) => {
        // 登录请求流程
        // eslint-disable-next-line consistent-return
        return request.post('/api/logins/login', userInfo);
      };
      const res = await Login(userInfo);
      const { data } = res;
      // 权限
      if (data.code === 10001 && data.permission === 1) {
        this.token = 'main_token';
      } else {
        throw res;
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
