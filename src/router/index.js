import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/system/home'
import testComponent from '@/components/test/test-component'
import ServiceGit from '@/views/service/deploy-service-git'
import ServiceFile from '@/views/service/deploy-service-file'
import Eureka from '@/views/service/eureka'
import RollbackFrontend from '@/views/frontend/rollback-frontend'
import FrontGit from '@/views/frontend/deploy-frontend-git'
import Config from '@/views/system/config'
import Login from '@/views/system/login'

Vue.use(Router)

const BASE_URL_SERVICE = '/service'
const BASE_URL_FRONTEND = '/frontend'
const BASE_URL_SYSTEM = '/system'

const meta = {
  auth: true
}

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        auth: false
      }
    },
    {
      path: '/test',
      name: 'testComponent',
      component: testComponent,
      meta: {
        ...meta
      }
    },
    {
      path: BASE_URL_SERVICE + '/deploy/git',
      name: 'ServiceGit',
      component: ServiceGit,
      meta: {
        ...meta
      }
    },
    {
      path: BASE_URL_SERVICE + '/deploy/file',
      name: 'ServiceFile',
      component: ServiceFile,
      meta: {
        ...meta
      }
    },
    {
      path: BASE_URL_SERVICE + '/eureka',
      name: 'Eureka',
      component: Eureka,
      meta: {
        ...meta
      }
    },
    {
      path: BASE_URL_FRONTEND + '/rollback',
      name: 'RollbackFrontend',
      component: RollbackFrontend,
      meta: {
        ...meta
      }
    },
    {
      path: BASE_URL_FRONTEND + '/deploy',
      name: 'FrontGit',
      component: FrontGit,
      meta: {
        ...meta
      }
    },
    {
      path: BASE_URL_SYSTEM + '/config',
      name: 'Config',
      component: Config,
      meta: {
        ...meta
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to, from, localStorage.getItem('token'))
  if (to.meta.auth && !localStorage.getItem('token')) {
    router.replace({name: 'Login'})
  }
  next()
})

export default router
