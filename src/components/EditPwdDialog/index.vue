<template>
  <div>
    <el-dialog v-model="dialogFormVisible" title="修改密码" width="400">
      <el-form :model="form" label-position="right" label-width="70px">
        <el-form-item label="手机号：">
          <el-input v-model="form.phone" disabled autocomplete="off" />
        </el-form-item>

        <el-form-item label="密码：">
          <el-input v-model="form.password" autocomplete="off" placeholder="请输入密码" />
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
  import { editPwd } from '@/api/userManage'
  import { editAgentPwd } from '@/api/agentManage'

  defineOptions({ name: 'EditPwdDialog' })
  const dialogFormVisible = ref(false)
  const type = ref(1)
  // 表单搜索初始值
  const form = ref({
    phone: '',
    password: '',
    id: ''
  })

  const handleSubmit = async () => {
    let res: any
    if (type.value == 1) {
      res = await editAgentPwd({
        password: form.value.password,
        id: form.value.id,
        phone: form.value.phone
      })
    } else {
      res = await editPwd({
        password: form.value.password,
        id: form.value.id,
        phone: form.value.phone
      })
    }
    if (res.code === 200) {
      ElMessage.success('修改成功')
    } else {
      ElMessage.error(res.msg || '修改失败')
    }
    dialogFormVisible.value = false
  }

  const openDialog = (params: any) => {
    dialogFormVisible.value = true
    type.value = params.type
    form.value = {
      ...params,
      phone: params.phone_number || '',
      password: ''
    }
  }
  defineExpose({ openDialog })
</script>
