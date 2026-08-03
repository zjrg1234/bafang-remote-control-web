import { AppRouteRecord } from '@/types/router'
import { dashboardRoutes } from './dashboard'

// import { widgetsRoutes } from './widgets'
// import { examplesRoutes } from './examples'

// import { exceptionRoutes } from './exception'
// import { helpRoutes } from './help'
import { agentManageRoutes } from './agentManage'
import { orderRecordManageRoutes } from './orderManage'
import { statAnalysisRoutes } from './statAnalysis'
import { userManageRoutes } from './userManage'
// import { carParamManagerRoutes } from './carParamManage'
import { carManagerRoutes } from './carManage'
// import { huazhiAcademyManagerRoutes } from './huazhiAcademy'
import { rechargeActManageRoutes } from './rechargeActManage'

import { activityNoticeManageRoutes } from './activityNoticeManage'
import { platformSetManageRoutes } from './platformSetManage'
import { financeManageRoutes } from './financeManage'
import { systemRoutes } from './system'

/**
 * 导出所有模块化路由
 */
export const routeModules: AppRouteRecord[] = [
  ...dashboardRoutes,
  statAnalysisRoutes,
  userManageRoutes,
  agentManageRoutes,
  orderRecordManageRoutes,
  // widgetsRoutes,
  // examplesRoutes,

  // exceptionRoutes,
  platformSetManageRoutes,
  activityNoticeManageRoutes,
  rechargeActManageRoutes,
  // huazhiAcademyManagerRoutes,
  carManagerRoutes,
  // carParamManagerRoutes,
  financeManageRoutes,
  systemRoutes
  // ...helpRoutes
]
