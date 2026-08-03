import { AppRouteRecord } from '@/types/router'

export const agentManageRoutes: AppRouteRecord = {
  path: '/agentManage',
  name: 'AgentManage',
  component: '/index/index',
  meta: {
    title: 'menus.agentManage.title',
    icon: '&#xe7b7;'
  },
  children: [
    {
      path: 'agentRecord',
      name: 'AgentRecord',
      component: '/agentManage/agentRecord',
      meta: {
        title: 'menus.agentManage.agentRecord',
        keepAlive: false
      }
    },
    {
      path: 'agentPlace',
      name: 'AgentPlace',
      component: '/agentManage/agentPlace',
      meta: {
        title: 'menus.agentManage.agentPlace',
        keepAlive: false
      }
    }
  ]
}
