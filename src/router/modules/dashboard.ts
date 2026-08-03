import { AppRouteRecord } from '@/types/router'

export const dashboardRoutes: AppRouteRecord[] = [
  {
    path: '/console',
    name: 'Console',
    component: '/dashboard/console',
    meta: {
      title: 'menus.dashboard.console',
      keepAlive: false,
      icon: '&#xe721;'
    }
  }
]
