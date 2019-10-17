import axios from '@/utils/axios'

export default {
  getServiceList () {
    return axios({
      method: 'get',
      url: '/service/queryList',
    })
  }
}
