<template>
  <el-dialog v-model="dialogVisible" title="编辑" width="600">
    <!-- :before-close="handleClose" -->
    <div>
      <el-form
        :model="formData"
        label-position="right"
        label-suffix=":"
        ref="formRef"
        label-width="100px"
      >
        <el-form-item label="用户" prop="name">
          <el-input v-model="formData.user_name" disabled placeholder="请输入问题标题" />
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="formData.phone" disabled placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="反馈图片">
          <div class="demo-image__preview">
            <el-image
              style="width: 100px; height: 100px"
              :src="url"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="srcList"
              show-progress
              :initial-index="0"
              fit="cover"
            />
          </div>
        </el-form-item>
        <el-form-item label="意见内容">
          <el-input v-model="formData.content" disabled placeholder="请输入意见内容" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="formData.time" disabled placeholder="请输入创建时间" />
        </el-form-item>
        <el-form-item label="处理状态">
          <el-radio-group v-model="formData.type">
            <el-radio label="0" :value="0">待回复</el-radio>
            <el-radio label="1" :value="1">已回复</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="remark"
          :rules="[
            {
              required: true,
              message: '请输入回复内容',
              trigger: 'blur'
            }
          ]"
        >
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入回复内容" />
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
  import { editFeedback } from '@/api/platformSetManage'
  import type { FormInstance } from 'element-plus'
  defineOptions({ name: 'FeedbackDetailsDialog' })

  const formRef = ref<FormInstance>()
  const dialogVisible = ref(false)

  const url = ref('')
  const srcList = ref([] as any[])
  let formData = ref({
    id: 1,
    user_name: '',
    phone: '',
    content: '',
    type: 0,
    image: '',
    time: '2025-12-28 09:18:56',
    remark: ''
  })
  const emit = defineEmits(['refresh'])
  const openDialog = (row: any) => {
    dialogVisible.value = true
    formRef.value?.resetFields()

    formData.value = {
      ...row
    }
    console.log(formData.value.image)
    url.value = formData.value.image
    srcList.value = [formData.value.image]
  }
  const resetForm = (formRef: FormInstance | undefined) => {
    formRef?.resetFields()
    formData = ref({
      id: 1,
      user_name: '',
      phone: '',
      content: '',
      type: 0,
      image: '',
      time: '',
      remark: ''
    })
    dialogVisible.value = false
  }

  const confirm = async (formRef: FormInstance | undefined) => {
    if (!formRef) {
      return
    }
    const valid = await formRef.validate()
    if (!valid) {
      return
    }
    editFeedback({
      id: formData.value.id,
      type: formData.value.type,
      remark: formData.value.remark
    }).then((res) => {
      if (res.code === 200) {
        ElMessage.success('编辑成功')
        srcList.value = []
        resetForm(formRef)
        emit('refresh')
      } else {
        ElMessage.error(res.msg || '编辑失败')
      }
    })
  }

  defineExpose({
    openDialog
  })
</script>

<style scoped lang="scss"></style>
