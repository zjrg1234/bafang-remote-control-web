<template>
  <el-dialog v-model="dialogVisible" title="编辑" width="600">
    <!-- :before-close="handleClose" -->
    <div>
      <ElForm ref="formRef" :model="formData">
        <ElFormItem prop="password" label="类型">
          <ElInput v-model="formData.name" disabled> </ElInput>
        </ElFormItem>

        <ElFormItem label="内容">
          <ArtWangEditor
            ref="simpleEditorRef"
            v-model="formData.content"
            height="300px"
            placeholder="请输入内容，体验简化的编辑功能..."
            :toolbar-keys="simpleToolbarKeys"
          />
        </ElFormItem>
      </ElForm>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  defineOptions({ name: 'EditAgreeDialog' })
  import { editAgreeList } from '@/api/platformSetManage'
  const simpleEditorRef = ref()
  const dialogVisible = ref(false)
  const formData = ref({
    id: '',
    name: '',
    content: ''
  })

  /**
   * 简化工具栏配置
   * 只包含基础的编辑功能
   */
  const simpleToolbarKeys = [
    'bold',
    'italic',
    'underline',
    '|',
    'bulletedList',
    'numberedList',
    '|',
    'insertLink',
    'insertImage',
    '|',
    'undo',
    'redo'
  ]

  const confirm = () => {
    editAgreeList({
      ...formData.value,
      content: simpleEditorRef.value.getHtml() || formData.value.content
    })
      .then(() => {
        ElMessage.success('编辑成功')
        dialogVisible.value = false
      })
      .catch(() => {
        ElMessage.error('编辑失败')
      })
  }
  const openDialog = (row: any) => {
    dialogVisible.value = true
    formData.value = row
    simpleEditorRef.value.setHtml(formData.value.content)
  }

  defineExpose({
    openDialog
  })
</script>

<style scoped lang="scss"></style>
