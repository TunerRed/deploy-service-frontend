/*
* codevoid
* 弹出错误信息
* */
import {Message,Notification} from "element-ui";

export default {
  createError(val) {
    Message({
      type: 'error',
      message: val
    })
  },
  createInfo(val) {
    Message({
      type: 'info',
      message: val
    })
  },
  notify(title, msg, duration = 4500) {
    Notification({
      title,
      message: msg,
      duration
    })
  }
}
