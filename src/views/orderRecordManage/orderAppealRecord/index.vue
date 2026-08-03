<template>
  <div class="order-record">
    <ArtSearchBar
      ref="searchBarRef"
      v-model="searchFormState"
      :items="searchItems"
      :is-expand="true"
      :show-expand="false"
      :show-reset-button="true"
      :show-search-button="true"
      :disabled-search-button="false"
      @search="handleSearch"
      @reset="handleReset"
    />

    <div class="user-page art-full-height">
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
          <template #operation="{ row }">
            <div class="operation-buttons">
              <el-link type="primary" @click="handleApple(row)">申诉信息</el-link>
              <span class="gray">|</span>
              <el-link type="primary" @click="handleRefundRecord(row)">退款记录</el-link>
              <span class="gray">|</span>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  更多
                  <!-- <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon> -->
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="{ detail: row, type: 1 }">车辆</el-dropdown-item>
                    <el-dropdown-item :command="{ detail: row, type: 2 }">详情</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </ArtTable>
      </ElCard>
    </div>
    <AppeaInfoDialog ref="appeInfoDialogRef" />

    <CarDetailDialog ref="carDetailDialogRef" />

    <OrderRefundDialog ref="orderRefundDialogRef" />

    <DetailDialog ref="detailDialogRef" />
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchOrderAppealList } from '@/api/orderManage'
  import { fetchVenueList } from '@/api/agentManage'
  import {
    ORDER_STATUS_OPTIONS,
    APPEAL_STATUS_OPTIONS,
    BILLING_TYPE_OPTIONS,
    PAYMENT_TYPE_OPTIONS
  } from '@/config/constant'
  // import { ArrowDown } from '@element-plus/icons-vue'
  import AppeaInfoDialog from './AppeaInfoDialog.vue'
  import CarDetailDialog from '../com/CarDetailDialog.vue'
  import OrderRefundDialog from '../com/OrderRefundDialog.vue'
  import DetailDialog from '../com/DetailDialog.vue'

  defineOptions({ name: 'OrderAppealRecord' })
  const appeInfoDialogRef = ref()
  const carDetailDialogRef = ref()
  const orderRefundDialogRef = ref()
  const detailDialogRef = ref()
  // 表单搜索初始值
  const searchFormState = ref({
    phone: '',
    area: ''
  })

  const place_options = ref([])

  onBeforeMount(() => {
    fetchVenueList({
      page: 1,
      size: 9999
    }).then((res) => {
      if (res.code == 200) {
        place_options.value = res.data.content.map((item: { venue_name: any; id: any }) => ({
          label: item.venue_name,
          value: item.id
        }))
      }
    })
  })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'user_name',
      label: '用户昵称',
      type: 'input',
      props: {
        placeholder: '请输入用户昵称'
      }
    },
    {
      key: 'order_no',
      label: '预约号',
      type: 'input',
      props: {
        placeholder: '请输入预约号'
      }
    },
    {
      key: 'reservation_status',
      label: '预约状态',
      type: 'select',
      props: {
        placeholder: '请选择预约状态',
        options: ORDER_STATUS_OPTIONS
      }
    },
    {
      key: 'appeal_status',
      label: '申诉状态',
      type: 'select',
      props: {
        placeholder: '请选择申诉状态',
        options: APPEAL_STATUS_OPTIONS
      }
    },
    {
      key: 'billing_method',
      label: '计费方式',
      type: 'select',
      props: {
        placeholder: '请选择计费方式',
        options: BILLING_TYPE_OPTIONS
      }
    },
    {
      key: 'venue_id',
      label: '场地',
      type: 'select',
      props: {
        placeholder: '请选择场地',
        options: place_options.value
      }
    }
  ])

  const handleSearch = async () => {
    const { ...filtersParams } = searchFormState.value

    // 搜索参数赋值
    Object.assign(searchParams, { ...filtersParams })
    getData()
  }

  const handleReset = () => {}

  const {
    data,
    columns,
    loading,
    searchParams,
    pagination,
    handleSizeChange,
    handleCurrentChange,
    getData
  } = useTable({
    core: {
      apiFn: fetchOrderAppealList,
      apiParams: {
        page: 1,
        size: 20
      },
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          align: 'center',
          width: 80
        },
        {
          prop: 'order_no',
          label: '预约号',
          align: 'center',
          width: 120
        },
        {
          prop: 'user_name',
          label: '用户',
          align: 'center',
          width: 120
        },
        {
          prop: 'phone',
          label: '手机号',
          align: 'center',
          width: 120
        },
        {
          prop: 'venue_name',
          label: '场地',
          align: 'center',
          width: 120
        },
        {
          prop: 'vehicle_name',
          label: '车辆',
          align: 'center',
          width: 120
        },
        {
          prop: 'reservation_status',
          label: '预约状态',
          align: 'center',
          width: 80,
          formatter: (row: any) => {
            return (
              ORDER_STATUS_OPTIONS.find((item: any) => item.value === row.reservation_status)
                ?.label || '-'
            )
          }
        },
        {
          prop: 'billing_method',
          label: '计费方式',
          align: 'center',
          width: 80,
          formatter: (row: any) => {
            return (
              BILLING_TYPE_OPTIONS.find((item: any) => item.value === row.billing_method)?.label ||
              '-'
            )
          }
        },
        {
          prop: 'appeal_status',
          label: '申诉状态',
          align: 'center',
          width: 80,
          formatter: (row: any) => {
            return (
              APPEAL_STATUS_OPTIONS.find((item: any) => item.value === row.appeal_status)?.label ||
              '-'
            )
          }
        },
        {
          prop: 'payment_type',
          label: '退款类型',
          align: 'center',
          width: 80,
          formatter: (row: any) => {
            return (
              PAYMENT_TYPE_OPTIONS.find((item: any) => item.value === row.payment_type)?.label ||
              '-'
            )
          }
        },
        {
          prop: 'time',
          label: '创建时间',
          align: 'center',
          width: 140
        },
        {
          prop: 'operation',
          label: '操作',
          align: 'center',
          width: 200,
          useSlot: true,
          fixed: 'right'
        }
      ]
    }
  })

  const handleRefundRecord = (row: any) => {
    orderRefundDialogRef.value.openDialog(row)
  }

  const handleCommand = (row: any) => {
    if (row.type === 1) {
      carDetailDialogRef.value.openDialog(row.detail)
    }
    if (row.type === 2) {
      detailDialogRef.value.openDialog({
        ...row.detail,
        order_time: row.detail.time,
        payment_amount: row.detail.amount - row.detail.refund_amount
      })
    }
  }

  const handleApple = (row: any) => {
    appeInfoDialogRef.value.openDialog(row)
  }
</script>

<style lang="scss" scoped>
  :deep(.cell) {
    padding: 0;
  }
</style>
