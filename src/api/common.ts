import request from '@/utils/http'

/**
 * 登录
 * @param params 登录参数
 * @returns 登录响应
 */
export function fetchSpecialAreaList(params: any) {
  return request.post<any>({
    url: '/backend/special/list',
    params
  })
}

//获取与余额相关的类型
export function fetchTypeList(params: any) {
  return request.post<any>({
    url: '/backend/type/list',
    params
  })
}

//获取与余额相关的类型
export function fetchAgentTypeList(params: any) {
  return request.post<any>({
    url: '/backend/agent/type/list',
    params
  })
}

//获取与余额相关的类型
export function fetchCarTypeList(params: any) {
  return request.post<any>({
    url: '/backend/type/list',
    params
  })
}

// 获取车辆详情
export function fetchCarDetail(params: any) {
  return request.post<any>({
    url: '/backend/agent/vehicle/detail',
    params
  })
}
