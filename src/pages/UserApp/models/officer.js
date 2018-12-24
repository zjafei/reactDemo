import { message } from 'antd';
import { reducers } from '@/utils/utils';
import services from '@/services';

const namespace = 'officer';
const selectState = state => state[namespace];

const defaultListParams = {
  page: 1,
  id: '',
  username: '',
};

const defaultFormData = {
  username: '',
  password: '',
  type: 'GENERAL',
};

export default {
  namespace,
  state: {
    isEdit: false,
    visible: false,
    officerId: null,
    formData: {
      ...defaultFormData,
    },
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
      const response = yield call(services.officerList, listParams);
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
          message.warning('认证员列表获取失败，请稍后重试！');
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
    *openForm({ payload }, { put }) {
      yield put({
        type: 'overrideStateProps',
        payload: {
          visible: true,
          ...payload,
        },
      });
    },
    *closeForm(_, { put }) {
      yield put({
        type: 'overrideStateProps',
        payload: {
          visible: false,
          formData: {
            ...defaultFormData,
          },
        },
      });
    },
    *officerCreate({ payload }, { call, put }) {
      const { data, resetFields } = payload;
      const response = yield call(services.officerCreate, data);
      switch (response.code) {
        case 0:
          resetFields();
          message.success('认证员创建成功！');
          yield put({ type: 'resetListParams' });
          yield put({ type: 'closeForm' });
          break;
        default:
          message.warning('认证员创建失败，请稍后重试！');
          break;
      }
    },
    *officerEdit({ payload }, { call, put, select }) {
      const { officerId } = yield select(selectState);
      const { data, resetFields } = payload;
      const response = yield call(services.officerEdit, officerId, data);

      switch (response.code) {
        case 0:
          resetFields();
          yield put({ type: 'getList' });
          message.success('认证员编辑成功！');
          yield put({ type: 'closeForm' });
          break;
        default:
          message.warning('认证员编辑失败，请稍后重试！');
          break;
      }
    },
    *officerEnable({ payload }, { call, put, select }) {
      const {
        list: { data },
      } = yield select(selectState);
      const { officerId, index } = payload;
      const response = yield call(services.officerEnable, officerId);

      switch (response.code) {
        case 0:
          data[index] = { ...data[index], ...response.result };
          yield put({
            type: 'updateStateProps',
            payload: {
              name: 'list',
              value: {
                data,
              },
            },
          });
          message.success(`认证员 ${response.result.username} 启用成功！`);
          break;
        default:
          message.warning('认证员启用失败，请稍后重试！');
          break;
      }
    },
    *officerDisable({ payload }, { call, put, select }) {
      const {
        list: { data },
      } = yield select(selectState);
      const { officerId, index } = payload;
      const response = yield call(services.officerDisable, officerId);

      switch (response.code) {
        case 0:
          data[index] = { ...data[index], ...response.result };
          yield put({
            type: 'updateStateProps',
            payload: {
              name: 'list',
              value: {
                data,
              },
            },
          });
          message.success(`认证员 ${response.result.username} 停用成功！`);
          break;
        default:
          message.warning('认证员停用失败，请稍后重试！');
          break;
      }
    },
  },
};
