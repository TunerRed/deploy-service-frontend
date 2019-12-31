import https from '@/utils/axios'

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
  }
}
