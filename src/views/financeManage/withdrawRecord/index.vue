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
          <template #operation="{ row }">
            <el-link type="primary" size="small" @click="view(row)"> 详情 </el-link>
            <span class="line" v-if="row.status == 0">｜</span>
            <el-link type="primary" v-if="row.status == 0" size="small" @click="handleAudit(row)">
              审核
            </el-link>
          </template>
        </ArtTable>
      </ElCard>
    </div>

    <iDialog ref="dialogRef" @refresh="getData"></iDialog>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchWithdrawList } from '@/api/financeManage'
  import { PAYMENT_METHOD } from '@/config/constant'
  import iDialog from './iDialog.vue'
  defineOptions({ name: 'SpecialRecharge' })
  const dialogRef = ref()

  // 表单搜索初始值
  const searchFormState = ref({
    user_name: '',
    withdraw_type: ''
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
      key: 'withdraw_type',
      label: '支付方式',
      type: 'select',
      props: {
        placeholder: '请选择',
        options: PAYMENT_METHOD
      }
    }
  ])

  const handleSearch = async () => {
    const { ...filtersParams } = searchFormState.value
    // 搜索参数赋值
    Object.assign(searchParams, {
      ...filtersParams
    }) // 设置完成时间

    getData()
  }

  const handleReset = () => {
    resetSearchParams()
  }
  const view = (row: any) => {
    dialogRef.value.openDialog({ row, flag: 0 })
  }
  const handleAudit = (row: any) => {
    dialogRef.value.openDialog({ row, flag: 1 })
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
      apiFn: fetchWithdrawList,
      apiParams: {
        page: 1,
        size: 20
      },
      excludeParams: ['daterange', 'daterange1'],
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          align: 'center'
        },
        {
          prop: 'agent_name',
          label: '提现用户',
          align: 'center'
        },
        {
          prop: 'withdraw_type',
          label: '提现方式',
          align: 'center',
          formatter: (row) => {
            const method = PAYMENT_METHOD.find((item) => item.value === row.withdraw_type)
            return method ? method.label : '-'
          }
        },
        {
          prop: 'withdraw_amount',
          label: '余额',
          align: 'center',
          sortable: true
        },
        {
          prop: 'balance',
          label: '变更后余额',
          align: 'center',
          sortable: true
        },
        {
          prop: 'status',
          label: '审核状态',
          align: 'center',
          formatter: (row) => {
            const status =
              row.status === 1 ? '审核通过' : row.status === 2 ? '审核未通过' : '待审核'
            return status
          }
        },
        {
          prop: 'enrolment_time',
          label: '申请时间',
          align: 'center',
          showTooltip: true
        },
        {
          prop: 'audit_time',
          label: '审核时间',
          align: 'center',
          showTooltip: true
        },
        {
          prop: 'operation',
          label: '操作',
          align: 'center',
          useSlot: true
        }
      ]
    }
  })
</script>
