export const carManageData = {
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
        agent_id: 1,
        venue_id: 0,
        venue_name: '12132332', //所属人名称
        vehicle_type: 10, //车辆类型 10-19四驱车、20-29挖机、30-39推土机、（后续顺延）
        vehicle_image:
          'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg', //车辆图片
        vehicle_name: '飞车21111', //车辆名称
        battery_time: 0,
        battery: '3',
        vehicle_introduction: '厉害11',
        top_speed: '20km/s',
        front_camera: 'aaaaaa',
        rear_camera: 'bbbbbbb',
        transmitter_id: '123111123',
        receiver_id: '12313133',
        vehicle_sorting: 1,
        status: 0,
        vehicle_state: 0,
        //车辆状态 0离线 1接收机在线 2发射机在线
        vehicle_battery: '22', //电量
        password: '',
        is_password: 0,
        forward_type: 0,
        binding_name: '遥控器', //绑定状态名称
        created_at: '2026-01-01 09:27:16',
        updated_at: '2026-01-01 09:27:16'
      }
    ]
  },
  traceId: '6958d5bb4ad79'
}

export const drivingRecordData = {
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
        user_name: '大笆斗', //预约人
        order_no: 'aaacasd13213121', //预约号
        phone: '13785889191', //手机号
        venue_id: 1,
        venue_name: '测试', //场地
        vehicle_id: 12,
        vehicle_name: '飞车21111', //车辆
        payment_type: 1, //支付类型 1电池 2能量
        reservation_status: 4,
        payment_amount: 8, //支付金额
        start_time: '2025-12-25 14:06:52', //开始时间
        end_time: '2025-12-25 14:06:58', //结束时间
        order_time: '2025-12-25 14:06:41',
        billing_method: 0, //计费方式 0按时间 1按次
        billing_rules: '20电池每分钟',
        special_area: 1,
        special_area_name: '笆斗',
        driving_time: 6 //驾驶时长
      }
    ]
  },
  traceId: '6961fc82d436d'
}
