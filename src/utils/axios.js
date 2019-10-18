import axios from 'axios'
import cookies from 'js-cookies'

const service = axios.create({
  baseURL: '/api/',
  timeout: 30000
})

service.interceptors.request.use(
  config => {
    const token = cookies.get('token')
    config.headers.Authorization = token
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

export default service
