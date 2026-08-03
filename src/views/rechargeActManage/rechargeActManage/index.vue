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
        <ElButton type="primary" @click="handleAdd">新增</ElButton>
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
              <el-link type="primary" @click="handleDetail(row)" :row="row">详情</el-link>
              <span class="gray">|</span>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link"> 更多 </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="{ detail: row, type: 1 }">编辑</el-dropdown-item>
                    <el-dropdown-item :command="{ detail: row, type: 2 }">{{
                      row.type == '1' ? '禁用' : '启用'
                    }}</el-dropdown-item>
                    <el-dropdown-item :command="{ detail: row, type: 3 }">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </ArtTable>
      </ElCard>
    </div>
    <iDialog ref="dialogRef" @refresh="getData"></iDialog>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchRechargeActList, delRechargeAct, changeStatus } from '@/api/rechargeActManage'
  import iDialog from './iDialog.vue'
  defineOptions({ name: 'RechargeActManageIndex' })

  // 表单搜索初始值
  const searchFormState = ref({
    activity_id: '',
    type: ''
  })

  // 搜索表单配置
  const searchItems = computed(() => [
    {
      key: 'activity_id',
      label: '活动ID',
      type: 'input',
      props: {
        placeholder: '请输入活动ID'
      }
    },
    {
      key: 'type',
      label: '状态',
      type: 'select',
      props: {
        placeholder: '请选择',
        options: [
          { label: '禁用', value: '0' },
          { label: '启用', value: '1' }
        ]
      }
    }
  ])
  const dialogRef = ref()

  const handleSearch = async () => {
    const { ...filtersParams } = searchFormState.value
    // 搜索参数赋值
    Object.assign(searchParams, { ...filtersParams })
    getData()
  }

  const handleReset = () => {
    resetSearchParams()
  }
  const handleDetail = (row: any) => {
    dialogRef.value.openDialog({ flag: 0, ...row })
  }

  const handleAdd = () => {
    dialogRef.value.openDialog({ flag: -1 })
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
      apiFn: fetchRechargeActList,
      apiParams: {
        page: 1,
        size: 20
      },
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          align: 'center',
          width: 60
        },
        {
          prop: 'activity_id',
          align: 'center',
          label: '活动ID'
        },
        {
          prop: 'payment_amount',
          label: '充值金额',
          align: 'center'
        },
        {
          prop: 'send_energy',
          label: '赠送能量',
          align: 'center'
        },
        {
          prop: 'num',
          label: '限制次数',
          align: 'center'
        },
        {
          prop: 'type',
          label: '状态',
          align: 'center',
          formatter: (row) => {
            return row.type === 1 ? '启用' : '禁用'
          }
        },
        {
          prop: 'sort',
          align: 'center',
          label: '排序号'
        },
        {
          prop: 'remark',
          align: 'center',
          label: '备注'
        },
        {
          prop: 'operation',
          label: '操作',
          align: 'center',
          width: 80,
          useSlot: true,
          fixed: 'right'
        }
      ]
    }
  })

  const handleCommand = (command: any) => {
    const { detail, type } = command
    if (type === 1) {
      dialogRef.value.openDialog({ flag: 1, ...detail })
    } else if (type === 2) {
      changeStatus({
        id: detail.id,
        type: detail.type == '1' ? 0 : 1
      }).then((res) => {
        if (res.code === 200) {
          ElMessage.success('操作成功')
          getData()
        } else {
          ElMessage.error(res.msg || '操作失败')
        }
      })
    } else if (type === 3) {
      ElMessageBox.confirm('是否删除该充值活动？', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRechargeAct({ id: detail.id }).then((res) => {
          if (res.code === 200) {
            ElMessage.success('删除成功')
            getData()
          } else {
            ElMessage.error(res.msg || '删除失败')
          }
        })
      })
    }
  }
</script>

<style lang="scss" scoped></style>
