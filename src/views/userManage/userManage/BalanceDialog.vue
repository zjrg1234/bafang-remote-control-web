<template>
  <div>
    <el-dialog
      v-model="dialogFormVisible"
      title="余额记录"
      class="top-right-dialog"
      width="800"
      :append-to-body="true"
    >
      <ArtSearchBar
        ref="searchBarRef"
        v-model="searchFormState"
        :items="searchItems"
        :is-expand="false"
        :show-expand="true"
        :show-reset-button="true"
        :show-search-button="true"
        :disabled-search-button="false"
        @search="handleSearch"
        @reset="handleReset"
      />

      <div class="page art-full-height">
        <ElCard class="art-table-card" shadow="never" style="margin-top: 0">
          <!-- 表格 -->
          <ArtTable
            rowKey="id"
            :show-table-header="false"
            :loading="loading"
            :data="data"
            :columns="columns"
            :pagination="pagination"
            @pagination:size-change="handleSizeChange"
            @pagination:current-change="handleCurrentChange"
          >
            <template #orderNo="{ row }">
              <el-link type="primary" @click="handleClick(row)">{{ row.make_order_no }}</el-link>
            </template>
          </ArtTable>
        </ElCard>
      </div>
    </el-dialog>

    <el-dialog v-model="detailDialogVisible" title="预约详情" width="600" :append-to-body="true">
      <el-tabs v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="基本信息" name="base">
          <!-- 基本信息表单 -->
        </el-tab-pane>
        <el-tab-pane label="申诉信息" name="appeal">
          <!-- 申诉信息内容 -->
        </el-tab-pane>
        <el-tab-pane label="退款记录" name="refund">
          <!-- 退款记录表格 -->
        </el-tab-pane>
      </el-tabs>
      <!-- 这里可以放你需要展示的详情内容 -->
      <el-form ref="formRef" :model="formData" label-width="120px" v-show="activeTab == 'base'">
        <el-form-item label="场地">
          <el-input v-model="formData.venue_name" disabled placeholder="请输入预约号" />
        </el-form-item>
        <el-form-item label="预约号">
          <el-input v-model="formData.order_no" disabled placeholder="请输入预约号" />
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="formData.user_name" disabled placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="用户电话">
          <el-input v-model="formData.phone" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="车辆">
          <el-input v-model="formData.vehicle_name" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="预约状态">
          <el-input v-model="formData.reservation_status" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="驾驶开始时间">
          <el-date-picker
            v-model="formData.start_time"
            disabled
            type="datetime"
            placeholder="选择开始时间"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="驾驶结束时间">
          <el-date-picker
            v-model="formData.end_time"
            disabled
            type="datetime"
            placeholder="选择结束时间"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="计费方式">
          <el-input v-model="formData.billing_method" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="计费规则">
          <el-input v-model="formData.billing_rules" disabled placeholder="请输入计费规则" />
        </el-form-item>
        <el-form-item label="支付类型">
          <el-input v-model="formData.payment_type" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="支付金额">
          <el-input v-model="formData.payment_amount" disabled placeholder="请输入支付金额" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="formData.order_time"
            type="datetime"
            disabled
            placeholder="选择创建时间"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <el-form ref="formRef1" v-show="activeTab == 'appeal'">
        <el-form-item label="退款原因：">
          <el-input v-model="formData1.refund_cause" disabled></el-input>
        </el-form-item>

        <el-form-item label="退款状态：">
          <el-radio-group v-model="formData1.appeal_status">
            <el-radio label="0" :value="1">待处理</el-radio>
            <el-radio label="1" :value="2">已处理</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="平台回复信息：">
          <el-radio-group v-model="formData1.platform_reply">
            <el-radio v-for="item in platformReplyInfoRea" :label="item.label" :key="item.value">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手动回复：" v-if="formData1.platform_reply == '其他'">
          <el-input v-model="formData1.platform_reply2" placeholder="请输入平台回复信息" />
        </el-form-item>
      </el-form>

      <el-form ref="formRef2" v-show="activeTab == 'refund'">
        <ElCard class="art-table-card" shadow="never" style="margin-top: 0">
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="amount" label="退款金额" />
            <el-table-column prop="refund_cause" label="原因" />
            <el-table-column prop="time" label="时间" width="180" />
            <el-table-column prop="appeal_status" label="状态">
              <template #default="scope">{{
                scope.row.appeal_status == 1 ? '待处理' : '已处理'
              }}</template>
            </el-table-column>
          </el-table>
        </ElCard>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCloseDialog">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchBalanceList } from '@/api/userManage'
  import { fetchTypeList } from '@/api/common'
  import { fetchOrderList, fetchOrderAppealList, getRefundRecord } from '@/api/orderManage'

  import { platformReplyInfo } from '@/config/constant'
  import {
    ORDER_STATUS_OPTIONS,
    PAYMENT_TYPE_OPTIONS,
    APPEAL_STATUS_OPTIONS,
    BILLING_TYPE_OPTIONS
  } from '@/config/constant'

  defineOptions({ name: 'BalanceDialog' })
  const dialogFormVisible = ref(false)
  const platformReplyInfoRea = platformReplyInfo

  const detailDialogVisible = ref(false)
  const activeTab = ref('base')
  const formData = ref({
    user_name: '',
    order_no: '',
    phone: '',
    venue_id: '',
    venue_name: '',
    vehicle_id: '',
    vehicle_name: '',
    payment_type: '',
    reservation_status: '',
    payment_amount: '',
    start_time: '',
    end_time: '',
    order_time: '',
    billing_method: '',
    appeal_status: '',
    billing_rules: '',
    special_area: '',
    special_area_name: '',
    platform_reply: '',
    platform_reply2: ''
  })
  const formData1 = ref({
    platform_reply: '',
    platform_reply2: '',
    appeal_status: '',
    refund_cause: ''
  })

  const tableData = ref([])

  // 表单搜索初始值
  const searchFormState = ref({
    daterange: ['', ''],
    start_time: '',
    end_time: '',
    id: ''
  })
  const id = ref()

  const typeList = ref()
  const openDialog = (params: any) => {
    searchFormState.value.id = params.id
    id.value = params.id
    fetchTypeList({
      type: 1
    }).then((res) => {
      if (res.code === 200) {
        typeList.value = Object.keys(res.data).map((key) => ({
          label: res.data[key],
          value: key
        }))
      }
    })
    dialogFormVisible.value = true

    handleSearch()
  }
  defineExpose({ openDialog })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'type',
      label: '类型',
      type: 'select',
      props: {
        placeholder: '请选择类型',
        options: typeList.value
      }
    },
    {
      key: 'daterange',
      label: '日期',
      type: 'daterange',
      span: 12,
      props: {
        type: 'daterange',
        startPlaceholder: '请选择开始日期',
        endPlaceholder: '请选择结束日期',
        valueFormat: 'YYYY-MM-DD'
      }
    }
  ])

  const handleSearch = async () => {
    const { daterange, ...filtersParams } = searchFormState.value
    const [start_time, end_time] = Array.isArray(daterange) ? daterange : [null, null]
    // 搜索参数赋值
    Object.assign(searchParams, {
      ...filtersParams,
      start_time,
      end_time
    })

    getData()
  }

  const handleReset = () => {
    searchParams.id = id.value
    handleSearch()
    // resetSearchParams()
  }

  const {
    data,
    columns,
    loading,
    pagination,
    searchParams,
    // resetSearchParams,
    handleSizeChange,
    handleCurrentChange,
    getData
  } = useTable({
    core: {
      apiFn: fetchBalanceList,
      apiParams: {
        page: 1,
        size: 20,
        id: id.value
      },
      immediate: false,
      excludeParams: ['daterange'],
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          align: 'center',
          width: 50
        },
        {
          prop: 'type_name',
          label: '类型',
          align: 'center',
          showTooltip: true
        },
        {
          prop: 'amount',
          label: '金额',
          align: 'center'
        },
        {
          prop: 'balance',
          label: '余额',
          align: 'center'
        },
        {
          prop: 'orderNo',
          label: '预约号',
          align: 'center',
          useSlot: true,
          minWidth: 120
        },
        {
          prop: 'venue',
          label: '代理商场地',
          align: 'center',
          showTooltip: true
        },
        {
          prop: 'activity_record_id',
          label: '充值活动记录id',
          align: 'center',
          width: 120
        },
        {
          prop: 'energy',
          label: '赠送能量',
          align: 'center'
        },
        {
          prop: 'time',
          label: '时间',
          align: 'center',
          showTooltip: true
        }
      ]
    }
  })

  const orderNo = ref()
  const handleClick = (row: any) => {
    detailDialogVisible.value = true
    orderNo.value = row.make_order_no
    fetchOrderList({
      order_no: row.make_order_no
    })
      .then((res) => {
        if (res.code == 200 && res.data?.content) {
          formData.value = {
            ...res.data.content[0],
            reservation_status:
              ORDER_STATUS_OPTIONS.find(
                (item: any) => item.value === res.data.content[0].reservation_status
              )?.label || '-',
            payment_type:
              PAYMENT_TYPE_OPTIONS.find(
                (item: any) => item.value === res.data.content[0].payment_type
              )?.label || '-',
            appeal_status:
              APPEAL_STATUS_OPTIONS.find(
                (item: any) => item.value === res.data.content[0].appeal_status
              )?.label || '-',
            billing_method:
              BILLING_TYPE_OPTIONS.find(
                (item: any) => item.value === res.data.content[0].billing_method
              )?.label || '-'
          }
        }
      })
      .catch()
  }

  const handleCloseDialog = () => {
    detailDialogVisible.value = false
    activeTab.value = 'base'
  }

  const handleTabClick = (val: any) => {
    if (val.index == 1) {
      fetchOrderAppealList({
        order_no: orderNo.value
      })
        .then((res) => {
          if (res.code == 200 && res.data.content.length != 0) {
            formData1.value = { ...res.data?.content[0] }
          }
        })
        .catch()
    }
    if (val.index == 2) {
      getRefundRecord({
        order_no: orderNo.value
      })
        .then((res) => {
          tableData.value = res.data?.content || []
        })
        .catch()
    }
  }
</script>
