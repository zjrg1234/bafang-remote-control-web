<template>
  <div class="online-rank">
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
  import { fetchList } from '@/api/userManage'

  defineOptions({ name: 'OnlineRank' })

  // 表单搜索初始值
  const searchFormState = ref({
    daterange: ['', '']
  })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'daterange',
      label: '日期范围',
      type: 'daterange',
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
    const [startTime, endTime] = Array.isArray(daterange) ? daterange : [null, null]

    Object.assign(searchFormState, { ...filtersParams, startTime, endTime })
    getData()
  }

  const handleReset = () => {}

  const { data, columns, loading, pagination, handleSizeChange, handleCurrentChange, getData } =
    useTable({
      core: {
        apiFn: fetchList,
        apiParams: {
          page: 1,
          size: 20
        },
        columnsFactory: () => [
          {
            prop: 'id',
            label: '#',
            width: 100
          },
          {
            prop: 'area',
            label: '用户姓名'
          },
          {
            prop: 'phone',
            label: '手机号'
          },
          {
            prop: 'userPhone',
            label: '头像'
          },
          {
            prop: 'userEmail',
            label: '排名'
          },
          {
            prop: 'userEmail1',
            label: '共享车辆'
          }
        ]
      }
    })
</script>
