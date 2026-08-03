<template>
  <div class="">
    <ArtSearchBar
      ref="searchBarRef"
      v-model="searchFormState"
      :items="searchItems"
      :show-reset-button="true"
      :show-search-button="true"
      @search="handleSearch"
      @reset="handleReset"
    />

    <ElCard class="art-table-card" shadow="never" style="margin-top: 0">
      <ArtTableHeader layout="">
        <template #left>
          <ElButton type="primary" @click="handleAdd"> 新增 </ElButton>

          <ElButton @click="handleBatchDelete" :disabled="selectedRows.length === 0">
            批量删除 ({{ selectedRows.length }})
          </ElButton>
        </template>
      </ArtTableHeader>
      <!-- 表格 -->
      <ArtTable
        rowKey="id"
        @selection-change="handleSelectionChange"
        :loading="loading"
        :data="data"
        :columns="columns"
      >
        <template #operation="{ row }">
          <div class="operation-buttons">
            <el-link type="primary" @click="handleEdit(row)">编辑</el-link>
          </div>
        </template>
      </ArtTable>
    </ElCard>

    <EditDialog ref="EditDialogRef" @refresh="handleSearch" />
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { getVersion, delVersion } from '@/api/platformSetManage'
  import EditDialog from './EditDialog.vue'
  import { ElMessageBox } from 'element-plus'
  // import { versionList } from '@/mock/temp/platformList'
  type ListItem = Api.platformSetManage.versionList
  // const data1 = versionList.data.content
  const EditDialogRef = ref()
  // 选中的行
  const selectedRows = ref<ListItem[]>([])
  // 表单搜索初始值
  const searchFormState = ref({
    type: '',
    version_mark: ''
  })

  const searchItems = computed(() => [
    {
      key: 'type',
      label: 'APP类型',
      type: 'select',
      props: {
        placeholder: '请选择app类型',
        options: [
          {
            label: '苹果',
            value: 1
          },
          {
            label: '安卓',
            value: 2
          }
        ]
      }
    },
    {
      key: 'version_mark',
      label: '版本号',
      type: 'input',
      props: {
        placeholder: '请输入版本号'
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

  const { data, columns, resetSearchParams, searchParams, loading, getData } = useTable({
    core: {
      apiFn: getVersion,
      apiParams: {
        page: 1,
        size: 20
      },
      columnsFactory: () => [
        { type: 'selection', width: 50 },
        {
          prop: 'id',
          label: '#',
          width: 60,
          align: 'center'
        },
        {
          prop: 'type',
          align: 'center',
          label: 'APP类型',
          width: 100,
          formatter: (row: any) => {
            return row.type === 1 ? '苹果' : '安卓'
          }
        },
        {
          prop: 'version_mark',
          align: 'center',
          label: '版本号'
        },
        {
          prop: 'created_at',
          align: 'center',
          label: '添加时间',
          width: 180
        },
        {
          prop: 'is_change_special',
          align: 'center',
          label: '是否启用改绑专区',
          formatter: (row: any) => {
            return row.is_change_special === 1 ? '是' : '否'
          }
        },
        {
          prop: 'status',
          align: 'center',
          label: '状态',
          width: 80,
          formatter: (row: any) => {
            return row.status === 1 ? '启用' : '禁用'
          }
        },
        {
          prop: 'operation',
          label: '操作',
          align: 'center',
          width: 180,
          useSlot: true
        }
      ]
    }
  })

  const handleEdit = (row: any) => {
    EditDialogRef.value.openDialog(row)
  }

  const handleAdd = () => {
    EditDialogRef.value.openDialog()
  }

  const handleBatchDelete = () => {
    if (selectedRows.value.length === 0) {
      ElMessage.warning('请选择要删除的行')
      return
    }
    ElMessageBox.confirm('确认删除选中的行吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        delVersion({ ids: selectedRows.value.map((item) => item.id) }).then(() => {
          ElMessage.success('删除成功')
          // 清空选中的行
          selectedRows.value = []
          getData()
        })
      })
      .catch(() => {
        // 取消删除
        ElMessage.info('已取消删除')
      })
  }

  // 事件处理函数
  const handleSelectionChange = (selection: ListItem[]) => {
    selectedRows.value = selection
    console.log('选择变更:', selection)
  }
</script>

<style lang="scss" scoped></style>
