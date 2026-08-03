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
      :buttonLeftLimit="3"
      @search="handleSearch"
      @reset="handleReset"
    />

    <div class="page art-full-height">
      <ElCard class="art-table-card" shadow="never" style="margin-top: 0">
        <!-- 表格 -->
        <ArtTable
          rowKey="id"
          :loading="loading"
          :data="data"
          :columns="columns"
          empty-height="360px"
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

    <iDialog ref="dialogRef"></iDialog>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { getRechargeActRecord } from '@/api/rechargeActManage'
  import { fetchSpecialAreaList } from '@/api/common'

  import iDialog from './iDialog.vue'

  defineOptions({ name: 'RechargeActRec' })

  // 表单搜索初始值
  const searchFormState = ref({
    phone: '',
    area: '',
    daterange: ['', '']
  })
  const dialogRef = ref()
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
  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'user_name',
      label: '用户名称',
      labelWidth: '100px',

      type: 'input',
      props: {
        placeholder: '请输入用户名称'
      }
    },
    {
      key: 'phone_number',
      label: '用户电话',
      labelWidth: '100px',

      type: 'input',
      props: {
        placeholder: '请输入用户电话'
      }
    },
    {
      key: 'special_area',
      label: '专区',
      type: 'select',
      labelWidth: '100px',

      props: {
        placeholder: '请选择',
        options: specialAreaList.value
      }
    },
    {
      key: 'activity_id',
      label: '活动记录ID',
      labelWidth: '100px',
      type: 'input',
      props: {
        placeholder: '请输入活动记录ID'
      }
    },
    // {
    //   key: 'id',
    //   label: '充值活动ID',
    //   labelWidth: '100px',

    //   type: 'input',
    //   props: {
    //     placeholder: '请输入充值活动ID'
    //   }
    // },
    {
      key: 'pay_id',
      label: '支付记录ID',
      labelWidth: '100px',

      type: 'input',
      props: {
        placeholder: '请输入支付记录ID'
      }
    },
    {
      key: 'energy_id',
      label: '能量记录ID',
      labelWidth: '100px',

      type: 'input',
      props: {
        placeholder: '请输入能量记录ID'
      }
    },
    {
      label: '创建时间',
      key: 'daterange',
      type: 'datetime',
      labelWidth: '90px',
      props: {
        type: 'daterange',
        valueFormat: 'YYYY-MM-DD',
        rangeSeparator: '至',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期'
      }
    }
  ])

  const handleSearch = async () => {
    const { daterange, ...filtersParams } = searchFormState.value
    const [start_time, end_time] = Array.isArray(daterange) ? daterange : [null, null]

    // 搜索参数赋值
    Object.assign(searchParams, { ...filtersParams, start_time, end_time })
    getData()
  }

  const handleReset = () => {
    resetSearchParams()
  }
  const handleDetail = (row: any) => {
    dialogRef.value.openDialog(row)
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
      apiFn: getRechargeActRecord,
      apiParams: {
        page: 1,
        size: 20
      },
      columnsFactory: () => [
        {
          prop: 'activity_id',
          label: '活动记录ID',
          align: 'center'
        },
        {
          prop: 'special_area_name',
          label: '专区'
        },
        {
          prop: 'user_name',
          label: '用户名称'
        },
        {
          prop: 'phone_number',
          label: '用户电话',
          width: 100
        },
        {
          prop: 'amount',
          label: '充值金额'
        },
        {
          prop: 'send_money',
          label: '赠送能量'
        },
        {
          prop: 'num',
          label: '限制次数'
        },
        {
          prop: 'time',
          label: '创建时间',
          showTooltip: true
        },
        // {
        //   prop: 'id',
        //   label: '充值活动ID',
        //   align: 'center'
        // },
        {
          prop: 'pay_id',
          label: '支付记录ID',
          align: 'center'
        },
        {
          prop: 'energy_id',
          label: '能量记录ID',
          width: 180,
          align: 'center'
        },
        {
          prop: 'operation',
          label: '操作',
          width: 120,
          useSlot: true,
          fixed: 'right'
        }
      ]
    }
  })
</script>

<style lang="scss" scoped>
  :deep(.cell) {
    text-align: center;
  }
</style>
