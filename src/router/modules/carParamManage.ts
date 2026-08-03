import { AppRouteRecord } from '@/types/router'

export const carParamManagerRoutes: AppRouteRecord = {
  path: '/carParamManage',
  name: 'CarParamManage',
  component: '/index/index',
  meta: {
    title: 'menus.carParamManage.title',
    icon: '&#xe7ff;'
  },
  children: [
    // 暂时不做
    // {
    //   path: 'channelPara',
    //   name: 'ChannelPara',
    //   component: '/carParamManager/channelPara',
    //   meta: {
    //     title: 'menus.carParamManager.channelPara',
    //     keepAlive: false
    //   }
    // },
    {
      path: 'carBasicPara',
      name: 'CarBasicPara',
      component: '/carParamManage/carBasicPara',
      meta: {
        title: 'menus.carParamManage.carBasicPara',
        keepAlive: false
      }
    }
  ]
}
