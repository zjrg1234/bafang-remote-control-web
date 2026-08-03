import { AppRouteRecord } from '@/types/router'

export const carManagerRoutes: AppRouteRecord = {
  path: '/carManage',
  name: 'CarManager',
  component: '/index/index',
  meta: {
    title: 'menus.carManager.title',
    icon: '&#xe7fd;'
  },
  children: [
    {
      path: 'carList',
      name: 'CarManagerChild',
      component: '/carManage/carList',
      meta: {
        title: 'menus.carManager.carManager',
        keepAlive: false
      }
    },
    {
      path: 'driverRecord',
      name: 'DriverRecord',
      component: '/carManage/driverRecord',
      meta: {
        title: 'menus.carManager.driverRecord',
        keepAlive: false
      }
    }
    // 暂时不做
    // {
    //   path: 'tagManager',
    //   name: 'TagManager',
    //   component: '/carManager/tagManager',
    //   meta: {
    //     title: 'menus.carManager.tagManager',
    //     keepAlive: false
    //   }
    // },
    // {
    //   path: 'malfunctionRecord',
    //   name: 'MalfunctionRecord',
    //   component: '/carManage/malfunctionRecord',
    //   meta: {
    //     title: 'menus.carManager.malfunctionRecord',
    //     keepAlive: false
    //   }
    // }
  ]
}
