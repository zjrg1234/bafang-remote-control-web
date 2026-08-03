<template>
  <el-dialog v-model="dialogVisible" title="编辑" width="600px">
    <!-- :before-close="handleClose" -->
    <div>
      <el-form
        :model="formData"
        label-position="right"
        label-suffix=":"
        ref="formRef"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" disabled placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="联系方式" prop="value">
          <el-input v-model="formData.value" placeholder="请输入联系方式" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElButton } from 'element-plus'
  import { editPlatformParamList } from '@/api/platformSetManage'

  defineOptions({ name: 'PlatformParamEditDialog' })

  const dialogVisible = ref(false)
  const formData = ref({
    id: 1,
    title: '',
    value: ''
  })

  const openDialog = (row: any) => {
    dialogVisible.value = true
    formData.value = { ...row }
  }
  const resetForm = () => {
    dialogVisible.value = false
  }

  const confirm = async () => {
    const res = await editPlatformParamList({
      id: formData.value.id,
      value: formData.value.value
    })

    if (res.code == 200) {
      ElMessage.success('操作成功')
    } else {
      ElMessage.error(res.msg)
    }
    resetForm()
  }

  defineExpose({
    openDialog
  })
</script>

<style scoped lang="scss"></style>
