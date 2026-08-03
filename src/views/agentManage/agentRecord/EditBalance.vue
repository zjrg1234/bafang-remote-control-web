<template>
  <div>
    <el-dialog v-model="dialogFormVisible" title="修改余额" width="400">
      <el-form :model="form" label-position="right" label-width="70px">
        <el-form-item label="金额：">
          <el-input v-model="form.amount" autocomplete="off" placeholder="请输入金额" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { editAgentBalace } from '@/api/agentManage'
  import { useUserStore } from '@/store/modules/user'

  defineOptions({ name: 'EditBalanceDialog' })
  const dialogFormVisible = ref(false)
  const userStore = useUserStore()
  const userInfo = computed(() => userStore.getUserInfo)
  // 表单搜索初始值
  const form = ref({
    amount: '',
    id: ''
  })

  const handleSubmit = async () => {
    let res: any
    res = await editAgentBalace({
      id: form.value.id,
      amount: form.value.amount,
      operator_account: userInfo.value.userName
    })

    if (res.code === 200) {
      ElMessage.success('修改成功')
    } else {
      ElMessage.error(res.msg || '修改失败')
    }
    dialogFormVisible.value = false
  }

  const openDialog = (params: any) => {
    dialogFormVisible.value = true
    form.value = {
      ...params
    }
  }
  defineExpose({ openDialog })
</script>
