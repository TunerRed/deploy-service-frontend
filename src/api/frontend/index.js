import https from '@/utils/axios'
import message from '@/api/showMsg'

const BASE_URL = '/frontend'

export default {
  getFrontendRepoList () {
    return https.Get(BASE_URL+'/getRepoList');
  },
  updateRepo (repoName) {
    return https.Get(BASE_URL+'/updateRepo', {repoName});
  },
  getServerList () {
    return https.Get(BASE_URL+'/getServerList');
  },
  deployFromGit(serverIP,deployList) {
    return https.Post(BASE_URL+'/deployFromGit',{serverIP,deployList})
  },
  getAvailNpmScript(repo,branch) {
    return https.Get(BASE_URL+'/getNpmScripts',{repo,branch})
  },
  getAvailBackup(serverIP) {
    return https.Get(BASE_URL + '/getAvailBackup', {serverIP})
  },
  rollback(serverIP, rollbackData) {
    return https.Post(BASE_URL+'/rollback', { serverIP, rollbackData })
  },
  userResource() {
    return https.Get(BASE_URL+'/userResource')
  },
  download(filename) {
    message.notify(
      '正在请求下载接口',
      '由于技术原因下载时缺少进度条，敬请理解'
    );
    return https.Download(BASE_URL+'/download', { filename })
  }
}
