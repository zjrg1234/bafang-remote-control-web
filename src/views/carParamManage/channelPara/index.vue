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
            <div class="operation-buttons">
              <ArtButtonTable type="view" :row="row" />
            </div>
          </template>
        </ArtTable>
      </ElCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchAccountList } from '@/api/statAnalysis'

  defineOptions({ name: 'ChannelPara' })

  // 表单搜索初始值
  const searchFormState = ref({
    phone: '',
    area: '',
    daterange: ['', '']
  })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'name',
      label: '类型',
      type: 'input',
      props: {
        placeholder: '请输入类型'
      }
    }
  ])

  const handleSearch = async () => {
    const { daterange, ...filtersParams } = searchFormState.value
    const [startTime, endTime] = Array.isArray(daterange) ? daterange : [null, null]

    // 搜索参数赋值
    Object.assign(searchFormState, { ...filtersParams, startTime, endTime })
    getData()
  }

  const handleReset = () => {}

  const { data, columns, loading, pagination, handleSizeChange, handleCurrentChange, getData } =
    useTable({
      core: {
        apiFn: fetchAccountList,
        apiParams: {
          page: 1,
          size: 20,
          phone: '',
          area: ''
        },
        columnsFactory: () => [
          {
            prop: 'id',
            label: '#'
          },
          {
            prop: 'name',
            label: '名称'
          },
          {
            prop: 'name1',
            label: '通道默认开值'
          },
          {
            prop: 'phone',
            label: '通道默认关值'
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

<style lang="scss" scoped></style>
