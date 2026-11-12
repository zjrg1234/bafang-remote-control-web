import { AppRouteRecord } from '@/types/router'
import { dashboardRoutes } from './dashboard'

import { statAnalysisRoutes } from './levelStatAnalysis'
import { financeManageRoutes } from './levelFinanceManage'

/**
 * 导出所有模块化路由
 */
export const routeModules: AppRouteRecord[] = [
  ...dashboardRoutes,
  statAnalysisRoutes,
  financeManageRoutes
]
