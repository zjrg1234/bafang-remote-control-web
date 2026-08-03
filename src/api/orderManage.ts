import request from '@/utils/http'

// 预约记录
export function fetchOrderList(params: Api.OrderManage.SearchParams) {
  return request.post<Api.OrderManage.List>({
    url: '/backend/reservation/record',
    params
  })
}

// 预约申诉记录
export function fetchOrderAppealList(params: Api.OrderManage.SearchParams) {
  return request.post<Api.OrderManage.List>({
    url: '/backend/complaint/record',
    params
  })
}

// 处理申诉信息
export function handleOrderAppeal(params: any) {
  return request.post<any>({
    url: '/backend/complaint/update',
    params
  })
}

// 预约退款记录
export function getRefundRecord(params: Api.OrderManage.SearchParams) {
  return request.post<Api.OrderManage.RefundRecordList>({
    url: '/backend/refund/record',
    params
  })
}
