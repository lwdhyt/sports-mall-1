import request from '@/utils/request'
import axios from 'axios'

// 获取商品列表
export function getDatas(parameter, paging) {
  return request({
    url: `/api/adminProducts/pageProductInfo/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}
// 导出商品
export function exports(parameter) {
  return request({
    url: '/api/adminProducts/export',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}

// 获取商品详情
export function getDetails(id) {
  return request({
    url: `/api/adminProducts/detail/${id}`,
    method: 'put'
  })
}
