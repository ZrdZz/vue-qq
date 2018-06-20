# vue-qq

> A Vue.js project

学vue时间不算久, 其中还有很多功能不太熟悉, 并且项目很多功能实现的很繁琐, 后面还会进行多次重构的

项目结构
```
|—— src                     // 前端源码文件
|   |—— base                // 包含一些公共组件
|   |—— common              // 包含一些公共的js、样式等
|   |—— components          // 业务组件
|   |—— router              // vue-router文件夹
|   |—— store               // vuex文件夹
|   |—— App.vue           
|   |—— main.js
|—— server                  // 后端源码文件夹
|   |—— main                // 登录登出接口
|   |—— feature             // 功能性接口
|   |—— index.js            // server启动文件
|   |—— util.js             // server工具类文件
|—— schemas                 // mongoose schema文件夹
|—— models                  // mongoose model文件夹
|—— record                  // 记录一些问题
```

登录页面

![](https://github.com/ZrdZz/vue-qq/blob/master/record/images/login.png)
![](https://github.com/ZrdZz/vue-qq/blob/master/record/images/message.png)
![](https://github.com/ZrdZz/vue-qq/blob/master/record/images/setting.png)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
