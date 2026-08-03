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
        :loading="loading"
        @selection-change="handleSelectionChange"
        :data="data"
        :columns="columns"
      >
        <template #operation="{ row }">
          <div class="operation-buttons">
            <el-link type="primary" @click="handleEdit(row)">编辑</el-link>
            <span class="gray">|</span>
            <el-link type="danger" @click="handleDelete(row)">删除</el-link>
          </div>
        </template>
      </ArtTable>
    </ElCard>

    <EditDialog ref="EditDialogRef" @refresh="handleSearch" />
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchCommonQuestionList, delQues } from '@/api/platformSetManage'
  import EditDialog from './EditDialog.vue'
  import { ElMessageBox } from 'element-plus'
  type ListItem = Api.platformSetManage.List

  const EditDialogRef = ref()
  // 选中的行
  const selectedRows = ref<ListItem[]>([])
  // 表单搜索初始值
  const searchFormState = ref({
    name: ''
  })

  const searchItems = computed(() => [
    {
      key: 'name',
      label: '问题',
      type: 'input',
      props: {
        placeholder: '请输入问题'
      }
    }
  ])

  const handleSearch = async () => {
    const { ...filtersParams } = searchFormState.value

    // 搜索参数赋值
    Object.assign(searchParams, { ...filtersParams })
    getData()
  }

  const handleReset = () => {}

  const { data, columns, searchParams, loading, getData } = useTable({
    core: {
      apiFn: fetchCommonQuestionList,
      apiParams: {
        page: 1,
        size: 20
      },
      columnsFactory: () => [
        { type: 'selection', width: 50 },
        {
          prop: 'id',
          label: '#'
        },
        {
          prop: 'name',
          align: 'center',

          label: '问题'
        },
        {
          prop: 'sort',
          align: 'center',

          label: '排序'
        },
        {
          prop: 'created_at',
          align: 'center',

          label: '创建时间'
        },
        {
          prop: 'operation',
          label: '操作',
          align: 'center',
          width: 90,
          useSlot: true
        }
      ]
    }
  })

  const handleEdit = (row: any) => {
    EditDialogRef.value.openDialog(row)
  }

  const handleDelete = (row: any) => {
    // 确认删除
    ElMessageBox.confirm('确认删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      // 确认删除，执行删除操作
      delQues({ id: row.id }).then(() => {
        ElMessage.success('删除成功')
        getData()
      })
    })
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
        // 确认删除，执行删除操作
        console.log('删除选中的行:', selectedRows.value)

        delQues({ id: selectedRows.value.map((item) => item.id) }).then(() => {
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

  const handleSelectionChange = (selection: ListItem[]) => {
    selectedRows.value = selection
    console.log('选择变更:', selection)
  }
</script>

<style lang="scss" scoped></style>
