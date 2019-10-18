import axios from '@/utils/axios'

export default {
  getServiceList () {
    return axios({
      method: 'get',
      url: '/service/queryList',
    })
  },
  getServicesInfo () {
    return {
      resultCode: 200,
      resultData: {
        list: [
          {name: 'ccbft-govern-sso', date: '20191018', branchList: ['release-1015','release-0815','dev'],branch:'release-1015',deploy: true},
          {name: 'ccbft-govern-kafka', date: '20191018', branchList: ['release','release-0815','dev'],branch:'dev',deploy: true},
          {name: 'superise-mother-fucker', date: '20190818', branchList: ['release','master','dev'],branch:'release',deploy: false},
        ]
      }
    }
  }
}
