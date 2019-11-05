import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/test/HelloWorld'
import testComponent from '@/components/test/test-component'
import ServiceGit from '@/views/service/deploy-service-git'
import ServiceFile from '@/views/service/deploy-service-file'
import Eureka from '@/views/service/eureka'
import RollbackFrontend from '@/views/frontend/rollback-frontend'
import FrontGit from '@/views/frontend/deploy-frontend-git'
import Config from '@/views/system/config'

Vue.use(Router)

const BASE_URL_SERVICE = '/service'
const BASE_URL_FRONTEND = '/frontend'
const BASE_URL_SYSTEM = '/system'

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
      path: BASE_URL_SERVICE + '/eureka',
      name: 'Eureka',
      component: Eureka
    },
    {
      path: BASE_URL_FRONTEND + '/rollback',
      name: 'RollbackFrontend',
      component: RollbackFrontend
    },
    {
      path: BASE_URL_FRONTEND + '/deploy',
      name: 'FrontGit',
      component: FrontGit
    },
    {
      path: BASE_URL_SYSTEM + '/config',
      name: 'Config',
      component: Config
    }
  ]
})
