<template>
  <el-dialog v-model="dialogVisible" title="编辑" width="600">
    <!-- :before-close="handleClose" -->
    <div>
      <el-form
        ref="formRef"
        :model="formData"
        label-width="120px"
        label-position="right"
        :rules="rules"
      >
        <el-form-item label="类型" prop="type">
          <el-select v-model="formData.type" placeholder="请选择类型">
            <el-option
              v-for="item in carImgListOption"
              :key="(item as any).value"
              :label="(item as any).label"
              :value="(item as any).value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="图片路径" prop="image">
          <el-upload
            class="avatar-uploader"
            :action="uploadImageUrl"
            :headers="uploadHeaders"
            :show-file-list="false"
            :limit="1"
            ref="uploadRef"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="imageFile[]"
          >
            <img v-if="formData.image" :src="formData.image" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio label="1" :value="1">启用</el-radio>
            <el-radio label="0" :value="0">停用</el-radio>
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
  defineOptions({ name: 'EditAgreeDialog' })
  import { addCarImage, editCarImage } from '@/api/platformSetManage'
  import { Plus } from '@element-plus/icons-vue'
  import type { UploadInstance, UploadProps } from 'element-plus'
  import { ElButton, ElRadioGroup, type FormInstance, type FormRules } from 'element-plus'
  const uploadRef = ref<UploadInstance>()
  import { useUserStore } from '@/store/modules/user'
  const userStore = useUserStore()
  // 定义上传请求头
  const uploadImageUrl = `${import.meta.env.VITE_API_PROXY_URL}/backend/upload/picture`

  defineProps({
    carImgListOption: {
      type: Array,
      default: () => [{ value: 0, label: '全部' }]
    }
  })
  const emit = defineEmits(['refresh'])
  const formRef = ref<FormInstance>()
  const rules = computed<FormRules>(() => ({
    image: [{ required: true, message: '请上传图片', trigger: 'blur' }],
    type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
    status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
  }))

  const uploadHeaders = ref({
    Authorization: userStore.accessToken
  })
  // -1 add 0 view 1 edit
  const flag = ref(-1)
  const dialogVisible = ref(false)
  const formData = ref({
    id: '',
    type: '',
    status: '',
    image: ''
  })

  const confirm = (el: FormInstance | undefined) => {
    if (flag.value == 0) {
      dialogVisible.value = false
      return
    }
    if (!el) {
      return
    }
    el.validate((valid) => {
      if (valid) {
        if (formData.value.id) {
          editCarImage(formData.value)
            .then(() => {
              ElMessage.success('编辑成功')
              resetForm(el)
            })
            .catch(() => {
              ElMessage.error('编辑失败')
            })
        } else {
          addCarImage(formData.value)
            .then(() => {
              ElMessage.success('添加成功')
              resetForm(el)
            })
            .catch(() => {
              ElMessage.error('添加失败')
            })
        }
      }
    })
  }
  const openDialog = (row: any) => {
    dialogVisible.value = true
    if (row.id) {
      if (row.flag == 0) {
        flag.value = 0
      } else {
        flag.value = 1
      }
      formData.value = {
        ...row
      }
    } else {
      flag.value = -1
    }
  }
  const resetForm = (el: FormInstance | undefined) => {
    el?.resetFields()
    uploadRef.value?.clearFiles()
    dialogVisible.value = false
    formData.value = {
      id: '',
      type: '',
      status: '',
      image: ''
    }
    emit('refresh')
  }

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    if (response.code == 200) {
      formData.value.image = response.data.file[0]
    }
  }

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp' // 可根据需要添加更多
    ]
    if (!allowedTypes.includes(rawFile.type)) {
      ElMessage.error('请上传图片')
      return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('图片大小不能超过2MB')
      return false
    }
    return true
  }

  defineExpose({
    openDialog
  })
</script>
