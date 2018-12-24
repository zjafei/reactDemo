import { message } from 'antd';
import { reducers } from '@/utils/utils';
import moment from 'moment';
import services from '@/services';

const namespace = 'app';
const selectState = state => state[namespace];

const defaultListParams = {
  page: 1,
};

const defaultFormData = {
  appKey: '',
  secret: '',
  expiredAt: moment(),
  description: '', // 非必填
};

export default {
  namespace,
  state: {
    isEdit: false,
    visible: false,
    appId: null,
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
      const response = yield call(services.appList, listParams);
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
          message.warning('应用列表获取失败，请稍后重试！');
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
    *appCreate({ payload }, { call, put }) {
      const { data, resetFields } = payload;
      const response = yield call(services.appCreate, data);
      switch (response.code) {
        case 0:
          resetFields();
          message.success('应用创建成功！');
          yield put({ type: 'resetListParams' });
          yield put({ type: 'closeForm' });
          break;
        default:
          message.warning('应用创建失败，请稍后重试！');
          break;
      }
    },
    *appEdit({ payload }, { call, put, select }) {
      const { appId } = yield select(selectState);
      const { data, resetFields } = payload;
      const response = yield call(services.appEdit, appId, data);

      switch (response.code) {
        case 0:
          resetFields();
          yield put({ type: 'getList' });
          message.success('应用编辑成功！');
          yield put({ type: 'closeForm' });
          break;
        default:
          message.warning('应用编辑失败，请稍后重试！');
          break;
      }
    },
  },
};
