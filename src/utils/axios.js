import axios from 'axios'
import state_code from '../api/code'
import message from '@/api/showMsg'

const service = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// todo 登录验证等 cookies还有错误，需要学习一个
// service.interceptors.request.use((config) => {
//     const token = cookies.get('token')
//     config.headers.Authorization = token
//     return config
//   },
//   error => {
//     console.log(error)
//     Promise.reject(error)
//   }
// )

service.interceptors.response.use((res) =>{
  const dataAxios = res.data;
  if (dataAxios.resultCode == state_code.SUCCESS)
    return Promise.resolve(dataAxios);
  else {
    message.createError(dataAxios.resultCode+" "+dataAxios.resultMsg)
    return Promise.reject(error);
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
