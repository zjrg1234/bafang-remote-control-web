import { AppRouteRecord } from '@/types/router'

export const statAnalysisRoutes: AppRouteRecord = {
  path: '/statAnalysis',
  name: 'StatAnalysis',
  component: '/index/index',
  meta: {
    title: 'menus.statAnalysis.title',
    icon: '&#xe812;'
  },
  children: [
    {
      path: 'specialRecharge',
      name: 'SpecialRecharge',
      component: '/statAnalysis/specialRecharge',
      meta: {
        title: 'menus.statAnalysis.specialRecharge',
        keepAlive: false
      }
    },
    {
      path: 'specialUserRecharge',
      name: 'SpecialUserRecharge',
      component: '/statAnalysis/specialUserRecharge',
      meta: {
        title: 'menus.statAnalysis.specialUserRecharge',
        keepAlive: false
      }
    }
  ]
}
