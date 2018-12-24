import { reducers } from '@/utils/utils';
import services from '@/services';

const namespace = 'global';
// const selectState = state => state[namespace];

// select数据源元素的适配器
const selectAdapter = {
  app(row) {
    return { itemCode: row.id, itemName: row.appKey };
  },
  officer(row) {
    return { itemCode: row.id, itemName: row.username };
  },
};

export default {
  namespace,
  reducers,

  state: {
    collapsed: false,
    notices: [],
    selectList: {},
  },

  effects: {
    *changeLayoutCollapsed({ payload }, { put }) {
      yield put({
        type: 'overrideStateProps',
        payload: {
          collapsed: payload,
        },
      });
    },

    *getSelectData({ payload }, { put, call }) {
      const response = yield call(services[`${payload}Select`]);
      switch (response.code) {
        case 0:
          yield put({
            type: 'updateStateProps',
            payload: {
              name: 'selectList',
              value: {
                [payload]: response.result.data.map(selectAdapter[payload]),
              },
            },
          });
          break;
        default:
          message.warning('数据获取失败，请稍后重试！');
          break;
      }
    },
  },
};
