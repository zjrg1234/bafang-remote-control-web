<template>
  <el-dialog v-model="dialogVisible" :title="text" width="600px">
    <!-- :before-close="handleClose" -->
    <div>
      <el-form
        :model="formData"
        label-position="right"
        label-suffix=":"
        ref="formRef"
        label-width="80px"
      >
        <el-form-item label="是否启用" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio label="1" :value="1">是</el-radio>
            <el-radio label="2" :value="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <ArtWangEditor
            ref="simpleEditorRef"
            v-model="formData.content"
            height="400px"
            placeholder="请输入内容，体验简化的编辑功能..."
            :toolbar-keys="simpleToolbarKeys"
          /> -->

          <el-input
            v-model="formData.content"
            placeholder="请输入内容"
            type="textarea"
            :rows="5"
            :column="6"
          ></el-input>
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
  import { ElButton, ElRadioGroup } from 'element-plus'
  import { addNotice, updateNotice } from '@/api/platformSetManage'

  defineOptions({ name: 'NoticeiDialog' })

  const dialogVisible = ref(false)
  const formData = ref({
    id: 1,
    content: '',
    status: 0,
    flag: -1
  })

  // -1 add 0 view 1 edit
  const text = computed(() => {
    return formData.value.flag == -1 ? '新增' : formData.value.flag == 0 ? '查看' : '编辑'
  })
  const emit = defineEmits(['refresh'])
  const openDialog = (row: any) => {
    dialogVisible.value = true
    // -1 add 0 view 1 edit
    formData.value = {
      id: 1,
      content: '',
      status: 0,
      flag: -1
    }
    if (row.flag != -1) {
      formData.value = { ...row }
    }
    // const timer = setTimeout(() => {
    //   simpleEditorRef.value.setHtml(formData.value.content)
    //   clearInterval(timer)
    // }, 1000)
  }
  const resetForm = () => {
    dialogVisible.value = false
  }

  const confirm = async () => {
    let res = {
      code: 1,
      msg: ''
    }
    if (formData.value.flag == -1) {
      res = await addNotice(formData.value)
    } else if (formData.value.flag == 1) {
      res = await updateNotice(formData.value)
    }
    if (formData.value.flag != 0) {
      if (res.code == 200) {
        ElMessage.success('操作成功')
      } else {
        ElMessage.error(res.msg)
      }
      emit('refresh')
    }
    resetForm()
  }

  defineExpose({
    openDialog
  })
</script>

<style scoped lang="scss"></style>
