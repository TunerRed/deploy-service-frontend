import https from '@/utils/axios'

require('../code.js')

export default {
  async userLogin(username, password) {
    // console.log('user login: ',username,password)
    const data = await https.Get('/login',{username, password})
    return data
  }
}
