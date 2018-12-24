import { message } from 'antd';
import { reducers } from '@/utils/utils';
import services from '@/services';

const namespace = 'machine';
const selectState = state => state[namespace];

const defaultListParams = {
  auditorId: null,
  appId: null,
  text: '',
  certState: null,
  page: 1,
};

export default {
  namespace,
  state: {
    listParams: {
      ...defaultListParams,
    },
    list: {
      data: [],
      totalItemCount: 0,
    },
  },

  reducers,

  effects: {
    *getList(_, { call, put, select }) {
      const { listParams } = yield select(selectState);
      const response = yield call(services.machineList, listParams);
      switch (response.code) {
        case 0:
          yield put({
            type: 'overrideStateProps',
            payload: {
              list: response.result,
            },
          });
          break;
        default:
          message.warning('机械列表获取失败，请稍后重试！');
          break;
      }
    },
    *changeListParams({ payload }, { put }) {
      yield put({
        type: 'updateStateProps',
        payload: {
          name: 'listParams',
          value: {
            ...payload,
          },
        },
      });
      yield put({
        type: 'getList',
      });
    },
    *resetListParams(_, { put }) {
      yield put({
        type: 'overrideStateProps',
        payload: {
          listParams: {
            ...defaultListParams,
          },
        },
      });
      yield put({
        type: 'getList',
      });
    },
  },
};
