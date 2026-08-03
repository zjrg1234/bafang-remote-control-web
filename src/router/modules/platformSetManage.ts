import { AppRouteRecord } from '@/types/router'

export const platformSetManageRoutes: AppRouteRecord = {
  path: '/platformSetManage',
  name: 'PlatformSetManage',
  component: '/index/index',
  meta: {
    title: 'menus.platformSetManage.title',
    icon: '&#xe860;'
  },
  children: [
    {
      path: 'noticeDialog',
      name: 'NoticeDialog',
      component: '/platformSetManage/noticeDialog',
      meta: {
        title: 'menus.platformSetManage.noticeDialog',
        keepAlive: false
      }
    },
    {
      path: 'commonQuestion',
      name: 'CommonQuestion',
      component: '/platformSetManage/commonQuestion',
      meta: {
        title: 'menus.platformSetManage.commonQuestion',
        keepAlive: false
      }
    },
    {
      path: 'agreeManagement',
      name: 'AgreeManagement',
      component: '/platformSetManage/agreeManagement',
      meta: {
        title: 'menus.platformSetManage.agreeManagement',
        keepAlive: false
      }
    },
    {
      path: 'feedback',
      name: 'Feedback',
      component: '/platformSetManage/feedback',
      meta: {
        title: 'menus.platformSetManage.feedback',
        keepAlive: false
      }
    },
    {
      path: 'advertPageImage',
      name: 'AdvertPageImage',
      component: '/platformSetManage/advertPageImage',
      meta: {
        title: 'menus.platformSetManage.advertPageImage',
        keepAlive: false
      }
    },
    {
      path: 'versionManage',
      name: 'VersionManage',
      component: '/platformSetManage/versionManage',
      meta: {
        title: 'menus.platformSetManage.versionManage',
        keepAlive: false
      }
    },
    // {
    //   path: 'reportManager',
    //   name: 'ReportManager',
    //   component: '/platformSetManage/reportManager',
    //   meta: {
    //     title: 'menus.platformSetManage.reportManager',
    //     keepAlive: false
    //   }
    // },
    {
      path: 'loginDialog',
      name: 'LoginDialog',
      component: '/platformSetManage/loginDialog',
      meta: {
        title: 'menus.platformSetManage.loginDialog',
        keepAlive: false
      }
    },
    {
      path: 'platParam',
      name: 'PlatParam',
      component: '/platformSetManage/platformParam',
      meta: {
        title: 'menus.platformSetManage.platParam',
        keepAlive: false
      }
    },
    // {
    //   path: 'ipSet',
    //   name: 'IpSet',
    //   component: '/platformSetManage/ipSet',
    //   meta: {
    //     title: 'menus.platformSetManage.ipSet',
    //     keepAlive: false
    //   }
    // },
    {
      path: 'carDefaultImage',
      name: 'CarDefaultImage',
      component: '/platformSetManage/carDefaultImage',
      meta: {
        title: 'menus.platformSetManage.carDefaultImage',
        keepAlive: false
      }
    }
  ]
}
