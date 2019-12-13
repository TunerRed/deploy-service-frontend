import https from '@/utils/axios'
import state_code from '../code'

const BASE_URL = '/service'

export default {
  getEurekaList(serverIP) {
    return {
      resultCode: state_code.SUCCESS,
      resultMessage: '',
      resultData: {
        list: [
          {
            name: 'test',
            jar: '乌拉-test-1031.jar',
            //确认应用有使用actuator
            version: '1121',
            port: '1234',
            started: true,
            actuator: '',
            runTime: '1031'
          },
          {
            name: 'sso',
            jar: '乌拉-sso-1031.jar',
            //确认应用有使用actuator
            version: 'release-0815',
            port: '9966',
            started: false,
            actuator: 'UP',
            runTime: '1031'
          },
          {
            name: 'system-db',
            jar: '乌拉-db-1031.jar',
            //确认应用有使用actuator
            version: 'release-1015',
            port: '1024',
            started: true,
            actuator: 'DOWN',
            runTime: '1031'
          }
        ]
      }
    }
  },
  getServiceList() {
    return axios({
      method: 'get',
      url: '/service/queryList',
    })
  },
  rollback(url,filename,phoneNumber) {
    return {
      resultCode: state_code.SUCCESS
    }
    // return axios({
    //   method: 'get',
    //   url: '/service/queryList',
    // })
  },
  getServicesInfo() {
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
  deployFromGit(url,phone,deployList) {
    console.log(url,phone,deployList)
    return {
      resultCode: state_code.SUCCESS
    }
  },
  deployFromFile(serverIP) {
    return https.Get(BASE_URL+'/deployServiceFromFile', {serverIP});
  },

  getAvailableServerList() {
    return https.Get(BASE_URL+'/getServerList')
  },

  getAvailPack(serverIP) {
    return https.Post(BASE_URL+'/getAvailBackup', {serverIP});
  },

  uploadFiles(url,data) {
    return https.Upload(url, data);
  }
}
