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

## commit log

---
- 2019.11.14
3. 正确使用post和get（data和param）发送请求，跑通部署git前端的整个图形化流程
```
post发送对象信息，参数在body中，在请求中为'data'
get发送参数信息，参数在Params中，在请求中为'params'
```
4. 原本使用了JSON.stringify，但后来发现并不需要，修改为放在body中就可以了（应该在何处使用？）

---
- 2019.11.23
1. 终于在服务器上成功安装了npm并且开通了网络访问权限，否则全部木大
2. 开发登录页面，可选的**记住密码**功能，实现导航守卫，使用localStorage和vuex存储用户名密码和token

---
- 2019.11.24
1. 未读消息
2. 前端部署框空项检查
