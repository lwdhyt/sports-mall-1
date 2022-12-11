import request from '@/utils/request'
import axios from 'axios'

// 获取订单列表
export function getDatas(parameter, paging) {
  return request({
    url: `/api/orders/pageUser/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}
// 导出订单
export function exports(parameter) {
  return request({
    url: '/api/orders/export',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}

// 获取订单详情
export function getDetails(id) {
  return request({
    url: `/api/orders/detail/${id}`,
    method: 'put'
  })
}
