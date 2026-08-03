import request from '@/utils/http'

// 车辆管理
export function fetchCarList(params: Api.CarManage.SearchParams) {
  return request.post<Api.CarManage.List>({
    url: '/backend/vehicle/list',
    params
  })
}

// 删除
export function delCar(params: any) {
  return request.post<any>({
    url: '/backend/agent/vehicle/delete',
    params
  })
}

export function getCarDetail(params: any) {
  return request.post<any>({
    url: '/backend/vehicle/detail',
    params
  })
}

export function getDrivingRecord(params: any) {
  return request.post<Api.CarManage.DrivingRecord>({
    url: '/backend/driving/record',
    params
  })
}
