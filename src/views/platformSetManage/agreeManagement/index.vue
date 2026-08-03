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
      <ArtTable
        ref="tableRef"
        :loading="loading"
        :data="data"
        :columns="columns"
        empty-height="360px"
      >
        <!-- 操作列 -->
        <template #operation="{ row }">
          <div class="operation-buttons">
            <el-link type="primary" @click="handleEdit(row)">编辑</el-link>
          </div>
        </template>
      </ArtTable>
    </ElCard>

    <EditDialog ref="EditDialogRef" />
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { fetchAgreeList } from '@/api/platformSetManage'
  import EditDialog from './EditDialog.vue'
  // import { agreeList } from '@/mock/temp/platformList'
  // const data1 = agreeList.data
  defineOptions({ name: 'AgreeManagement' })

  const EditDialogRef = ref()

  // 表单搜索初始值
  const searchFormState = ref({
    name: ''
  })

  const searchItems = computed(() => [
    {
      key: 'name',
      label: '类型',
      type: 'select',
      props: {
        placeholder: '请选择类型',
        options: [
          {
            label: '用户驾驶协议',
            value: '用户驾驶协议'
          },
          {
            label: '隐私政策',
            value: '隐私政策'
          },
          {
            label: '商务合作协议',
            value: '商务合作协议'
          },
          {
            label: '注册协议',
            value: '注册协议'
          }
        ]
      }
    }
  ])

  const handleSearch = () => {
    getData(searchFormState.value)
  }
  const handleReset = () => {
    searchFormState.value = {
      name: ''
    }
    handleSearch()
  }
  const { data, columns, loading, getData } = useTable({
    core: {
      apiFn: fetchAgreeList,
      excludeParams: ['page', 'size'],
      apiParams: {},
      columnsFactory: () => [
        {
          prop: 'id',
          label: '#',
          width: 50,
          align: 'center'
        },
        {
          prop: 'name',
          label: '类型',
          align: 'center'
        },
        {
          prop: 'created_at',
          label: '创建时间',
          align: 'center'
        },
        {
          prop: 'operation',
          label: '操作',
          useSlot: true,
          align: 'center'
        }
      ]
    }
  })

  const handleEdit = (row: any) => {
    console.log(row)
    EditDialogRef.value.openDialog(row)
  }
</script>

<style lang="scss" scoped></style>
