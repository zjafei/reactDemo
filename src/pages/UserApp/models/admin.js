import { message } from 'antd';
import { reducers } from '@/utils/utils';
import services from '@/services';

const namespace = 'admin';
const selectState = state => state[namespace];

const defaultListParams = {
  page: 1,
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
    adminId: null,
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
      const response = yield call(services.adminList, listParams);
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
          message.warning('管理员列表获取失败，请稍后重试！');
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
    *adminCreate({ payload }, { call, put }) {
      const { data, resetFields } = payload;
      const response = yield call(services.adminCreate, data);
      switch (response.code) {
        case 0:
          resetFields();
          message.success('管理员创建成功！');
          yield put({ type: 'resetListParams' });
          yield put({ type: 'closeForm' });
          break;
        default:
          message.warning('管理员创建失败，请稍后重试！');
          break;
      }
    },
    *adminEdit({ payload }, { call, put, select }) {
      const { adminId } = yield select(selectState);
      const { data, resetFields } = payload;
      const response = yield call(services.adminEdit, adminId, data);

      switch (response.code) {
        case 0:
          resetFields();
          yield put({ type: 'getList' });
          message.success('管理员编辑成功！');
          yield put({ type: 'closeForm' });
          break;
        default:
          message.warning('管理员编辑失败，请稍后重试！');
          break;
      }
    },
    *adminEnable({ payload }, { call, put, select }) {
      const {
        list: { data },
      } = yield select(selectState);
      const { adminId, index } = payload;
      const response = yield call(services.adminEnable, adminId);

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
          message.success(`管理员 ${response.result.username} 启用成功！`);
          break;
        default:
          message.warning('管理员启用失败，请稍后重试！');
          break;
      }
    },
    *adminDisable({ payload }, { call, put, select }) {
      const {
        list: { data },
      } = yield select(selectState);
      const { adminId, index } = payload;
      const response = yield call(services.adminDisable, adminId);

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
          message.success(`管理员 ${response.result.username} 停用成功！`);
          break;
        default:
          message.warning('管理员停用失败，请稍后重试！');
          break;
      }
    },
  },
};
