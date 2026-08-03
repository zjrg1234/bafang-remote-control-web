import request from '@/utils/http'

// 用户数量统计
export function fetchAccountList(params: Api.StatAnalysis.SearchParams) {
  return request.post<Api.StatAnalysis.List>({
    url: '/backend/special/account/list',
    params
  })
}

// 用户充值统计
export function fetchDepositList(params: Api.StatAnalysis.SearchParams) {
  return request.post<Api.StatAnalysis.List>({
    url: '/backend/special/deposit/list',
    params
  })
}
