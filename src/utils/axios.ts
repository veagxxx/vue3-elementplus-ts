import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { Router, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router: Router = useRouter()
interface IAxiosConfig {
  baseURL?: string;
  timeout: number;
}
const config: IAxiosConfig = {
  baseURL: 'http://localhost:8099/api',
  timeout: 3000000
}
const instance: AxiosInstance = axios.create(config)
// 请求拦截
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  }, 
  (error: any) => {
    return Promise.reject(error)
  }
)
// 响应拦截
instance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status == 200) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  }, 
  (error: any) => {
    if (error.response.status) {
      switch(error.response.status) {
        case 401: 
          ElMessage({
            message: '未登录，请先登录!',
            type: 'warning'
          })
          router.replace({path: '/login'})
          break
        case 403:
          ElMessage({
            message: '权限不足或登录过期!',
            type: 'warning'
          })
          break
        case 404:
          ElMessage({
            message: '请求不存在!',
            type: 'error'
          })
          break
        case 500:
          ElMessage({
            message: '服务异常!',
            type: 'error'
          })
          break
        default:
          ElMessage({
            message: '未知错误，请重试!',
            type: 'error'
          })
          break
      }
    }
    return Promise.reject(error)
  }
)

const _get = (url: string, params?: object) => {
  return instance.get(url, { params })
}
const _post = (url: string, params?: object, _object = {}) => {
  return instance.post(url, params, _object)
}
const _put = (url: string, params?: object) => {
  return instance.put(url, params)
}
const _delete = (url: string, params?: object) => {
  return instance.delete(url, { data: params })
}
export default { _get, _post, _put, _delete }