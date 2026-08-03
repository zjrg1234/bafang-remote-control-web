<template>
  <div>
    <el-dialog
      v-model="dialogFormVisible"
      title="余额记录"
      class="top-right-dialog"
      width="800"
      :append-to-body="true"
    >
      <div class="page art-full-height">
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
              <el-link type="primary" @click="handleClick(row, 0)"> 编辑 </el-link>
              <span class="line">｜</span>
              <el-link type="primary" @click="handleClick(row, 1)"> 明细 </el-link>
            </template>
          </ArtTable>
        </ElCard>
      </div>
    </el-dialog>

    <el-dialog v-model="editDialogVisible" title="修改钱包余额" width="400" :append-to-body="true">
      <el-form :model="formData" label-width="60px">
        <el-form-item label="金额">
          <el-input v-model="formData.amount" placeholder="输入金额正为加，负为减" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeEdit">关闭</el-button>
          <el-button type="primary" @click="confirmEdit">确认</el-button>
        </div>
      </template>
    </el-dialog>

    <ListItem ref="listDialog"></ListItem>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/composables/useTable'
  import { getUserWalletRecord, changeUserWalletBalance } from '@/api/userManage'
  import { useUserStore } from '@/store/modules/user'
  import ListItem from './AreaBalanceListDialog.vue'

  const userStore = useUserStore()
  const userInfo = computed(() => userStore.getUserInfo)

  defineOptions({ name: 'AreaBalanceDialog' })
  const dialogFormVisible = ref(false)
  const listDialog = ref()

  // 表单搜索初始值
  const searchFormState = ref({
    id: ''
  })
  const id = ref()
  const formData = ref({
    amount: ''
  })
  const editDialogVisible = ref(false)

  const openDialog = (params: any) => {
    searchFormState.value.id = params.id
    dialogFormVisible.value = true

    handleSearch()
  }
  defineExpose({ openDialog })

  const handleSearch = async () => {
    Object.assign(searchParams, {
      ...searchFormState.value
    })

    getData()
  }

  const {
    data,
    columns,
    loading,
    pagination,
    searchParams,
    // resetSearchParams,
    handleSizeChange,
    handleCurrentChange,
    getData
  } = useTable({
    core: {
      apiFn: getUserWalletRecord,
      apiParams: {
        page: 1,
        size: 999,
        id: id.value
      },
      immediate: false,
      columnsFactory: () => [
        {
          prop: 'id',
          label: '钱包ID',
          align: 'center',
          width: 50
        },
        {
          prop: 'balance',
          label: '余额',
          align: 'center'
        },
        {
          prop: 'special_area_name',
          label: '专区名称',
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

  const handleClick = (row: any, flag: any) => {
    if (flag == 1) {
      listDialog.value.openDialog({ id: row.id })
      return
    }
    // 共用一个id
    id.value = row.id
    editDialogVisible.value = true
  }
  const closeEdit = () => {
    editDialogVisible.value = false
    formData.value.amount = ''
  }

  const confirmEdit = () => {
    changeUserWalletBalance({
      id: id.value,
      amount: formData.value.amount,
      operator_account: userInfo.value.userName,
      operator_name: userInfo.value.userName
    }).then((res) => {
      if (res.code == 200) {
        ElMessage.success('修改成功')
        closeEdit()
        getData()
      } else {
        ElMessage.error(res.msg || '修改失败')
      }
    })
  }
</script>
