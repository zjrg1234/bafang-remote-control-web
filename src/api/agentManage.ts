import request from '@/utils/http'

// 获取代理商
export function fetchList(params: Api.AgentManage.SearchParams) {
  return request.post<Api.AgentManage.List>({
    url: '/backend/agent/list',
    params
  })
}

export function agentFreeze(params: any) {
  return request.post<any>({
    url: '/backend/agent/frozen',
    params
  })
}

/// 下架
export function agentTakeDown(params: any) {
  return request.post<any>({
    url: '/backend/agent/take/down',
    params
  })
}

// 场地上下架
export function venueTakeDown(params: any) {
  return request.post<any>({
    url: '/backend/agent/venue/take/down',
    params
  })
}

/// 更新昨日营业额
export function agentUpdateYesterdayTurnover(params: any) {
  return request.post<any>({
    url: '/backend/agent/update/yesterday/turnover',
    params
  })
}

/// 删除
export function agentDelete(params: any) {
  return request.post<any>({
    url: '/backend/agent/delete',
    params
  })
}

// 余额列表
export function fetchBalanceList(params: Api.AgentManage.SearchBalanceParams) {
  return request.post<Api.AgentManage.BalanceList>({
    url: '/backend/agent/wallet/log',
    params
  })
}

// 场地列表
export function fetchVenueList(params: Api.AgentManage.SearchParams) {
  return request.post<Api.AgentManage.VenueList>({
    url: '/backend/agent/venue/list',
    params
  })
}

// 场地列表
export function venueSort(params: any) {
  return request.post<any>({
    url: '/backend/agent/venue/change/sort',
    params
  })
}

/// 删除
export function venueDelete(params: any) {
  return request.post<any>({
    url: '/backend/agent/venue/delete',
    params
  })
}
// 创建代理商
export function agentCreate(params: any) {
  return request.post<any>({
    url: '/backend/agent/create',
    params
  })
}

// 编辑代理商
export function agentUpdate(params: any) {
  return request.post<any>({
    url: '/backend/agent/update',
    params
  })
}
export function agentDetail(params: any) {
  return request.post<any>({
    url: '/backend/agent/detail',
    params
  })
}

export function getCarList(params: any) {
  return request.post<Api.AgentManage.VenueCarList>({
    url: '/backend/agent/venue/vehicle/list',
    params
  })
}

export function editAgentPwd(params: any) {
  return request.post<any>({
    url: '/backend/agent/change/password',
    params
  })
}

export function editAgentBalace(params: any) {
  return request.post<any>({
    url: '/backend/agent/change/balance',
    params
  })
}
