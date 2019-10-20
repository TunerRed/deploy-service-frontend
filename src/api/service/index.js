import {state_code} from "../code";

require('../code.js')

export default {
  getEurekaList(serverIP) {
    return {
      resultCode: state_code.SUCCESS,
      resultMessage: '',
      resultData: {
        list: [
          {
            name: '',
            //确认应用有使用actuator
            version: '',
            port: '',
            ip: '',
            repositories: '',
            health: ''
            //todo 运行时间要去后台差进程，目前不做
            //runTime: ''
          },
          {
            name: 'sso',
            //确认应用有使用actuator
            version: 'release-0815',
            port: '9966',
            ip: '128.196.0.1',
            repositories: 'myspringboot-sso',
            health: 'UP'
            //todo 运行时间要去后台差进程，目前不做
            //runTime: ''
          },
          {
            name: 'system-db',
            //确认应用有使用actuator
            version: 'release-1015',
            port: '1024',
            ip: '128.196.0.1,128.196.1.2',
            repositories: 'myspringboot-config',
            health: 'DOWN'
            //todo 运行时间要去后台差进程，目前不做
            //runTime: ''
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
  },
  getAvailPack(serverIP) {
    let list=[
      {name: 'service20190830.tar.gz', info: '0830'},
      {name: 'service20190930.tar.gz', info: '0930'},
      {name: 'service20191015.tar.gz', info: '1015更新'},
    ]
    if (serverIP.toString().endsWith("51")){
      list.push({name: 'service20190920.tar.gz', info: '0920'})
    }else if (serverIP.toString().endsWith("89")){
      list.push({name: 'service20190922.tar.gz', info: '0922'})
    }
    //todo 文件如何排序应该取决于后台返回的数据
    list.sort((a, b) => {return a.name>b.name?-1:1})
    return {
      resultCode: state_code.SUCCESS,
      resultData: {
        list: list
      }
    }
  }
}
