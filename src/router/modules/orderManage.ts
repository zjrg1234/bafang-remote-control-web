import { AppRouteRecord } from '@/types/router'

export const orderRecordManageRoutes: AppRouteRecord = {
  path: '/orderRecordManage',
  name: 'OrderRecordManage',
  component: '/index/index',
  meta: {
    title: 'menus.orderRecordManage.title',
    icon: '&#xe651;'
  },
  children: [
    {
      path: 'orderRecord',
      name: 'OrderRecord',
      component: '/orderRecordManage/orderRecord',
      meta: {
        title: 'menus.orderRecordManage.orderRecord',
        keepAlive: false
      }
    },
    {
      path: 'orderAppealRecord',
      name: 'OrderAppealRecord',
      component: '/orderRecordManage/orderAppealRecord',
      meta: {
        title: 'menus.orderRecordManage.orderAppealRecord',
        keepAlive: false
      }
    }
    // 暂时不做
    // {
    //   path: 'depositDeductionItems',
    //   name: 'DepositDeductionItems',
    //   component: '/orderRecordManager/depositDeductionItems',
    //   meta: {
    //     title: 'menus.orderRecordManager.depositDeductionItems',
    //     keepAlive: false
    //   }
    // }
  ]
}
