import request from '@/utils/request'
import axios from 'axios'

// 获取收藏列表
export function getDatas(parameter, paging) {
  return request({
    url: `/api/collectComments/pageCollectComment/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}
// 导出收藏
export function exports(parameter) {
  return request({
    url: '/api/collectComments/export',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}
