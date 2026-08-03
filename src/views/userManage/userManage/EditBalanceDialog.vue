<template>
  <el-dialog v-model="dialogFormVisible" title="修改余额" width="600">
    <el-form :model="form" label-position="right" label-width="100px">
      <el-form-item label="原来的余额：">
        <el-input v-model="form.balance" disabled autocomplete="off" />
      </el-form-item>

      <el-form-item label="增加的余额：">
        <el-input
          v-model="form.amount"
          autocomplete="off"
          placeholder="请输入增加的余额"
          type="number"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { editBalance } from '@/api/userManage'
  import { useUserStore } from '@/store/modules/user'

  defineOptions({ name: 'EditBalanceDialog' })

  const userStore = useUserStore()
  const userInfo = computed(() => userStore.getUserInfo)
  const dialogFormVisible = ref(false)

  // 表单搜索初始值
  const form = ref({
    balance: '',
    amount: '',
    id: ''
  })

  const emit = defineEmits(['refresh'])

  const handleSubmit = async () => {
    if (!form.value.amount) {
      ElMessage.error('请输入增加的余额')
      return
    }
    const res = await editBalance({ ...form.value, operator_account: userInfo.value.userName })
    if (res.code === 200) {
      ElMessage.success('修改成功')
      emit('refresh')
    } else {
      ElMessage.error(res.msg || '修改失败')
    }
    dialogFormVisible.value = false
  }

  const openDialog = (params: any) => {
    console.log(params)
    dialogFormVisible.value = true
    form.value = {
      ...params,
      balance: params.balance || '',
      amount: ''
    }
  }
  defineExpose({ openDialog })
</script>
