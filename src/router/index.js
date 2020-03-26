import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

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
      component: () => import('@/views/system/login'),
      meta: {
        auth: false
      }
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/system/home'),
      meta: {
        auth: false
      }
    },
    {
      path: '/test',
      name: 'testComponent',
      component: () => import('@/components/test/test-component'),
      meta: {
        ...meta
      }
    },
    {
      path: BASE_URL_SERVICE + '/deploy/git',
      name: 'ServiceGit',
      component: () => import('@/views/service/deploy-service-git'),
      meta: {
        ...meta
      }
    },
    {
      path: BASE_URL_SERVICE + '/deploy/file',
      name: 'ServiceFile',
      component: () => import('@/views/service/deploy-service-file'),
      meta: {
        ...meta
      }
    },
    {
      path: BASE_URL_SERVICE + '/eureka',
      name: 'Eureka',
      component: () => import('@/views/service/eureka'),
      meta: {
        ...meta
      }
    },
    {
      path: BASE_URL_FRONTEND + '/rollback',
      name: 'RollbackFrontend',
      component: () => import('@/views/frontend/rollback-frontend'),
      meta: {
        ...meta
      }
    },
    {
      path: BASE_URL_FRONTEND + '/deploy',
      name: 'FrontGit',
      component: () => import('@/views/frontend/deploy-frontend-git'),
      meta: {
        ...meta
      }
    },
    {
      path: BASE_URL_FRONTEND + '/resource',
      name: 'FrontRes',
      component: () => import('@/views/frontend/resource'),
      meta: {
        ...meta
      }
    },
    {
      path: BASE_URL_SYSTEM + '/config',
      name: 'Config',
      component: () => import('@/views/system/config'),
      meta: {
        ...meta
      }
    },
    {
      path: '/error',
      name: '404',
      component: () => import('@/views/system/error'),
      meta: {
        auth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("expiration") && localStorage.getItem("expiration") < new Date().getTime()) {
    store.commit('isLogin', false)
    localStorage.removeItem('expiration')
    if (localStorage.getItem('token'))
      localStorage.removeItem('token')
  }
  if (to.meta.auth && !localStorage.getItem('token')) {
    router.replace({name: 'Login'})
    return false
  }
  next()
})

export default router
