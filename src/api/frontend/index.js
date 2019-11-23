import https from '@/utils/axios'

const BASE_URL = '/frontend'

export default {
  getFrontendRepoList () {
    return https.Post(BASE_URL+'/getRepoList');
  },
  getServerList () {
    return https.Post(BASE_URL+'/getServerList');
  },
  deployFromGit(serverIP,phone,deployList) {
    return https.Post(BASE_URL+'/deployFromGit',{serverIP,phone,deployList})
    //return https.Post(BASE_URL+'/deployFromGit',{serverIP,phone,deployList: JSON.stringify(deployList)})
  },
  getAvailNpmScript(repo,branch) {
    return https.Get(BASE_URL+'/getNpmScripts',{repo,branch})
  }
}
