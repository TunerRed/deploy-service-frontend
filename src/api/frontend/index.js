import state_code from "../code";
import https from '@/utils/axios'

require('../code.js')

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
  },
}
