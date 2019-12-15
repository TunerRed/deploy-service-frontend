import https from '@/utils/axios'

require('../code.js')

export default {
  userLogin(username, password) {
    // console.log('user login: ',username,password)
    const enc = window.btoa(password)
    // console.log("加密",window.btoa(enc))
    return https.Get('/common/login',{username, password: enc})
  },
  getCommonMessage() {
    return https.Get('/common/message-list')
  },
  getStatistic() {
    return https.Get('/common/statistic')
  },
  // @param messageId: integer
  updateReadMessage(messageId) {
    return https.Get('/system/read-message',{messageId})
  }
}
