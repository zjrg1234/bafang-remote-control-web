<template>
  <div>
    <ArtSearchBar
      ref="searchBarRef"
      v-model="searchFormState"
      :items="searchItems"
      :is-expand="true"
      :show-expand="false"
      :show-reset-button="true"
      :show-search-button="true"
      :disabled-search-button="false"
      :buttonLeftLimit="10"
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
          <template #operation="{ row }">
            <div class="operation-buttons">
              <el-link type="primary" @click="handleDetail(row)">详情</el-link>
            </div>
          </template>
        </ArtTable>
      </ElCard>
    </div>
    <DriverRecordDetailDialog ref="driverRecordDetailDialogRef" />
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { getDrivingRecord, fetchCarList } from '@/api/carManage'
  import { fetchVenueList } from '@/api/agentManage'
  import DriverRecordDetailDialog from './DetailDialog.vue'
  defineOptions({ name: 'DriverRecord' })

  const driverRecordDetailDialogRef = ref()
  // 表单搜索初始值
  const searchFormState = ref({
    phone: '',
    venue_id: '',
    order_no: '',
    user_name: '',
    vehicle_id: ''
  })
  const carList = ref()
  onMounted(() => {
    fetchVenueList({
      page: 1,
      size: 999
    }).then((res) => {
      if (res.code === 200) {
        searchItems.value[0].props.options = res.data.content.map(
          (item: { venue_name: any; id: any }) => ({
            label: item.venue_name,
            value: item.id
          })
        )
      }
    })

    fetchCarList({
      page: 1,
      size: 9999
    }).then((res: { code: number; data: { content: { vehicle_name: any; id: any }[] } }) => {
      if (res.code === 200) {
        carList.value = res.data.content.map((item: { vehicle_name: any; id: any }) => ({
          label: item.vehicle_name,
          value: item.id
        }))
      }
    })
  })
  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'venue_id',
      label: '场地',
      type: 'select',
      props: {
        placeholder: '请选择',
        options: []
      }
    },

    {
      key: 'vehicle_id',
      label: '车辆',
      type: 'select',
      props: {
        placeholder: '请选择',
        options: carList.value
      }
    },
    {
      key: 'user_name',
      label: '驾驶员姓名',
      labelWidth: 120,
      type: 'input',
      props: {
        placeholder: '请输入驾驶员姓名'
      }
    },
    {
      key: 'phone',
      label: '驾驶员电话',
      type: 'input',
      labelWidth: 120,
      props: {
        placeholder: '请输入驾驶员电话'
      }
    },
    {
      key: 'order_no',
      label: '预约编号',
      type: 'input',
      props: {
        placeholder: '请输入预约编号'
      }
    }
  ])

  const handleSearch = async () => {
    const { ...filtersParams } = searchFormState.value

    // 搜索参数赋值
    Object.assign(searchParams, { ...filtersParams })
    getData()
  }

  const handleReset = () => {
    resetSearchParams()
  }

  const {
    data,
    columns,
    loading,
    pagination,
    searchParams,
    resetSearchParams,
    handleSizeChange,
    handleCurrentChange,
    getData
  } = useTable({
    core: {
      apiFn: getDrivingRecord,
      apiParams: {
        page: 1,
        size: 20
      },
      columnsFactory: () => [
        {
          prop: 'id',
          align: 'center',
          label: '#',
          width: 60
        },
        {
          prop: 'venue_name',
          align: 'center',
          label: '场地'
        },
        {
          prop: 'vehicle_name',
          align: 'center',
          label: '车辆'
        },
        {
          prop: 'user_name',
          align: 'center',
          label: '预约人'
        },
        {
          prop: 'order_no',
          align: 'center',
          width: 140,
          label: '预约编号'
        },
        {
          prop: 'payment_type',
          align: 'center',
          label: '支付类型',
          formatter: (row: any) => {
            return row.payment_type === 1 ? '电池' : '能量'
          }
        },
        {
          prop: 'payment_amount',
          align: 'center',
          label: '支付金额'
        },
        {
          align: 'center',
          prop: 'start_time',
          width: 160,
          label: '开始时间'
        },
        {
          prop: 'end_time',
          align: 'center',
          label: '结束时间',
          width: 160
        },
        {
          prop: 'operation',
          label: '操作',
          width: 60,
          align: 'center',
          useSlot: true,
          fixed: 'right'
        }
      ]
    }
  })

  const handleDetail = (row: any) => {
    driverRecordDetailDialogRef.value.openDialog({ ...row })
  }
</script>
