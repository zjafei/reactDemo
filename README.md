# react demo

1. ### 安装 
```bash
npm install
```

2. ### 运行
```bash
npm start
```
3. ### 目录结构

```bash
├── config
│   ├── config.js                   // 配置
│   └── router.config.js            // 路由              
├── public                          // 不需要打包的第三方文件
├── src
│   ├── assets                      // 静态资源
│   ├── components                  // 公用组件
│   ├── global.js                   // app 入口
│   ├── global.less                 // 全局样式
│   ├── layouts                     // 布局
│   ├── models                      // 全局模型
│   ├── pages
│   │   ├── 404.js                  // 404 页面
│   │   ├── AccountAuthorized.js
│   │   ├── Authorized.js
│   │   ├── PageDemo
│   │   │   ├── Demo.js             // 业务页面
│   │   │   ├── components          // 业务组件
│   │   │   └── models
│   │   │       └── demo.js         // 业务模型
│   │   └── document.ejs            // HTML 模板
│   ├── services
│   │   ├── index.js                // api
│   │   └── mock.js                 // mock 数据
│   └── utils                       // 工具方法
└── package.json                    // 包文件
```
