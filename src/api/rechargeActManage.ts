import request from '@/utils/http'

/**
 * 获取活动记录列表
 * @param params 活动记录列表参数
 * @returns 活动记录列表响应
 */
export function fetchRechargeActList(params: Api.RechargeAct.SearchParams) {
  return request.post<Api.RechargeAct.List>({
    url: '/backend/deposit/activity/list',
    params
  })
}

export function addRechargeAct(params: any) {
  return request.post<any>({
    url: '/backend/deposit/activity/create',
    data: params
  })
}

export function editRechargeAct(params: any) {
  return request.post<any>({
    url: '/backend/deposit/activity/update',
    data: params
  })
}

export function changeStatus(params: any) {
  return request.post<any>({
    url: '/backend/deposit/activity/change/type',
    data: params
  })
}

export function delRechargeAct(params: any) {
  return request.post<any>({
    url: '/backend/deposit/activity/delete',
    data: params
  })
}

export function getRechargeActRecord(params: any) {
  return request.post<Api.RechargeRecord.List>({
    url: '/backend/deposit/activity/record',
    data: params
  })
}
