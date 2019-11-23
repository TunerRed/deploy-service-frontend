/*
* codevoid
* 弹出错误信息
* */
import {Message} from "element-ui";

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
  }
}
