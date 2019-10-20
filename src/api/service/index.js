import {state_code} from "../code";

require('../code.js')

export default {
  getServiceList() {
    return axios({
      method: 'get',
      url: '/service/queryList',
    })
  },
  // todo 要改成调用后台接口的方法
  getServicesInfo() {
    return {
      resultCode: state_code.SUCCESS,
      resultData: {
        list: [
          {name: 'ccbft-govern-sso', date: '20191018', branchList: ['release-1015','release-0815','dev'],branch:'release-1015',deploy: true},
          {name: 'ccbft-govern-kafka', date: '20191018', branchList: ['release','release-0815','dev'],branch:'dev',deploy: true},
          {name: 'superise-mother-fucker', date: '20190818', branchList: ['release','master','dev'],branch:'release',deploy: false},
        ]
      }
    }
  },
  deployFromGit(url,phone) {
    return {
      resultCode: state_code.SUCCESS,
      resultData: {
        list: [
          {name: 'ccbft-govern-sso', deployed: true, started: true, actutor: '', message: ''},
          {name: 'ccbft-govern-kafka', deployed: true, started: true, actutor: '', message: ''},
          {name: 'superise-mother-fucker', deployed: true, started: true, actutor: '', message: ''},
        ]
      }
    }
  },
  getAvailableServerList() {
    return {
      resultCode: state_code.SUCCESS,
      resultData: {
        list: [
          'http://128.196.193.49',
          'http://128.196.193.51',
          'http://128.196.188.89'
        ]
      }
    }
  }
}
