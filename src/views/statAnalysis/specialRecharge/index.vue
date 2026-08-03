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
  import { fetchDepositList } from '@/api/statAnalysis'
  import { fetchSpecialAreaList } from '@/api/common'

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
    phone: '',
    special_area: '',
    daterange: ['', '']
  })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'phone',
      label: '手机号',
      type: 'input',
      props: {
        placeholder: '请输入手机号'
      }
    },
    {
      key: 'special_area',
      label: '专区',
      type: 'select',
      props: {
        placeholder: '请选择',
        options: specialAreaList.value
      }
    },
    {
      key: 'daterange',
      label: '日期范围',
      type: 'daterange',
      span: 8,
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
    Object.assign(searchParams, { ...filtersParams, start_time, end_time })
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
      apiFn: fetchDepositList,
      apiParams: {
        page: 1,
        size: 20
      },
      excludeParams: ['daterange'],
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          align: 'center',
          width: 90
        },
        {
          prop: 'agent_name',
          label: '专区',
          align: 'center'
        },
        {
          prop: 'phone_number',
          label: '手机号',
          align: 'center'
        },
        {
          prop: 'deposit_amount',
          label: '用户充值金额',
          align: 'center',
          sortable: true
        },
        {
          prop: 'balance',
          label: '用户当前金额',
          align: 'center',
          sortable: true
        }
      ]
    }
  })
</script>
