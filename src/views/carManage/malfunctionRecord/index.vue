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
              <ArtButtonTable type="view" :row="row">详情</ArtButtonTable>
              <ArtButtonTable type="view" :row="row">处理</ArtButtonTable>
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
      key: 'carName',
      label: '车辆名称',
      type: 'input',
      props: {
        placeholder: '请输入车辆名称'
      }
    },

    {
      key: 'carStatus',
      label: '是否处理',
      labelWidth: 100,

      type: 'select',
      props: {
        placeholder: '请选择',
        options: [
          { label: '是', value: '1' },
          { label: '否', value: '2' }
        ]
      }
    },
    {
      key: 'name',
      label: '所属人',
      type: 'input',
      props: {
        placeholder: '请输入所属人'
      }
    },
    {
      key: 'jies',
      label: '所属人电话',
      type: 'input',
      labelWidth: 90,
      props: {
        placeholder: '请输入所属人电话'
      }
    },
    {
      key: 'ytaok',
      label: '申报人',
      type: 'input',
      props: {
        placeholder: '请输入申报人'
      }
    },
    {
      key: 'ytaok1',
      label: '申报人电话',
      type: 'input',
      labelWidth: 100,
      props: {
        placeholder: '请输入申报人电话'
      }
    },
    {
      key: 'ytaok2',
      label: '场地',
      type: 'input',
      props: {
        placeholder: '请选择',
        options: []
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
            prop: 'name1',
            label: '车辆'
          },
          {
            prop: 'name',
            label: '场地'
          },
          {
            prop: '1',
            label: '所属人'
          },
          {
            prop: 'st',
            label: '所属人电话'
          },
          {
            prop: 'et',
            label: '错误信息'
          },
          {
            prop: 'et1',
            label: '描述'
          },
          {
            prop: 'p',
            label: '申报人'
          },
          {
            prop: 'pnum',
            label: '申报次数'
          },
          {
            prop: 'pnumb',
            label: '申报人电话'
          },
          {
            prop: 'pnumb',
            label: '是否处理'
          },
          {
            prop: 'sti',
            label: '申报时间'
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
