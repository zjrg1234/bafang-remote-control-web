export const commonQuestionList = {
  code: 200,
  msg: '获取成功',
  data: [
    {
      id: 1,
      name: 'aaa', //标题
      sort: 1, //排序
      status: 1, //状态
      detail: '<p>测11111试测试</p>', //详情
      created_at: '2025-12-28 09:18:56', //创建时间
      updated_at: '2025-12-28 09:18:56'
    }
  ],
  traceId: '6950f634316e5'
}

export const agreeList = {
  code: 200,
  msg: '获取成功',
  data: [
    {
      id: 1,
      type: 1,
      name: '用户驾驶协议',
      content: '<p>aaaa</p>',
      created_at: '2025-12-28T11:39:31.000000Z',
      updated_at: '2025-12-28T11:39:31.000000Z'
    }
  ],
  traceId: '6951178a9cfec'
}

export const feedbackList = {
  code: 200,
  msg: '获取成功',
  data: [
    {
      id: 1,
      uid: 1,
      agents_id: 1,
      user_name: '测试测试', //用户名称
      phone: '13788849821', //手机
      content: '黑屏不能玩', //内容
      image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', //图片
      type: 0, //状态 0未回复1已回复
      time: '2025-12-28 12:23:11', //时间
      remark: '', //回复内容
      created_at: '2025-12-28T12:24:25.000000Z',
      updated_at: '2025-12-28T12:24:25.000000Z'
    }
  ],
  traceId: '6951178a9cfec'
}

export const advertPageImageList = {
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
        title: '测试测试', //标题
        image: '', //图片
        status: 1, //是否默认
        type: 0,
        created_at: '2026-01-03T06:35:18.000000Z',
        updated_at: '2026-01-03T06:35:18.000000Z'
      }
    ]
  },
  traceId: '6958b8d395adb'
}

export const versionList = {
  code: 200,
  msg: '',
  data: {
    page: 1,
    size: 10,
    total: 2,
    isLast: 1,
    content: [
      {
        id: 1,
        version_mark: '1.1', //版本号
        version_coding: '1111', //版本编码
        type: 1, //1苹果 2安卓
        update_content: 'aaaaaa', //更新内容
        is_change_special: 0, //是否转区 0否1是
        forced_updating: 0, //是否强制更新  0否 1 是
        status: 1, //状态 0禁用 1启用
        app_url: '', //安卓使用
        created_at: '2026-01-03T07:09:21',
        updated_at: '2026-01-03T07:09:21'
      },
      {
        id: 2,
        version_mark: '1.1',
        version_coding: '1111',
        type: 1,
        update_content: 'aaaaaa',
        is_change_special: 0,
        forced_updating: 0,
        status: 1,
        app_url: '',
        created_at: '2026-01-03T07:10:14',
        updated_at: '2026-01-03T07:10:14'
      }
    ]
  },
  traceId: '6958c0e49b336'
}

export const loginDialog = {
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
        content: '<p>aaaaaaa</p>', //内容
        type: 1, // 0否1是
        created_at: '2026-01-03T07:36:29.000000Z',
        updated_at: '2026-01-03T07:36:29.000000Z'
      }
    ]
  },
  traceId: '6958c70015438'
}

export const platformParamList = {
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
        title: '微信', // 标题
        value: '123338211932', //内容
        created_at: '2026-01-03T07:47:26.000000Z',
        updated_at: '2026-01-03T07:47:26.000000Z'
      }
    ]
  },
  traceId: '6958c9944b5f6'
}

export const carImgList = {
  code: 200,
  msg: '',
  data: [
    {
      id: '1',
      type: 1,
      image:
        'https://hzyk.oss-cn-beijing.aliyuncs.com/temp/微信截图_20250101184909_1735735626521.jpg',
      status: 1,
      createTime: '2025-01-01',
      updateTime: null,
      updateBy: null,
      type_name: '遥控船默认图片'
    },
    {
      id: '2',
      type: 1,
      image:
        'https://hzyk.oss-cn-beijing.aliyuncs.com/temp/微信截图_20250101184909_1735735626521.jpg',
      status: 1,
      createTime: '2025-01-01',
      createBy: 'admin8877555rrpppjn5',
      updateTime: null,
      updateBy: null,
      type_name: '遥控船默认图片'
    }
  ],
  traceId: '6958c9944b5f6'
}
