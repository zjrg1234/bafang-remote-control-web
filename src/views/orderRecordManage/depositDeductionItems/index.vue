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
        <ElButton type="primary" @click="add">新增</ElButton>

        <ElButton @click="del" :disabled="selectedRows.length === 0" v-ripple>
          <ElIcon>
            <Delete />
          </ElIcon>
          批量删除 ({{ selectedRows.length }})
        </ElButton>

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
              <el-button type="text" size="">申诉记录</el-button>
              <el-button type="text" size="" :row="row">退款记录</el-button>
              <el-dropdown>
                <span class="el-dropdown-link">
                  更多
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>车辆</el-dropdown-item>
                    <el-dropdown-item>详情</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </ArtTable>
      </ElCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchGetUserList } from '@/api/systemManage'

  defineOptions({ name: 'OrderRecord' })

  // 表单搜索初始值
  const searchFormState = ref({
    phone: '',
    area: '',
    daterange: ['', '']
  })

  type UserListItem = Api.orderManage.UserListItem

  const selectedRows = ref<UserListItem[]>([])

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'name',
      label: '扣费内容',
      type: 'input',
      props: {
        placeholder: '请输入扣费内容'
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
  const add = () => {}
  const del = () => {}
  const handleReset = () => {}

  const { data, columns, loading, pagination, handleSizeChange, handleCurrentChange, getData } =
    useTable({
      core: {
        apiFn: fetchGetUserList,
        apiParams: {
          page: 1,
          size: 20
        },
        columnsFactory: () => [
          {
            prop: 'id',
            label: '#'
          },
          {
            prop: 'orderNo',
            label: '预约号'
          },
          {
            prop: 'userGender',
            label: '用户'
          },
          {
            prop: 'userPhone',
            label: '用户电话'
          },
          {
            prop: 'place',
            label: '场地'
          },
          {
            prop: 'userEmail1',
            label: '车辆'
          },
          {
            prop: 'us2',
            label: '预约状态'
          },
          {
            prop: 'u2',
            label: '计费方式'
          },
          {
            prop: 'u12',
            label: '计费规则'
          },
          {
            prop: 'uil12',
            label: '申诉状态'
          },
          {
            prop: 'userEm',
            label: '创建时间'
          },
          {
            prop: 'operation',
            label: '操作',
            width: 200,
            useSlot: true,
            fixed: 'right'
          }
        ]
      }
    })
</script>

<style lang="scss" scoped>
  :deep(.el-table--default .cell) {
    padding: 0 5px;
  }

  .operation-buttons {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
</style>
