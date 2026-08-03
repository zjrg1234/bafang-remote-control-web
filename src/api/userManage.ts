import request from '@/utils/http'

// 获取充值列表
export function fetchList(params: Api.UserManage.SearchParams) {
  return request.post<Api.UserManage.List>({
    url: '/backend/user/list',
    params
  })
}

// 余额列表
export function fetchBalanceList(params: Api.UserManage.SearchBalanceParams) {
  return request.post<Api.UserManage.BalanceList>({
    url: '/backend/user/balance/list',
    params
  })
}

// 能量列表
export function fetchEnergyList(params: Api.UserManage.SearchBalanceParams) {
  return request.post<Api.UserManage.BalanceList>({
    url: '/backend/user/energy/list',
    params
  })
}

export function editPwd(params: any) {
  return request.post<any>({
    url: '/backend/user/change/password',
    params
  })
}

export function editBalance(params: any) {
  return request.post<any>({
    url: '/backend/user/change/balance',
    params
  })
}

export function editEnergy(params: any) {
  return request.post<any>({
    url: '/backend/user/change/energy',
    params
  })
}

/// 冻结用户
export function userFreeze(params: any) {
  return request.post<any>({
    url: '/backend/user/frozen',
    params
  })
}

/// 删除用户
export function userdelete(params: any) {
  return request.post<any>({
    url: '/backend/user/delete',
    params
  })
}

/// 获取用户余额变更记录
export function getEditbalanceRecord(params: any) {
  return request.post<Api.UserManage.BalanceEditRecordList>({
    url: '/backend/user/change/balance/log',
    params
  })
}

/// 获取用户能量变更记录
export function getEditEnergyRecord(params: any) {
  return request.post<Api.UserManage.EnergyEditRecordList>({
    url: '/backend/user/change/energy/log',
    params
  })
}

// 用户余额列表
export function getUserWalletRecord(params: any) {
  return request.post<Api.UserManage.WalletRecord>({
    url: '/backend/user/wallet/list',
    params
  })
}

// 修改钱包余额
export function changeUserWalletBalance(params: any) {
  return request.post<any>({
    url: '/backend/user/change/wallet/balance',
    params
  })
}

export function screenshot(params: any) {
  return request.post<any>({
    url: '/backend/user/update/screenshot',
    params
  })
}

export function GetWalletDetail(params: any) {
  return request.post<Api.UserManage.BalanceList>({
    url: '/backend/user/wallet/detail',
    params
  })
}
