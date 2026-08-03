export const ActivityList = {
  code: 200,
  msg: '',
  data: {
    page: 1,
    size: 10,
    total: 1,
    isLast: 1,
    content: [
      {
        id: 1,
        type: 1, //公告所属类型 :1平台公告 2专区公告
        special_area: 0,
        //所属专区id
        special_area_name: '', //专区名称
        activity_title: '测试', //标题
        activity_image: 'aaa.com', //活动图片
        is_index: 1, //是否首页显示0否 1是
        index_image: '', //首页图片
        is_discover: 0, //是否发现页显示 0否 1是
        discover_image: '', //发现页图片
        content: '<p>测试测试</p>', //内容
        activity_type: 0, //活动公告指向类型 1活动公告 2排行榜
        status: 1, //状态 0不启用 1启用
        sort: 1, //排序号
        remark: 'aaaa', // 备注
        created_at: '2026-01-10T06:44:48.000000Z',
        updated_at: '2026-01-10T06:44:48.000000Z'
      }
    ]
  },
  traceId: '6961f5643c72f'
}
