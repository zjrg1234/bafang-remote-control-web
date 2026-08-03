<template>
  <div>
    <ElCard class="art-table-card" shadow="never" style="margin-top: 0">
      <ArtTableHeader layout="">
        <template #left>
          <ElButton type="primary" @click="handleAdd"> 新增 </ElButton>
        </template>
      </ArtTableHeader>
      <!-- 表格 -->
      <ArtTable rowKey="id" :loading="loading" :data="data" :columns="columns">
        <template #content="{ row }">
          <div v-html="row.content"></div>
        </template>
        <template #operation="{ row }">
          <div class="operation-buttons">
            <el-link type="primary" @click="handleEdit(row)">编辑</el-link>
            <span class="gray">|</span>
            <el-link type="danger" @click="handleDelete(row)">删除</el-link>
            <span class="gray">|</span>
            <el-link type="default" @click="view(row)">详情</el-link>
          </div>
        </template>
      </ArtTable>
    </ElCard>

    <iDialog ref="iDialogRef" @refresh="getData" />
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { getNoticeList, delNotice } from '@/api/platformSetManage'
  import iDialog from './iDialog.vue'
  import { ElMessageBox } from 'element-plus'
  // import { loginDialog } from '@/mock/temp/platformList'

  // const data1 = loginDialog.data.content
  const iDialogRef = ref()

  const { data, columns, loading, getData } = useTable({
    core: {
      apiFn: getNoticeList,
      apiParams: {
        page: 1,
        size: 20
      },
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          width: 60,
          align: 'center'
        },
        {
          prop: 'content',
          label: '内容',
          align: 'center',
          useSlot: true
        },
        {
          prop: 'status',
          align: 'center',
          label: '是否生效',
          width: 100,
          formatter: (row: any) => {
            return row.status === 1 ? '是' : '否'
          }
        },
        {
          prop: 'operation',
          label: '操作',
          align: 'center',
          width: 120,
          useSlot: true
        }
      ]
    }
  })

  const handleEdit = (row: any) => {
    iDialogRef.value.openDialog({ ...row, flag: 1 })
  }

  const handleAdd = () => {
    iDialogRef.value.openDialog({ flag: -1 })
  }

  const handleDelete = (row: any) => {
    ElMessageBox.confirm('确认删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        delNotice({ id: row.id }).then(() => {
          ElMessage.success('删除成功')
          getData()
        })
      })
      .catch(() => {
        ElMessage.info('已取消删除')
      })
  }
  const view = (row: any) => {
    iDialogRef.value.openDialog({ ...row, flag: 0 })
  }
</script>

<style lang="scss" scoped></style>
