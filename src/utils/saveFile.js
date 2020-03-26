import message from '@/api/showMsg'
const max_err_len = 10

export function save(res, filename) {
  if (res.type === 'application/json') {
    let reader = new FileReader()
    reader.readAsText(res, 'utf-8')
    reader.onload = (e) => {
      let msg = JSON.parse(reader.result).resultMsg
      if(!msg) {
        msg = '服务器内部错误！'
      }
      message.createError(msg.length > max_err_len ? msg.slice(0,max_err_len) + '...' : msg)
    }
  } else {
    let blob = new Blob([res]);
    let objURL = URL.createObjectURL(blob)
    let a = document.createElement('a')
    a.href = objURL
    a.download = filename
    a.click()
  }
}
