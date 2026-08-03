<template>
  <div>
    <el-dialog
      v-model="dialogFormVisible"
      title="能量记录"
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
          </ArtTable>
        </ElCard>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchEnergyList } from '@/api/userManage'
  import { fetchTypeList } from '@/api/common'

  defineOptions({ name: 'EnergyDialog' })
  const dialogFormVisible = ref(false)

  // 表单搜索初始值
  const searchFormState = ref({
    type: '',
    daterange: ['', ''],
    id: ''
  })
  const id = ref('')

  const typeList = ref()
  const openDialog = (params: any) => {
    searchFormState.value.id = params.id
    id.value = params.id
    fetchTypeList({
      type: 2
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
  }

  const {
    data,
    columns,
    loading,
    pagination,
    searchParams,
    handleSizeChange,
    handleCurrentChange,
    getData
  } = useTable({
    core: {
      apiFn: fetchEnergyList,
      apiParams: {
        page: 1,
        size: 20
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
          prop: 'energy',
          label: '能量',
          align: 'center'
        },
        {
          prop: 'surplus_energy',
          label: '修改后能量',
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
          prop: 'activity_id',
          label: '充值活动记录id',
          align: 'center',
          width: 130
        },
        {
          prop: 'energy',
          label: '赠送能量',
          align: 'center',
          showTooltip: true
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
