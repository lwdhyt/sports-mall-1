import request from '@/utils/request'
import axios from 'axios'

// 获取用户列表
export function getDatas(parameter, paging) {
  return request({
    url: `/api/userInfo/pageUser/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}
// 导出用户信息
export function exports(parameter) {
  return request({
    url: '/api/userInfo/export',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}
