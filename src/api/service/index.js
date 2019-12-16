import https from '@/utils/axios'
import state_code from '../code'

const BASE_URL = '/service'

export default {
  // 获取指定服务器的运行列表
  getEurekaList(serverIP) {
    return https.Get(BASE_URL+'/getEurekaList', {serverIP})
  },

  // 获取可进行maven打包的仓库列表
  getServiceList() {
    // return https.Get(BASE_URL+'/queryList')
    return {
      resultCode: state_code.SUCCESS,
      resultData: {
        list: [
          {name: '乌拉-sso', date: '20191018', branchList: ['release-1015','release-0815','dev'],branch:'release-1015',deploy: true},
          {name: '乌拉-kafka', date: '20191018', branchList: ['release','release-0815','dev'],branch:'dev',deploy: true},
          {name: 'superise-mother-fucker', date: '20190818', branchList: ['release','master','dev'],branch:'release',deploy: false},
        ]
      }
    }
  },

  // 获取可部署后端的服务器列表
  getServerList() {
    return https.Get(BASE_URL+'/getServerList')
  },

  // 回滚后端？
  rollback(url,filename,phoneNumber) {
    return {
      resultCode: state_code.SUCCESS
    }
    // return axios({
    //   method: 'get',
    //   url: '/service/queryList',
    // })
  },

  // 获取可用的回滚包
  getBackupPack(serverIP) {
    return https.Post(BASE_URL+'/getAvailBackup', {serverIP});
  },

  // 停止远程服务器上的服务
  stopService(serverIP, filename, pid) {
    return https.Get(BASE_URL+'/stop', {serverIP, filename, pid})
  },
  // 启动远程服务器上的服务
  startService(serverIP, filename) {
    return https.Get(BASE_URL+'/start', {serverIP, filename})
  },

  // 从git部署后端
  deployFromGit(url,phone,deployList) {
    console.log(url,phone,deployList)
    return {
      resultCode: state_code.SUCCESS
    }
  },

  // 先上传文件，之后执行该方法。从文件部署后端
  deployFromFile(serverIP) {
    return https.Get(BASE_URL+'/deployServiceFromFile', {serverIP});
  },

  uploadFiles(url,data) {
    return https.Upload(url, data);
  }
}
