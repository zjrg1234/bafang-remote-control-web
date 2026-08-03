import { AppRouteRecord } from '@/types/router'

export const rechargeActManageRoutes: AppRouteRecord = {
  path: '/rechargeActManage',
  name: 'RechargeActManage',
  component: '/index/index',
  meta: {
    title: 'menus.rechargeActManage.title',
    icon: '&#xe73f;'
  },
  children: [
    {
      path: 'rechargeActManage',
      name: 'RechargeActManageChild',
      component: '/rechargeActManage/rechargeActManage',
      meta: {
        title: 'menus.rechargeActManage.rechargeActManage',
        keepAlive: false
      }
    },
    {
      path: 'rechargeActRec',
      name: 'RechargeActRec',
      component: '/rechargeActManage/rechargeActRec',
      meta: {
        title: 'menus.rechargeActManage.rechargeActRec',
        keepAlive: false
      }
    }
  ]
}
