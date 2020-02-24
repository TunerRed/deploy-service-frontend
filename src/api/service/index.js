import https from '@/utils/axios'
import state_code from '../code'

const BASE_URL = '/service'

export default {
  // 获取指定服务器的运行列表
  getEurekaList(serverIP) {
    return https.Get(BASE_URL+'/getEurekaList', {serverIP})
  },

  // 获取可进行maven打包的仓库列表
  getRepoList() {
    return https.Get(BASE_URL+'/getRepoList')
  },
  updateRepo (repoName) {
    return https.Get(BASE_URL+'/updateRepo', {repoName});
  },

  // 获取可部署后端的服务器列表
  getServerList() {
    return https.Get(BASE_URL+'/getServerList')
  },

  download(serverIP, filename) {
    return https.Download(BASE_URL+'/download', {serverIP, filename})
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
  deployFromGit(serverIP,deployList) {
    return https.Post(BASE_URL+'/deployFromGit', {serverIP,deployList})
  },

  // 先上传文件，之后执行该方法。从文件部署后端
  deployFromFile(serverIP) {
    return https.Get(BASE_URL+'/deployServiceFromFile', {serverIP});
  },

  uploadFiles(url,data) {
    return https.Upload(url, data);
  },

  clearDir() {
    return https.Get(BASE_URL + '/clearUpload');
  }
}
