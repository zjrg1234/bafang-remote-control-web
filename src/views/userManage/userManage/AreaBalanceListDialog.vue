<template>
  <div>
    <el-dialog
      v-model="dialogFormVisible"
      title="余额记录"
      class="top-right-dialog"
      width="800"
      :append-to-body="true"
    >
      <div class="page art-full-height">
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
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { GetWalletDetail } from '@/api/userManage'

  defineOptions({ name: 'AreaBalanceListDialog' })
  const dialogFormVisible = ref(false)
  // 表单搜索初始值
  const searchFormState = ref({
    id: ''
  })
  const id = ref()

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'daterange',
      label: '时间',
      type: 'daterange',
      span: 9,
      props: {
        type: 'daterange',
        startPlaceholder: '请选择开始日期',
        endPlaceholder: '请选择结束日期',
        valueFormat: 'YYYY-MM-DD'
      }
    }
  ])

  const openDialog = (params: any) => {
    searchFormState.value.id = params.id
    dialogFormVisible.value = true

    handleSearch()
  }
  defineExpose({ openDialog })

  const handleSearch = async () => {
    Object.assign(searchParams, {
      ...searchFormState.value
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
      apiFn: GetWalletDetail,
      apiParams: {
        page: 1,
        size: 20,
        id: id.value
      },
      immediate: false,
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
          prop: 'make_order_no',
          label: '预约号',
          align: 'center',
          showTooltip: true
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
</script>
