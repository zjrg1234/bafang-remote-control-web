import { AppRouteRecord } from '@/types/router'

export const activityNoticeManageRoutes: AppRouteRecord = {
  path: '/activityNoticeManage',
  name: 'ActivityNoticeManage',
  component: '/index/index',
  meta: {
    title: 'menus.activityNoticeManage.title',
    icon: '&#xe7d5;'
  },
  children: [
    {
      path: 'actNotManage',
      name: 'ActNotManage',
      component: '/activityNoticeManage/actNotManage',
      meta: {
        title: 'menus.activityNoticeManage.actNotManage',
        keepAlive: false
      }
    }
  ]
}
