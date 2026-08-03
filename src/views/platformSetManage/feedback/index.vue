<template>
  <div class="order-record">
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

    <div class="user-page art-full-height">
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
              <el-link type="primary" @click="view(row)">查看</el-link>
            </div>
          </template>
        </ArtTable>
      </ElCard>
    </div>
    <DetailsDialog ref="feedbackDetailDialogRef" @refresh="handleSearch" />
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchFeedbackList } from '@/api/platformSetManage'
  import DetailsDialog from './DetailsDialog.vue'
  defineOptions({ name: 'FeedbackManagement' })

  // 表单搜索初始值
  const searchFormState = ref({
    user_name: '',
    type: ''
  })
  const feedbackDetailDialogRef = ref()

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
      key: 'type',
      label: '回复状态',
      type: 'select',
      props: {
        placeholder: '请选择回复状态',
        options: [
          {
            label: '已回复',
            value: 1
          },
          {
            label: '未回复',
            value: 0
          }
        ]
      }
    }
  ])

  const handleSearch = async () => {
    const { ...filtersParams } = searchFormState.value

    // 搜索参数赋值
    Object.assign(searchParams, { ...filtersParams })
    getData()
  }

  const handleReset = () => {
    resetSearchParams()
  }

  const {
    data,
    columns,
    loading,
    searchParams,
    pagination,
    handleSizeChange,
    handleCurrentChange,
    resetSearchParams,
    getData
  } = useTable({
    core: {
      apiFn: fetchFeedbackList,
      apiParams: {
        page: 1,
        size: 20
      },
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          align: 'center',
          width: 80
        },
        {
          prop: 'user_name',
          label: '用户',
          align: 'center'
        },
        {
          prop: 'phone',
          label: '手机号',
          align: 'center',
          width: 100
        },
        {
          prop: 'content',
          label: '意见内容',
          align: 'center'
        },
        {
          prop: 'type',
          label: '处理状态',
          align: 'center',
          width: 80,
          formatter: (row: any) => {
            return row.type === 0 ? '未回复' : '已回复'
          }
        },
        {
          prop: 'time',
          label: '创建时间',
          align: 'center',
          width: 140
        },
        {
          prop: 'operation',
          label: '操作',
          align: 'center',
          width: 130,
          useSlot: true,
          fixed: 'right'
        }
      ]
    }
  })

  const view = (row: any) => {
    feedbackDetailDialogRef.value.openDialog(row)
  }
</script>

<style lang="scss" scoped>
  :deep(.cell) {
    padding: 0;
  }
</style>
