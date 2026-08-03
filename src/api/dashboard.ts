import request from '@/utils/http'

/**
 * 获取首页数据
 * @param params 首页数据参数
 * @returns 首页数据响应
 */
export function fetchDashboardData() {
  return request.post<any>({
    url: '/backend/index'
  })
}
