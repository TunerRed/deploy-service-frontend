import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import testComponent from '@/components/test-component'
import Service from '@/views/service/deploy-service'

Vue.use(Router)

const BASE_URL_SERVICE = '/service'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'testComponent',
      component: testComponent
    },
    {
      path: BASE_URL_SERVICE + '/deploy/git',
      name: 'service',
      component: Service
    },
    {
      path: BASE_URL_SERVICE + '/deploy/file',
      name: 'service',
      component: Service
    }
  ]
})
