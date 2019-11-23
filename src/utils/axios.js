import axios from 'axios'
import state_code from '../api/code'
import message from '@/api/showMsg'

const service = axios.create({
  baseURL: '/api',
  timeout: 10000
})
const max_err_len = 10

service.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    message.createError('请求错误')
    Promise.reject(error)
  }
)

service.interceptors.response.use((res) =>{
  const dataAxios = res.data;
  if (dataAxios.resultCode === state_code.SUCCESS)
    return Promise.resolve(dataAxios);
  else if (dataAxios.resultCode === state_code.USER_LOGIN_FAILURE) {
    message.createInfo(dataAxios.resultMsg)
    localStorage.removeItem('token')
    window.location.reload()
    return Promise.reject(dataAxios.resultMsg);
  }
  else {
    const msg = dataAxios.resultMsg
    message.createError(msg.length>max_err_len?msg.slice(0,max_err_len)+'...':msg)
    return Promise.reject(dataAxios.resultMsg);
  }
}, (error) => {
  message.createError('网络异常')
  return Promise.reject(error);
});

//返回一个Promise(发送post请求)
function Post(url, data) {
  return service({
    method: "post",
    url,
    data
    // headers: {
    //   contentType: "application/json"
    // }
  });
}

//返回一个Promise(发送get请求)
function Get(url, params) {
  return service({
    method: "get",
    url,
    params
  });
}

export default {
  Get,
  Post
}
