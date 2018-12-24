import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { reducers } from '@/utils/utils';
import services from '@/services';

const namespace = 'login';
// const selectState = state => state[namespace];

export default {
  namespace,
  state: {},

  reducers,

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(services.login, payload);
      switch (response.code) {
        case 0:
          // todo 自动登陆
          // if (payload.autoLogin === true) {
          //   window.localStorage.setItem('xAuthToken', response.result['X-Auth-Token']);
          // }
          window.localStorage.setItem('xAuthToken', response.result['X-Auth-Token']);
          yield put(
            routerRedux.push({
              pathname: '/',
            })
          );
          break;
        case 420:
          message.warning('账号或密码错误！');
          break;
        default:
          message.warning('登陆失败，请稍后重试！');
          break;
      }
    },
  },
};
