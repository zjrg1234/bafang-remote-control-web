<template>
  <div class="advert-page-image-record">
    <div class="user-page art-full-height">
      <ElCard class="art-table-card" shadow="never" style="margin-top: 0">
        <el-button type="primary" @click="add">新增</el-button>
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
          <template #image="{ row }">
            <img :src="row.image" alt="广告图片" style="width: 100px; height: auto" />
          </template>
          <template #operation="{ row }">
            <div class="operation-buttons">
              <el-link type="primary" @click="edit(row)">编辑</el-link>
              <el-link type="danger" @click="handleDelete(row)">删除</el-link>
            </div>
          </template>
        </ArtTable>
      </ElCard>
    </div>
    <DetailsDialog ref="advertPageImageDetailDialogRef" @refresh="handleSearch" />
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { ElMessageBox } from 'element-plus'
  import { delAdvertPageImage, getAdvertPageImage } from '@/api/platformSetManage'
  import DetailsDialog from './DetailsDialog.vue'
  defineOptions({ name: 'AdvertPageImageRecord' })
  const advertPageImageDetailDialogRef = ref()
  const handleSearch = () => {
    refreshData()
  }
  const { data, columns, loading, pagination, handleSizeChange, handleCurrentChange, refreshData } =
    useTable({
      core: {
        apiFn: getAdvertPageImage,
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
            prop: 'image',
            label: '图片地址',
            useSlot: true,
            align: 'center'
          },
          {
            prop: 'status',
            label: '是否默认',
            align: 'center',
            formatter: (row: any) => {
              return row.status === 1 ? '是' : '否'
            }
          },
          {
            prop: 'operation',
            label: '操作',
            align: 'center',
            width: 90,
            useSlot: true,
            fixed: 'right'
          }
        ]
      }
    })

  const edit = (row: any) => {
    advertPageImageDetailDialogRef.value.openDialog(row)
  }
  const add = () => {
    advertPageImageDetailDialogRef.value.openDialog({})
  }

  const handleDelete = async (row: any) => {
    ElMessageBox.confirm('确定删除吗？', '删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await delAdvertPageImage({ id: row.id })
      ElMessage.success('删除成功')
      handleSearch()
    })
  }
</script>
