<template>
  <div>
    <ElCard class="art-table-card" shadow="never" style="margin-top: 0">
      <ArtTable rowKey="id" :loading="loading" :data="data" :columns="columns">
        <template #operation="{ row }">
          <div class="operation-buttons">
            <el-link type="primary" @click="handleEdit(row)">编辑</el-link>
          </div>
        </template>
      </ArtTable>
    </ElCard>

    <editDialog ref="editDialogRef" @refresh="getData" />
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { getPlatformParamList } from '@/api/platformSetManage'
  import editDialog from './editDialog.vue'

  const editDialogRef = ref()

  const { data, columns, loading, getData } = useTable({
    core: {
      apiFn: getPlatformParamList,
      apiParams: {
        page: 1,
        size: 999
      },
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          width: 60,
          align: 'center'
        },
        {
          prop: 'title',
          label: '变量标题',
          align: 'center'
        },
        {
          prop: 'value',
          label: '变量值',
          align: 'center'
        },
        {
          prop: 'operation',
          label: '操作',
          align: 'center',
          useSlot: true
        }
      ]
    }
  })

  const handleEdit = (row: any) => {
    editDialogRef.value.openDialog({ ...row, flag: 1 })
  }
</script>

<style lang="scss" scoped></style>
