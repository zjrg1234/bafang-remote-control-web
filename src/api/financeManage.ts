import request from '@/utils/http'

// 获取支付列表
export function fetchPaymentList(params: any) {
  return request.post<Api.FinanceManage.PaymentList>({
    url: '/backend/payment/list',
    params
  })
}

// 提现记录列表
export function fetchWithdrawList(params: any) {
  return request.post<Api.FinanceManage.WithdrawList>({
    url: '/backend/withdraw/list',
    params
  })
}

// 充值退款列表
export function fetchRefundList(params: any) {
  return request.post<Api.FinanceManage.RefundList>({
    url: '/backend/refund/list',
    params
  })
}

// 提现审核
export function withdrawAudit(params: any) {
  return request.post<any>({
    url: '/backend/withdraw/audit',
    params
  })
}
