export const ArticleList = [
  {
    id: 11,
    username: '小狗小狗', //用户姓名
    nick_name: '小狗小狗', //用户姓名
    phone_number: '13785889173', //手机号
    special_area_name: '笆斗', //专区
    head_shot: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', //头像
    is_real_name: 0, //是否实名
    real_name: '', //真是姓名
    register_time: '2025-12-19 07:14:09', //注册时间
    balance: 0, //余额
    energy: 0, //能量
    online: 0,
    is_cancel: 0, //是否注销 0否1是
    is_frozen: 0, //是否冻结 0否1是
    is_activation: 0 //是否激活0否1是
  }
]

export const agentList = {
  code: 200,
  msg: '',
  data: {
    page: 1,
    size: 1,
    total: 6,
    isLast: 6,
    content: [
      {
        id: 1,
        agent_name: '笆斗', //代理商名称
        level: 1, //代理商等级 1一级代理 2二级代理
        phone_number: '13758813809', //手机号
        venue_quantity: 0, //场地数量
        create_site_quantity: 50, //可创建场地数量
        is_support: 1, //是否自营 0否 1是
        head_shot: 'aaa.png', //头像
        provinces: '', //无用先不管
        city: '', //无用先不管
        register_time: '1970-01-01 00:00:00', //注册时间
        review_status: 0, //审核状态 0待审核 1已通过
        support_status: 0, //营业状态 0待定 1营业中
        is_cancel: 0, //是否注销 0否 1是
        sorting: 1, //排序
        yesterday_turnover: 0, //昨日营业额
        superior_agent_id: 0, //上级代理id
        withdrawal_amount: 0, //冻结金额或 提现金额
        first_handling_fee: '0%', //上级代理抽成百分比
        company_handling_fee: '0%', //公司抽成百分比
        balance: 0, //余额
        superior_agent_name: '掌控视界' //上级代理商名称
      }
    ]
  },
  traceId: '694cf38def2f4'
}

export const areaList = {
  code: 200,
  msg: '',
  data: {
    page: 1,
    size: 1,
    total: 6,
    isLast: 6,
    content: [
      {
        id: 1,
        agent_id: 1,
        venue_name: '测试', //场地名称
        agent_name: 'ddssd sd', //代理商名称
        start_time: '00:27', //开始营业
        end_time: '00:28', //结束
        deposit: 0, //押金
        support_status: 1, //营业状态0未营业 1已营业
        created_at: '2025-11-05 08:25:55', //创建时间
        type: 1,
        type_name: '遥控车',
        venue_introduction: '测试', //场地介绍
        vehicles_number: 0, //车辆数量
        online_vehicle_number: 0 //在线车辆
      }
    ]
  },
  traceId: '694d080ac69c2'
}

export const orderRecord = {
  code: 200,
  msg: '',
  data: {
    page: 1,
    size: 10,
    total: 1,
    isLast: 1,
    content: [
      {
        id: '1',
        user_name: '大笆斗', //用户
        order_no: 'aaacasd13213121', //预约号
        phone: '13785889191', //手机
        venue_id: 1, //场地id
        venue_name: '测试', //场地名称
        vehicle_id: 12, //车辆ID
        vehicle_name: '飞车21111', //车辆名称
        payment_type: 1, //支付类型  1电池 2能量
        reservation_status: 4, //预约状态 1已预约 2待使用 3使用中 4已完成 5已取消
        payment_amount: 10, //金额
        start_time: '2025-12-25 14:06:52', //开始时间
        end_time: '2025-12-25 14:06:58', //结束时间
        order_time: '2025-12-25 14:06:41', //订单生成时间
        billing_method: 0, //计费方式0按时间 1按次
        appeal_status: 0, //申诉状态 0未申请 1待处理 2已处理
        billing_rules: '20电池每分钟', //计费规则
        special_area: 1,
        special_area_name: '笆斗' //专区
      }
    ]
  },
  traceId: '694d457228ee1'
}

export const refundRecord = {
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
        user_name: '笆斗', //用户名称
        order_no: 'asdsad1213123', //预约号
        phone: '12311234441', //手机号
        venue_id: 1, //场地id
        venue_name: '测试',
        vehicle_id: 12, //车辆id
        vehicle_name: '测试',
        reservation_status: 2, //预约状态
        amount: 10, //金额
        time: '2025-12-26 11:04:54', //时间
        billing_method: 0, //计费方式0按时间 1按次
        appeal_status: 1, //申诉状态 0未申请 1待处理 2已处理
        refund_amount: 2, //可退金额
        refund_type: 0, //退款 0未退 1 已退
        refund_cause: '画面黑屏', //申诉原因
        platform_reply: '画面黑屏', //平台回复
        image: 'aaaa.png' //申诉图片
      }
    ]
  },
  traceId: '694e6c58243ee'
}
