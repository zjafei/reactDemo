import { message } from 'antd';
import { reducers } from '@/utils/utils';
import services from '@/services';

const namespace = 'recordDetail';
// const selectState = state => state[namespace];

export default {
  namespace,
  state: {
    recordId: null,
    detail: {},
  },

  reducers,

  effects: {
    *getDetail({ payload }, { call, put }) {
      const response = yield call(services.recordDetail, payload);
      switch (response.code) {
        case 0:
          yield put({
            type: 'overrideStateProps',
            payload: {
              detail: response.result,
            },
          });
          break;
        default:
          message.warning('备案详情获取失败，请稍后重试！');
          break;
      }
    },
  },
};
