import request from '@/utils/http'

export function fetchCommonQuestionList(params: any) {
  return request.post<Api.platformSetManage.List>({
    url: '/backend/common/problem/list',
    params
  })
}

// 新增
export function addQues(params: any) {
  return request.post<any>({
    url: '/backend/common/problem/create',
    params
  })
}

// 新增
export function editQues(params: any) {
  return request.post<any>({
    url: '/backend/common/problem/update',
    params
  })
}

// 新增
export function delQues(params: any) {
  return request.post<any>({
    url: '/backend/common/problem/delete',
    params
  })
}

// 协议
export function fetchAgreeList(params: any) {
  return request.post<Api.platformSetManage.agreeList>({
    url: '/backend/protocol/manage/list',
    params
  })
}

export function editAgreeList(params: any) {
  return request.post<any>({
    url: '/backend/protocol/manage/update',
    params
  })
}

// 协议
export function fetchFeedbackList(params: any) {
  return request.post<Api.platformSetManage.feedbackList>({
    url: '/backend/feed/back/list',
    params
  })
}

export function editFeedback(params: any) {
  return request.post<any>({
    url: '/backend/feed/back/update',
    params
  })
}

export function getAdvertPageImage(params: any) {
  return request.post<Api.platformSetManage.advertPageImageList>({
    url: '/backend/advertising/list',
    params
  })
}
export function addAdvertPageImage(params: any) {
  return request.post<any>({
    url: '/backend/advertising/create',
    params
  })
}

export function editAdvertPageImage(params: any) {
  return request.post<any>({
    url: '/backend/advertising/update',
    params
  })
}
export function delAdvertPageImage(params: any) {
  return request.post<any>({
    url: '/backend/advertising/delete',
    params
  })
}

// 版本管理
export function getVersion(params: any) {
  return request.post<Api.platformSetManage.versionList>({
    url: '/backend/version/list',
    params
  })
}

export function editVersion(params: any) {
  return request.post<Api.platformSetManage.versionList>({
    url: '/backend/version/update',
    params
  })
}

export function addVersion(params: any) {
  return request.post<Api.platformSetManage.versionList>({
    url: '/backend/version/create',
    params
  })
}
export function delVersion(params: any) {
  return request.post<Api.platformSetManage.versionList>({
    url: '/backend/version/delete',
    params
  })
}

export function getLoginDialog(params: any) {
  return request.post<Api.platformSetManage.loginList>({
    url: '/backend/popup/list',
    params
  })
}

export function addLoginDialog(params: any) {
  return request.post<any>({
    url: '/backend/popup/create',
    params
  })
}

export function editLoginDialog(params: any) {
  return request.post<any>({
    url: '/backend/popup/update',
    params
  })
}
export function delLoginDialog(params: any) {
  return request.post<any>({
    url: '/backend/popup/delete',
    params
  })
}

export function getPlatformParamList(params: any) {
  return request.post<Api.platformSetManage.PlatformParamList>({
    url: '/backend/parameter/list',
    params
  })
}

export function editPlatformParamList(params: any) {
  return request.post<any>({
    url: '/backend/parameter/update',
    params
  })
}

// 车辆类型图片
export function getCarImageList(params: Api.platformSetManage.SearchCarImgParams) {
  return request.post<Api.platformSetManage.CarImageListItem>({
    url: '/backend/vehicle/image/list',
    params
  })
}

export function addCarImage(params: any) {
  return request.post<any>({
    url: '/backend/vehicle/image/create',
    params
  })
}

export function editCarImage(params: any) {
  return request.post<any>({
    url: '/backend/vehicle/image/update',
    params
  })
}

export function delCarImage(params: any) {
  return request.post<any>({
    url: '/backend/vehicle/image/delete',
    params
  })
}

export function changeStatusCarImage(params: any) {
  return request.post<any>({
    url: '/backend/vehicle/image/change/status',
    params
  })
}

export function getCarImageType() {
  return request.post<any>({
    url: '/backend/vehicle/image/type/list'
  })
}

export function getNoticeList() {
  return request.post<Api.platformSetManage.NoticeListItem>({
    url: '/backend/notice/list'
  })
}

export function addNotice(params: any) {
  return request.post<any>({
    url: '/backend/notice/create',
    params
  })
}

export function delNotice(params: any) {
  return request.post<any>({
    url: '/backend/notice/delete',
    params
  })
}

export function updateNotice(params: any) {
  return request.post<any>({
    url: '/backend/notice/update',
    params
  })
}
