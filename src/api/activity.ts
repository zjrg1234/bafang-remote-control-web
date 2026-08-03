import request from '@/utils/http'

export function fetchActList(params: Api.Activity.SearchParams) {
  return request.post<Api.Activity.List>({
    url: '/backend/activity/list',
    params
  })
}

export function addAct(params: any) {
  return request.post<any>({
    url: '/backend/activity/create',
    params
  })
}

export function editAct(params: any) {
  return request.post<any>({
    url: '/backend/activity/update',
    params
  })
}

export function delAct(params: any) {
  return request.post<any>({
    url: '/backend/activity/delete',
    params
  })
}

export function changeActStatus(params: any) {
  return request.post<any>({
    url: '/backend/activity/change/status',
    params
  })
}
