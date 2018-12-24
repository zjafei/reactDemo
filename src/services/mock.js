import pathToRegexp from 'path-to-regexp';
import mockjs from 'mockjs';

const body = {
  code: 0, // 状态码
  msg: '成功', // 消息 字符串 可以为空
  result: {
    // 返回结果 result 必须为对象
  },
};

export const hostList = {
  dev: 'api.demo.com',
  test: 'api.demo.com',
  pro: 'api.demo.com',
};
// /api/Internshipexp/internshipexpBy
// const serviceProvider = {
//   id: '@INTEGER()',
//   provinceId: '@INTEGER()',
//   customerServicePhone: regexps.phone,
//   status: '@PICK([0, 1])',
//   name: 'mock@CTITLE(10,16)',
//   province: '@province',
//   createTime: '@DATE("T")',
//   editTime: '@DATE("T")'
// };

const pic = {
  path: '/path/2.png',
  url: '@DATAIMAGE("400x225","mock image")',
};

const currentUser = {
  auth: [
    {
      authority: 'ROLE_admin',
    },
  ],
  username: '@NAME()',
};
const auditor = {
  'id|+1': 1,
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  username: 'mock @NAME()',
};

const officer = {
  'id|+1': 1,
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  username: 'mock @CNAME()',
  enabled: '@BOOLEAN()',
  type: '@PICK(["GENERAL", "HIGH"])',
};

const app = {
  'id|+1': 1,
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  appKey: 'mock @NAME()',
  secret: '@INTEGER(100000,999999)',
  expiredAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  description: '@CTITLE(2,10)',
  createdAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
};

const admin = {
  'id|+1': 'GLY@INTEGER(1000,9999)',
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  username: 'mock @NAME()',
  enabled: '@BOOLEAN()',
  type: '@PICK(["GENERAL", "FACTORY"])',
};

const application = {
  'id|+1': 1,
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  category: 'mock @CTITLE(2,10)',
  brandModel: '@CTITLE(2,10)',
  ownerName: '@NAME()',
  ownerPhone: '@INTEGER(13000000000,18999999999)',
  auditor,
  app: null,
  machineId: '@INTEGER()',
  remark: '@CTITLE()',
};

const machineLite = {
  'id|+1': 1,
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  category: 'mock @CTITLE(2,10)',
  brandModel: '@CTITLE(2,10)',
  ownerName: '@NAME()',
  ownerPhone: '@INTEGER(13000000000,18999999999)',
  auditor,
  app: '@TITLE()',
  machineId: '@INTEGER()',
  remark: '@CTITLE()',
  state: '@PICK(["VERIFIED", "BINDED", "COMPLETED"])',
  certDate: '@DATE("yyyy-MM-dd HH:mm:ss")',
  plateNum: '@INTEGER(100000,999999)',
};

const licenseList = {
  'id|+1': 1,
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  rfid: '@INTEGER(100000,999999)',
  plateNumber: '@INTEGER(100000,999999)',
  createBatchNo: '@INTEGER(100000,999999)',
  produceState: '@PICK(["ALLOCATED", "CREATED", "BINDED","VALID"])',
  machine,
  app: null,
};

const record = {
  'id|+1': 1,
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  ownerName: '@NAME()',
  ownerIdCardNumber: '@INTEGER(130000000000000000,190000000000000000)',
  confirmCode: '@INTEGER(000000,999999)',
  machineId: '@INTEGER()',
  contactPhone: '@INTEGER(13000000000,18999999999)',
};

const recordDetail = {
  id: 'JX@INTEGER(100000,999999)',
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  ownerName: '@NAME()',
  ownerIdCardNumber: '@INTEGER(130000000000000000,190000000000000000)',
  confirmCode: '@INTEGER(000000,999999)',
  machineId: '@INTEGER()',
  ownerPhone: '@INTEGER(13000000000,18999999999)',
};

const machinePhotoNoun = {
  rightSide: pic, // 正面
  side45: pic, // 正侧面45度
  side: pic, // 侧面
  backSide: pic, // 背面
};
const machinePhotos = {
  machinePhoto: machinePhotoNoun,
  ownerIdCardPhoto: pic,
  nameplatePhoto: pic,
  mainEngineNoPhoto: pic,
  minorEngineNoPhoto: pic,
  invoicePhoto: pic,
  certificationPhoto: pic,
  drivingLicencePhoto: pic,
};

const machine = {
  id: 'JX@INTEGER(100000,999999)',
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  category: 'mock @CTITLE(2,10)',
  brandModel: '@CTITLE(2,10)',
  ownerName: '@NAME()',
  ownerPhone: '@INTEGER(13000000000,18999999999)',
  auditor,
  app: '@TITLE()',
  machineId: '@INTEGER()',
  remark: '@CTITLE()',
  state: '@PICK(["VERIFIED", "BINDED", "COMPLETED"])',
  certDate: '@DATE("yyyy-MM-dd HH:mm:ss")',
  plateNum: '@INTEGER(100000,999999)',
  brand: '@CTITLE(2,10)',
  machineModel: '@CTITLE(2,10)',
  nameplateNumber: 'CAT@INTEGER(100000,999999)DEAKW@INTEGER(10000,99999)',
  weight: '@float(100,999)',
  size: '@float(100,999)',
  enginePower: '@float(100,999)',
  manufacturer: '@CTITLE(10,20)',
  productDate: '@DATE("yyyy-MM-dd HH:mm:ss")',
  purchaseDate: '@DATE("yyyy-MM-dd HH:mm:ss")',
  buyPrice: '@float(100000,999999)',
  ownerType: '@PICK(["PERSONAL", "PARTNER", "CORPORATE"])',
  contacts: '@NAME()',
  contactsPhone: '@INTEGER(13000000000,18999999999)',
  ownerIdCardNumber: '@INTEGER(321102198000000000,321102198999999999)',
  address: '@PROVINCE()@CITY()',
  mainEngineNo: 'CAT@INTEGER(100000,999999)',
  minorEngineNo: 'CAT@INTEGER(100000,999999)',
  photos: machinePhotos,
};

const applicationDetail = {
  id: 'JX@INTEGER(100000,999999)',
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  category: 'mock @CTITLE(2,10)',
  brand: '@CTITLE(2,10)',
  machineModel: '@CTITLE(2,10)',
  nameplateNumber: 'CAT@INTEGER(100000,999999)DEAKW@INTEGER(10000,99999)',
  weight: '@float(100,999)',
  size: '@float(100,999)',
  enginePower: '@float(100,999)',
  manufacturer: '@CTITLE(10,20)',
  productDate: '@DATE("yyyy-MM-dd HH:mm:ss")',
  purchaseDate: '@DATE("yyyy-MM-dd HH:mm:ss")',
  buyPrice: '@float(100000,999999)',
  ownerType: '@PICK(["PERSONAL", "PARTNER", "CORPORATE"])',
  ownerName: '@NAME()',
  contacts: '@NAME()',
  ownerIdCardNumber: '@INTEGER(321102198000000000,321102198999999999)',
  address: '@PROVINCE()@CITY()',
  mainEngineNo: 'CAT@INTEGER(100000,999999)',
  minorEngineNo: 'CAT@INTEGER(100000,999999)',
  remark: '@CTITLE()',
  photos: machinePhotos,
  auditor,
  app: '@TITLE()',
  contactsPhone: '@INTEGER(13000000000,18999999999)',
};
// const internship = {
//   'id|+1': 1,
//   companyname: 'mock GET @CTITLE(2,20)',
//   post: 'mock GET @CTITLE(2,10)',
//   starttime: 1537146097,
//   endtime: 1537146097,
//   jobcontent: 'mock GET @CTITLE(20,100)',
//   uid: 0,
// };
const mockRouterMap = {
  [hostList.dev]: [
    // {
    //   isMock: true, // 对应url的数据mock的开关
    //   method: 'get',
    //   router: '/account',
    //   result() {
    //     return {
    //       ...body,
    //       result: {
    //         name: 'Eric Ma',
    //         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    //         userid: '00000001',
    //         email: 'antdesign@alipay.com',
    //         signature: '海纳百川，有容乃大',
    //         title: '交互专家',
    //         group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    //         tags: [
    //           {
    //             key: '0',
    //             label: '很有想法的',
    //           },
    //           {
    //             key: '1',
    //             label: '专注设计',
    //           },
    //           {
    //             key: '2',
    //             label: '辣~',
    //           },
    //           {
    //             key: '3',
    //             label: '大长腿',
    //           },
    //           {
    //             key: '4',
    //             label: '川妹子',
    //           },
    //           {
    //             key: '5',
    //             label: '海纳百川',
    //           },
    //         ],
    //         notifyCount: 12,
    //         country: 'China',
    //         geographic: {
    //           province: {
    //             label: '浙江省',
    //             key: '330000',
    //           },
    //           city: {
    //             label: '杭州市',
    //             key: '330100',
    //           },
    //         },
    //         address: '西湖区工专路 77 号',
    //         phone: '0752-268888888',
    //       },
    //     };
    //   },
    // },
    {
      isMock: true,
      method: 'get',
      router: '/petition',
      result(params) {
        return {
          ...body,
          result: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [application],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/petition/:id',
      result() {
        return {
          ...body,
          result: applicationDetail,
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/machine',
      result(params) {
        return {
          ...body,
          result: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [machineLite],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/machine/:id',
      result() {
        return {
          ...body,
          result: machine,
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/plate',
      result(params) {
        return {
          ...body,
          result: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [licenseList],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/cert',
      result(params) {
        return {
          ...body,
          result: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [record],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/cert/:id',
      result() {
        return {
          ...body,
          result: recordDetail,
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/auditor',
      result(params) {
        return {
          ...body,
          result: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [officer],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/auditor',
      result(params) {
        return {
          ...body,
          result: {
            'id|+1': 1,
            updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
            enabled: '@BOOLEAN()',
            ...params,
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/auditor/listSelect',
      result() {
        return {
          ...body,
          result: {
            totalPageCount: 1,
            totalItemCount: 1,
            'data|1-10': [officer],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/auditor/:id',
      result(params) {
        return {
          ...body,
          result: {
            'id|+1': 1,
            updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
            enabled: '@BOOLEAN()',
            ...params,
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/auditor/enable/:id',
      result() {
        return {
          ...body,
          result: {
            enabled: true,
            username: 'mock @NAME()',
            type: '@PICK(["GENERAL", "HIGH"])',
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/auditor/disable/:id',
      result() {
        return {
          ...body,
          result: {
            enabled: false,
            username: 'mock @NAME()',
            type: '@PICK(["GENERAL", "HIGH"])',
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/app',
      result(params) {
        return {
          ...body,
          result: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [app],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/app',
      result(params) {
        return {
          ...body,
          result: {
            'id|+1': 1,
            createdAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
            updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
            ...params,
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/app/listSelect',
      result() {
        return {
          ...body,
          result: {
            totalPageCount: 1,
            totalItemCount: 1,
            'data|1-10': [app],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/app/:id',
      result(params) {
        return {
          ...body,
          result: {
            'id|+1': 1,
            createdAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
            updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
            ...params,
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/admin',
      result(params) {
        return {
          ...body,
          result: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [admin],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/admin',
      result(params) {
        return {
          ...body,
          result: {
            'id|+1': 'GLY@INTEGER(1000,9999)',
            updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
            enabled: '@BOOLEAN()',
            ...params,
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/admin/home',
      result() {
        return {
          ...body,
          result: {
            ...currentUser,
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/admin/login',
      result() {
        return {
          ...body,
          result: {
            'X-Auth-Token': 'd750012e-d037-4df0-b0b8-467f7de9d7c1',
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/admin/:id',
      result(params) {
        return {
          ...body,
          result: {
            'id|+1': 'GLY@INTEGER(1000,9999)',
            updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
            enabled: '@BOOLEAN()',
            ...params,
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/admin/enable/:id',
      result() {
        return {
          ...body,
          result: {
            enabled: true,
            username: 'mock @NAME()',
            type: '@PICK(["GENERAL", "FACTORY"])',
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/admin/disable/:id',
      result() {
        return {
          ...body,
          result: {
            enabled: false,
            username: 'mock @NAME()',
            type: '@PICK(["GENERAL", "FACTORY"])',
          },
        };
      },
    },
  ],
};

// host, version, url, params, methodStr
export const isMock = ({ url, method, params = {}, host = '', version = '' }) => {
  let hasMock = {
    isMock: false,
  };
  const path = version !== '' ? `/${version}url` : url;
  const matchList = [];
  if (mockRouterMap[host] !== undefined) {
    for (let i = 0; i < mockRouterMap[host].length; i++) {
      const routerObject = mockRouterMap[host][i];
      if (routerObject.method.toLowerCase() === method.toLowerCase()) {
        const match = pathToRegexp(routerObject.router).exec(path);
        if (match !== null) {
          if (match.length === 1) {
            // 精确匹配
            hasMock = { ...routerObject };
            hasMock.mock = mockjs.mock(routerObject.result(params));
            break;
          } else if (routerObject.isMock === true) {
            // 动态路由
            const hasMockTemp = { ...routerObject };
            hasMockTemp.mock = mockjs.mock(routerObject.result(params));
            matchList.push(hasMockTemp);
          }
        }
      }
    }
  }

  if (hasMock.method === undefined && matchList.length > 0) {
    return matchList[0];
  }
  return hasMock;
};
