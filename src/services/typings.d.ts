/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    userId: number;
    username: string;
    userAccount: string;
    avatar?: string;
    gender:number;
    phone: string;
    email: string;
    nickname: string;
    permission: number;
    status: number;
    description: string;
    createTime: Date;
  };

  // type LoginResult = {
  //   status?: string;
  //   type?: string;
  //   currentAuthority?: string;
  // };
  //
  // type RegisterResult = number;
  //
  // type PageParams = {
  //   current?: number;
  //   pageSize?: number;
  // };

  /**
   * 通用返回类
   */
  type BaseResponse<T> = {
    code: number,
    data: T,
    message: string,
    description: string,
  }

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
    planetCode?: string;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };


}
