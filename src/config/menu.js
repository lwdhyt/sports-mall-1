export const menuList = [
  {
    name: 'homePage',
    path: '/homePage',
    component: '/homePage',
    meta: { title: '首页', icon: 'homePage' }
  },
  {
    name: 'system',
    path: '/system',
    meta: { title: '系统管理', icon: 'setting' },
    children: [
      {
        name: 'systemUser',
        path: '/system/user',
        component: '/system/user',
        meta: { title: '用户管理', icon: false }
      },
      {
        name: 'systemLog',
        path: '/system/log',
        component: '/system/log',
        meta: { title: '日志管理', icon: false }
      }
    ]
  },
  {
    name: 'commodity',
    path: '/commodity',
    meta: { title: '商品管理', icon: 'setting' },
    children: [
      {
        name: 'commoditySort',
        path: '/commodity/sort',
        component: '/commodity/sort',
        meta: { title: '商品分类管理', icon: false }
      },
      {
        name: 'commodityInfo',
        path: '/commodity/info',
        component: '/commodity/info',
        meta: { title: '商品信息管理', icon: false }
      },
      {
        name: 'commoditySell',
        path: '/commodity/sell',
        component: '/commodity/sell',
        meta: { title: '推荐商品管理', icon: false }
      }
    ]
  },
  {
    name: 'order',
    path: '/order',
    meta: { title: '订单管理', icon: 'setting' },
    children: [
      {
        name: 'orderInfo',
        path: '/order/info',
        component: '/order/info',
        meta: { title: '订单信息', icon: false }
      },
      {
        name: 'orderRobotCsp',
        path: '/order/robotCsp',
        component: '/order/robotCsp',
        meta: { title: '机器人客服', icon: false }
      }
    ]
  },
  {
    name: 'collect',
    path: '/collect',
    component: '/collect',
    meta: { title: '收藏管理', icon: 'setting' }
  },
  {
    name: 'record',
    path: '/record',
    component: '/record',
    meta: { title: '浏览记录管理', icon: 'setting' }
  },
  {
    name: 'census',
    path: '/census',
    component: '/census',
    meta: { title: '统计中心', icon: 'setting' }
  }
]
