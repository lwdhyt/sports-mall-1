import request from '@/utils/request'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
// 登录
export function login(parameter) {
  return axios({
    url: '/api/user/login',
    method: 'post',
    data: parameter
  })
}
// 注册
export function signUp(parameter) {
  return axios({
    url: '/api/user/register',
    method: 'post',
    data: parameter
  })
}
