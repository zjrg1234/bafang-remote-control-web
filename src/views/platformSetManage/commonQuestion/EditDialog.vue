<template>
  <el-dialog v-model="dialogVisible" :title="formData.id ? '编辑' : '新增'" width="700px">
    <!-- :before-close="handleClose" -->
    <div>
      <el-form
        :model="formData"
        label-position="right"
        label-suffix=":"
        :inline="true"
        ref="formRef"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="问题标题" prop="name">
          <el-input v-model="formData.name" placeholder="请输入问题标题" />
        </el-form-item>
        <el-form-item label="详情" prop="detail">
          <ArtWangEditor
            ref="simpleEditorRef"
            v-model="formData.detail"
            height="400px"
            placeholder="请输入内容，体验简化的编辑功能..."
            :toolbar-keys="simpleToolbarKeys"
          />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="formData.sort" placeholder="请输入排序" />
        </el-form-item>
        <div></div>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.status">
            <el-radio label="1" :value="1">正常</el-radio>
            <el-radio label="0" :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetForm(formRef)">取消</el-button>
        <el-button type="primary" @click="confirm(formRef)"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElButton, ElRadioGroup, type FormInstance, type FormRules } from 'element-plus'
  import { editQues, addQues } from '@/api/platformSetManage'

  defineOptions({ name: 'EditComQDialog' })

  const simpleEditorRef = ref()
  const dialogVisible = ref(false)
  const formData = ref({
    id: '',
    name: '',
    detail: '',
    sort: '',
    status: 1
  })
  const emit = defineEmits(['refresh'])
  const formRef = ref<FormInstance>()

  const checkDetail = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error('请输入详情'))
    }
    setTimeout(() => {
      if (value == '<p><br></p>') {
        callback(new Error('请输入详情'))
      } else {
        callback()
      }
    }, 1000)
  }

  const rules = computed<FormRules>(() => ({
    name: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    detail: [{ required: true, validator: checkDetail, trigger: 'blur' }]
  }))
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
  const openDialog = (row: any) => {
    dialogVisible.value = true
    simpleEditorRef.value?.setHtml(formData.value.detail)
    if (row) {
      formData.value = { ...row }
      // setTimeout(() => {
      //   simpleEditorRef.value?.setHtml(formData.value.detail)
      // }, 1000)
    } else {
      formData.value = {
        id: '',
        name: '',
        detail: '',
        sort: '',
        status: 1
      }
      simpleEditorRef.value?.setHtml('')
    }
  }

  const confirm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        if (formData.value.id) {
          editQues(formData.value).then((res) => {
            console.log(res)
            if (res.code === 200) {
              ElMessage.success('编辑成功')
              dialogVisible.value = false
              emit('refresh')
              resetForm(formEl)
            } else {
              ElMessage.error(res.msg || '编辑失败')
            }
          })
        } else {
          addQues(formData.value).then((res) => {
            if (res.code === 200) {
              ElMessage.success('新增成功')
              dialogVisible.value = false
              emit('refresh')
              resetForm(formEl)
            } else {
              ElMessage.error(res.msg || '新增失败')
            }
          })
        }
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    formData.value = {
      id: '',
      name: '',
      detail: '',
      sort: '',
      status: 1
    }
  }

  defineExpose({
    openDialog
  })
</script>

<style scoped lang="scss"></style>
