import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/test/HelloWorld'
import testComponent from '@/components/test/test-component'
import ServiceGit from '@/views/service/deploy-service-git'
import ServiceFile from '@/views/service/deploy-service-file'
import RollbackService from '@/views/service/rollback-service'
import Eureka from '@/views/service/eureka'

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
      name: 'ServiceGit',
      component: ServiceGit
    },
    {
      path: BASE_URL_SERVICE + '/deploy/file',
      name: 'ServiceFile',
      component: ServiceFile
    },
    {
      path: BASE_URL_SERVICE + '/rollback',
      name: 'RollbackService',
      component: RollbackService
    },
    {
      path: BASE_URL_SERVICE + '/eureka',
      name: 'Eureka',
      component: Eureka
    }
  ]
})