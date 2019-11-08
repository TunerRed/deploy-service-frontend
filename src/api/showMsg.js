/*
* codevoid
* 弹出错误信息
* */
import {Message} from "element-ui";

export default {
  createError(val) {
    console.error(val)
    Message({
      type: 'error',
      message: val
    })
  },
  createInfo(val) {
    console.info(val)
    Message({
      type: 'info',
      message: val
    })
  }
}
