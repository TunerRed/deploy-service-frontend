# deploy-service-frontend

## run-shell

> vue学习入门，调用后端springboot运行服务器脚本部署前端或后台服务

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

## commit log
---
1. 界面主体完成
2. 简单学习echarts，估计不会用得上

---
- 2019.11.13
基本实现从git部署前端（接口与postman）
前端api

想给自己写个静态网站！

---
- 2019.11.14
1. 获取当前分支下的打包脚本（前端专用）
2. 调整超时时间
3. 正确使用post和get（data和param）发送请求，跑通部署git前端的整个图形化流程
```
post发送对象信息，参数在body中，在请求中为'data'
get发送参数信息，参数在Params中，在请求中为'params'
```
4. 原本使用了JSON.stringify，但后来发现并不需要，修改为放在body中就可以了（应该在何处使用？）
1. 基本实现从git部署前端
2. 前端api

想给自己写个静态网站！
