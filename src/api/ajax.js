import axios from 'axios'
import {setMessage} from '../utils/index'
import router from "../router";

// 创建一个自定义的 axios
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true
})
// 请求拦截器
instance.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
instance.interceptors.response.use(response => {
  const result = response.data
  if (result.code === 200) {
    return result
  } else if (result.code === 401) {
    return router.replace('/login')
  } else {
    console.log(router)
    Promise.reject(result).catch((result) => {
      setMessage(result.message, 'error')
    })
  }
}, error => {
  return Promise.reject(error)
})
/**
 * 封装 axios 请求方法
 * @param url: 请求的路径，如： /login   /register
 * @param data: 请求的参数，接收一个对象
 * @param method: 请求的类型，默认是 GET 请求
 * @return {AxiosPromise}
 */
export default function ajax(url, data = {}, method = 'GET') {
  // 如果发起的请求是 get，则进入 if语句；否则是 post请求，进入 else语句
  if (method.toUpperCase() === 'GET') {
    return instance({
      url,
      params: data
    })
  } else {
    return instance({
      method: 'POST',
      url,
      data
    })
  }
}
