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
    },
    {
      path: 'withdrawRecord',
      name: 'WithdrawRecord',
      component: '/financeManage/withdrawRecord',
      meta: {
        title: 'menus.financeManage.withdrawRecord',
        keepAlive: false
      }
    },
    {
      path: 'refundRecord',
      name: 'refundRecord',
      component: '/financeManage/refundRecord',
      meta: {
        title: 'menus.financeManage.refundRecord',
        keepAlive: false
      }
    }
  ]
}
