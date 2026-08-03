<template>
  <div>
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
        </ArtTable>
      </ElCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchPaymentList } from '@/api/financeManage'
  import { fetchSpecialAreaList } from '@/api/common'
  import { PAYMENT_METHOD } from '@/config/constant'
  defineOptions({ name: 'SpecialRecharge' })

  const specialAreaList = ref([])
  onBeforeMount(() => {
    fetchSpecialAreaList({
      page: 1,
      size: 9999
    }).then((res) => {
      specialAreaList.value = res.data.map((item: { agent_name: any; id: any }) => ({
        label: item.agent_name,
        value: item.id
      }))
    })
  })

  // 表单搜索初始值
  const searchFormState = ref({
    pay_type: '',
    user_name: '',
    phone: '',
    order_no: '',
    pay_id: '',
    activity_id: '',
    daterange: ['', ''],
    daterange1: ['', '']
  })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'pay_type',
      label: '支付方式',
      type: 'select',
      labelWidth: 100,
      props: {
        placeholder: '请选择',
        options: PAYMENT_METHOD
      }
    },
    {
      key: 'user_name',
      label: '用户昵称',
      type: 'input',
      labelWidth: 100,
      props: {
        placeholder: '请输入用户昵称'
      }
    },
    {
      key: 'phone',
      label: '用户电话',
      type: 'input',
      labelWidth: 100,
      props: {
        placeholder: '请输入用户电话'
      }
    },
    {
      key: 'order_no',
      label: '支付单号',
      type: 'input',
      props: {
        placeholder: '请输入支付单号'
      }
    },
    {
      key: 'pay_id',
      label: '支付记录id',
      type: 'input',
      labelWidth: 100,
      props: {
        placeholder: '请输入支付记录id'
      }
    },
    {
      key: 'activity_id',
      label: '充值活动id',
      type: 'input',
      labelWidth: 100,
      props: {
        placeholder: '请输入充值活动id'
      }
    },
    {
      key: 'daterange',
      label: '支付时间',
      type: 'daterange',
      labelWidth: 100,

      span: 10,
      props: {
        type: 'daterange',
        startPlaceholder: '请选择开始日期',
        endPlaceholder: '请选择结束日期',
        valueFormat: 'YYYY-MM-DD'
      }
    },
    {
      key: 'daterange1',
      label: '提交时间',
      type: 'daterange',
      span: 10,
      labelWidth: 100,
      props: {
        type: 'daterange',
        startPlaceholder: '请选择开始日期',
        endPlaceholder: '请选择结束日期',
        valueFormat: 'YYYY-MM-DD'
      }
    }
  ])

  const handleSearch = async () => {
    const { daterange, daterange1, ...filtersParams } = searchFormState.value
    const [start_finish_time, end_finish_time] = Array.isArray(daterange) ? daterange : [null, null]
    const [start_time, end_time] = Array.isArray(daterange1) ? daterange1 : [null, null]

    // 搜索参数赋值
    Object.assign(searchParams, {
      ...filtersParams,
      start_finish_time,
      end_finish_time,
      start_time,
      end_time
    }) // 设置完成时间

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
      apiFn: fetchPaymentList,
      apiParams: {
        page: 1,
        size: 20
      },
      excludeParams: ['daterange', 'daterange1'],
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          align: 'center',
          width: 60
        },
        {
          prop: 'special_area_name',
          label: '专区',
          align: 'center'
        },
        {
          prop: 'order_no',
          label: '支付单号',
          align: 'center',
          width: 240
        },
        {
          prop: 'third_order_no',
          label: '三方单号',
          align: 'center',
          width: 240
        },
        {
          prop: 'user_name',
          label: '用户昵称',
          align: 'center',
          showTooltip: true
        },
        {
          prop: 'phone_number',
          label: '用户电话',
          align: 'center',
          showTooltip: true
        },
        {
          prop: 'pay_type',
          label: '支付方式',
          align: 'center',
          formatter: (row) => {
            const method = PAYMENT_METHOD.find((item) => item.value === row.pay_type)
            return method ? method.label : '-'
          }
        },
        {
          prop: 'amount',
          label: '支付金额',
          align: 'center'
        },
        {
          prop: 'finish_time',
          label: '支付时间',
          align: 'center',
          showTooltip: true
        },
        {
          prop: 'time',
          label: '提交时间',
          align: 'center',
          showTooltip: true
        },
        {
          prop: 'pay_id',
          label: '支付记录id',
          align: 'center'
        },
        {
          prop: 'activity_id',
          label: '充值活动id',
          align: 'center'
        }
      ]
    }
  })
</script>
