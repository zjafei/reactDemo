import { message } from 'antd';
import { reducers } from '@/utils/utils';
import moment from 'moment';
import services from '@/services';

const namespace = 'rfid';
const selectState = state => state[namespace];

const defaultListParams = {
  page: 1,
};

const defaultFormData = {
  appKey: '',
  expiredAt: moment(),
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
      const response = yield call(services.rfidList, listParams);
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
          message.warning('RFID列表获取失败，请稍后重试！');
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
    *rfidCreate({ payload }, { call, put }) {
      const { data, resetFields } = payload;
      const response = yield call(services.rfidCreate, data);
      switch (response.code) {
        case 0:
          resetFields();
          message.success('RFID录入成功！');
          yield put({ type: 'resetListParams' });
          yield put({ type: 'closeForm' });
          break;
        default:
          message.warning('RFID录入失败，请稍后重试！');
          break;
      }
    },
  },
};
