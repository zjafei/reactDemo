export default [
  // user
  {
    path: '/account',
    // component: '../layouts/UserLayout',
    Routes: ['src/pages/AccountAuthorized'],
    routes: [
      { path: '/account', redirect: '/account/login' },
      { path: '/account/login', component: './Account/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    routes: [
      { path: '/', redirect: '/machine' },
      {
        path: '/machine',
        name: 'machine',
        title: '机械认证管理',
        icon: 'safety-certificate',
        routes: [
          { path: '/machine', redirect: '/machine/application' },
          {
            path: '/machine/application',
            name: 'machineApplication',
            title: '认证申请',
            component: './Machine/Application',
          },
          {
            path: '/machine/application/:id([0-9]+)',
            name: 'machineApplicationDetail',
            title: '认证申请详情',
            component: './Machine/ApplicationDetail',
            hideInMenu: true,
          },
          {
            path: '/machine/machine',
            name: 'machineMachine',
            title: '机械',
            component: './Machine/Machine',
          },
          {
            path: '/machine/machine/:id([0-9]+)',
            name: 'machineMachineDetail',
            title: '机械详情',
            component: './Machine/MachineDetail',
            hideInMenu: true,
          },
          {
            path: '/machine/record',
            name: 'machineRecord',
            title: '备案信息',
            component: './Machine/Record',
          },
          {
            path: '/machine/record/:id([0-9]+)',
            name: 'machineRecordDetail',
            title: '备案详情',
            component: './Machine/RecordDetail',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/license',
        name: 'license',
        title: '车牌管理',
        icon: 'credit-card',
        routes: [
          { path: '/license', redirect: '/license/license' },
          {
            path: '/license/license',
            name: 'licenseLicense',
            title: '车牌',
            component: './License/License',
            // hideChildrenInMenu: true,
            // routes: [
            //   { path: '/license/license', redirect: '/license/license/list' },
            //   {
            //     path: '/license/license/list',
            //     component: './License/License',
            //   },
            //   {
            //     path: '/license/license/download',
            //     component: './License/LicenseDownload',
            //   },
            // ],
          },
          {
            path: '/license/download',
            name: 'licenseDownload',
            title: '下载批次',
            component: './License/LicenseDownload',
          },
          // {
          //   path: '/license/RFID',
          //   name: 'licenseRFID',
          //   title: 'RFID',
          //   component: './License/RFID',
          // },
        ],
      },
      {
        path: '/userApp',
        name: 'userApp',
        title: '人员与应用',
        icon: 'appstore',
        routes: [
          { path: '/userApp', redirect: '/userApp/officer' },
          {
            path: '/userApp/officer',
            name: 'userAppOfficer',
            title: '认证员',
            component: './UserApp/Officer',
          },
          {
            path: '/userApp/app',
            name: 'userAppApp',
            title: '应用',
            component: './UserApp/App',
          },
          {
            path: '/userApp/admin',
            name: 'userAppAdmin',
            title: '管理员',
            component: './UserApp/Admin',
          },
        ],
      },
    ],
  },
];
