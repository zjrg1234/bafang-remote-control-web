/**
 * namespace: Api
 *
 * 所有接口相关类型定义
 * 在.vue文件使用会报错，需要在 eslint.config.mjs 中配置 globals: { Api: 'readonly' }
 */

declare namespace Api {
  /** 通用类型 */
  namespace Common {
    /** 分页参数 */
    interface PaginationParams {
      /** 当前页码 */
      page: number
      /** 每页条数 */
      size: number
      /** 总条数 */
      total: number
    }

    /** 通用搜索参数 */
    type CommonSearchParams = Pick<PaginationParams, 'page' | 'size'>

    /** 分页响应基础结构 */
    interface PaginatedResponse<T = any> {
      [x: string]: string
      code: number
      data: any
      records: T[]
      page: number
      size: number
      total: number
    }

    /** 启用状态 */
    type EnableStatus = '1' | '2'
  }

  /** 认证类型 */
  namespace Auth {
    /** 登录参数 */
    interface LoginParams {
      username: string
      password: string
    }

    /** 登录响应 */
    interface LoginResponse {
      token: string
      refreshToken: string
    }

    /** 用户信息 */
    interface UserInfo {
      buttons: string[]
      roles: string[]
      userId: number
      userName: string
      email: string
      avatar?: string
    }
  }

  /** 系统管理类型 */
  namespace SystemManage {
    /** 用户列表 */
    type UserList = Api.Common.PaginatedResponse<UserListItem>

    /** 用户列表项 */
    interface UserListItem {
      id: number
      avatar: string
      status: string
      userName: string
      userGender: string
      nickName: string
      userPhone: string
      userEmail: string
      userRoles: string[]
      createBy: string
      createTime: string
      updateBy: string
      updateTime: string
    }

    /** 用户搜索参数 */
    type UserSearchParams = Partial<
      Pick<UserListItem, 'id' | 'userName' | 'userGender' | 'userPhone' | 'userEmail' | 'status'> &
        Api.Common.CommonSearchParams
    >

    /** 角色列表 */
    type RoleList = Api.Common.PaginatedResponse<RoleListItem>

    /** 角色列表项 */
    interface RoleListItem {
      roleId: number
      roleName: string
      roleCode: string
      description: string
      enabled: boolean
      createTime: string
    }

    /** 角色搜索参数 */
    type RoleSearchParams = Partial<
      Pick<RoleListItem, 'roleId' | 'roleName' | 'roleCode' | 'description' | 'enabled'> &
        Api.Common.CommonSearchParams
    >
  }

  /** 数据分析类型 */
  namespace StatAnalysis {
    /**  */
    type List = Api.Common.PaginatedResponse<ListItem>
    /** 用户列表项 */
    interface ListItem {
      phone: string
    }

    /** 搜索参数 */
    type SearchParams = Partial<Pick<ListItem, 'phone' | 'area'> & Api.Common.CommonSearchParams>
  }

  /** 用户管理 */
  namespace UserManage {
    /**  */
    type List = Api.Common.PaginatedResponse<ListItem>

    type EnergyEditRecordList = Api.Common.PaginatedResponse<EnergyEditRecordListItem>
    type WalletRecord = Api.Common.PaginatedResponse<WalletRecordItem>
    interface WalletRecordItem {
      id: number
      uid: number
      balance: number
      special_area_name: string
    }
    interface EnergyEditRecordListItem {
      id: number
      user_id: number
      make_order_no: string
      amount: number
      balance: number
      make_order_no: string
      venue: string
      operator_name: string
      time: string
      special_area_name: string
    }
    /** 余额变更记录列表 */
    type BalanceEditRecordList = Api.Common.PaginatedResponse<BalanceEditRecordListItem>
    /** 余额变更记录列表项 */
    interface BalanceEditRecordListItem {
      id: number
      user_id: number
      make_order_no: string
      amount: number
      balance: number
      make_order_no: string
      venue: string
      operator_name: string
      time: string
      special_area_name: string
    }
    /** 用户列表项 */
    interface ListItem {
      id: string
      username: string
      phone_number: string
      special_area_name: string
      head_shot: string
      is_real_name: number //是否实名
      real_name: string //真是姓名
      register_time: string //注册时间
      balance: number //余额
      energy: number //能量
      online: number
      is_cancel: number //是否注销 0否1是
      is_frozen: number //是否冻结 0否1是
      is_activation: number //是否激活0否1是
    }

    /** 搜索参数 */
    type SearchParams = Partial<Pick<ListItem, 'id'> & Api.Common.CommonSearchParams>
    type SearchBalanceParams = Partial<
      Pick<ListItem, 'id' | 'type' | 'start_time' | 'end_time'> & Api.Common.CommonSearchParams
    >
    type BalanceList = Api.Common.PaginatedResponse<BalanceListItem>
    /** 余额列表项 */
    interface BalanceListItem {
      id: number
      type_name: string
      amount: number
      balance: number
      make_order_no: string
      venue: string
      activity_record_id: string
      time: string
      energy: string
    }
  }

  /** 系统管理类型 */
  namespace orderManage {
    /** 用户列表 */
    type UserList = Api.Common.PaginatedResponse<UserListItem>

    /** 用户列表项 */
    interface UserListItem {
      id: number
      avatar: string
      status: string
      userName: string
      userGender: string
      nickName: string
      userPhone: string
      userEmail: string
      userRoles: string[]
      createBy: string
      createTime: string
      updateBy: string
      updateTime: string
    }

    /** 用户搜索参数 */
    type UserSearchParams = Partial<
      Pick<UserListItem, 'id' | 'userName' | 'userGender' | 'userPhone' | 'userEmail' | 'status'> &
        Api.Common.CommonSearchParams
    >

    /** 角色列表 */
    type RoleList = Api.Common.PaginatedResponse<RoleListItem>

    /** 角色列表项 */
    interface RoleListItem {
      roleId: number
      roleName: string
      roleCode: string
      description: string
      enabled: boolean
      createTime: string
    }

    /** 角色搜索参数 */
    type RoleSearchParams = Partial<
      Pick<RoleListItem, 'roleId' | 'roleName' | 'roleCode' | 'description' | 'enabled'> &
        Api.Common.CommonSearchParams
    >
  }

  /** 系统管理类型 */
  namespace AgentManage {
    type List = Api.Common.PaginatedResponse<ListItem>
    type BalanceList = Api.Common.PaginatedResponse<BalanceListItem>
    type VenueList = Api.Common.PaginatedResponse<VenueListItem>
    type VenueCarList = Api.Common.PaginatedResponse<VenueCarListItem>
    /** 车辆列表项 */
    interface VenueCarListItem {
      id: number
      vehicle_battery: string
      vehicle_name: string
      vehicle_state: string
      created_at: string
    }
    /** 场地列表项 */
    interface VenueListItem {
      id: number
      agent_id: number
      venue_name: string
      venue_address: string
      venue_phone: string
      venue_cover: string
      venue_description: string
      create_time: string
      support_status: number
    }
    interface BalanceListItem {
      id: number
      type_name: string
      amount: number
      balance: number
      make_order_no: string
      venue: string
      activity_record_id: string
      time: string
      energy: string
    }
    interface ListItem {
      phone_number: any
      agent_name: string
      is_cancel: any
      review_status: any
      review_status: any
      is_support: any
      support_status: any
      is_frozen: any
      level: any
      superior_agent_name: ''
    }

    type SearchParams = Partial<Pick<ListItem, 'level'> & Api.Common.CommonSearchParams>

    type SearchBalanceParams = Partial<Pick<ListItem, 'type'> & Api.Common.CommonSearchParams>
    type SearchVenueParams = Partial<
      Pick<VenueListItem, 'venue_name' | 'agent_id' | 'labels'> & Api.Common.CommonSearchParams
    >
  }

  namespace commonApi {
    interface resp {
      id: number
      agent_name: string
    }
  }

  namespace OrderManage {
    type List = Api.Common.PaginatedResponse<ListItem>
    type RefundRecordList = Api.Common.PaginatedResponse<RefundRecordListItem>
    interface RefundRecordListItem {
      id: number
    }

    type SearchParams = Partial<
      Pick<ListItem, 'phone' | 'user_name' | 'order_no'> & Api.Common.CommonSearchParams
    >

    type SearchBalanceParams = Partial<
      Pick<ListItem, 'phone_number'> & Api.Common.CommonSearchParams
    >
    type SearchVenueParams = Partial<
      Pick<VenueListItem, 'venue_name' | 'agent_id' | 'labels'> & Api.Common.CommonSearchParams
    >
  }

  namespace platformSetManage {
    type List = Api.Common.PaginatedResponse<ListItem>
    type agreeList = Api.Common.PaginatedResponse<AgreeListItem>
    type feedbackList = Api.Common.PaginatedResponse<FeedbackListItem>
    type advertPageImageList = Api.Common.PaginatedResponse<AdvertPageImageListItem>
    type loginList = Api.Common.PaginatedResponse<LoginListItem>
    type carImageList = Api.Common.PaginatedResponse<CarImageListItem>
    /** 平台参数列表 */
    type PlatformParamList = Api.Common.PaginatedResponse<PlatformParamListItem>

    interface NoticeListItem {
      id: number
      status: number
      content: string
    }

    /** 平台参数列表项 */
    interface PlatformParamListItem {
      id: number
      title: string
      value: string
    }
    /** 车辆类型图片列表项 */
    interface CarImageListItem {
      id: number
      name: string
      type: number
      image: string
      status: number
    }
    /** 登录列表项 */
    interface LoginListItem {
      id: number
      content: string
      type: string
    }

    /** 版本列表 */
    type versionList = Api.Common.PaginatedResponse<VersionListItem>
    /** 版本列表项 */
    interface VersionListItem {
      id: number
      version_mark: string //版本号
      version_coding: string //版本编码
      type: number //1苹果 2安卓
      update_content: string //更新内容
      is_change_special: number //是否转区 0否1是
      forced_updating: number //是否强制更新  0否 1 是
      status: number //状态 0禁用 1启用
      app_url: string //安卓使用
      created_at: string
    }
    /** 广告页图片列表项 */
    interface AdvertPageImageListItem {
      id: number
      name: string
      type: number
      image: string
      status: string
    }
    interface ListItem {
      id: number
      name: number
      sort: string
    }

    interface AgreeListItem {
      id: number
      name: string
      content: string
      created_at: string
    }

    interface FeedbackListItem {
      id: number
      user_name: string
      phone: string
      content: string
      appeal_status: number
      created_at: string
    }

    type SearchParams = Partial<
      Pick<ListItem, 'phone' | 'user_name'> & Api.Common.CommonSearchParams
    >

    type SearchBalanceParams = Partial<
      Pick<ListItem, 'phone_number'> & Api.Common.CommonSearchParams
    >
    type SearchVenueParams = Partial<
      Pick<VenueListItem, 'venue_name' | 'agent_id' | 'labels'> & Api.Common.CommonSearchParams
    >

    type SearchCarImgParams = Partial<
      Pick<VenueListItem, 'type' | 'name'> & Api.Common.CommonSearchParams
    >
  }

  namespace CarManage {
    type List = Api.Common.PaginatedResponse<ListItem>
    type DrivingRecord = Api.Common.PaginatedResponse<ListItem>
    interface ListItem {
      id: number
      name: string
    }
    type SearchParams = Partial<
      Pick<ListItem, 'phone' | 'user_name'> & Api.Common.CommonSearchParams
    >
  }

  namespace Activity {
    type List = Api.Common.PaginatedResponse<ListItem>
    interface ListItem {
      id: number
      type: string
      special_area: string
      special_area_name: string
      activity_title: string
      activity_image: string
      is_index: string
      index_image: string
      is_discover: string
      discover_image: string
      content: string
      activity_type: number
      status: string
      sort: number
      remark: string
      created_at: string
      updated_at: string
    }
    type SearchParams = Partial<
      Pick<ListItem, 'activity_title' | 'type' | 'status' | 'special_area'> &
        Api.Common.CommonSearchParams
    >
  }

  namespace FinanceManage {
    type PaymentList = Api.Common.PaginatedResponse<PaymentListItem>
    type WithdrawList = Api.Common.PaginatedResponse<WithdrawListItem>
    type RefundList = Api.Common.PaginatedResponse<RefundListItem>
    interface WithdrawListItem {
      id: number
      withdraw_type: number
      status: number
    }
    interface RefundListItem {
      refund_type: number
      time: string
    }

    interface PaymentListItem {
      pay_type: number
      id: number
      withdraw_type: number
    }
  }

  namespace RechargeAct {
    type List = Api.Common.PaginatedResponse<ListItem>
    interface ListItem {
      id: number
      num: number
      type: number
      sort: number
      remark: string
    }
    type SearchParams = Partial<Pick<ListItem, 'type'> & Api.Common.CommonSearchParams>
  }
  namespace RechargeRecord {
    type List = Api.Common.PaginatedResponse<ListItem>
    interface ListItem {
      id: number
      activity_id: string
    }
    type SearchParams = Partial<Pick<ListItem, 'type'> & Api.Common.CommonSearchParams>
  }
}
