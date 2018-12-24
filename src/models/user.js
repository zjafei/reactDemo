import { message } from 'antd';
import { routerRedux } from 'dva/router';
import services from '@/services';
import { reducers } from '@/utils/utils';

const namespace = 'user';
// const selectState = state => state[namespace];
export default {
  namespace,
  reducers,
  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { put, call }) {
      const response = yield call(services.queryCurrentUser);
      switch (response.code) {
        case 0:
          yield put({
            type: 'overrideStateProps',
            payload: {
              currentUser: response.result,
            },
          });
          break;

        default:
          break;
      }
    },
    *logout(_, { call, put }) {
      const response = yield call(services.logout);
      switch (response.code) {
        case 0:
          window.localStorage.removeItem('xAuthToken');
          yield put(
            routerRedux.push({
              pathname: '/account/login',
            })
          );

          break;
        default:
          message.warning('退出登陆失败，请稍后重试！');
          break;
      }
    },
  },
};
