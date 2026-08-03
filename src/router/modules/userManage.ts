import { AppRouteRecord } from '@/types/router'

export const userManageRoutes: AppRouteRecord = {
  path: '/usermanage',
  name: 'Usermanage',
  component: '/index/index',
  meta: {
    title: 'menus.usermanage.title',
    icon: '&#xe753;'
  },
  children: [
    {
      path: 'userManage',
      name: 'UserManage',
      component: '/userManage/userManage',
      meta: {
        title: 'menus.usermanage.userManage',
        keepAlive: false
      }
    },
    {
      path: 'userBalanceEditRecord',
      name: 'UserBalanceEditRecord',
      component: '/userManage/userBalanceEditRecord',
      meta: {
        title: 'menus.usermanage.userBalanceEditRecord',
        keepAlive: false
      }
    },
    {
      path: 'userPowerEditRecord',
      name: 'UserPowerEditRecord',
      component: '/userManage/userPowerEditRecord',
      meta: {
        title: 'menus.usermanage.userPowerEditRecord',
        keepAlive: false
      }
    }
    // 暂时不做
    // {
    //   path: 'rechargeRank',
    //   name: 'RechargeRank',
    //   component: '/userManager/rechargeRank',
    //   meta: {
    //     title: 'menus.usermanager.rechargeRank',
    //     keepAlive: true
    //   }
    // },
    // {
    //   path: 'driverRank',
    //   name: 'DriverRank',
    //   component: '/userManager/driverRank',
    //   meta: {
    //     title: 'menus.usermanager.driverRank',
    //     keepAlive: true
    //   }
    // },
    // {
    //   path: 'shareCarRank',
    //   name: 'ShareCarRank',
    //   component: '/userManager/shareCarRank',
    //   meta: {
    //     title: 'menus.usermanager.shareCarRank',
    //     keepAlive: true
    //   }
    // },
    // {
    //   path: 'onlineRank',
    //   name: 'OnlineRank',
    //   component: '/userManager/onlineRank',
    //   meta: {
    //     title: 'menus.usermanager.onlineRank',
    //     keepAlive: true
    //   }
    // }
  ]
}
