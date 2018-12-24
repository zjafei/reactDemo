import { message } from 'antd';
import { reducers } from '@/utils/utils';
import services from '@/services';

const namespace = 'applicationDetail';
// const selectState = state => state[namespace];

export default {
  namespace,
  state: {
    machineId: null,
    machinePhotosList: [],
    detail: {
      auditor: {},
      photos: {
        machinePhoto: {},
        ownerIdCardPhoto: {},
        nameplatePhoto: {},
        mainEngineNoPhoto: {},
        certificationPhoto: {},
        invoicePhoto: {},
        drivingLicencePhoto: {},
      },
    },
  },

  reducers,

  effects: {
    *getDetail({ payload }, { call, put }) {
      const response = yield call(services.applicationDetail, payload);
      switch (response.code) {
        case 0:
          yield put({
            type: 'overrideStateProps',
            payload: {
              detail: response.result,
              machinePhotosList:
                response.result.photos !== undefined &&
                response.result.photos.machinePhoto !== undefined
                  ? Object.keys(response.result.photos.machinePhoto).map(
                      key => response.result.photos.machinePhoto[key].url
                    )
                  : [],
            },
          });
          break;
        default:
          message.warning('申请详情获取失败，请稍后重试！');
          break;
      }
    },
  },
};
