import https from '@/utils/axios'

require('../code.js')

const COMMON_BASE_URL = '/common'
const SYSTEM_BASE_URL = '/system'
const CONFIG_BASE_URL = SYSTEM_BASE_URL+'/config'

export default {
  encodePass(password) {
    let enc = window.btoa(password)
    return enc
  },

  // -------------------- 公共模块，登录与统计 ----------------------------
  userLogin(username, password) {
    return https.Get(COMMON_BASE_URL + '/login',{username, password: this.encodePass(password)})
  },
  getCommonMessage(count=5) {
    return https.Get(COMMON_BASE_URL + '/message-list', {count})
  },
  getStatistic() {
    return https.Get(COMMON_BASE_URL + '/statistic')
  },

  // -------------------- 配置相关，新增配置 ----------------------------
  updateUser(form,update) {
    form.password = this.encodePass(form.password)
    console.log('update',update)
    if (update === null || update === false)
      return https.Post(CONFIG_BASE_URL + '/addUser', form)
    return https.Post(CONFIG_BASE_URL + '/updateUser', form)
  },
  updateServer(form,update) {
    form.password = this.encodePass(form.password)
    if (update === null || update === false)
      return https.Post(CONFIG_BASE_URL + '/addServer', form)
    return https.Post(CONFIG_BASE_URL + '/updateServer', form)
  },
  updateRepo(form,update) {
    if (update === null || update === false)
      return https.Post(CONFIG_BASE_URL + '/addRepo', form)
    return https.Post(CONFIG_BASE_URL + '/updateRepo', form)
  },

  // -------------------- 查询数据 ----------------------------
  // @param messageId: integer
  updateReadMessage(messageId) {
    return https.Get(SYSTEM_BASE_URL + '/read-message',{messageId})
  },
  getUserList() {
    return https.Get(SYSTEM_BASE_URL + '/getUsers')
  },
  getServerList() {
    return https.Get(SYSTEM_BASE_URL + '/getServers')
  },
  getRepoList() {
    return https.Get(SYSTEM_BASE_URL + '/getRepos')
  }
}
