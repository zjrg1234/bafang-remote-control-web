import { AppRouteRecord } from '@/types/router'

export const financeManageRoutes: AppRouteRecord = {
  path: '/financeManage',
  name: 'FinanceManage',
  component: '/index/index',
  meta: {
    title: 'menus.financeManage.title',
    icon: '&#xe85f;'
  },
  children: [
    {
      path: 'rechargeRecord',
      name: 'RechargeRecord',
      component: '/financeManage/rechargeRecord',
      meta: {
        title: 'menus.financeManage.rechargeRecord',
        keepAlive: false
      }
    }
  ]
}
