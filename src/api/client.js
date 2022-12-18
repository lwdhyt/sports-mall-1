import request from '@/utils/request'

// 获取商品分类树
export function getSortTree() {
  return request({
    url: `/api/userHomes/tree`,
    method: 'GET'
  })
}

// 获取商品信息
export function getCommoditys(parameter) {
  return request({
    url: `/api/userHomes/export`,
    method: 'POST',
    data: parameter
  })
}

// 切换收藏状态
export function switchCollectState(parameter) {
  return request({
    url: `/api/userHomes/collectComment/${parameter.id}/${parameter.type}`,
    method: 'POST'
  })
}
// 获取收藏商品
export function getCollectCommoditys(parameter) {
  return request({
    url: `/api/userHomes/listCollectComment`,
    method: 'POST',
    data: parameter
  })
}
