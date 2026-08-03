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
              <ArtButtonTable type="view" @click="edit" :row="row">编辑</ArtButtonTable>
              <ArtButtonTable type="view" @click="del" :row="row">删除</ArtButtonTable>
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

  defineOptions({ name: 'SpecialRecharge' })

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
      label: '标题',
      type: 'input',
      props: {
        placeholder: '请输入标题'
      }
    },
    {
      key: 'kind',
      label: '分类',
      type: 'select',
      props: {
        placeholder: '请选择',
        options: [
          { label: '驾驶教程', value: '1' },
          { label: '其他', value: '2' }
        ]
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
  const edit = () => {}
  const del = () => {}

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
            label: '标题'
          },
          {
            prop: 'kind',
            label: '分类'
          },
          {
            prop: 'sort',
            label: '排序'
          },
          {
            prop: 'status',
            label: '状态'
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
