// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// UI框架
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// echarts地图框架
import echarts from 'echarts'
// 进度条
import 'nprogress/nprogress.css'
// 全局api
import api from '@/api/api.js'
// 使用vuex
import store from '@/store'
// 使用第三方图标（测试用）
import '@/assets/icon/iconfont.css'

Vue.config.productionTip = false
Vue.use(elementUI)
// 全局变量
Vue.prototype.$echarts=echarts
Vue.prototype.$api=api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
