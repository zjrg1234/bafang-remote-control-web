import { AppRouteRecord } from '@/types/router'

export const huazhiAcademyManagerRoutes: AppRouteRecord = {
  path: '/huazhiAcademy',
  name: 'HuazhiAcademy',
  component: '/index/index',
  meta: {
    title: 'menus.huazhiAcademy.title',
    icon: '&#xe854;'
  },
  children: [
    {
      path: 'huazhiAcademyManager',
      name: 'HuazhiAcademyManager',
      component: '/huazhiAcademy/huazhiAcademyManager',
      meta: {
        title: 'menus.huazhiAcademy.huazhiAcademyManager',
        keepAlive: false
      }
    }
  ]
}
