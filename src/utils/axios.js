import axios from 'axios'
import state_code from '../api/code'
import message from '@/api/showMsg'

const service = axios.create({
  baseURL: '/api',
  timeout: 20000
})
const downloadService = axios.create({
  baseURL: '/api'
})
const max_err_len = 10

function onResponse(res) {
  const dataAxios = res.data;
  if (dataAxios.resultCode === undefined || dataAxios.resultCode === state_code.SUCCESS)
    return Promise.resolve(dataAxios)
  else if (dataAxios.resultCode === state_code.USER_LOGIN_FAILURE) {
    message.createInfo(dataAxios.resultMsg)
    localStorage.removeItem('token')
    return Promise.reject(dataAxios.resultMsg)
  } else {
    const msg = dataAxios.resultMsg
    if(msg) {
      message.createError(msg.length>max_err_len?msg.slice(0,max_err_len)+'...':msg)
      return Promise.reject(msg)
    } else {
      message.createError("服务器内部错误！")
      return Promise.reject("服务器内部错误！")
    }
  }
}
function onError(error) {
  message.createError('网络异常')
  return Promise.reject(error);
}

service.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    message.createError('请求错误')
    return Promise.reject(error)
  }
)
downloadService.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    message.createError('请求错误')
    return Promise.reject(error)
  }
)

service.interceptors.response.use(res => onResponse(res), error => onError(error));
downloadService.interceptors.response.use(res => onResponse(res), error => onError(error));

//返回一个Promise(发送post请求)
function Post(url, data) {
  return service({
    method: "post",
    url,
    data
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

function Upload(url, data) {
  return service({
    method: "post",
    url,
    data,
    contentType: false,
    dataType: 'json'
  })
}

function Download(url, params) {
  return downloadService({
    method: "get",
    url,
    params,
    responseType: 'blob'
  });
}

export default {
  Get,
  Post,
  Upload,
  Download
}
