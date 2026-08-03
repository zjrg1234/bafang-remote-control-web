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

    <!-- 表格区域 -->
    <ElCard class="art-table-card" shadow="never" style="margin-top: 0">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <ArtTable
        ref="tableRef"
        :loading="loading"
        :data="data"
        :columns="columns"
        :pagination="pagination"
        @pagination:size-change="handleSizeChange"
        @pagination:current-change="handleCurrentChange"
        empty-height="360px"
      >
        <!-- 操作列 -->
        <template #image="{ row }">
          <div class="img">
            <img :src="row.image" alt="" width="30" height="30" />
          </div>
        </template>
        <!-- 操作列 -->
        <template #operation="{ row }">
          <div class="operation-buttons">
            <el-link type="primary" @click="handleEdit(row)">编辑</el-link>
            <span class="gray">|</span>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link"> 更多 </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :command="{ id: row.id, kind: 1 }">删除</el-dropdown-item>
                  <el-dropdown-item :command="{ detail: row, kind: 2 }">详情</el-dropdown-item>
                  <el-dropdown-item :command="{ detail: row, kind: 3 }">{{
                    row.status === 0 ? '启用' : '禁用'
                  }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
      </ArtTable>
    </ElCard>

    <iDialog ref="iDialogRef" :carImgListOption="carImgListOption" @refresh="handleSearch" />
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import {
    getCarImageType,
    getCarImageList,
    changeStatusCarImage,
    delCarImage
  } from '@/api/platformSetManage'
  import { ElMessageBox } from 'element-plus'

  import iDialog from './iDialog.vue'

  defineOptions({ name: 'CarDefaultImageManagement' })

  const iDialogRef = ref()
  const carImgListOption = ref([{ value: 0, label: '全部' }])
  onMounted(() => {
    getCarImageType().then((res: any) => {
      carImgListOption.value = []
      if (res.data.length) {
        carImgListOption.value = res.data.map((item: any) => ({
          label: item.name,
          value: item.type
        }))
      }
    })
  })

  // 表单搜索初始值
  const searchFormState = ref({
    status: '',
    type: ''
  })

  const searchItems = computed(() => [
    {
      key: 'type',
      label: '类型',
      type: 'select',
      props: {
        placeholder: '请选择类型',
        options: carImgListOption.value
      }
    },
    {
      key: 'status',
      label: '状态',
      type: 'select',
      props: {
        placeholder: '请选择状态',
        options: [
          {
            label: '启用',
            value: 1
          },
          {
            label: '禁用',
            value: 0
          }
        ]
      }
    }
  ])

  const handleSearch = () => {
    Object.assign(searchParams, { ...searchFormState.value })
    getData()
  }
  const handleReset = () => {
    resetSearchParams()
  }
  const {
    data,
    columns,
    searchParams,
    resetSearchParams,
    loading,
    pagination,
    handleSizeChange,
    handleCurrentChange,
    getData
  } = useTable({
    core: {
      apiFn: getCarImageList,
      apiParams: {
        page: 1,
        size: 20
      },
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          width: 50,
          align: 'center'
        },
        {
          prop: 'type_name',
          label: '类型',
          align: 'center'
        },
        {
          prop: 'image',
          label: '图片地址',
          align: 'center',
          useSlot: true
        },
        {
          prop: 'status',
          label: '状态',
          align: 'center',
          formatter: (row: any) => {
            return row.status == 1 ? '启用' : '禁用'
          }
        },
        {
          prop: 'operation',
          label: '操作',
          useSlot: true,
          align: 'center',
          width: 80
        }
      ]
    }
  })

  const handleAdd = () => {
    iDialogRef.value.openDialog({ flag: -1 })
  }
  const handleEdit = (row: any) => {
    iDialogRef.value.openDialog({ ...row, flag: 1 })
  }

  const view = (row: any) => {
    iDialogRef.value.openDialog({ ...row, flag: 0 })
  }

  const handleDelete = (id: any) => {
    ElMessageBox.confirm('确定删除吗？', '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      delCarImage({
        id
      }).then((res: any) => {
        if (res.code === 200) {
          ElMessage.success('删除成功')
          getData()
        }
      })
    })
  }
  const handleStatusChange = (row: any) => {
    changeStatusCarImage({
      id: row.id,
      status: row.status === 0 ? 1 : 0
    }).then((res: any) => {
      if (res.code === 200) {
        ElMessage.success('操作成功')
        getData()
      }
    })
  }

  const handleCommand = (command: any) => {
    if (command.kind === 1) {
      handleDelete(command.id)
    } else if (command.kind === 2) {
      view(command.detail)
    } else if (command.kind === 3) {
      handleStatusChange(command.detail)
    }
  }
</script>

<style lang="scss" scoped></style>
