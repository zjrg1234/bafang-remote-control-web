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
              <!-- <el-link
                type="primary"
                @click="handleRefundRecord(row)"
                v-if="row.reservation_status === 4"
                >退款记录</el-link
              >
              <span class="gray" v-if="row.reservation_status === 4">|</span> -->
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  更多
                  <!-- <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon> -->
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="{ id: row.id, type: 1 }">车辆</el-dropdown-item>
                    <el-dropdown-item :command="{ detail: row, type: 2 }">详情</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </ArtTable>
      </ElCard>
    </div>
    <DetailDialog ref="detailDialogRef" />
    <OrderRefundDialog ref="orderRefundDialogRef" />
    <CarDetailDialog ref="carDetailDialogRef" />
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchOrderList } from '@/api/orderManage'
  import { fetchVenueList } from '@/api/agentManage'

  import DetailDialog from '../com/DetailDialog.vue'
  import CarDetailDialog from '../com/CarDetailDialog.vue'
  import OrderRefundDialog from './OrderRefundDialog.vue'
  import {
    ORDER_STATUS_OPTIONS,
    APPEAL_STATUS_OPTIONS,
    BILLING_TYPE_OPTIONS,
    PAYMENT_TYPE_OPTIONS
  } from '@/config/constant'

  defineOptions({ name: 'OrderRecord' })

  // 表单搜索初始值
  const searchFormState = ref({
    phone: '',
    area: ''
  })
  const detailDialogRef = ref()
  const orderRefundDialogRef = ref()
  const carDetailDialogRef = ref()
  const placeOptions = ref([])

  onBeforeMount(() => {
    fetchVenueList({
      page: 1,
      size: 9999
    }).then((res) => {
      if (res.code == 200) {
        placeOptions.value = res.data.content.map((item: { venue_name: any; id: any }) => ({
          label: item.venue_name,
          value: item.id
        }))
      }
    })
  })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'phone',
      label: '用户号码',
      type: 'input',
      props: {
        placeholder: '请输入用户号码'
      }
    },
    {
      key: 'user_name',
      label: '用户昵称',
      type: 'input',
      props: {
        placeholder: '请输入用户昵称'
      }
    },
    // {
    //   key: 'carPhone',
    //   label: '车主电话',
    //   type: 'input',
    //   props: {
    //     placeholder: '请输入车主电话'
    //   }
    // },
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
        options: placeOptions.value
      }
    }
  ])

  const handleSearch = async () => {
    // const { ...filtersParams } = searchFormState.value

    // 搜索参数赋值
    Object.assign(searchParams, { ...searchFormState.value })
    getData()
  }

  const handleReset = () => {}

  const {
    data,
    columns,
    searchParams,
    loading,
    pagination,
    handleSizeChange,
    handleCurrentChange,
    getData
  } = useTable({
    core: {
      apiFn: fetchOrderList,
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
          prop: 'billing_rules',
          label: '计费规则',
          align: 'center',
          width: 120
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
          label: '支付类型',
          align: 'center',
          width: 120,
          formatter: (row: any) => {
            return (
              PAYMENT_TYPE_OPTIONS.find((item: any) => item.value === row.payment_type)?.label ||
              '-'
            )
          }
        },
        {
          prop: 'payment_amount',
          label: '支付金额',
          align: 'center',
          width: 120
        },
        {
          prop: 'start_time',
          label: '开始时间',
          align: 'center',
          width: 140
        },
        {
          prop: 'end_time',
          label: '结束时间',
          align: 'center',
          width: 140
        },
        {
          prop: 'order_time',
          label: '创建时间',
          align: 'center',
          width: 140
        },
        {
          prop: 'operation',
          label: '操作',
          align: 'center',
          width: 130,
          useSlot: true,
          fixed: 'right'
        }
      ]
    }
  })

  // const handleRefundRecord = (row: any) => {
  //   orderRefundDialogRef.value.openDialog(row)
  // }

  const handleCommand = (row: any) => {
    if (row.type === 1) {
      carDetailDialogRef.value.openDialog(row.id)
    }
    if (row.type === 2) {
      detailDialogRef.value.openDialog(row.detail)
    }
  }
</script>

<style lang="scss" scoped>
  :deep(.cell) {
    padding: 0;
  }
</style>
