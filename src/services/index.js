import axios from 'axios';
// import router from 'umi/router';
import { message } from 'antd';
import { isMock, hostList } from './mock';

const BASEURL = hostList[ENV];

axios.defaults.baseURL = BASEURL;
axios.defaults.timeout = 30000;
// axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    // Do something with request
    const con = { ...config };
    con.headers['X-Requested-With'] = 'XMLHttpRequest';
    con.headers['X-Auth-Token'] = window.localStorage.getItem('xAuthToken') || '';
    return con;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 300) {
      switch (response.data.code) {
        case 200:
          message.warning('没有权限');
          break;
        default:
          return response;
      }
    } else {
      Promise.reject(new Error());
    }
  },
  // Do something with response
  error => {
    message.error('网络错误，请稍后重试！！');
    Promise.reject(error);
  }
  // tools.toast({
  //   position: 'top',
  //   message: '网络错误，请稍后重试！！'
  // });
  // tools.hideProgress();
);

function delEmptyAttr(arg) {
  let rObj = {};
  if (arg && typeof arg === 'object' && !Array.isArray(arg)) {
    const params = Object.assign({}, arg);
    Object.keys(arg).forEach(key => {
      if (
        arg[key] === '' ||
        arg[key] === null ||
        arg[key] === undefined ||
        (Array.isArray(arg[key]) && arg[key].length === 0) ||
        (typeof arg[key] === 'object' && arg[key].length === undefined)
      ) {
        delete params[key];
      }
    });
    rObj = params;
  }

  return rObj;
}

function request({ host = '', version = '', url, params, method = 'get' }) {
  let urlStr = url;
  const methodStr = method.toLowerCase();
  const mock = isMock({ host, version, url, params, method: methodStr });
  const tk = new Date().getTime();

  if (ENV === 'dev' && mock.isMock === true) {
    // console.log(mock.router, mock);
    return new Promise(resolve => {
      resolve(mock.mock);
    });
  }

  return new Promise(resolve => {
    let data = params;
    if (methodStr === 'get') {
      data = { params: { ...delEmptyAttr(params), _: tk } };
    } else {
      urlStr += `?_=${tk}`;
    }
    axios[methodStr](host === '' ? urlStr : `http://${host}${urlStr}`, data)
      .then(response => {
        // TODO 这里做数据的验证
        resolve(response.data);
      })
      .catch(error => Promise.reject(error));
  });
}

export default {
  demoPost(params) {
    return request({
      host: BASEURL,
      url: '/demo',
      method: 'post',
      params,
    });
  },
  queryCurrentUser() {
    return request({
      host: BASEURL,
      url: '/admin/home',
    });
  },
  fakeAccountLogin(params) {
    return request({
      host: BASEURL,
      url: '/api/login/account',
      method: 'POST',
      params,
    });
  },
  fakeRegister(params) {
    return request({
      host: BASEURL,
      url: '/api/register',
      method: 'POST',
      params,
    });
  },
  // usersList(params) {
  //   return request({
  //     host: BASEURL,
  //     url: '/admin/home',
  //     params,
  //   });
  // },
  login(params) {
    return request({
      host: BASEURL,
      url: '/admin/login',
      method: 'POST',
      params,
    });
  },
  logout() {
    return request({
      host: BASEURL,
      url: '/admin/logout',
    });
  },
  machineList(params) {
    return request({
      host: BASEURL,
      url: '/machine',
      params: {
        page: 1,
        size: 10,
        ...params,
      },
    });
  },
  machineDetail(id) {
    return request({
      host: BASEURL,
      url: `/machine/${id}`,
    });
  },
  officerList(params) {
    return request({
      host: BASEURL,
      url: '/auditor',
      params: {
        page: 1,
        size: 10,
        ...params,
      },
    });
  },
  officerCreate(params) {
    return request({
      host: BASEURL,
      url: '/auditor',
      method: 'post',
      params,
    });
  },
  officerEdit(id, params) {
    return request({
      host: BASEURL,
      url: `/auditor/${id}`,
      method: 'post',
      params,
    });
  },
  officerEnable(id) {
    return request({
      host: BASEURL,
      url: `/auditor/enable/${id}`,
      method: 'post',
    });
  },
  officerDisable(id) {
    return request({
      host: BASEURL,
      url: `/auditor/disable/${id}`,
      method: 'post',
    });
  },
  officerSelect() {
    return request({
      host: BASEURL,
      url: '/auditor/listSelect',
    });
  },
  appList(params) {
    return request({
      host: BASEURL,
      url: '/app',
      params: {
        page: 1,
        size: 10,
        ...params,
      },
    });
  },
  appCreate(params) {
    return request({
      host: BASEURL,
      url: '/app',
      method: 'post',
      params,
    });
  },
  appEdit(id, params) {
    return request({
      host: BASEURL,
      url: `/app/${id}`,
      method: 'post',
      params,
    });
  },
  appSelect() {
    return request({
      host: BASEURL,
      url: '/app/listSelect',
    });
  },
  // /auditor/enable/{id}
  adminList(params) {
    return request({
      host: BASEURL,
      url: '/admin',
      params: {
        page: 1,
        size: 10,
        ...params,
      },
    });
  },
  adminCreate(params) {
    return request({
      host: BASEURL,
      url: '/admin',
      method: 'post',
      params,
    });
  },
  adminEdit(id, params) {
    return request({
      host: BASEURL,
      url: `/admin/${id}`,
      method: 'post',
      params,
    });
  },
  adminEnable(id) {
    return request({
      host: BASEURL,
      url: `/admin/enable/${id}`,
      method: 'post',
    });
  },
  adminDisable(id) {
    return request({
      host: BASEURL,
      url: `/admin/disable/${id}`,
      method: 'post',
    });
  },
  applicationList(params) {
    return request({
      host: BASEURL,
      url: '/petition',
      method: 'get',
      params: {
        page: 1,
        size: 10,
        ...params,
      },
    });
  },
  applicationDetail(id) {
    return request({
      host: BASEURL,
      url: `/petition/${id}`,
    });
  },
  recordList(params) {
    return request({
      host: BASEURL,
      url: '/cert',
      method: 'get',
      params: {
        page: 1,
        size: 10,
        ...params,
      },
    });
  },
  recordDetail(id) {
    return request({
      host: BASEURL,
      url: `/cert/${id}`,
    });
  },
  rfidCreate(params) {
    return request({
      host: BASEURL,
      url: '/app',
      method: 'post',
      params,
    });
  },
  rfidList(params) {
    return request({
      host: BASEURL,
      url: '/app',
      params: {
        page: 1,
        size: 10,
        ...params,
      },
    });
  },
  licenseList(params) {
    return request({
      host: BASEURL,
      url: '/plate',
      params: {
        page: 1,
        size: 10,
        ...params,
      },
    });
  },
  licenseCreate(params) {
    return request({
      host: BASEURL,
      url: '/plate-batch',
      method: 'post',
      params,
    });
  },
};
